import { StyleSheet, TouchableOpacity } from 'react-native';
import Text from 'src/components/KeeperText';
import { Box, HStack, VStack, View, useColorMode } from 'native-base';
import { CommonActions, StackActions, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
  calculateSendMaxFee,
  crossTransfer,
  sendPhaseTwo,
} from 'src/store/sagaActions/send_and_receive';
import { hp, windowHeight, windowWidth, wp } from 'src/constants/responsive';
import BTC from 'src/assets/images/btc_grey.svg';
import BitcoinUnit from 'src/models/enums/BitcoinUnit';
import Buttons from 'src/components/Buttons';
import KeeperHeader from 'src/components/KeeperHeader';
import { LocalizationContext } from 'src/context/Localization/LocContext';
import Note from 'src/components/Note/Note';
import RadioButton from 'src/components/RadioButton';
import ScreenWrapper from 'src/components/ScreenWrapper';
import SuccessIcon from 'src/assets/images/successSvg.svg';
import { EntityKind, TxPriority, VaultType } from 'src/core/wallets/enums';
import { Vault } from 'src/core/wallets/interfaces/vault';
import { Wallet } from 'src/core/wallets/interfaces/wallet';
import WalletIcon from 'src/assets/images/icon_wallet.svg';
import VaultIcon from 'src/assets/images/icon_vault2.svg';
import moment from 'moment';
import { crossTransferReset, sendPhaseTwoReset } from 'src/store/reducers/send_and_receive';
import { useAppSelector } from 'src/store/hooks';
import useAvailableTransactionPriorities from 'src/store/hooks/sending-utils/UseAvailableTransactionPriorities';
import { useDispatch } from 'react-redux';
import KeeperModal from 'src/components/KeeperModal';
import { TransferType } from 'src/models/enums/TransferType';
import useToastMessage from 'src/hooks/useToastMessage';
import ToastErrorIcon from 'src/assets/images/toast_error.svg';
import useCurrencyCode from 'src/store/hooks/state-selectors/useCurrencyCode';
import useBalance from 'src/hooks/useBalance';
import CurrencyKind from 'src/models/enums/CurrencyKind';
import useWallets from 'src/hooks/useWallets';
import { whirlPoolWalletTypes } from 'src/core/wallets/factories/WalletFactory';
import useVault from 'src/hooks/useVault';
import Fonts from 'src/constants/Fonts';
import PasscodeVerifyModal from 'src/components/Modal/PasscodeVerify';
import AddIcon from 'src/assets/images/add.svg';
import AddIconWhite from 'src/assets/images/icon_add_white.svg';

const customFeeOptionTransfers = [
  TransferType.VAULT_TO_ADDRESS,
  TransferType.VAULT_TO_WALLET,
  TransferType.WALLET_TO_WALLET,
  TransferType.WALLET_TO_ADDRESS,
];

const vaultTransfers = [TransferType.WALLET_TO_VAULT];
const walletTransfers = [TransferType.VAULT_TO_WALLET, TransferType.WALLET_TO_WALLET];
const internalTransfers = [TransferType.VAULT_TO_VAULT];

function Card({ title, subTitle, isVault = false, showFullAddress = false }) {
  const { colorMode } = useColorMode();
  return (
    <Box
      borderRadius={10}
      backgroundColor={`${colorMode}.seashellWhite`}
      flexDirection="row"
      padding={windowHeight * 0.019}
    >
      <Box
        backgroundColor="light.accent"
        height={10}
        width={10}
        borderRadius={20}
        justifyContent="center"
        alignItems="center"
      >
        {isVault ? <VaultIcon /> : <WalletIcon />}
      </Box>
      <Box marginLeft={3}>
        <Text
          color={`${colorMode}.greenText2`}
          fontSize={14}
          letterSpacing={1.12}
          numberOfLines={showFullAddress ? 2 : 1}
          maxWidth={200}
        >
          {title}
        </Text>
        {!showFullAddress && <Box flexDirection="row">{subTitle}</Box>}
      </Box>
    </Box>
  );
}

