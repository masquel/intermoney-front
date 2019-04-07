import React from 'react';
import ErrorTemplate from './ErrorTemplate';

const data = {
  title: 'No ETH Account Available',
  message: `It seems that you don&apos;t have an ETH account selected. If using MetaMask, please make sure that your wallet is unlocked and that you have at least one account in your accounts list.`
};

const AccountUnavailable = () => <ErrorTemplate {...data} />

export default AccountUnavailable;
