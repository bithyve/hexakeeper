import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ASSISTED_KEYS,
  MASTER_RECOVERY_KEY,
  PERSONAL_CLOUD_BACKUP,
  WALLET_CONFIG_FILES,
  BUY_NEW_HARDWARE_SIGNER,
  CANARY_WALLETS,
  SAFE_KEEPING_TIPS,
  SECURE_USAGE_TIPS,
  BACKUP_AND_RECOVERY_FILES,
  INHERITANCE_KEY,
  LETTER_OF_ATTORNEY,
  RECOVERY_INSTRUCRIONS,
  PRINTABLE_TEMPLATES,
  INHERITANCE_TIPS,
} from 'src/services/channel/constants';

interface InheritanceToolVisitedHistory {
  BUY_NEW_HARDWARE_SIGNER: number;
  CANARY_WALLETS: number;
  ASSISTED_KEYS: number;
  SECURE_USAGE_TIPS: number;
  SAFE_KEEPING_TIPS: number;
  MASTER_RECOVERY_KEY: number;
  PERSONAL_CLOUD_BACKUP: number;
  WALLET_CONFIG_FILES: number;
  BACKUP_AND_RECOVERY_FILES: number;
  INHERITANCE_KEY: number;
  LETTER_OF_ATTORNEY: number;
  RECOVERY_INSTRUCRIONS: number;
  PRINTABLE_TEMPLATES: number;
  INHERITANCE_TIPS: number;
}

const initialState: {
  appId: string;
  resetCred: {
    hash: string;
    index: number;
  };
  failedAttempts: number;
  lastLoginFailedAt: number;
  pinHash: string;
  appVersion: string;
  inheritanceRequestId: string;
  recoveryAppCreated: boolean;
  inheritanceToolVisitedHistory: InheritanceToolVisitedHistory;
} = {
  appId: '',
  resetCred: {
    hash: '',
    index: null,
  },
  failedAttempts: 0,
  lastLoginFailedAt: null,
  pinHash: '',
  appVersion: '',
  inheritanceRequestId: '',
  recoveryAppCreated: null,
  inheritanceToolVisitedHistory: {
    BUY_NEW_HARDWARE_SIGNER: null,
    CANARY_WALLETS: null,
    ASSISTED_KEYS: null,
    SECURE_USAGE_TIPS: null,
    SAFE_KEEPING_TIPS: null,
    MASTER_RECOVERY_KEY: null,
    PERSONAL_CLOUD_BACKUP: null,
    WALLET_CONFIG_FILES: null,
    BACKUP_AND_RECOVERY_FILES: null,
    INHERITANCE_KEY: null,
    LETTER_OF_ATTORNEY: null,
    RECOVERY_INSTRUCRIONS: null,
    PRINTABLE_TEMPLATES: null,
    INHERITANCE_TIPS: null,
  },
};

const storageSlice = createSlice({
  name: 'storage',
  initialState,
  reducers: {
    setAppId: (state, action: PayloadAction<string>) => {
      state.appId = action.payload;
    },

    increasePinFailAttempts: (state) => {
      state.failedAttempts += 1;
      state.lastLoginFailedAt = Date.now();
    },
    setPinResetCreds: (state, action: PayloadAction<{ hash: string; index: number }>) => {
      state.resetCred = {
        hash: action.payload.hash,
        index: action.payload.index,
      };
    },
    resetPinFailAttempts: (state) => {
      state.failedAttempts = 0;
      state.lastLoginFailedAt = null;
    },
    setPinHash: (state, action: PayloadAction<string>) => {
      state.pinHash = action.payload;
    },
    setAppVersion: (state, action: PayloadAction<string>) => {
      state.appVersion = action.payload;
    },

    // setInheritanceTool: (state, action: PayloadAction<InheritanceToolVisitedHistory>) => {
    //   state.inheritanceToolVisitedHistory = {
    //     ...state.inheritanceToolVisitedHistory,
    //     ...action.payload,
    //   };
    //   console.log(
    //     'state.inheritanceToolVisitedHistorystate.inheritanceToolVisitedHistory',
    //     state.inheritanceToolVisitedHistory
    //   );
    // },
    updateLastVisitedTimestamp: (
      state,
      action: PayloadAction<{ option: keyof InheritanceToolVisitedHistory }>
    ) => {
      const { option } = action.payload;
      console.log('xyxxyxyxyyx', option, action.payload);
      state.inheritanceToolVisitedHistory[option] = Date.now();
    },
    setInheritanceRequestId: (state, action: PayloadAction<string>) => {
      state.inheritanceRequestId = action.payload;
    },
    setRecoveryCreatedApp: (state, action: PayloadAction<boolean>) => {
      state.recoveryAppCreated = action.payload;
    },
  },
});

export const {
  setAppId,
  increasePinFailAttempts,
  setPinResetCreds,
  resetPinFailAttempts,
  setPinHash,
  setAppVersion,
  setInheritanceRequestId,
  setRecoveryCreatedApp,
  updateLastVisitedTimestamp,
} = storageSlice.actions;

export default storageSlice.reducer;