function SendingCard({
  isSend,
  currentCurrency,
  currencyCode,
  sender,
  recipient,
  address,
  amount,
  transferType,
  getBalance,
  getSatUnit,
}) {
  const { colorMode } = useColorMode();
  const getCurrencyIcon = () => {
    if (currentCurrency === CurrencyKind.BITCOIN) {
      return '₿';
    }
    return currencyCode;
  };

  const getCardDetails = () => {
    switch (transferType) {
      case TransferType.VAULT_TO_VAULT:
        return isSend ? (
          <Card title="Old Vault" subTitle="Moving all funds" isVault />
        ) : (
          <Card
            title="New Vault"
            subTitle={`Created on ${moment(new Date()).format('DD MMM YYYY')}`}
            isVault
          />
        );
      case TransferType.VAULT_TO_WALLET:
        return isSend ? (
          <Card
            title={sender?.presentationData?.name || address}
            subTitle={`Available: ${getCurrencyIcon()} ${getBalance(
              sender.specs.balances.confirmed
            )} ${getSatUnit()}`}
            isVault
          />
        ) : (
          <Card
            title={recipient?.presentationData?.name || address}
            subTitle={`Transferring: ${getCurrencyIcon()} ${getBalance(amount)} ${getSatUnit()}`}
          />
        );
      case TransferType.VAULT_TO_ADDRESS:
        return isSend ? (
          <Card
            title="Vault"
            subTitle={`${getCurrencyIcon()} ${getBalance(amount)} ${getSatUnit()}`}
            isVault
          />
        ) : (
          <Card
            title={address}
            subTitle={`${getCurrencyIcon()} ${getBalance(amount)} ${getSatUnit()}`}
          />
        );
      case TransferType.WALLET_TO_WALLET:
        return isSend ? (
          <Card
            title={sender?.presentationData?.name || address}
            subTitle={`Available: ${getCurrencyIcon()} ${getBalance(
              sender?.specs?.balances?.confirmed || 0
            )} ${getSatUnit()}`}
          />
        ) : (
          <Card
            title={recipient?.presentationData?.name || address}
            subTitle={`Transferring: ${getCurrencyIcon()} ${getBalance(amount)} ${getSatUnit()}`}
          />
        );
      case TransferType.WALLET_TO_VAULT:
        return isSend ? (
          <Card
            title={sender?.presentationData?.name || address}
            subTitle={`Available balance: ${getCurrencyIcon()} ${getBalance(
              sender?.specs?.balances?.confirmed || 0
            )}${getSatUnit()}`}
          />
        ) : (
          <Card title="Vault" subTitle="Transferrings all avaiable funds" isVault />
        );
      case TransferType.WALLET_TO_ADDRESS:
        return isSend ? (
          <Card
            title={sender?.presentationData?.name || address}
            subTitle={`Available balance: ${getCurrencyIcon()} ${getBalance(
              sender?.specs?.balances?.confirmed || 0
            )} ${getSatUnit()}`}
          />
        ) : (
          <Card
            title={address}
            subTitle={`Transferring: ${getCurrencyIcon()} ${getBalance(amount)} ${getSatUnit()}`}
            showFullAddress={true}
          />
        );
    }
  };
  return (
    <Box marginY={windowHeight > 570 ? windowHeight * 0.01 : 0}>
      <Text
        color={`${colorMode}.primaryText`}
        fontSize={14}
        letterSpacing={1.12}
        marginY={windowHeight > 570 ? windowHeight * 0.011 : 1}
      >
        {isSend ? 'Sending From' : 'Sending To'}
      </Text>
      {getCardDetails()}
    </Box>
  );
}

function Transaction({ txFeeInfo, transactionPriority }) {
  const { colorMode } = useColorMode();
  return (
    <Box flexDirection="row" justifyContent="space-between" marginY={windowHeight > 570 ? 3 : 1
    }>
      <Text color={`${colorMode}.primaryText`} fontSize={14} letterSpacing={1.12}>
        Transaction Priority
      </Text>
      <Text color={`${colorMode}.GreyText`} fontSize={14} letterSpacing={0.28}>
        {txFeeInfo[transactionPriority?.toLowerCase()]?.amount} sats
      </Text>
    </Box >
  );
}

