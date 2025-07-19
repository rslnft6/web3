import { useEffect, useState } from 'react';
import Web3 from 'web3';

export default function useWeb3() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const w3 = new Web3(window.ethereum);
      setWeb3(w3);
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(accounts => setAccount(accounts[0]));
    }
  }, []);

  return { web3, account };
}
