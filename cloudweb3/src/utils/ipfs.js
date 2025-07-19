import { FilecoinClient } from '@filecoin-shipyard/js-filecoin-api-client';

const apiUrl = process.env.REACT_APP_FILECOIN_API;
const client = new FilecoinClient(apiUrl);

export async function storeFileToIPFS(file) {
  const formData = new FormData();
  formData.append('file', file);
  // هنا مثال مبسط، في التطبيق الحقيقي تحتاج إعداد توكنات المصادقة
  const response = await fetch(apiUrl + '/api/v0/add', {
    method: 'POST',
    body: formData,
  });
  const data = await response.json();
  return `https://ipfs.io/ipfs/${data.Hash}`;
}