function TextValue({ amt, unit }) {
  return (
    <Text
      style={{
        ...styles.priorityTableText,
        flex: 1,
        textAlign: 'right'
      }}
    >
      {amt} sats
    </Text>
  );
}

function SendingPriority({
  txFeeInfo,
  transactionPriority,
  setTransactionPriority,
  availableTransactionPriorities,
}) {
  const { translations } = useContext(LocalizationContext);
  const { settings, wallet: walletTranslation } = translations;
  const { colorMode } = useColorMode();
  return (
    <Box>
      {/* <Transaction txFeeInfo={txFeeInfo} transactionPriority={transactionPriority} /> */}
      <Box flexDirection="row" justifyContent="space-between" width='90%'>
        <Box
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
            marginHorizontal: 20,
            width: '100%'
          }}
        >
          <Text style={styles.headingLabelText}>Priority</Text>
          <Text style={styles.headingLabelText}>Arrival Time</Text>
          <Text style={styles.headingLabelText}>Fees</Text>
        </Box>
      </Box>

      <Box mt={hp(1)} width={'100%'}>
        {availableTransactionPriorities?.map((priority) => (
          <TouchableOpacity
            key={priority}
            onPress={() => {
              setTransactionPriority(priority);
            }}
          >
            <Box
              style={styles.priorityRowContainer}
              opacity={transactionPriority === priority ? 1 : 0.5}
              backgroundColor={`${colorMode}.seashellWhite`}
            >
              <Box style={styles.priorityBox}>
                <RadioButton
                  size={20}
                  isChecked={transactionPriority === priority}
                  borderColor="#74837F"
                  onpress={() => {
                    setTransactionPriority(priority);
                  }}
                />
                <Text
                  style={{
                    ...styles.priorityTableText,
                    marginLeft: 12,
                    fontStyle: 'normal',
                  }}
                >
                  {String(priority)}
                </Text>
              </Box>
              <Text
                style={{
                  ...styles.priorityTableText,
                  flex: 1,
                }}
              >
                ~{txFeeInfo[priority?.toLowerCase()]?.estimatedBlocksBeforeConfirmation * 10} mins
              </Text>
              <TextValue
                amt={txFeeInfo[priority?.toLowerCase()]?.amount}
                unit={{
                  bitcoinUnit: BitcoinUnit.SATS,
                }}
              />
            </Box>
          </TouchableOpacity>
        ))}
      </Box>
      <TouchableOpacity onPress={() => console.log('pressed')}>
        <Box backgroundColor={`${colorMode}.lightAccent`} style={styles.addTransPriority}>
          {colorMode === 'light' ? <AddIcon /> : <AddIconWhite />}
          <Text style={[styles.addPriorityText, { paddingLeft: colorMode === 'light' ? 10 : 0 }]}>{walletTranslation.addCustomPriority}</Text>
        </Box>
      </TouchableOpacity>
    </Box>
  );
}

function FeeInfo({ txFeeInfo, transactionPriority, transferType, sendMaxFee }) {
  return (
    <HStack width={windowWidth * 0.75} justifyContent="space-between" alignItems="center">
      <VStack>
        <Text
          color="light.primaryText"
          fontSize={14}
          letterSpacing={1.12}
          marginTop={windowHeight * 0.011}
        >
          Fees
        </Text>
        <Text color="light.primaryText" fontSize={12} letterSpacing={1.12} light>
          ~ 10 - 30 mins
        </Text>
      </VStack>
      <Text
        color="light.primaryText"
        fontSize={14}
        letterSpacing={1.12}
        marginTop={windowHeight * 0.011}
      >
        <BTC />
        &nbsp;
        {transferType === TransferType.WALLET_TO_VAULT
          ? sendMaxFee
          : txFeeInfo[transactionPriority?.toLowerCase()]?.amount}
      </Text>
    </HStack>
  );
}

function SendSuccessfulContent() {
  const { colorMode } = useColorMode();
  const { translations } = useContext(LocalizationContext);
  const { wallet: walletTransactions } = translations;
  return (
    <View>
      <Box alignSelf="center">
        <SuccessIcon />
      </Box>
      <Text color={`${colorMode}.greenText`} fontSize={13} padding={2}>
        {walletTransactions.sendTransSuccessMsg}
      </Text>
    </View>
  );
}

