import { Pressable, StyleSheet, TouchableOpacity, Vibration } from 'react-native';
import React, { useContext, useRef, useState } from 'react';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Box, Checkbox, HStack, ScrollView, VStack, useColorMode } from 'native-base';
import { useDispatch } from 'react-redux';
import ScreenWrapper from 'src/components/ScreenWrapper';
import KeeperHeader from 'src/components/KeeperHeader';
import KeeperTextInput from 'src/components/KeeperTextInput';
import Text from 'src/components/KeeperText';
import Buttons from 'src/components/Buttons';
import { setVaultRecoveryDetails } from 'src/store/reducers/bhr';
import useToastMessage from 'src/hooks/useToastMessage';
import ToastErrorIcon from 'src/assets/images/toast_error.svg';
import useVault from 'src/hooks/useVault';
import { LocalizationContext } from 'src/context/Localization/LocContext';
import config, { APP_STAGE } from 'src/utils/service-utilities/config';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParams } from 'src/navigation/types';
import { hp, wp } from 'src/constants/responsive';
import KeeperModal from 'src/components/KeeperModal';
import TickIcon from 'src/assets/images/icon_tick.svg';
import AddCircleLight from 'src/assets/images/add-circle-light.svg';
import ReserveKeyIllustrationLight from 'src/assets/images/reserve-key-illustration-light.svg';
import usePlan from 'src/hooks/usePlan';
import { SubscriptionTier } from 'src/models/enums/SubscriptionTier';
import { SignerType } from 'src/services/wallets/enums';

function NumberInput({ value, onDecrease, onIncrease }) {
  const { colorMode } = useColorMode();

  return (
    <HStack
      style={styles.inputContainer}
      backgroundColor={`${colorMode}.seashellWhite`}
      borderColor={`${colorMode}.greyBorder`}
    >
      <TouchableOpacity testID="btn_decreaseValue" style={styles.button} onPress={onDecrease}>
        <Text style={styles.buttonText} color={`${colorMode}.greenText`}>
          -
        </Text>
      </TouchableOpacity>
      <Box style={{ height: 30, borderLeftWidth: 0.2, paddingHorizontal: 5 }} />
      <Text style={styles.buttonValue} bold color={`${colorMode}.greenText`}>
        {value}
      </Text>
      <Box style={{ height: 30, borderRightWidth: 0.2, paddingHorizontal: 5 }} />
      <TouchableOpacity testID="increaseValue" style={styles.button} onPress={onIncrease}>
        <Text style={styles.buttonText} color={`${colorMode}.greenText`}>
          +
        </Text>
      </TouchableOpacity>
    </HStack>
  );
}

