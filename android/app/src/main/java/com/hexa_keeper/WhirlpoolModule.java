package com.hexa_keeper;

import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import io.hexawallet.keeper.WhirlpoolBridge;

public class WhirlpoolModule extends ReactContextBaseJavaModule{

    public static final String NAME = "Whirlpool";

    public WhirlpoolModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    @ReactMethod
    public void sayHello(String name,Promise promise) {
        promise.resolve(WhirlpoolBridge.helloWorld(name));
    }

    @ReactMethod
    public void initiate(String torPort, Promise promise) {
        Toast.makeText(getReactApplicationContext(), "PORT: "+ torPort, Toast.LENGTH_SHORT).show();
        promise.resolve(WhirlpoolBridge.initiate(torPort));
    }

    @ReactMethod
    public void getTx0Data(String torPort, Promise promise) {
        promise.resolve(WhirlpoolBridge.gettx0data(torPort));
    }

    @ReactMethod
    public void getPools(String torPort, Promise promise) {
        promise.resolve(WhirlpoolBridge.pools(torPort));
    }
}
