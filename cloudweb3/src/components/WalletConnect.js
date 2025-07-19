import React from 'react';
import useWeb3 from '../hooks/useWeb3';

const WalletConnect = () => {
  const { account } = useWeb3();
  return (
    <div>
      {account ? (
        <span>المحفظة متصلة: {account}</span>
      ) : (
        <span>يرجى توصيل محفظتك</span>
      )}
    </div>
  );
};

export default WalletConnect;