type ScreenProps = NativeStackScreenProps<AppStackParams, 'VaultSetup'>;
function VaultSetup({ route }: ScreenProps) {
  const { plan } = usePlan();
  const { colorMode } = useColorMode();
  const navigation = useNavigation();
  const { showToast } = useToastMessage();
  const { isRecreation, scheme: preDefinedScheme, vaultId } = route.params || {};
  const dispatch = useDispatch();
  const { activeVault } = useVault({ vaultId });
  const [vaultName, setVaultName] = useState(
    activeVault?.presentationData?.name || config.ENVIRONMENT === APP_STAGE.DEVELOPMENT
      ? 'Vault'
      : ''
  );
  const descriptionInputRef = useRef(activeVault?.presentationData?.description || '');
  const initialDescription = useRef(descriptionInputRef.current);
  const [isAddInheritanceKey, setIsAddInheritanceKey] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [scheme, setScheme] = useState(activeVault?.scheme || preDefinedScheme || { m: 3, n: 4 });
  const { translations } = useContext(LocalizationContext);
  const { vault: vaultTranslations, common } = translations;
  const isDiamondHand = plan === SubscriptionTier.L3.toUpperCase();

  const onDecreaseM = () => {
    if (scheme.m > 1) {
      Vibration.vibrate(50);
      setScheme({ ...scheme, m: scheme.m - 1 });
    }
  };
  const onIncreaseM = () => {
    if (scheme.m > 0 && scheme.m < scheme.n) {
      Vibration.vibrate(50);
      setScheme({ ...scheme, m: scheme.m + 1 });
    }
  };
  const onDecreaseN = () => {
    if (scheme.n > 2 && scheme.n > scheme.m) {
      Vibration.vibrate(50);
      setScheme({ ...scheme, n: scheme.n - 1 });
    }
  };
  const onIncreaseN = () => {
    if (scheme.n < 10) {
      Vibration.vibrate(50);
      setScheme({ ...scheme, n: scheme.n + 1 });
    }
  };

  const onDescriptionChange = (value) => {
    descriptionInputRef.current = value;
  };
  const OnProceed = () => {
    const vaultDescription = descriptionInputRef.current;
    if (vaultName !== '') {
      if (isRecreation) {
        dispatch(
          setVaultRecoveryDetails({
            scheme,
            name: vaultName,
            description: vaultDescription,
          })
        );
        navigation.navigate('LoginStack', { screen: 'VaultRecoveryAddSigner' });
      } else {
        navigation.dispatch(
          CommonActions.navigate({
            name: 'AddSigningDevice',
            params: {
              scheme,
              name: vaultName,
              description: vaultDescription,
              vaultId,
              isAddInheritanceKey,
              ...(isAddInheritanceKey && {
                signerFilters: [SignerType.MY_KEEPER, SignerType.TAPSIGNER, SignerType.SEED_WORDS],
              }),
            },
          })
        );
      }
    } else {
      showToast(vaultTranslations.pleaseEnterVaultName, <ToastErrorIcon />);
    }
  };

  const ModalContent = () => {
    return (
      <Box style={styles.modalContainer}>
        <Box style={styles.reserveKeyIllustration}>
          <ReserveKeyIllustrationLight />
        </Box>
        <Text color={`${colorMode}.secondaryText`}>{vaultTranslations.reserveKeyUpgradeDesc}</Text>
        <Box style={styles.modalButtonContainer}>
          <Buttons
            primaryText={common.upgradeNow}
            primaryCallback={() => {
              setShowModal(false);
              navigation.dispatch(CommonActions.navigate('ChoosePlan'));
            }}
            fullWidth
          />
        </Box>
      </Box>
    );
  };

  // TODO: add learn more modal
  return (
    <ScreenWrapper backgroundcolor={`${colorMode}.primaryBackground`}>
      <KeeperHeader
        title={
          preDefinedScheme ? vaultTranslations.SetupyourVault : vaultTranslations.AddCustomMultiSig
        }
        subtitle={vaultTranslations.configureScheme}
        learnMore={!isDiamondHand}
        learnMorePressed={() => {
          setShowModal(true);
        }}
        // To-Do-Learn-More
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack style={styles.container}>
          <KeeperTextInput
            placeholder="Name your vault"
            value={vaultName}
            onChangeText={(value) => {
              setVaultName(value);
            }}
            testID="vault_name"
            maxLength={18}
          />
          <Pressable
            onPress={() => {
              setShowDescriptionModal(true);
              initialDescription.current = descriptionInputRef.current;
            }}
          >
            <Box style={styles.descriptionContainer}>
              <Text color={`${colorMode}.greenText`}>Add Description</Text>
              <AddCircleLight />
            </Box>
          </Pressable>
          <Box style={styles.thresholdContainer}>
            <Text
              style={styles.title}
              medium
              color={`${colorMode}.primaryText`}
              testID="text_totalKeys"
            >
              {vaultTranslations.totalKeysForVaultConfiguration}
            </Text>
            <Text
              style={{ fontSize: 12 }}
              color={`${colorMode}.secondaryText`}
              testID="text_totalKeys_subTitle"
            >
              {vaultTranslations.selectTheTotalNumberOfKeys}
            </Text>
            <NumberInput value={scheme.n} onDecrease={onDecreaseN} onIncrease={onIncreaseN} />
            <Text
              style={styles.title}
              medium
              color={`${colorMode}.primaryText`}
              testID="text_requireKeys"
            >
              {vaultTranslations.requiredKeys}
            </Text>
            <Text
              style={{ fontSize: 12 }}
              color={`${colorMode}.secondaryText`}
              testID="text_requireKeys_subTitle"
            >
              {vaultTranslations.minimumNumberOfKeysToSignATransaction}
            </Text>
            <NumberInput value={scheme.m} onDecrease={onDecreaseM} onIncrease={onIncreaseM} />
          </Box>
          <Box
            style={{
              opacity: !isDiamondHand ? 0.5 : 1,
            }}
          >
            <Checkbox
              value={'Add Inheritance Key'}
              _checked={{
                bgColor: `${colorMode}.pantoneGreen`,
                borderColor: `${colorMode}.dullGreyBorder`,
              }}
              _unchecked={{
                bgColor: `${colorMode}.primaryBackground`,
              }}
              borderWidth={1}
              onChange={() => setIsAddInheritanceKey(!isAddInheritanceKey)}
              isDisabled={!isDiamondHand}
            >
              <Text color={`${colorMode}.primaryText`} fontSize={12}>
                {vaultTranslations.addInheritanceKey}
              </Text>
            </Checkbox>
          </Box>
        </VStack>
      </ScrollView>
      <Buttons primaryText="Proceed" primaryCallback={OnProceed} fullWidth />
      <KeeperModal
        visible={showDescriptionModal}
        close={() => setShowDescriptionModal(false)}
        title={'Add Description'}
        subTitle={'This will reflect on the home screen'}
        modalBackground={`${colorMode}.modalWhiteBackground`}
        subTitleColor={`${colorMode}.secondaryText`}
        textColor={`${colorMode}.primaryText`}
        showCloseIcon={false}
        Content={() => (
          <Box style={styles.descriptionInput}>
            <KeeperTextInput
              ref={(input) => {
                descriptionInputRef.current = input ? input.value : '';
              }}
              placeholder="Add a description (Optional)"
              defaultValue={descriptionInputRef.current}
              onChangeText={onDescriptionChange}
              testID="vault_description"
              maxLength={20}
            />
          </Box>
        )}
        buttonText={'Save Changes'}
        buttonCallback={() => {
          setShowDescriptionModal(false);
          showToast('Description added successfully!', <TickIcon />);
        }}
        secondaryButtonText={'Cancel'}
        secondaryCallback={() => {
          descriptionInputRef.current = initialDescription.current;
          setShowDescriptionModal(false);
        }}
      />
      <KeeperModal
        visible={showModal}
        close={() => setShowModal(false)}
        title={vaultTranslations.addInheritanceKey}
        subTitle={vaultTranslations.inheritanceKeyDesc}
        modalBackground={`${colorMode}.modalWhiteBackground`}
        subTitleColor={`${colorMode}.secondaryText`}
        textColor={`${colorMode}.primaryText`}
        subTitleWidth={wp(300)}
        Content={ModalContent}
        showCloseIcon={false}
      />
    </ScreenWrapper>
  );
}

export default VaultSetup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 11,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 37,
    lineHeight: hp(36),
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  buttonValue: {
    fontSize: 17,
    lineHeight: hp(20),
    margin: 10,
    flex: 1,
    textAlign: 'center',
  },
  inputContainer: {
    height: hp(50),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp(20),
    borderWidth: 1,
  },
  thresholdContainer: {
    marginTop: hp(20),
  },
  title: {
    fontSize: 14,
    marginBottom: hp(5),
  },
  descriptionContainer: {
    width: '100%',
    height: hp(30),
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(5),
  },
  descriptionInput: {
    marginBottom: hp(10),
  },
  modalContainer: {
    flex: 1,
    gap: hp(30),
  },
  reserveKeyIllustration: {
    alignSelf: 'center',
    paddingRight: wp(20),
  },
  modalButtonContainer: {
    marginTop: hp(10),
  },
});