function ApproveTransVaultContent({ setVisibleTransVaultModal, onTransferNow }) {
  return (
    <>
      <View style={{ marginVertical: 25 }}>
        <Text color="light.greenText" fontSize={13} py={3}>
          Once approved, bitcoin will be transferred from the wallets to the vault for safekeeping
        </Text>
        <Text color="light.greenText" fontSize={13} py={3}>
          You can change the policy that triggers auto-transfer to suit your needs
        </Text>
      </View>
      <Buttons
        secondaryText="Remind me Later"
        secondaryCallback={() => {
          setVisibleTransVaultModal(false);
        }}
        primaryText="Transfer Now"
        primaryCallback={() => onTransferNow()}
        paddingHorizontal={wp(20)}
      />
    </>
  );
}
function TransactionPriorityDetails({ }) {
  const { colorMode } = useColorMode();
  const { translations } = useContext(LocalizationContext);
  const { wallet: walletTransactions } = translations;

  return (
    <Box>
      <Box style={styles.transTitleWrapper}>
        <Text style={styles.transTitleText} color={`${colorMode}.primaryText`}>{walletTransactions.transactionPriority}</Text>
      </Box>
      <Box style={styles.transPriorityWrapper} backgroundColor={`${colorMode}.seashellWhite`}>
        <Box style={{ width: '30%' }}>
          <Text style={styles.transLabelText}>{walletTransactions.PRIORITY}</Text>
          <Text style={styles.transLabelText}>{walletTransactions.ARRIVALTIME}</Text>
          <Text style={styles.transLabelText}>{walletTransactions.FEE}</Text>
        </Box>
        <Box style={{ width: '65%' }}>
          <Text style={styles.transLabelText}>High</Text>
          <Text style={styles.transLabelText}>10 - 20 min</Text>
          <Box style={{ flexDirection: 'row', width: '100%' }}>
            <Box style={{ width: '40%' }}>
              <Text style={styles.transFiatFeeText}>80000000</Text>
            </Box>
            <Box style={styles.transSatsFeeWrapper}>
              <BTC />
              &nbsp;
              <Text style={styles.transSatsFeeText}>0.000013000</Text>
            </Box>
          </Box>
        </Box>
        <Box style={{ width: '5%' }}>
          <Text style={{ fontSize: 20 }}>...</Text>
        </Box>
      </Box>
    </Box>
  )
}
function AmountDetails(props) {
  return (
    <Box style={styles.amountDetailsWrapper}>
      <Box style={styles.amtDetailsTitleWrapper}>
        <Text style={[styles.amtDetailsText, { fontSize: props.fontSize, fontWeight: props.fontWeight }]}>{props.title}</Text>
      </Box>
      <Box style={styles.amtFiatSatsTitleWrapper}>
        <Text style={[styles.amtDetailsText, { fontSize: props.fontSize, fontWeight: props.fontWeight }]}>{props.fiatAmount}</Text>
      </Box>
      <Box style={styles.amtFiatSatsTitleWrapper}>
        <Text style={styles.amtDetailsText}>{props.satsAmount}</Text>
      </Box>
    </Box>
  )
}
function SendConfirmation({ route }) {
  const { colorMode } = useColorMode();
  const { showToast } = useToastMessage();
  const dispatch = useDispatch();
  const {
    sender,
    recipient,
    address,
    amount,
    walletId,
    transferType,
    uaiSetActionFalse,
    note,
    label,
  }: {
    sender: Wallet | Vault;
    recipient: Wallet | Vault;
    address: string;
    amount: number;
    walletId: string;
    uiMetaData: any;
    transferType: TransferType;
    uaiSetActionFalse: any;
    note: string;
    label: {
      name: string;
      isSystem: boolean;
    }[];
  } = route.params;

  const txFeeInfo = useAppSelector((state) => state.sendAndReceive.transactionFeeInfo);
  const sendMaxFee = useAppSelector((state) => state.sendAndReceive.sendMaxFee);
  const { isSuccessful: crossTransferSuccess } = useAppSelector(
    (state) => state.sendAndReceive.crossTransfer
  );

  const [transactionPriority, setTransactionPriority] = useState(TxPriority.LOW);
  const { wallets } = useWallets({ getAll: true });
  const sourceWallet = wallets.find((item) => item.id === walletId);
  const { activeVault: defaultVault } = useVault();
  const availableTransactionPriorities = useAvailableTransactionPriorities();

  const { translations } = useContext(LocalizationContext);
  const { wallet: walletTransactions, common, vault } = translations;

  const currencyCode = useCurrencyCode();
  const currentCurrency = useAppSelector((state) => state.settings.currencyKind);
  const { getSatUnit, getBalance } = useBalance();

  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleTransVaultModal, setVisibleTransVaultModal] = useState(false);
  const [title, setTitle] = useState('Sending to address');
  const [subTitle, setSubTitle] = useState('Choose priority and fee');
  const [confirmPassVisible, setConfirmPassVisible] = useState(false);
  const [transPriorityModalVisible, setTransPriorityModalVisible] = useState(false);

  useEffect(() => {
    if (vaultTransfers.includes(transferType)) {
      setTitle('Sending to vault');
    } else if (walletTransfers.includes(transferType)) {
      setTitle('Sending to wallet');
    } else if (internalTransfers.includes(transferType)) {
      setTitle('Transfer Funds to the new vault');
      setSubTitle('On-chain transaction incurs fees');
    }
  }, []);

  useEffect(() => {
    if (transferType === TransferType.WALLET_TO_VAULT) {
      dispatch(calculateSendMaxFee({ numberOfRecipients: 1, wallet: sourceWallet }));
    }
  }, []);

  const onTransferNow = () => {
    setVisibleTransVaultModal(false);
    dispatch(
      crossTransfer({
        sender: sourceWallet,
        recipient: defaultVault,
        amount: sourceWallet.specs.balances.confirmed - sendMaxFee,
      })
    );
  };

  const [inProgress, setProgress] = useState(false);

  useEffect(() => {
    if (inProgress) {
      // TODO: Remove this timeout until we optimise the crypto
      setTimeout(() => {
        dispatch(sendPhaseTwoReset());
        dispatch(
          sendPhaseTwo({
            wallet: sender,
            txnPriority: transactionPriority,
            note,
            label,
            transferType,
          })
        );
      }, 200);
    }
  }, [inProgress]);

  const onProceed = () => {
    if (transferType === TransferType.WALLET_TO_VAULT) {
      if (sourceWallet.specs.balances.confirmed < sourceWallet.transferPolicy.threshold) {
        showToast('Not enough Balance', <ToastErrorIcon />);
        return;
      }
      if (defaultVault) {
        setVisibleTransVaultModal(true);
      }
    } else {
      setProgress(true);
    }
  };

  useEffect(
    () => () => {
      dispatch(sendPhaseTwoReset());
      dispatch(crossTransferReset());
    },
    []
  );

  const serializedPSBTEnvelops = useAppSelector(
    (state) => state.sendAndReceive.sendPhaseTwo.serializedPSBTEnvelops
  );

  const { txid: walletSendSuccessful, hasFailed: sendPhaseTwoFailed } = useAppSelector(
    (state) => state.sendAndReceive.sendPhaseTwo
  );
  const navigation = useNavigation();
  let collaborativeWalletId;
  if (transferType !== TransferType.WALLET_TO_VAULT) {
    sender.entityKind === EntityKind.VAULT && sender.type === VaultType.COLLABORATIVE
      ? sender.collaborativeWalletId
      : '';
  }

  useEffect(() => {
    if (serializedPSBTEnvelops && serializedPSBTEnvelops.length) {
      setProgress(false);
      navigation.dispatch(
        CommonActions.navigate('SignTransactionScreen', {
          note,
          label,
          collaborativeWalletId,
        })
      );
    }
  }, [serializedPSBTEnvelops]);

  const viewDetails = () => {
    setVisibleModal(false);
    if (vaultTransfers.includes(transferType)) {
      const navigationState = {
        index: 1,
        routes: [
          { name: 'Home' },
          { name: 'VaultDetails', params: { autoRefresh: true, collaborativeWalletId } },
        ],
      };
      navigation.dispatch(CommonActions.reset(navigationState));
    } else if (whirlPoolWalletTypes.includes(sender.type)) {
      const popAction = StackActions.pop(3);
      navigation.dispatch(popAction);
    } else {
      const navigationState = {
        index: 1,
        routes: [
          { name: 'Home' },
          { name: 'WalletDetails', params: { autoRefresh: true, walletId: sender.id } },
        ],
      };
      navigation.dispatch(CommonActions.reset(navigationState));
    }
  };

  useEffect(() => {
    if (walletSendSuccessful) {
      setProgress(false);
      setVisibleModal(true);
    }
  }, [walletSendSuccessful]);

  useEffect(() => {
    if (sendPhaseTwoFailed) setProgress(false);
  }, [sendPhaseTwoFailed]);

  useEffect(() => {
    if (crossTransferSuccess) {
      setVisibleModal(true);
      if (uaiSetActionFalse) {
        uaiSetActionFalse();
      }
    }
  }, [crossTransferSuccess]);
  return (
    <ScreenWrapper backgroundcolor={`${colorMode}.primaryBackground`}>
      <KeeperHeader title={title} subtitle={subTitle} />
      <Box marginX={7} flex={1}>
        <SendingCard
          isSend
          currentCurrency={currentCurrency}
          currencyCode={currencyCode}
          sender={sender}
          recipient={recipient}
          address={address}
          amount={amount}
          transferType={transferType}
          getBalance={getBalance}
          getSatUnit={getSatUnit}
          sourceWallet={sourceWallet}
        />
        <SendingCard
          isSend={false}
          currentCurrency={currentCurrency}
          currencyCode={currencyCode}
          sender={sender}
          recipient={recipient}
          address={address}
          amount={amount}
          transferType={transferType}
          getBalance={getBalance}
          getSatUnit={getSatUnit}
          sourceWallet={sourceWallet}
        />
        <TouchableOpacity onPress={() => setTransPriorityModalVisible(true)}>
          <TransactionPriorityDetails />
        </TouchableOpacity>
        <AmountDetails title={walletTransactions.totalAmount} fiatAmount={'10,000.00'} satsAmount={'0.264075'} />
        <AmountDetails title={walletTransactions.totalFees} fiatAmount={'80.00'} satsAmount={'0.000013'} />
        <Box style={styles.horizontalLineStyle} borderBottomColor={`${colorMode}.Border`} />
        <AmountDetails title={walletTransactions.total} fiatAmount={'10,080.00'} satsAmount={'0.264088'} fontSize={17} fontWeight={'400'} />
        {/* <Box>
          {customFeeOptionTransfers.includes(transferType) ? (
            <SendingPriority
              txFeeInfo={txFeeInfo}
              transactionPriority={transactionPriority}
              setTransactionPriority={setTransactionPriority}
              availableTransactionPriorities={availableTransactionPriorities}
            />
          ) : (
            <FeeInfo
              txFeeInfo={txFeeInfo}
              transactionPriority={transactionPriority}
              transferType={transferType}
              sendMaxFee={sendMaxFee}
            />
          )}
        </Box> */}
      </Box>
      {transferType === TransferType.VAULT_TO_VAULT ? (
        <Note
          title={common.note}
          subtitle={vault.signingOldVault}
        />
      ) : null}
      <Buttons
        primaryText={common.confirmProceed}
        secondaryText={common.cancel}
        secondaryCallback={() => {
          navigation.goBack();
        }}
        primaryCallback={() => setConfirmPassVisible(true)}
        primaryLoading={inProgress}
      />
      <KeeperModal
        visible={visibleModal}
        close={viewDetails}
        title={walletTransactions.SendSuccess}
        subTitle={walletTransactions.transactionBroadcasted}
        buttonText={walletTransactions.ViewDetails}
        buttonCallback={viewDetails}
        textcolor={`${colorMode}.greenText`}
        buttonTextColor={`${colorMode}.white`}
        Content={SendSuccessfulContent}
      />
      <KeeperModal
        visible={visibleTransVaultModal}
        close={() => setVisibleTransVaultModal(false)}
        title={walletTransactions.approveTransVault}
        subTitle={walletTransactions.approveTransVaultSubtitle}
        textcolor={`${colorMode}.greenText`}
        Content={() => (
          <ApproveTransVaultContent
            setVisibleTransVaultModal={setVisibleTransVaultModal}
            onTransferNow={onTransferNow}
          />
        )}
      />
      <KeeperModal
        visible={confirmPassVisible}
        close={() => setConfirmPassVisible(false)}
        title={walletTransactions.confirmPassTitle}
        subTitleWidth={wp(240)}
        subTitle={''}
        modalBackground={`${colorMode}.modalWhiteBackground`}
        subTitleColor={`${colorMode}.secondaryText`}
        textColor={`${colorMode}.primaryText`}
        Content={() => (
          <PasscodeVerifyModal
            useBiometrics
            close={() => {
              setConfirmPassVisible(false);
            }}
            onSuccess={onProceed}
          />
        )}
      />
      <KeeperModal
        visible={transPriorityModalVisible}
        close={() => setTransPriorityModalVisible(false)}
        showCloseIcon={false}
        title={walletTransactions.transactionPriority}
        subTitleWidth={wp(240)}
        subTitle={''}
        modalBackground={`${colorMode}.modalWhiteBackground`}
        subTitleColor={`${colorMode}.secondaryText`}
        textColor={`${colorMode}.primaryText`}
        buttonTextColor={`${colorMode}.white`}
        buttonText={common.confirm}
        buttonCallback={() => { setTransPriorityModalVisible(false), setTransactionPriority }}
        secondaryButtonText={common.cancel}
        secondaryCallback={() => setTransPriorityModalVisible(false)}
        Content={() => (
          <SendingPriority
            txFeeInfo={txFeeInfo}
            transactionPriority={transactionPriority}
            setTransactionPriority={setTransactionPriority}
            availableTransactionPriorities={availableTransactionPriorities}
          />
        )
        }
      />
    </ScreenWrapper>
  );
}
export default SendConfirmation;

