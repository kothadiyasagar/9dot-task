import React, { useState } from "react";
import { Form, Input, Button, notification, Card } from "antd";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleRegister = async (values) => {
    try {
      setLoading(true);
      await registerUser(values);
      notification.success({ message: "Registration successful!" });
      
      // Redirect to the login page after successful registration
      navigate("/login");
    } catch (error) {
      notification.error({ message: "Registration failed." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Register" style={{ maxWidth: 400, margin: "50px auto" }}>
      <Form onFinish={handleRegister} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter your email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Register
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default RegisterPage;
