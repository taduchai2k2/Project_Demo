import React, { useState } from "react";
import API from "../api";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      alert("Đăng nhập thành công!");
      navigate("/");
    } catch (err) {
      alert("Sai thông tin đăng nhập!");
    }
  };

  return (
    <Container className="my-5" style={{ maxWidth: "400px" }}>
      <h3 className="text-center mb-4">Đăng nhập</h3>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Button type="submit" variant="primary" className="w-100">
          Đăng nhập
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
