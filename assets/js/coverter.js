async function convertApp() {
    const appUrl = document.getElementById('appUrl').value;
    if (!appUrl) return alert("الرجاء إدخال رابط التطبيق");
    
    try {
        // تأكيد الدفع
        if (!window.ethereum) throw new Error("MetaMask غير مثبت!");
        await ethereum.request({ method: 'eth_requestAccounts' });
        
        const accounts = await new Web3(ethereum).eth.getAccounts();
        const tx = await ethereum.request({
            method: 'eth_sendTransaction',
            params: [{
                from: accounts[0],
                to: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
                value: web3.utils.toWei('0.001', 'ether'),
                chainId: "0xAA36A7" // شبكة Sepolia
            }]
        });
        
        // عرض حالة التحويل
        document.getElementById('result').innerHTML = `
            <div class="loading">جارٍ التحويل...</div>
        `;
        
        // محاكاة عملية التحويل (في الإصدار الحقيقي سيتم رفع الملفات إلى IPFS)
        setTimeout(() => {
            const cid = 'Qm' + Math.random().toString(36).substring(2, 15);
            const web3Url = `https://${cid}.ipfs.dweb.link`;
            
            document.getElementById('result').innerHTML = `
                <div class="success">
                    <h3>✅ تم التحويل بنجاح!</h3>
                    <p>رابط التطبيق الجديد:</p>
                    <p><a href="${web3Url}" target="_blank">${web3Url}</a></p>
                    <p>رقم المعاملة: ${tx.substring(0, 12)}...</p>
                </div>
            `;
        }, 3000);
        
    } catch (error) {
        document.getElementById('result').innerHTML = `
            <div class="error">
                <h3>❌ حدث خطأ</h3>
                <p>${error.message}</p>
            </div>
        `;
    }
                  }
