import {
  ActiveAddresses,
  Balances,
  TransactionToAddressMapping,
  UTXO,
  WalletImportedAddresses,
  Transaction,
} from '.';
import { NetworkType, SignerType, VaultType, VaultVisibility } from '../enums';

export interface VaultPresentationData {
  vaultName: string; // name of the vault
  vaultDescription: string; // description of the vault
  vaultVisibility: VaultVisibility; // visibility of the vault
}

export interface VaultSpecs {
  xpubs: string[]; // signers' xpubs
  receivingAddress: string; // current external address
  nextFreeAddressIndex: number; // external-chain free address marker
  nextFreeChangeAddressIndex: number; // internal-chain free address marker
  activeAddresses: ActiveAddresses; // addresses being actively used by this vault
  importedAddresses: WalletImportedAddresses;
  confirmedUTXOs: UTXO[]; // utxo set available for use
  unconfirmedUTXOs: UTXO[]; // utxos to arrive
  balances: Balances; // confirmed/unconfirmed balances
  transactions: Transaction[]; // transactions belonging to this vault
  newTransactions?: Transaction[]; // new transactions arrived during the current sync
  lastSynched: number; // vault's last sync timestamp
  hasNewTxn?: boolean; // indicates new txns
  txIdCache: { [txid: string]: boolean };
  transactionMapping: TransactionToAddressMapping[];
  transactionsNote: {
    [txId: string]: string;
  };
  // transactionsMeta?: TransactionMetaData[];
}

export interface VaultScheme {
  m: number; // threshold number of signatures required
  n: number; // total number of xpubs
}

export interface VaultSigner {
  signerId: string;
  signerName: string;
  type: SignerType;
  xpub: string;
  derivation: string;
}

export interface Vault {
  id: string; // vault identifier(derived from xpub)
  vaultShellId: string; // identifier of the vault shell that the vault belongs
  type: VaultType; // type of wallet
  networkType: NetworkType; // testnet/mainnet
  isUsable: boolean; // true if vault is usable
  isMultiSig: boolean; // true
  scheme: VaultScheme; // scheme of vault(m of n)
  signers: VaultSigner[];
  presentationData: VaultPresentationData;
  specs: VaultSpecs;
}

export interface InheritancePolicy {
  id: string;
  date: string;
  heir: {
    firstName: string;
    lastName: string;
    address: string;
    email: string;
  };
  user: {
    email: string;
  };
  version: string;
}

export interface VaultShell {
  id: string;
  vaultInstances: { [vaultType: string]: number }; // various vault types mapped to corresponding number of instances
  inheritancePolicyId?: string;
}
