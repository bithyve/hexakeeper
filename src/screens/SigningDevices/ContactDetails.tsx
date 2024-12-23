import { Box, useColorMode } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { Platform, StyleSheet, Vibration } from 'react-native';
import KeeperHeader from 'src/components/KeeperHeader';
import ScreenWrapper from 'src/components/ScreenWrapper';
import { hp, wp } from 'src/constants/responsive';
import QRCommsLight from 'src/assets/images/qr_comms.svg';
import NFCLight from 'src/assets/images/nfc-no-bg-light.svg';
import ShareContactLight from 'src/assets/images/share-contact-light.svg';
import ToastErrorIcon from 'src/assets/images/toast_error.svg';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { LocalizationContext } from 'src/context/Localization/LocContext';
import MenuOption from 'src/components/MenuOption';
import { Signer } from 'src/services/wallets/interfaces/vault';
import NFC from 'src/services/nfc';
import { NfcTech } from 'react-native-nfc-manager';
import CollaborativeModals from './components/CollaborativeModals';
import { getKeyUID } from 'src/utils/utilities';
import useSignerMap from 'src/hooks/useSignerMap';
import { XpubTypes } from 'src/services/wallets/enums';
import idx from 'idx';
import { getKeyExpression } from 'src/utils/service-utilities/utils';
import { captureError } from 'src/services/sentry';
import useToastMessage from 'src/hooks/useToastMessage';
import { HCESession, HCESessionContext } from 'react-native-hce';
import NfcPrompt from 'src/components/NfcPromptAndroid';
import { exportFile } from 'src/services/fs';

function ContactDetails({ route }) {
  const { signerData }: { signerData: Signer } = route.params;
  const { colorMode } = useColorMode();
  const { showToast } = useToastMessage();
  const navigation = useNavigation();
  const { signerMap } = useSignerMap();
  const { translations } = useContext(LocalizationContext);
  const { vault: vaultText } = translations;
  const [nfcModal, setNfcModal] = React.useState(false);
  const [details, setDetails] = useState(null);
  const signer = signerMap[getKeyUID(signerData)];
  const isAndroid = Platform.OS === 'android';
  const isIos = Platform.OS === 'ios';
  const useNdef = isAndroid && !isIos;
  const [visible, setVisible] = useState(false);
  const { session } = useContext(HCESessionContext);

  const shareWithFile = async () => {
    const shareFileName = `cosigner-${signer?.masterFingerprint}.txt`;
    try {
      await exportFile(
        details,
        shareFileName,
        (error) => showToast(error.message, <ToastErrorIcon />),
        'utf8',
        false
      );
    } catch (err) {
      console.log(err);
      captureError(err);
    }
  };

  const onNFCTap = async () => {
    try {
      if (isIos || useNdef) {
        if (!isIos) {
          setVisible(true);
        }
        Vibration.vibrate([700, 50, 100, 50], true);
        const enc = NFC.encodeTextRecord(details);
        await NFC.send([NfcTech.Ndef], enc);
        Vibration.cancel();
      } else {
        setVisible(true);
        await NFC.startTagSession({ session, content: details });
        Vibration.vibrate([700, 50, 100, 50], true);
      }
    } catch (err) {
      Vibration.cancel();
      if (err.toString() === 'Error: Not even registered') {
        console.log('NFC interaction cancelled.');
        return;
      }
      captureError(err);
    }
  };

  const fetchKeyExpression = (type: XpubTypes) => {
    try {
      if (signer.masterFingerprint && signer.signerXpubs[type] && signer.signerXpubs[type]?.[0]) {
        const keyDescriptor = getKeyExpression(
          signer.masterFingerprint,
          idx(signer, (_) => _.signerXpubs[type][0].derivationPath.replaceAll('h', "'")),
          idx(signer, (_) => _.signerXpubs[type][0].xpub),
          false
        );
        return keyDescriptor;
      } else {
        throw new Error(`Missing key details for ${type} type.`);
      }
    } catch (error) {
      throw new Error(`Missing key details for ${type} type.`);
    }
  };

  useEffect(() => {
    if (!details) {
      setTimeout(() => {
        try {
          const keyDescriptor = fetchKeyExpression(XpubTypes.P2WSH);
          setDetails(keyDescriptor);
        } catch (error) {
          captureError(error);
          try {
            const keyDescriptor = fetchKeyExpression(XpubTypes.P2WPKH);
            setDetails(keyDescriptor);
          } catch (error) {
            showToast(
              "We're sorry, but we have trouble retrieving the key information",
              <ToastErrorIcon />
            );
          }
        }
      }, 200);
    }
  }, []);

  const cleanUp = () => {
    setVisible(false);
    Vibration.cancel();
    if (isAndroid && !useNdef) {
      NFC.stopTagSession(session);
    }
  };
  useEffect(() => {
    const unsubDisconnect = session.on(HCESession.Events.HCE_STATE_DISCONNECTED, () => {
      cleanUp();
    });
    const unsubRead = session.on(HCESession.Events.HCE_STATE_READ, () => {});
    return () => {
      cleanUp();
      unsubRead();
      unsubDisconnect();
    };
  }, [session]);

  const shareOptions = [
    {
      icon: <QRCommsLight />,
      title: vaultText.shareQR,
      callback: () => {
        navigation.dispatch(
          CommonActions.navigate({
            name: 'ShareQR',
            params: { details },
          })
        );
      },
    },
    {
      icon: <NFCLight />,
      title: vaultText.nfcOnTap,
      callback: onNFCTap,
    },
    {
      icon: <ShareContactLight />,
      title: vaultText.shareContactUsingFile,
      callback: shareWithFile,
    },
  ];

  return (
    <ScreenWrapper backgroundcolor={`${colorMode}.primaryBackground`}>
      <KeeperHeader
        title={`Contact Details`}
        subtitle={'Quickly exchange contact details with ease'}
      />
      <Box style={styles.container}>
        <Box style={styles.contentContainer}>
          {shareOptions.map((option, index) => (
            <MenuOption
              key={index}
              Icon={option.icon}
              title={option.title}
              showArrow={false}
              callback={option.callback}
            />
          ))}
        </Box>
        <CollaborativeModals nfcModal={nfcModal} setNfcModal={setNfcModal} />
        <NfcPrompt visible={visible} close={cleanUp} ctaText="Done" />
      </Box>
    </ScreenWrapper>
  );
}

export default ContactDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: hp(30),
    paddingHorizontal: wp(10),
    justifyContent: 'space-between',
  },

  contentContainer: {
    gap: hp(7),
  },
});
