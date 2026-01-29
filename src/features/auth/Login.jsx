import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox, Card, Typography } from "antd";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import styles from "./styles/Login.module.css";

const { Title, Text } = Typography;

const Login = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await login({
        email: values.email,
        password: values.password,
        remember: values.remember,
      });
      showToast("Logged in successfully", "success");
      navigate("/");
    } catch (err) {
      showToast(err.message || "Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.login_container}>
      <Card className={styles.card}>
        <Title level={3} className={styles.title}>
          Welcome back
        </Title>
        <Text type="secondary" className={styles.text_secondary}>
          Sign in to continue shopping and track your orders.
        </Text>

        <Form
          layout="vertical"
          onFinish={onFinish}
          className={styles.form}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="you@example.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="••••••••" />
          </Form.Item>

          <div className={styles.remember_section}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              className={styles.button}
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>

        <div className={styles.footer}>
          <Text type="secondary" className={styles.text_secondary}>
            New here?{" "}
            <Link to="/register" className={styles.footer_link}>
              Create an account
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default Login;


