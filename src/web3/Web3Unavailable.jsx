import React from 'react';
import ErrorTemplate from './ErrorTemplate';

const data = {
  title: 'Web3 Not Found',
  message: `It seems that you are using a browser without Web3 capabilities. Please make sure that you are using a web3-capable browser like mist or parity. If you are using MetaMask or Parity extension, make sure that it is enabled.`
};

const Web3Unavailable = () => <ErrorTemplate {...data} />;

export default Web3Unavailable;
