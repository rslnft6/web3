import React, { useState } from 'react';
import { storeFileToIPFS } from './utils/ipfs';
import WalletConnect from './components/WalletConnect';
import useWeb3 from './hooks/useWeb3';

function App() {
  const [file, setFile] = useState(null);
  const [ipfsUrl, setIpfsUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState('');
  const { web3, account } = useWeb3();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // دفع رسوم بسيطة قبل رفع الملف
  const handlePayAndUpload = async () => {
    if (!file || !web3 || !account) return;
    setLoading(true);
    try {
      // دفع رسوم رمزية (مثلاً 0.001 ETH)
      const tx = await web3.eth.sendTransaction({
        from: account,
        to: account, // في التطبيق الحقيقي: عنوان العقد الذكي
        value: web3.utils.toWei('0.001', 'ether'),
      });
      setTxHash(tx.transactionHash);
      // بعد الدفع، رفع الملف إلى IPFS
      const url = await storeFileToIPFS(file);
      setIpfsUrl(url);
    } catch (err) {
      alert('فشل الدفع أو رفع الملف');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>تحويل تطبيق Web2 إلى Web3 وحفظ الملفات على Filecoin/IPFS</h1>
      <WalletConnect />
      <br />
      <input type="file" onChange={handleFileChange} />
      <button onClick={handlePayAndUpload} disabled={loading || !account}>
        {loading ? 'جاري الدفع ورفع الملف...' : 'دفع ورفع الملف إلى IPFS'}
      </button>
      {txHash && (
        <div>
          <p>تم الدفع بنجاح، هاش المعاملة:</p>
          <a href={`https://etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer">{txHash}</a>
        </div>
      )}
      {ipfsUrl && (
        <div>
          <p>رابط الملف على IPFS:</p>
          <a href={ipfsUrl} target="_blank" rel="noopener noreferrer">{ipfsUrl}</a>
        </div>
      )}
    </div>
  );
}

export default App;