const styles = StyleSheet.create({
  headingLabelText: {
    fontSize: 11,
    fontFamily: Fonts.FiraSansCondensedMedium,
    textAlign: 'center',
    color: '#656565',
  },
  priorityRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    borderRadius: 10,
    marginVertical: windowHeight > 570 ? 3 : 1,
  },
  customPriorityRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  priorityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(14),
    flex: 1,
  },
  priorityTableText: {
    fontSize: 10,
    textAlign: 'center',
    color: '#656565',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  noteBox: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    marginBottom: hp(40),
    marginTop: hp(20),
  },
  customPriority: {
    fontStyle: 'italic',
  },
  transPriorityWrapper: {
    flexDirection: "row",
    borderRadius: 10,
    padding: windowHeight * 0.019,
    alignItems: 'center'
  },
  transTitleWrapper: {
    marginVertical: 10
  },
  transTitleText: {
    fontSize: 14,
    letterSpacing: 1.12,
  },
  transLabelText: {
    fontSize: 12,
    fontFamily: Fonts.FiraSansCondensedRegular,
  },
  transFiatFeeText: {
    fontSize: 16,
    fontWeight: '300',
    fontFamily: Fonts.FiraSansCondensedMedium,
  },
  transSatsFeeText: {
    fontSize: 12
  },
  transSatsFeeWrapper: {
    width: '60%',
    alignItems: 'center',
    flexDirection: 'row'
  },
  addTransPriority: {
    height: 60,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: hp(30)
  },
  addPriorityText: {
    fontSize: 15,
    fontWeight: '400',
    letterSpacing: 0.6,
  },
  amountDetailsWrapper: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20
  },
  amtDetailsTitleWrapper: {
    width: '30%',
    justifyContent: 'flex-start'
  },
  amtFiatSatsTitleWrapper: {
    width: '35%',
    alignItems: 'flex-end'
  },
  amtDetailsText: {
    fontSize: 12,
    fontFamily: Fonts.FiraSansCondensedRegular,
    letterSpacing: 0.55
  },
  horizontalLineStyle: {
    borderBottomWidth: 0.3,
    marginTop: hp(20),
    opacity: 0.5
  }
});
