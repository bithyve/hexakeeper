import Colors from 'src/theme/Colors';
import { extendTheme } from 'native-base';
import Fonts from 'src/constants/Fonts';

export const customTheme = extendTheme({
  fontConfig: {
    FiraSans: {
      100: {
        normal: Fonts.FiraSansLight,
        italic: Fonts.FiraSansLightItalic,
      },
      200: {
        normal: Fonts.FiraSansRegular,
        italic: Fonts.FiraSansItalic,
      },
      300: {
        normal: Fonts.FiraSansMedium,
        italic: Fonts.FiraSansMediumItalic,
      },
      400: {
        normal: Fonts.FiraSansSemiBold,
        italic: Fonts.FiraSansSemiBoldItalic,
      },
      500: {
        normal: Fonts.FiraSansBold,
        italic: Fonts.FiraSansBoldItalic,
      },
      600: {
        normal: Fonts.FiraSansRegular,
        italic: Fonts.FiraSansItalic,
      },
      700: {
        normal: Fonts.FiraSansRegular,
        italic: Fonts.FiraSansItalic,
      },
      800: {
        normal: Fonts.FiraSansRegular,
        italic: Fonts.FiraSansItalic,
      },
      900: {
        normal: Fonts.FiraSansRegular,
        italic: Fonts.FiraSansItalic,
      },
    },
  },
  fonts: {
    heading: 'FiraSans',
    body: 'FiraSans',
    mono: 'FiraSans',
  },
  colors: {
    light: {
      buttonText: Colors.White,
      navButtonText: Colors.DeepSpaceSparkle,
      primaryGreen: Colors.GenericViridian,
      primaryBackground: Colors.LightYellow,
      primaryGreenBackground: Colors.pantoneGreen,
      pillText: Colors.MidNightBlack,
      pantoneGreenLight: Colors.pantoneGreenLight,
      // mainBackground: Colors.LightWhite,
      modalGreenBackground: Colors.pantoneGreen,
      modalGreenButton: Colors.pantoneGreen,
      modalGreenContent: Colors.White,
      modalWhiteBackground: Colors.LightWhite,
      modalWhiteContent: Colors.GraniteGray,
      modalGreenTitle: Colors.Black,
      modalAccentTitle: Colors.Black,
      modalWhiteButton: Colors.White,
      modalWhiteButtonText: Colors.pantoneGreen,
      modalGreenLearnMore: Colors.CastelGreenDark,
      greenButtonBackground: Colors.pantoneGreen,
      dashedButtonBackground: Colors.lightGreen,
      dashedButtonContent: Colors.White,
      choosePlanHome: Colors.White,
      choosePlanCard: Colors.Seashell,
      choosePlanInactiveText: Colors.Black,
      choosePlanIconBackSelected: Colors.DeepOlive,
      choosePlanIconBack: Colors.PaleKhaki,
      hexagonIconBackColor: Colors.deepTeal,
      qrBorderColor: Colors.LightYellow,
      coffeeBackground: Colors.Coffee,
      yellowButtonBackground: Colors.MacaroniAndCheese,
      yellowButtonTextColor: Colors.Coffee,
      btcLabelBack: Colors.Periwinkle,
      white: Colors.White,
      primaryText: Colors.RichBlack,
      secondaryText: Colors.GraniteGray,
      learnMoreBorder: Colors.Coffee,
      textBlack: Colors.DarkGreen,
      greenText: Colors.RichGreen,
      greenText2: Colors.TropicalRainForest,
      accent: Colors.MacaroniAndCheese,
      lightAccent: Colors.MacaroniAndCheese,
      QrCode: Colors.WhiteCoffee,
      recieverAddress: Colors.DimGray,
      textInputBackground: Colors.Isabelline,
      secondaryBackground: Colors.Isabelline,
      GreyText: Colors.Feldgrau,
      DarkGreyText: Colors.FeldgrauDark,
      dateText: Colors.HookerGreen,
      Border: Colors.CastletonGreen,
      textColor: Colors.LightGray,
      textColor2: Colors.DeepSpaceSparkle,
      headerText: Colors.pantoneGreen,
      copyBackground: Colors.LightGray,
      sendCardHeading: Colors.BlueGreen,
      // Glass: Colors.Glass,
      TorLable: Colors.Menthol,
      divider: Colors.GrayX11,
      errorRed: Colors.CarmineRed,
      SlateGreen: Colors.SlateGreen,
      textWallet: Colors.MediumJungleGreen,
      indicator: Colors.OutrageousOrange,
      addTransactionText: Colors.PineTree,
      sendMax: Colors.JackoBean,
      inActiveMsg: Colors.RichBlack,
      vaultCardText: Colors.Bisque,
      walletTypePillBack: Colors.Bisque,
      pillPlaceholderBack: Colors.LightKhaki,
      satsDark: Colors.DeepSpaceGreen,
      gradientStart: Colors.GenericViridian, // linearGradient
      gradientEnd: Colors.RichGreen, // linearGradient
      error: Colors.CongoPink,
      LightGreenish: Colors.LightGreenish,
      black: Colors.Black,
      fadedGray: Colors.FadedGray,
      fadedblue: Colors.FadeBlue,
      dustySageGreen: Colors.DustySageGreen,
      forestGreen: Colors.ForestGreen,
      pantoneGreen: Colors.pantoneGreen,
      seashellWhite: Colors.Seashell,
      lightSeashell: Colors.lightSeashell,
      // Champagne: Colors.Champagne,
      BrownNeedHelp: Colors.RussetBrown,
      policySubtitle: Colors.GreenishGrey,
      balanceText: Colors.GreenishGrey,
      // GreenishGrey: Colors.GreenishGrey,
      // Ivory: Colors.Ivory,
      RecoveryBorderColor: Colors.RussetBrownLight,
      brownColor: Colors.brownColor,
      learMoreTextcolor: Colors.learMoreTextcolor,
      // Linen: Colors.Linen,
      whiteText: Colors.OffWhite,
      // SageGreen: Colors.SageGreen,
      TransactionIconBackColor: Colors.Eggshell,
      Teal: Colors.Teal,
      LightBrown: Colors.LightBrown,
      SignleSigCardPillBackColor: Colors.PaleTurquoise,
      ForestGreenDark: Colors.ForestGreenDark,
      dropdownSeparator: Colors.Taupe,
      LightGreen: Colors.lightGreen,
      lightPurple: Colors.LightPurple,
      MintWhisper: Colors.MintWhisper,
      SlateGrey: Colors.SlateGrey,
      // LightKhaki: Colors.LightKhaki,
      // SmokeGreen: Colors.SmokeGreen,
      // Warmbeige: Colors.Warmbeige,
      // PearlWhite: Colors.PearlWhite,
      // PaleIvory: Colors.PaleIvory,
      DarkSage: Colors.DarkSage,
      // Smoke: Colors.Smoke,
      // deepTeal: Colors.deepTeal,
      ChampagneBliss: Colors.ChampagneBliss,
      // PearlGrey: Colors.PearlGrey,
      // Taupe: Colors.Taupe,
      // Crayola: Colors.Crayola,
      signerCardPill: Colors.Purple,
      dullGreen: Colors.DullGreen,
      darkGrey: Colors.DarkGrey,
      lightSkin: Colors.LightSkin,
      PretitleColor: Colors.LightGreenish,
      disabledColor: Colors.disabledGrey,
      feeInfoTitleColor: Colors.SlateGrey,
      feeInfoColor: Colors.RichBlack,
      greyBorder: Colors.SilverMist,
      linkPreviewBackground: Colors.SeaShellBeige,
      greyBorderTransparent: Colors.SilverMistTransparent,
      limeText: Colors.LimeYellow,
      greenText: Colors.SeaweedGreen,
      greenTextDisabled: Colors.SlateGreen,
      overlayGreen: Colors.pastelGreen,
    },
    dark: {
      navButtonText: Colors.paleWhite,
      buttonText: Colors.Black,
      primaryGreen: Colors.GenericViridian,
      darkGrey: Colors.DarkGrey,
      primaryBackground: Colors.LightYellowDark,
      pillText: Colors.MidNightBlack,
      primaryGreenBackground: Colors.LightYellowDark,
      pantoneGreenLight: Colors.pantoneGreenLight,
      // mainBackground: Colors.LightWhite,
      modalGreenBackground: Colors.LightYellowDark,
      modalGreenButton: Colors.pantoneGreenDark,
      modalGreenContent: Colors.White,
      modalWhiteBackground: Colors.LightYellowDark,
      modalWhiteContent: Colors.White,
      modalWhiteButton: Colors.pantoneGreenDark,
      modalWhiteButtonText: Colors.Black,
      modalGreenTitle: Colors.TropicalRainForestDark,
      modalAccentTitle: Colors.GoldCrayola,
      dullGreen: Colors.DullGreen,
      // modalWhiteButton: Colors.pantoneGreenDark,
      modalGreenLearnMore: Colors.LightYellowDark,
      lightPurple: Colors.LightPurple,
      greenButtonBackground: Colors.ForestGreenDark,
      dashedButtonBackground: Colors.ForestGreenDark,
      dashedButtonContent: Colors.Black,
      choosePlanHome: Colors.White,
      choosePlanCard: Colors.Seashell,
      choosePlanInactiveText: Colors.Black,
      choosePlanIconBackSelected: Colors.DeepOlive,
      choosePlanIconBack: Colors.PaleKhaki,
      hexagonIconBackColor: Colors.deepTeal,
      qrBorderColor: Colors.White,
      coffeeBackground: Colors.CoffeeDark,
      yellowButtonBackground: Colors.LightYellowDark,
      yellowButtonTextColor: Colors.White,
      btcLabelBack: Colors.Periwinkle,
      white: Colors.Black,
      primaryText: Colors.RichBlackDark,
      secondaryText: Colors.GraniteGrayDark,
      learnMoreBorder: Colors.GoldCrayola,
      textBlack: Colors.DarkGreen,
      greenText: Colors.RichGreenDark,
      greenText2: Colors.TropicalRainForestDark,
      accent: Colors.MacaroniAndCheese,
      lightAccent: Colors.GoldCrayola,
      QrCode: Colors.WhiteCoffee,
      recieverAddress: Colors.DimGray,
      textInputBackground: Colors.Isabelline,
      secondaryBackground: Colors.LightYellowDark,
      GreyText: Colors.RichBlackDark,
      DarkGreyText: Colors.RichBlackDark,
      dateText: Colors.HookerGreen,
      Border: Colors.CastletonGreen,
      textColor: Colors.LightGray,
      textColor2: Colors.DeepSpaceSparkleDark,
      headerText: Colors.pantoneGreen,
      copyBackground: Colors.LightGray,
      sendCardHeading: Colors.BlueGreen,
      // Glass: Colors.Glass,
      SlateGreen: Colors.SlateGreen,
      TorLable: Colors.Menthol,
      divider: Colors.GrayX11,
      errorRed: Colors.CarmineRed,
      textWallet: Colors.MediumJungleGreen,
      indicator: Colors.OutrageousOrange,
      addTransactionText: Colors.PineTree,
      sendMax: Colors.JackoBean,
      inActiveMsg: Colors.SpanishGray,
      vaultCardText: Colors.Bisque,
      walletTypePillBack: Colors.BisqueDark,
      pillPlaceholderBack: Colors.BisqueDark,
      satsDark: Colors.DeepSpaceGreen,
      gradientStart: Colors.GenericViridian, // linearGradient
      gradientEnd: Colors.DeepAquamarine, // linearGradient
      error: Colors.CongoPink,
      black: Colors.White,
      fadedGray: Colors.SeashellDark,
      fadedblue: Colors.FadeBlue,
      dustySageGreen: Colors.DustySageGreen,
      forestGreen: Colors.ForestGreen,
      pantoneGreen: Colors.pantoneGreenDark,
      seashellWhite: Colors.SeashellDark,
      lightSeashell: Colors.lightSeashell,
      BrownNeedHelp: Colors.RussetBrown,
      policySubtitle: Colors.GreenishGrey,
      balanceText: Colors.White,
      // GreenishGrey: Colors.GreenishGrey,
      RecoveryBorderColor: Colors.RussetBrownLight,
      brownColor: Colors.brownColor,
      learMoreTextcolor: Colors.learMoreTextcolor,
      // Linen: Colors.Linen,
      whiteText: Colors.OffWhite,
      // SageGreen: Colors.SageGreen,
      TransactionIconBackColor: Colors.Eggshell,
      Teal: Colors.Teal,
      LightBrown: Colors.LightBrown,
      SignleSigCardPillBackColor: Colors.Turquoise,
      ForestGreenDark: Colors.ForestGreenDark,
      dropdownSeparator: Colors.Taupe,
      LightGreen: Colors.lightGreen,
      MintWhisper: Colors.MintWhisper,
      lightSkin: Colors.DarkSkin,
      // SlateGrey: Colors.SlateGrey,
      // LightKhaki: Colors.LightKhaki,
      // SmokeGreen: Colors.SmokeGreen,
      // DeepOlive: Colors.DeepOlive,
      // PaleKhaki: Colors.PaleKhaki,
      // Warmbeige: Colors.Warmbeige,
      // PearlWhite: Colors.PearlWhite,
      // PaleIvory: Colors.PaleIvory,
      DarkSage: Colors.DarkSage,
      // Smoke: Colors.Smoke,
      // deepTeal: Colors.deepTeal,
      // Champagne: Colors.Champagne,
      // Ivory: Colors.Ivory,
      ChampagneBliss: Colors.pantoneGreenLight,
      // PearlGrey: Colors.PearlGrey,
      // Taupe: Colors.Taupe,
      // Crayola: Colors.Crayola,
      signerCardPill: Colors.Purple,
      PretitleColor: Colors.RichBlackDark,
      disabledColor: Colors.disabledGrey,
      feeInfoTitleColor: Colors.White,
      feeInfoColor: Colors.White,
      greyBorder: Colors.SilverMist,
      greyBorderTransparent: Colors.SilverMistTransparent,
      placeHolderTextColor: Colors.Graphite,
      linkPreviewBackground: Colors.Graphite,
      limeText: Colors.LimeYellow,
      greenText: Colors.SeaweedGreen,
      greenTextDisabled: Colors.SlateGreen,
      overlayGreen: Colors.SeashellDark,
    },
  },
  config: {
    initialColorMode: 'light',
  },
});

export default customTheme;
