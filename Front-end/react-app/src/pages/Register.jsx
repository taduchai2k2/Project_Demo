import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ thêm dòng này
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ✅ thêm dòng này

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:9999/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // ⚠️ Đổi name → username để backend nhận đúng
        body: JSON.stringify({ username: name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Đăng ký thành công!");
         navigate("/login");
      } else {
        alert(data.message || "Lỗi đăng ký!");
      }
    } catch (err) {
      console.error("Lỗi FE:", err);
      alert("Lỗi đăng ký!");
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: "500px" }}>
      <h2 className="text-center mb-4 fw-bold">Đăng ký</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Tên</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Mật khẩu</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          Đăng ký
        </button>
      </form>
    </div>
  );
};

export default Register;
