import { Box } from 'native-base';
import React from 'react';
import OptionCard from 'src/components/OptionCard';
import TimeLockIcon from 'src/assets/images/calendar.svg';
import MultiSigIcon from 'src/assets/images/advanced_green.svg';
import VaultGreenIcon from 'src/assets/images/vault_green.svg';
import { CommonActions } from '@react-navigation/native';

function AdvancedWallets({ navigation }) {
  const navigateToVaultSetup = (scheme?) => {
    navigation.dispatch(CommonActions.navigate({ name: 'VaultSetup', params: { scheme } }));
  };

  return (
    <Box>
      <OptionCard
        title="Time Lock"
        description="For 3, 6 or 12 months"
        LeftIcon={<TimeLockIcon />}
        callback={() => navigateToVaultSetup()}
        disabled
      />
      <OptionCard
        title="Degrading Multisig"
        description="Time-based signature"
        LeftIcon={<MultiSigIcon />}
        callback={() => navigateToVaultSetup()}
        disabled
      />
      <OptionCard
        title="Custom Multisig"
        description="Build your own"
        LeftIcon={<VaultGreenIcon />}
        callback={() => navigateToVaultSetup()}
      />
    </Box>
  );
}

export default AdvancedWallets;
