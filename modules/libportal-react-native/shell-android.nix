{
  # If you copy this example out of nixpkgs, use these lines instead of the next.
  # This example pins nixpkgs: https://nix.dev/tutorials/towards-reproducibility-pinning-nixpkgs.html
  /*nixpkgsSource ? (builtins.fetchTarball {
    name = "nixpkgs-20.09";
    url = "https://github.com/NixOS/nixpkgs/archive/20.09.tar.gz";
    sha256 = "1wg61h4gndm3vcprdcg7rc4s1v3jkm5xd7lw8r2f67w502y94gcy";
  }),
  pkgs ? import nixpkgsSource {
    config.allowUnfree = true;
  },
  */

  # If you want to use the in-tree version of nixpkgs:
  pkgs ? import <nixpkgs> {
    config.allowUnfree = true;
    config.android_sdk.accept_license = true;
  },

  config ? pkgs.config
}:

# Copy this file to your Android project.
let
  # Declaration of versions for everything. This is useful since these
  # versions may be used in multiple places in this Nix expression.
  android = {
    versions = {
      cmdLineToolsVersion = "11.0";
      platformTools = "34.0.5";
      buildTools = "33.0.1";
      ndkVersion = "23.1.7779620";
      cmake = "3.6.4111459";
      emulator = "34.1.9";
    };

    platforms = [ "33" ];
    abis = ["x86_64"];
    extras = ["extras;google;gcm"];
  };

  # Otherwise, just use the in-tree androidenv:
  androidEnv = pkgs.androidenv;

  androidComposition = androidEnv.composeAndroidPackages {
    cmdLineToolsVersion = android.versions.cmdLineToolsVersion;
    platformToolsVersion = android.versions.platformTools;
    buildToolsVersions = [android.versions.buildTools];
    platformVersions = android.platforms;
    abiVersions = android.abis;

    includeSources = true;
    includeSystemImages = true;
    includeEmulator = true;
    emulatorVersion = android.versions.emulator;
    systemImageTypes = [ "google_apis" ];

    includeNDK = true;
    ndkVersion = android.versions.ndkVersion;
    cmakeVersions = [android.versions.cmake];

    useGoogleAPIs = true;
    includeExtras = android.extras;

    # Accepting more licenses declaratively:
    extraLicenses = [
      # Already accepted for you with the global accept_license = true or
      # licenseAccepted = true on androidenv.
      # "android-sdk-license"

      # These aren't, but are useful for more uncommon setups.
      "android-sdk-preview-license"
      "android-googletv-license"
      "android-sdk-arm-dbt-license"
      "google-gdk-license"
      "intel-android-extra-license"
      "intel-android-sysimage-license"
      "mips-android-sysimage-license"
    ];
  };

  androidSdk = androidComposition.androidsdk;
  platformTools = androidComposition.platform-tools;
  jdk = pkgs.jdk17;
in
pkgs.mkShell rec {
  name = "react-native-env";
  packages = [ androidSdk platformTools jdk pkgs.android-studio pkgs.yarn pkgs.android-tools ];

  LANG = "C.UTF-8";
  LC_ALL = "C.UTF-8";
  JAVA_HOME = jdk.home;

  # Note: ANDROID_HOME is deprecated. Use ANDROID_SDK_ROOT.
  ANDROID_SDK_ROOT = "${androidSdk}/libexec/android-sdk";
  ANDROID_NDK_ROOT = "${ANDROID_SDK_ROOT}/ndk-bundle";

  # Ensures that we don't have to use a FHS env by using the nix store's aapt2.
  GRADLE_OPTS = "-Dorg.gradle.project.android.aapt2FromMavenOverride=${ANDROID_SDK_ROOT}/build-tools/${android.versions.buildTools}/aapt2";

  shellHook = ''
    # Add cmake to the path.
    cmake_root="$(echo "$ANDROID_SDK_ROOT/cmake/${android.versions.cmake}"*/)"
    export PATH="$cmake_root/bin:$PATH"

    # Write out local.properties for Android Studio.
    cat <<EOF > local.properties
    # This file was automatically generated by nix-shell.
    sdk.dir=$ANDROID_SDK_ROOT
    ndk.dir=$ANDROID_NDK_ROOT
    cmake.dir=$cmake_root
    EOF
  '';
}

