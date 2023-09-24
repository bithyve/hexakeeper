import { StyleSheet } from 'react-native';
import { Box, useColorMode } from 'native-base';
import React, { useContext, useEffect } from 'react';

import HeaderTitle from 'src/components/HeaderTitle';
import { RNCamera } from 'react-native-camera';
import ScreenWrapper from 'src/components/ScreenWrapper';
import Note from 'src/components/Note/Note';
import { hp, wp } from 'src/constants/responsive';
import { LocalizationContext } from 'src/context/Localization/LocContext';
import { RealmSchema } from 'src/storage/realm/enum';
import { KeeperApp } from 'src/models/interfaces/KeeperApp';
import { getJSONFromRealmObject } from 'src/storage/realm/utils';
import { io } from 'src/services/channel';
import {
  BITBOX_HEALTHCHECK,
  BITBOX_SETUP,
  CREATE_CHANNEL,
  LEDGER_HEALTHCHECK,
  LEDGER_SETUP,
  TREZOR_HEALTHCHECK,
  TREZOR_SETUP,
} from 'src/services/channel/constants';
import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import { getBitbox02Details } from 'src/hardware/bitbox';
import usePlan from 'src/hooks/usePlan';
import { generateSignerFromMetaData } from 'src/hardware';
import { SignerStorage, SignerType } from 'src/core/wallets/enums';
import { useDispatch } from 'react-redux';
import { addSigningDevice } from 'src/store/sagaActions/vaults';
import useToastMessage from 'src/hooks/useToastMessage';
import TickIcon from 'src/assets/images/icon_tick.svg';
import ToastErrorIcon from 'src/assets/images/toast_error.svg';
import HWError from 'src/hardware/HWErrorState';
import { captureError } from 'src/services/sentry';
import config from 'src/core/config';
import { getTrezorDetails } from 'src/hardware/trezor';
import { getLedgerDetailsFromChannel } from 'src/hardware/ledger';
import { healthCheckSigner } from 'src/store/sagaActions/bhr';
import { checkSigningDevice } from '../Vault/AddSigningDevice';
import MockWrapper from 'src/screens/Vault/MockWrapper';
import { useQuery } from '@realm/react';
import { InteracationMode } from '../Vault/HardwareModalMap';
import { setSigningDevices } from 'src/store/reducers/bhr';

