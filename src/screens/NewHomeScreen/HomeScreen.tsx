import { Box, HStack, Pressable, Text, View } from 'native-base';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Image, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react';
import { hp, wp } from 'src/common/data/responsiveness/responsive';

import Arrow from 'src/assets/images/svgs/arrow.svg';
import BTC from 'src/assets/images/svgs/btc.svg';
import Basic from 'src/assets/images/svgs/basic.svg';
import Hidden from 'src/assets/images/svgs/hidden.svg';
import Inheritance from 'src/assets/images/svgs/inheritance.svg';
import KeeperModal from 'src/components/KeeperModal';
import LinearGradient from 'react-native-linear-gradient';
import LinkedWallet from 'src/assets/images/svgs/linked_wallet.svg';
import { LocalizationContext } from 'src/common/content/LocContext';
import { RFValue } from 'react-native-responsive-fontsize';
import { RealmSchema } from 'src/storage/realm/enum';
import { RealmWrapperContext } from 'src/storage/realm/RealmProvider';
import { ScaledSheet } from 'react-native-size-matters';
import ScannerIcon from 'src/assets/images/svgs/scan.svg';
import SettingIcon from 'src/assets/images/svgs/settings.svg';
import TapsignerIcon from 'src/assets/images/tapsigner.svg';
import UaiDisplay from './UaiDisplay';
import VaultImage from 'src/assets/images/Vault.png';
import VaultSetupIcon from 'src/assets/icons/vault_setup.svg';
import { Wallet } from 'src/core/wallets/interfaces/wallet';
import { WalletType } from 'src/core/wallets/enums';
import { addToUaiStack } from 'src/store/sagaActions/uai';
import { getJSONFromRealmObject } from 'src/storage/realm/utils';
import { uaiType } from 'src/common/data/models/interfaces/Uai';
import { useAppSelector } from 'src/store/hooks';
import { useDispatch } from 'react-redux';
import { useUaiStack } from 'src/hooks/useUaiStack';
import { Vault } from 'src/core/wallets/interfaces/vault';

const InheritanceComponent = () => {
  const navigation = useNavigation();
  return (
    <Box alignItems={'center'} marginTop={hp(19.96)}>
      <LinearGradient
        colors={['#00836A', '#073E39']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.bottomCard}
      >
        <Box marginLeft={wp(9.75)} flexDirection={'row'} alignItems={'center'}>
          <Inheritance />
          <Box marginLeft={wp(18)}>
            <Text
              color={'light.white1'}
              letterSpacing={0.8}
              fontSize={RFValue(16)}
              fontWeight={200}
            >
              Inheritance
            </Text>
            <Text
              color={'light.white1'}
              letterSpacing={0.6}
              fontSize={RFValue(12)}
              fontWeight={100}
              marginTop={-1}
            >
              Upgrade to secure your Vault
            </Text>
          </Box>
        </Box>
        <NextIcon pressHandler={() => navigation.navigate('SetupInheritance')} />
      </LinearGradient>
    </Box>
  );
};

const LinkedWallets = (props) => {
  const navigation = useNavigation();
  const { useQuery } = useContext(RealmWrapperContext);
  const wallets: Wallet[] = useQuery(RealmSchema.Wallet)
    .map(getJSONFromRealmObject)
    .filter((wallet) => wallet.type !== WalletType.READ_ONLY);
  const netBalance = useAppSelector((state) => state.wallet.netBalance);

  return (
    <Pressable
      alignItems={'center'}
      marginTop={hp(8)}
      onPress={() => navigation.dispatch(CommonActions.navigate('WalletDetails'))}
    >
      <LinearGradient
        colors={['#00836A', '#073E39']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.bottomCard}
      >
        <Box marginLeft={wp(9.75)} flexDirection={'row'} alignItems={'center'}>
          <LinkedWallet />
          <Box marginLeft={wp(18)} flexDirection={'row'} alignItems={'center'}>
            <Text
              color={'light.white1'}
              letterSpacing={1.76}
              fontSize={RFValue(22)}
              fontWeight={200}
            >
              {wallets?.length}
            </Text>
            <Text
              color={'light.white1'}
              letterSpacing={0.7}
              fontSize={RFValue(14)}
              fontWeight={200}
              marginLeft={'1'}
            >
              Linked Wallet
            </Text>
          </Box>
        </Box>
        <Pressable onPress={() => props.onAmountPress()}>
          {props.showHideAmounts ? (
            <Text
              color={'light.white1'}
              letterSpacing={0.6}
              fontSize={RFValue(30)}
              fontWeight={200}
            >
              <Box padding={1} marginBottom={0.5}>
                <BTC />
              </Box>
              {netBalance}
            </Text>
          ) : (
            <Box flexDirection={'row'} alignItems={'center'}>
              <BTC />
              &nbsp;
              <Hidden />
            </Box>
          )}
        </Pressable>
      </LinearGradient>
    </Pressable>
  );
};

