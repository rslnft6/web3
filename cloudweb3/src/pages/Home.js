import React, { useState, useEffect } from "react";
// import { Web3Storage } from "web3.storage";

function Home() {
  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [files, setFiles] = useState([]);
  const [usedSpace, setUsedSpace] = useState(0);
  const [freeSpace, setFreeSpace] = useState(51200); // 50 جيجا بالميجا
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (loggedIn && username) {
      const userFiles = JSON.parse(localStorage.getItem("files_" + username) || "[]");
      setFiles(userFiles);
      const totalSize = userFiles.reduce((acc, f) => acc + (f.size || 0), 0);
      setUsedSpace(totalSize / (1024 * 1024));
      setFreeSpace(51200 - totalSize / (1024 * 1024));
    }
  }, [loggedIn, username]);

  const handleLogin = () => {
    if (!username) {
      setError("يرجى إدخال اسم المستخدم");
      return;
    }
    setLoggedIn(true);
    setError("");
  };

  const handleUpload = async (e) => {
    setUploading(true);
    setError("");
    setSuccess("");
    const input = document.getElementById("fileInput");
    const selectedFiles = input.files;
    if (!selectedFiles.length) {
      setError("يرجى اختيار ملف");
      setUploading(false);
      return;
    }
    const file = selectedFiles[0];
    if (usedSpace + file.size / (1024 * 1024) > 51200) {
      setError("تجاوزت الحد المجاني! يرجى شراء مساحة إضافية");
      setUploading(false);
      return;
    }
    // const client = new Web3Storage({ token: "ضع هنا التوكن" });
    // const cid = await client.put([file]);
    // const url = `https://w3s.link/ipfs/${cid}/${file.name}`;
    const url = `https://example.com/${file.name}`;
    const newFile = { name: file.name, url, size: file.size, date: new Date().toISOString() };
    const updatedFiles = [...files, newFile];
    setFiles(updatedFiles);
    localStorage.setItem("files_" + username, JSON.stringify(updatedFiles));
    setSuccess("تم رفع الملف بنجاح!");
    setUsedSpace(usedSpace + file.size / (1024 * 1024));
    setFreeSpace(freeSpace - file.size / (1024 * 1024));
    setUploading(false);
  };

  if (!loggedIn) {
    return (
      <div className="glass-card" style={{ maxWidth: 400, margin: "60px auto", background: "rgba(255,255,255,0.25)", borderRadius: 16, boxShadow: "0 2px 12px #0002", padding: 40, backdropFilter: "blur(8px)", border: "1px solid #fff3" }}>
        <h2 className="mb-4" style={{ color: "#4e89ae", fontWeight: "bold" }}>تسجيل الدخول</h2>
        <input type="text" className="form-control mb-3" placeholder="اسم المستخدم" value={username} onChange={e => setUsername(e.target.value)} />
        <button className="btn btn-primary glass-btn w-100" onClick={handleLogin}>دخول</button>
        {error && <div className="error mt-2">{error}</div>}
      </div>
    );
  }

  return (
    <div className="container glass-card" style={{ maxWidth: 650, margin: "40px auto", background: "rgba(255,255,255,0.25)", borderRadius: 16, boxShadow: "0 2px 12px #0002", padding: 40, backdropFilter: "blur(8px)", border: "1px solid #fff3" }}>
      <h1 style={{ color: "#4e89ae", fontWeight: "bold" }}>لوحة تحكم التخزين السحابي</h1>
      <div className="info mb-3" style={{ background: "rgba(234,244,251,0.7)", borderRadius: 8, padding: 16 }}>
        <b>مرحبًا {username}!</b>
        <div>المساحة المستخدمة: <span style={{ color: "#2ecc40" }}>{usedSpace.toFixed(2)}</span> ميجا</div>
        <div>المساحة المتبقية: <span style={{ color: "#e67e22" }}>{freeSpace.toFixed(2)}</span> ميجا</div>
        {usedSpace > 51200 && <div style={{ color: "#e74c3c" }}>تجاوزت الحد المجاني! يرجى شراء مساحة إضافية.</div>}
      </div>
      <input type="file" id="fileInput" className="form-control mb-2" />
      <button className="btn btn-primary glass-btn w-100" onClick={handleUpload} disabled={uploading}>{uploading ? "جاري الرفع..." : "رفع ملف"}</button>
      {success && <div className="success mt-2">{success}</div>}
      {error && <div className="error mt-2">{error}</div>}
      <hr />
      <h3 className="mt-4">ملفاتك</h3>
      <ul className="file-list list-unstyled">
        {files.map((f, i) => (
          <li key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #eee", background: "rgba(255,255,255,0.15)", borderRadius: 8 }}>
            <a href={f.url} target="_blank" rel="noopener noreferrer" style={{ flex: 1, color: "#4e89ae", textDecoration: "underline" }}>{f.name}</a>
            <span style={{ marginLeft: 8, color: "#888" }}>{(f.size / (1024 * 1024)).toFixed(2)} ميجا</span>
            <span style={{ marginLeft: 8, color: "#aaa" }}>{new Date(f.date).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