function ConnectChannel() {
  const { colorMode } = useColorMode();
  const route = useRoute();
  const {
    title = '',
    subtitle = '',
    type: signerType,
    signer,
    mode,
    isMultisig,
  } = route.params as any;
  const channel = io(config.CHANNEL_URL);
  let channelCreated = false;

  const { translations } = useContext(LocalizationContext);
  const { common } = translations;

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { showToast } = useToastMessage();

  let id;
  if (mode === InteracationMode.RECOVERY) {
    const randomId = Math.random();
    id = randomId;
  } else {
    const { publicId }: KeeperApp = useQuery(RealmSchema.KeeperApp).map(getJSONFromRealmObject)[0];
    id = publicId;
  }

  const onBarCodeRead = ({ data }) => {
    if (!channelCreated) {
      channel.emit(CREATE_CHANNEL, { room: `${id}${data}`, network: config.NETWORK_TYPE });
      channelCreated = true;
    }
  };

  useEffect(() => {
    channel.on(BITBOX_SETUP, async (data) => {
      try {
        const { xpub, derivationPath, xfp, xpubDetails } = getBitbox02Details(data, isMultisig);
        const bitbox02 = generateSignerFromMetaData({
          xpub,
          derivationPath,
          xfp,
          isMultisig,
          signerType: SignerType.BITBOX02,
          storageType: SignerStorage.COLD,
          xpubDetails,
        });

        if (mode === InteracationMode.RECOVERY) {
          dispatch(setSigningDevices(bitbox02));
          navigation.dispatch(
            CommonActions.navigate('LoginStack', { screen: 'VaultRecoveryAddSigner' })
          );
        } else {
          dispatch(addSigningDevice(bitbox02));
          navigation.dispatch(CommonActions.navigate('AddSigningDevice'));
        }

        showToast(`${bitbox02.signerName} added successfully`, <TickIcon />);
        const exsists = await checkSigningDevice(bitbox02.signerId);
        if (exsists)
          showToast('Warning: Vault with this signer already exisits', <ToastErrorIcon />);
      } catch (error) {
        if (error instanceof HWError) {
          showToast(error.message, <ToastErrorIcon />, 3000);
        } else if (error.toString() === 'Error') {
          // ignore if user cancels NFC interaction
        } else captureError(error);
      }
    });
    channel.on(TREZOR_SETUP, async (data) => {
      try {
        const { xpub, derivationPath, xfp, xpubDetails } = getTrezorDetails(data, isMultisig);
        const trezor = generateSignerFromMetaData({
          xpub,
          derivationPath,
          xfp,
          isMultisig,
          signerType: SignerType.TREZOR,
          storageType: SignerStorage.COLD,
          xpubDetails,
        });
        if (mode === InteracationMode.RECOVERY) {
          dispatch(setSigningDevices(trezor));
          navigation.dispatch(
            CommonActions.navigate('LoginStack', { screen: 'VaultRecoveryAddSigner' })
          );
        } else {
          dispatch(addSigningDevice(trezor));
          navigation.dispatch(CommonActions.navigate('AddSigningDevice'));
        }
        showToast(`${trezor.signerName} added successfully`, <TickIcon />);
        const exsists = await checkSigningDevice(trezor.signerId);
        if (exsists)
          showToast('Warning: Vault with this signer already exisits', <ToastErrorIcon />);
      } catch (error) {
        if (error instanceof HWError) {
          showToast(error.message, <ToastErrorIcon />, 3000);
        } else if (error.toString() === 'Error') {
          // ignore if user cancels NFC interaction
        } else captureError(error);
      }
    });
    channel.on(LEDGER_SETUP, async (data) => {
      try {
        const { xpub, derivationPath, xfp, xpubDetails } = getLedgerDetailsFromChannel(
          data,
          isMultisig
        );
        const ledger = generateSignerFromMetaData({
          xpub,
          derivationPath,
          xfp,
          isMultisig,
          signerType: SignerType.LEDGER,
          storageType: SignerStorage.COLD,
          xpubDetails,
        });
        if (mode === InteracationMode.RECOVERY) {
          dispatch(setSigningDevices(ledger));
          navigation.dispatch(
            CommonActions.navigate('LoginStack', { screen: 'VaultRecoveryAddSigner' })
          );
        } else {
          dispatch(addSigningDevice(ledger));
          navigation.dispatch(CommonActions.navigate('AddSigningDevice'));
        }

        showToast(`${ledger.signerName} added successfully`, <TickIcon />);
        const exsists = await checkSigningDevice(ledger.signerId);
        if (exsists)
          showToast('Warning: Vault with this signer already exisits', <ToastErrorIcon />);
      } catch (error) {
        if (error instanceof HWError) {
          showToast(error.message, <ToastErrorIcon />, 3000);
        } else if (error.toString() === 'Error') {
          // ignore if user cancels NFC interaction
        } else captureError(error);
      }
    });

    channel.on(LEDGER_HEALTHCHECK, async (data) => {
      try {
        const { xpub } = getLedgerDetailsFromChannel(data, isMultisig);
        if (signer.xpub === xpub) {
          dispatch(healthCheckSigner([signer]));
          navigation.dispatch(CommonActions.goBack());
          showToast(`${signer.signerName} verified successfully`, <TickIcon />);
        } else {
          navigation.dispatch(CommonActions.goBack());
          showToast(`${signer.signerName} verification failed`, <ToastErrorIcon />);
        }
      } catch (error) {
        if (error instanceof HWError) {
          showToast(error.message, <ToastErrorIcon />, 3000);
        } else if (error.toString() === 'Error') {
          // ignore if user cancels NFC interaction
        } else captureError(error);
      }
    });
    channel.on(TREZOR_HEALTHCHECK, async (data) => {
      try {
        const { xpub } = getTrezorDetails(data, isMultisig);
        if (signer.xpub === xpub) {
          dispatch(healthCheckSigner([signer]));
          navigation.dispatch(CommonActions.goBack());
          showToast(`${signer.signerName} verified successfully`, <TickIcon />);
        } else {
          navigation.dispatch(CommonActions.goBack());
          showToast(`${signer.signerName} verification failed`, <ToastErrorIcon />);
        }
      } catch (error) {
        if (error instanceof HWError) {
          showToast(error.message, <ToastErrorIcon />, 3000);
        } else if (error.toString() === 'Error') {
          // ignore if user cancels NFC interaction
        } else captureError(error);
      }
    });
    channel.on(BITBOX_HEALTHCHECK, async (data) => {
      try {
        const { xpub } = getTrezorDetails(data, isMultisig);
        if (signer.xpub === xpub) {
          dispatch(healthCheckSigner([signer]));
          navigation.dispatch(CommonActions.goBack());
          showToast(`${signer.signerName} verified successfully`, <TickIcon />);
        } else {
          navigation.dispatch(CommonActions.goBack());
          showToast(`${signer.signerName} verification failed`, <ToastErrorIcon />);
        }
      } catch (error) {
        if (error instanceof HWError) {
          showToast(error.message, <ToastErrorIcon />, 3000);
        } else if (error.toString() === 'Error') {
          // ignore if user cancels NFC interaction
        } else captureError(error);
      }
    });

    return () => {
      channel.disconnect();
    };
  }, [channel]);

  return (
    <ScreenWrapper backgroundcolor={`${colorMode}.primaryBackground`}>
      <MockWrapper signerType={signerType}>
        <Box flex={1}>
          <HeaderTitle title={title} subtitle={subtitle} paddingLeft={wp(25)} />
          <Box style={styles.qrcontainer}>
            <RNCamera
              autoFocus="on"
              style={styles.cameraView}
              captureAudio={false}
              onBarCodeRead={onBarCodeRead}
              useNativeZoom
            />
          </Box>
          <Box style={styles.noteWrapper}>
            <Note
              title={common.note}
              subtitle="Make sure that the QR is well aligned, focused and visible as a whole"
              subtitleColor="GreyText"
            />
          </Box>
        </Box>
      </MockWrapper>
    </ScreenWrapper>
  );
}

export default ConnectChannel;

const styles = StyleSheet.create({
  qrcontainer: {
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 25,
    alignItems: 'center',
  },
  cameraView: {
    height: hp(280),
    width: wp(375),
  },
  noteWrapper: {
    width: '100%',
    bottom: 0,
    position: 'absolute',
    padding: 20,
  },
});