const VaultSetupContent = () => {
  return (
    <View>
      <Box alignSelf={'center'}>
        <VaultSetupIcon />
      </Box>
      <Text color={'white'} fontSize={13} fontFamily={'body'} fontWeight={'200'} p={2}>
        {
          'For the Basic tier, you need to select one Signer to activate your Vault. This can be upgraded to 3 Signers and 5 Signers when on Expert or Elite tier respectively'
        }
      </Text>
      {/* <Text color={'white'} fontSize={13} fontFamily={'body'} fontWeight={'200'} p={2}>
        {'To get started, you need to add a Signer (hardware wallet or a signer device) to Keeper'}
      </Text> */}
    </View>
  );
};

const VaultStatus = (props) => {
  const [visible, setModalVisible] = useState(false);
  const { translations } = useContext(LocalizationContext);
  const navigation = useNavigation();
  const vaultTranslations = translations['vault'];

  const { useQuery } = useContext(RealmWrapperContext);
  const vault: Vault = useQuery(RealmSchema.Vault);
  const Signers = vault?.signers || [];

  const open = () => {
    if (Signers.length) {
      navigation.dispatch(CommonActions.navigate({ name: 'VaultDetails', params: {} }));
    } else {
      setModalVisible(true);
    }
  };
  const close = () => setModalVisible(false);

  const navigateToHardwareSetup = () => {
    close();
    navigation.dispatch(CommonActions.navigate({ name: 'HardwareWallet', params: {} }));
  };

  const Vault = useQuery(RealmSchema.Wallet)
    .map(getJSONFromRealmObject)
    .filter((wallets) => wallets.type === WalletType.READ_ONLY)[0];

  const { confirmed = 0, unconfirmed = 0 } = Vault?.specs?.balances || {};
  const vaultBalance = confirmed + unconfirmed;
  return (
    <Box marginTop={-hp(97.44)} alignItems={'center'}>
      <TouchableOpacity onPress={open} activeOpacity={0.5}>
        <ImageBackground resizeMode="contain" style={styles.vault} source={VaultImage}>
          <Box
            backgroundColor={'light.TorLable'}
            height={hp(13.804)}
            width={wp(75)}
            borderRadius={hp(14)}
            justifyContent={'center'}
            alignItems={'center'}
            marginTop={hp(30)}
          >
            <Text
              color={'light.lightBlack'}
              letterSpacing={0.9}
              fontSize={RFValue(9)}
              fontWeight={300}
            >
              TOR ENABLED
            </Text>
          </Box>
          <Box marginTop={hp(64.5)} alignItems={'center'}>
            <Text
              color={'light.white1'}
              letterSpacing={0.8}
              fontSize={RFValue(16)}
              fontWeight={300}
            >
              Your Vault
            </Text>

            <Text
              color={'light.white1'}
              letterSpacing={0.9}
              fontSize={RFValue(12)}
              fontWeight={100}
              opacity={0.8}
              paddingBottom={1}
            >
              {!Signers.length
                ? 'Activate Now '
                : `Secured by ${Signers.length} signer${Signers.length === 1 ? '' : 's'}`}
            </Text>
            {!Signers.length ? null : <TapsignerIcon />}
          </Box>
          {!Signers.length ? (
            <Box marginTop={hp(31.5)}>
              <Image
                source={require('src/assets/images/illustration.png')}
                style={{ width: wp(123.95), height: hp(122.3) }}
                resizeMode="contain"
              />
            </Box>
          ) : null}
          {Signers.length ? (
            <HStack alignItems={'center'} marginTop={'10%'}>
              <BTC style={{ height: '20%' }} />
              <Pressable onPress={() => props.onAmountPress()}>
                {props.showHideAmounts ? (
                  <Text
                    p={1}
                    color={'light.white1'}
                    letterSpacing={0.8}
                    fontSize={RFValue(34)}
                    fontWeight={200}
                  >
                    {vaultBalance}
                  </Text>
                ) : (
                  <Hidden />
                )}
              </Pressable>
            </HStack>
          ) : null}
        </ImageBackground>
      </TouchableOpacity>
      <KeeperModal
        visible={visible}
        close={close}
        title={vaultTranslations.SetupyourVault}
        subTitle={vaultTranslations.VaultDesc}
        modalBackground={['#00836A', '#073E39']}
        buttonBackground={['#FFFFFF', '#80A8A1']}
        buttonText={vaultTranslations.Addsigner}
        buttonTextColor={'#073E39'}
        buttonCallback={navigateToHardwareSetup}
        textColor={'#FFF'}
        Content={VaultSetupContent}
      />
    </Box>
  );
};

