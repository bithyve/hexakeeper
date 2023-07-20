/* eslint-disable react/no-unstable-nested-components */
import { Linking, Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WalletIcon from 'src/assets/images/walletTab.svg';
import WalletActiveIcon from 'src/assets/images/walleTabFilled.svg';
import VaultIcon from 'src/assets/images/vaultTab.svg';
import VaultActiveIcon from 'src/assets/images/white_icon_vault.svg';
import { hp } from 'src/common/data/responsiveness/responsive';
import { urlParamsToObj } from 'src/core/utils';
import { WalletType } from 'src/core/wallets/enums';
import useToastMessage from 'src/hooks/useToastMessage';
import { useColorMode } from 'native-base';
import VaultScreen from './VaultScreen';
import WalletsScreen from './WalletsScreen';

function TabButton({
  label,
  Icon,
  IconActive,
  active,
  onPress,
  backgroundColorActive,
  backgroundColor,
  textColorActive,
  textColor,
}) {
  const { colorMode } = useColorMode();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        getStyles(colorMode).container,
        { backgroundColor: active ? backgroundColorActive : backgroundColor },
      ]}
    >
      {active ? <IconActive /> : <Icon />}
      <Text
        style={[
          getStyles(colorMode).label,
          {
            color: active ? textColorActive : textColor,
            fontWeight: active ? '600' : '300',
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const Tab = createBottomTabNavigator();

function NewHomeScreen({ navigation }) {
  const { colorMode } = useColorMode();
  const { showToast } = useToastMessage();
  useEffect(() => {
    Linking.addEventListener('url', handleDeepLinkEvent);
    handleDeepLinking();
    return () => {
      Linking.removeAllListeners('url');
    };
  }, []);

  function handleDeepLinkEvent({ url }) {
    if (url) {
      if (url.includes('backup')) {
        const splits = url.split('backup/');
        const decoded = Buffer.from(splits[1], 'base64').toString();
        const params = urlParamsToObj(decoded);
        if (params.seed) {
          navigation.navigate('EnterWalletDetail', {
            seed: params.seed,
            name: params.name,
            path: params.path,
            appId: params.appId,
            description: `Imported from ${params.name}`,
            type: WalletType.IMPORTED,
          });
        } else {
          showToast('Invalid deeplink');
        }
      }
    }
  }
  async function handleDeepLinking() {
    try {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        if (initialUrl.includes('backup')) {
          const splits = initialUrl.split('backup/');
          const decoded = Buffer.from(splits[1], 'base64').toString();
          const params = urlParamsToObj(decoded);
          if (params.seed) {
            navigation.navigate('EnterWalletDetail', {
              seed: params.seed,
              name: params.name,
              path: params.path,
              appId: params.appId,
              purpose: params.purpose,
              description: `Imported from ${params.name}`,
              type: WalletType.IMPORTED,
            });
          } else {
            showToast('Invalid deeplink');
          }
        } else if (initialUrl.includes('create/')) {
        }
      }
    } catch (error) {
      //
    }
  }
  const TabBarButton = useCallback(({ onPress, navigation, route }) => {
    if (route.name === 'Vault') {
      const active = navigation.isFocused('Vault');
      return (
        <TabButton
          label="Vault"
          Icon={VaultIcon}
          IconActive={VaultActiveIcon}
          onPress={onPress}
          active={active}
          backgroundColorActive="#704E2E"
          backgroundColor="transparent"
          textColorActive="#F7F2EC"
          textColor="#704E2E"
        />
      );
    }
    const active = navigation.isFocused('Wallet');
    return (
      <TabButton
        label="Wallets"
        Icon={WalletIcon}
        IconActive={WalletActiveIcon}
        onPress={onPress}
        active={active}
        backgroundColorActive="#2D6759"
        backgroundColor="transparent"
        textColorActive="#FDF8F2"
        textColor="#2D6759"
      />
    );
  }, []);
  const styles = getStyles(colorMode);
  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: colorMode === 'light' ? '#F2EDE6' : '#323C3A' }}
      screenOptions={({ route, navigation }) => ({
        tabBarButton: ({ onPress }) => (
          <TabBarButton onPress={onPress} route={route} navigation={navigation} />
        ),
        tabBarStyle: styles.tabBarStyle,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Wallet" component={WalletsScreen} />
      <Tab.Screen name="Vault" component={VaultScreen} />
    </Tab.Navigator >
  );
}

export default NewHomeScreen;

const getStyles = (colorMode) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingHorizontal: 27,
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  label: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '500',
  },
  tabBarStyle: {
    backgroundColor: colorMode === 'light' ? '#F2EDE6' : '#323C3A',
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: Platform.OS === 'android' ? hp(55) : hp(80),
    paddingVertical: Platform.OS === 'android' ? hp(10) : hp(15),
  },
});
