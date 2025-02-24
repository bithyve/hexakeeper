import Colors from 'src/theme/Colors';
import { extendTheme } from 'native-base';
import Fonts from 'src/constants/Fonts';

export const customTheme = extendTheme({
  fontConfig: {
    Inter: {
      100: {
        normal: Fonts.InterLight,
        italic: Fonts.InterLightItalic,
      },
      200: {
        normal: Fonts.InterRegular,
        italic: Fonts.InterItalic,
      },
      300: {
        normal: Fonts.InterMedium,
        italic: Fonts.InterMediumItalic,
      },
      400: {
        normal: Fonts.InterSemiBold,
        italic: Fonts.InterSemiBoldItalic,
      },
      500: {
        normal: Fonts.InterBold,
        italic: Fonts.InterBoldItalic,
      },
      600: {
        normal: Fonts.InterRegular,
        italic: Fonts.InterItalic,
      },
      700: {
        normal: Fonts.InterRegular,
        italic: Fonts.InterItalic,
      },
      800: {
        normal: Fonts.InterRegular,
        italic: Fonts.InterItalic,
      },
      900: {
        normal: Fonts.InterRegular,
        italic: Fonts.InterItalic,
      },
    },
  },
  fonts: {
    heading: 'Inter',
    body: 'Inter',
    mono: 'Inter',
  },
  colors: {
    light: {
      buttonText: Colors.White,
      navButtonText: Colors.DeepSpaceSparkle,
      primaryGreen: Colors.GenericViridian,
      primaryBackground: Colors.LightYellow,
      modalBackground: Colors.Warmbeige,
      primaryGreenBackground: Colors.pantoneGreen,
      pillText: Colors.MidNightBlack,
      pantoneGreenLight: Colors.pantoneGreenLight,
      CyanGreen: Colors.CyanGreen,
      // mainBackground: Colors.LightWhite,
      modalGreenBackground: Colors.pantoneGreen,
      modalGreenButton: Colors.pantoneGreen,
      modalGreenSecButtonText: Colors.White,
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
      qrBorderColor: Colors.White,
      receiveQrBackground: Colors.LightYellow,
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
      sliderStep: Colors.TropicalRainForestDark,
      greenWhiteText: Colors.pantoneGreen,
      accent: Colors.MacaroniAndCheese,
      lightAccent: Colors.MacaroniAndCheese,
      QrCode: Colors.WhiteCoffee,
      recieverAddress: Colors.DimGray,
      textInputBackground: Colors.ChampagneBliss,
      thirdBackground: Colors.Warmbeige,
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
      seashellWhiteText: Colors.Seashell,
      lightSeashell: Colors.lightSeashell,
      // Champagne: Colors.Champagne,
      BrownNeedHelp: Colors.RussetBrown,
      policySubtitle: Colors.GreenishGrey,
      balanceText: Colors.GreenishGrey,
      GreenishGrey: Colors.GreenishGrey,
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
      DullGreenDark: Colors.DullGreenDark,
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
      placeHolderTextColor: Colors.Graphite,
      linkPreviewBackground: Colors.SeaShellBeige,
      dullGreyBorder: Colors.SilverMistTranslucent,
      greyBorderTransparent: Colors.SilverMistTransparent,
      greyBorderTranslucent: Colors.SilverMistTranslucent,
      border: Colors.SilverMist,
      limeText: Colors.LimeYellow,
      greenTextDisabled: Colors.SlateGreen,
      overlayGreen: Colors.pastelGreen,
      alertRedLight: Colors.LightCrimson,
      coralRed: Colors.CoralRed,
      disabledDiamond: Colors.MediumGrey,
      secondaryGrey: Colors.MediumGrey,
      greenPillBackground: Colors.SmokeGreen,
      appStatusButtonBackground: Colors.WarmBeigeTranslucent,
      appStatusTextColor: Colors.ChampagneBliss,
      labelText: Colors.White,
      textDarkGreen: Colors.DarkGreen,
      labelColor1: Colors.LabelLight1,
      labelColor2: Colors.LabelLight2,
      labelColor3: Colors.LabelLight3,
      tagColor1: Colors.TagLight1,
      tagColor2: Colors.TagLight2,
      tagColor3: Colors.TagLight3,
      tagColor4: Colors.TagLight4,
      tagColor5: Colors.TagLight5,
      tagColor6: Colors.TagLight6,
      tagColor7: Colors.TagLight7,
      tagColor8: Colors.TagLight8,
      tagColor9: Colors.TagLight9,
      tagColor10: Colors.TagLight10,
      boxBackground: Colors.BoxGolden,
      boxSecondaryBackground: Colors.ChampagneBliss,
      borderBrown: Colors.brownColor,
      separator: Colors.separator,
      alertRed: Colors.AlertRed,
      newBadgeGreen: Colors.NewBadgeGreen,
      textGreen: Colors.pantoneGreen,
      textWhite: Colors.Seashell,
      textGreenGrey: Colors.GreenishGrey,
      seedCard: Colors.LightYellow,
      secondaryBackground: Colors.Seashell,
      errorToastBackground: Colors.ErrorToast,
      transactionDeatilInfo: Colors.GreenishGrey,
      transactionDeatilAddress: Colors.GreenishGrey,
      greenishGreyText: Colors.GreenishGrey,
      pitchBlackText: Colors.Black,
      receiptBackground: Colors.ChampagneBliss,
      receiptBorder: Colors.SilverMist,
      receiptModalUnitColor: Colors.MediumJungleGreen,
      brownBackground: Colors.brownColor,
      keyPadText: Colors.GreenishGrey,
      noteText: Colors.Graphite,
      darkBorderGreen: Colors.SeaweedGreen,
      SeaweedGreen: Colors.SeaweedGreen,
      noteTextClosed: Colors.SeaweedGreen,
      solidGreyBorder: Colors.SilverMistSolid,
      menuCardTitleColor: Colors.Graphite,
      secondarySubtitle: Colors.GraniteGray,
      dullCreamBackground: Colors.Warmbeige,
      dashedButtonBorder: Colors.SeaweedGreen,
      newDashedButtonBackground: Colors.DashedButtonBackground,
      whiteGreyBorder: Colors.SoftGray,
      whiteButtonBackground: Colors.ChampagneBliss,
      whiteButtonText: Colors.SeaweedGreen,
      whiteSecButtonText: Colors.ChampagneBliss,
      btcPillText: Colors.MidNightBlack,
      DarkGreyText: Colors.Feldgrau,
      greyBackground: Colors.lightGrey,
      whiteCircle: Colors.Warmbeige,
      darkBrownCircle: Colors.RussetBrown,
      lightBrownCircle: Colors.RussetBrownLight,
      footerBackground: Colors.SeaShellBeige,
      sliderUnfilled: Colors.PaleGrey,
      greyBackground: Colors.lightGrey,
      ctaFooterBackground: Colors.GreenishGrey,
      DashedButtonCta: Colors.DashedButtonCta,
      coalGreen: Colors.coalGreen,
      termsText: Colors.termsGrey,
      headerWhite: Colors.headerWhite,
      subPlansubtitle: Colors.coalGreen,
      graphiteTranslucentBG: Colors.GraphiteTranslucent,
      SeaweedGreenTranslucentBG: Colors.SeaweedGreenTranslucent,
      modalHeaderTitle: Colors.SeaweedGreen,
      modalSubtitleBlack: Colors.modalSubtitleBlack,
      subPlansubtitle: Colors.coalGreen,
      textColor3: Colors.coalGreen,
    },
    dark: {
      navButtonText: Colors.SecondaryWhite,
      buttonText: Colors.SecondaryWhite,
      disabledDiamond: Colors.MediumGrey,
      termsText: Colors.ChampagneBliss,
      subPlansubtitle: Colors.headerWhite,
      modalSubtitleBlack: Colors.SecondaryWhite,

      primaryGreen: Colors.GenericViridian,
      darkGrey: Colors.DarkGrey,
      primaryBackground: Colors.PrimaryBlack,
      modalBackground: Colors.ModalBlack,
      pillText: Colors.MidNightBlack,
      primaryGreenBackground: Colors.SecondaryBlack,
      pantoneGreenLight: Colors.pantoneGreenLight,
      SeaweedGreen: Colors.SeaweedGreen,
      modalHeaderTitle: Colors.SecondaryWhite,
      // mainBackground: Colors.LightWhite,
      modalGreenBackground: Colors.DullGreenDark,
      modalGreenButton: Colors.DullGreenDark,
      modalGreenSecButtonText: Colors.RichGreenDark,
      modalGreenContent: Colors.White,
      modalWhiteBackground: Colors.ModalBlack,
      modalWhiteContent: Colors.White,
      modalWhiteButton: Colors.DullGreenDark,
      modalWhiteButtonText: Colors.SecondaryWhite,
      modalGreenTitle: Colors.SecondaryWhite,
      modalAccentTitle: Colors.GoldCrayola,
      dullGreen: Colors.DullGreen,
      // modalWhiteButton: Colors.DullGreenDark,
      modalGreenLearnMore: Colors.PrimaryBlack,
      lightPurple: Colors.LightPurple,
      greenButtonBackground: Colors.DullGreenDark,
      dashedButtonBackground: Colors.DullGreenDark,
      dashedButtonContent: Colors.SecondaryWhite,
      choosePlanHome: Colors.White,
      choosePlanCard: Colors.SecondaryBlack,
      choosePlanInactiveText: Colors.SecondaryWhite,
      choosePlanIconBackSelected: Colors.DeepOlive,
      choosePlanIconBack: Colors.GraphiteLight,
      hexagonIconBackColor: Colors.deepTeal,
      qrBorderColor: Colors.White,
      receiveQrBackground: Colors.White,
      coffeeBackground: Colors.CoffeeDark,
      yellowButtonBackground: Colors.PrimaryBlack,
      yellowButtonTextColor: Colors.White,
      btcLabelBack: Colors.PeriwinkleDark,
      white: Colors.SecondaryBlack,
      primaryText: Colors.SecondaryWhite,
      secondaryText: Colors.SecondaryWhite,
      learnMoreBorder: Colors.SecondaryWhite,
      textBlack: Colors.SecondaryWhite,
      greenText2: Colors.TropicalRainForestDark,
      sliderStep: Colors.TropicalRainForestDark,
      greenWhiteText: Colors.White,
      accent: Colors.MacaroniAndCheeseDark,
      lightAccent: Colors.GoldCrayola,
      QrCode: Colors.WhiteCoffee,
      recieverAddress: Colors.DimGray,
      textInputBackground: Colors.SecondaryBackgroundDark,
      secondaryBackground: Colors.SecondaryBackgroundDark,
      GreyText: Colors.SecondaryWhite,
      dateText: Colors.SecondaryWhite,
      Border: Colors.SecondaryWhite,
      textColor: Colors.LightGray,
      textColor2: Colors.DeepSpaceSparkleDark,
      headerText: Colors.SecondaryWhite,
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
      darkBorderGreen: Colors.darkBorderGreen,
      fadedGray: Colors.SecondaryWhite,
      fadedblue: Colors.FadeBlue,
      dustySageGreen: Colors.DustySageGreen,
      forestGreen: Colors.ForestGreen,
      pantoneGreen: Colors.DullGreenDark,
      seashellWhite: Colors.SeashellDark,
      seashellWhiteText: Colors.SecondaryWhite,
      lightSeashell: Colors.lightSeashell,
      BrownNeedHelp: Colors.RussetBrown,
      policySubtitle: Colors.SecondaryWhite,
      balanceText: Colors.White,
      GreenishGrey: Colors.GreenishGrey,
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
      DullGreenDark: Colors.DullGreenDark,
      dropdownSeparator: Colors.Taupe,
      LightGreen: Colors.lightGreen,
      MintWhisper: Colors.MintWhisper,
      lightSkin: Colors.DarkSkin,
      SlateGrey: Colors.GraphiteLight,
      // LightKhaki: Colors.LightKhaki,
      // SmokeGreen: Colors.SmokeGreen,
      // DeepOlive: Colors.DeepOlive,
      // PaleKhaki: Colors.PaleKhaki,
      Warmbeige: Colors.Warmbeige,
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
      greyBorderTranslucent: Colors.SilverMistTranslucent,
      border: Colors.SilverMistTransparent,
      placeHolderTextColor: Colors.Graphite,
      dullGreyBorder: Colors.separator,
      placeHolderTextColor: Colors.GraphiteLight,
      linkPreviewBackground: Colors.ModalBlack,
      limeText: Colors.LimeYellow,
      greenText: Colors.SecondaryWhite,
      greenTextDisabled: Colors.SlateGreen,
      overlayGreen: Colors.SeashellDark,
      alertRedLight: Colors.LightCrimson,
      coralRed: Colors.CoralRed,
      secondaryGrey: Colors.separator,
      greenPillBackground: Colors.SmokeGreen,
      appStatusButtonBackground: Colors.WarmBeigeTranslucent,
      appStatusTextColor: Colors.ChampagneBliss,
      labelText: Colors.White,
      textDarkGreen: Colors.White,
      labelColor1: Colors.LabelDark1,
      labelColor2: Colors.LabelDark2,
      labelColor3: Colors.LabelDark3,
      tagColor1: Colors.TagDark1,
      tagColor2: Colors.TagDark2,
      tagColor3: Colors.TagDark3,
      tagColor4: Colors.TagDark4,
      tagColor5: Colors.TagDark5,
      tagColor6: Colors.TagDark6,
      tagColor7: Colors.TagDark7,
      tagColor8: Colors.TagDark8,
      tagColor9: Colors.TagDark9,
      tagColor10: Colors.TagDark10,
      boxBackground: Colors.SecondaryBackgroundDark,
      boxSecondaryBackground: Colors.SecondaryBlack,
      borderBrown: Colors.SilverMistTransparent,
      separator: Colors.separator,
      alertRed: Colors.AlertRedDark,
      newBadgeGreen: Colors.NewBadgeGreenDark,
      textGreen: Colors.SecondaryWhite,
      textWhite: Colors.SecondaryWhite,
      textGreenGrey: Colors.SecondaryWhite,
      seedCard: Colors.SeashellDark,
      thirdBackground: Colors.SecondaryBlack,
      errorToastBackground: Colors.ErrorToastDark,
      transactionDeatilInfo: Colors.GraphiteLight,
      transactionDeatilAddress: Colors.SecondaryWhite,
      greenishGreyText: Colors.GraphiteLight,
      pitchBlackText: Colors.White,
      receiptBackground: Colors.SecondaryBackgroundDark,
      receiptBorder: Colors.separator,
      modalUnitColor: Colors.SoftGray,
      brownBackground: Colors.DullBrown,
      keyPadText: Colors.SoftGray,
      noteText: Colors.GraphiteLight,
      noteTextClosed: Colors.White,
      solidGreyBorder: Colors.separator,
      menuCardTitleColor: Colors.GraphiteLight,
      secondarySubtitle: Colors.GraphiteLight,
      dullCreamBackground: Colors.SoftGray,
      dashedButtonBorder: Colors.separator,
      newDashedButtonBackground: Colors.DashedButtonBackgroundDark,
      whiteGreyBorder: Colors.SoftGray,
      whiteButtonBackground: Colors.SoftGray,
      whiteButtonText: Colors.DullGreenDark,
      whiteSecButtonText: Colors.SoftGray,
      btcPillText: Colors.White,
      DarkGreyText: Colors.RichBlackDark,
      greyBackground: Colors.darkGrey,
      whiteCircle: Colors.SecondaryWhite,
      darkBrownCircle: Colors.RussetBrown,
      lightBrownCircle: Colors.RussetBrownLight,
      footerBackground: Colors.PrimaryBlack,
      sliderUnfilled: Colors.CharcoalGreen,
      greyBackground: Colors.darkGrey,
      ctaFooterBackground: Colors.SecondaryBlack,
      DashedButtonCta: Colors.DashedButtonCtaDark,
      CyanGreen: Colors.CyanGreen,
      coalGreen: Colors.coalGreen,
      headerWhite: Colors.headerWhite,
      graphiteTranslucentBG: Colors.GraphiteTranslucent,
      SeaweedGreenTranslucentBG: Colors.SeaweedGreenTranslucent,
      textColor3: Colors.SecondaryWhite,
    },
  },
  config: {
    initialColorMode: 'light',
  },
});

export default customTheme;