const VaultInfo = () => {
  const navigation = useNavigation();
  const { uaiStack } = useUaiStack();
  const dispatch = useDispatch();
  const addtoDb = () => {
    dispatch(
      addToUaiStack('Add Signer to Secure your Vault', false, uaiType.SECURE_VAULT, 70, null)
    );
    dispatch(
      addToUaiStack(
        'A new version of the app is available',
        true,
        uaiType.RELEASE_MESSAGE,
        50,
        'Lorem ipsum dolor sit amet, consectetur eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      )
    );
    dispatch(
      addToUaiStack(
        'Your Keeper request was rejected',
        true,
        uaiType.ALERT,
        40,
        'Lorem ipsum dolor sit amet, consectetur eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      )
    );
    dispatch(
      addToUaiStack(
        'Wallet restore was attempted on another device',
        true,
        uaiType.ALERT,
        40,
        'Lorem ipsum dolor sit amet, consectetur eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      )
    );
  };
  return (
    <LinearGradient
      colors={['#00836A', '#073E39']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={styles.linearGradient}
    >
      <Box paddingX={10} alignItems={'center'}>
        <Box
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          width={'100%'}
        >
          <Pressable onPress={addtoDb}>
            <ScannerIcon />
          </Pressable>
          <Pressable onPress={() => navigation.navigate('ChoosePlan')}>
            <Basic />
          </Pressable>
          <Pressable onPress={() => navigation.dispatch(CommonActions.navigate('AppSettings'))}>
            <SettingIcon />
          </Pressable>
        </Box>
        <UaiDisplay uaiStack={uaiStack} />
      </Box>
    </LinearGradient>
  );
};

export const NextIcon = ({ pressHandler }) => {
  const navigation = useNavigation();
  return (
    <Pressable onPress={pressHandler}>
      <Box
        backgroundColor={'light.yellow1'}
        height={hp(37.352)}
        width={hp(37.352)}
        borderRadius={20}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Arrow />
      </Box>
    </Pressable>
  );
};

const HomeScreen = () => {
  const [showHideAmounts, setShowHideAmounts] = useState(false);

  return (
    <Box flex={1} backgroundColor={'light.lightYellow'}>
      <VaultInfo />
      <VaultStatus
        onAmountPress={() => {
          setShowHideAmounts(!showHideAmounts);
        }}
        showHideAmounts={showHideAmounts}
      />
      <InheritanceComponent />
      <LinkedWallets
        onAmountPress={() => {
          setShowHideAmounts(!showHideAmounts);
        }}
        showHideAmounts={showHideAmounts}
      />
    </Box>
  );
};

const styles = ScaledSheet.create({
  linearGradient: {
    justifyContent: 'space-between',
    paddingTop: hp(57),
    height: hp(325),
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  vault: {
    width: wp(271.28),
    height: hp(346.04),
    alignItems: 'center',
  },
  bottomCard: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: hp(100),
    width: wp(335),
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: wp(10),
  },
  dummy: {
    height: 200,
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#092C27',
    opacity: 0.15,
  },
});

export default HomeScreen;
