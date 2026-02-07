import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox, Card, Typography } from "antd";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { useMutation } from "@tanstack/react-query";
import { authAPI } from "../../configs/apiClient";
import { extractUserFromToken } from "../../utils/jwtUtils";
import styles from "./styles/Login.module.css";

const { Title, Text } = Typography;

const Login = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Helper function to extract role
  const extractRole = (user) => {
    if (user?.role) {
      return user.role.toLowerCase();
    }
    return null;
  };

  const { mutate: loginUser, isPending } = useMutation({
    mutationFn: authAPI.login,
    onSuccess: (data) => {
      console.log(data);
      const accessToken = data.data.accessToken ;
      const refreshToken = data.refreshToken;

      if (!accessToken) {
        showToast("No access token received", "error");
        return;
      }

      // Store tokens
      localStorage.setItem("authToken", accessToken);
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }

      // Extract user data from token
      const extractedUser = extractUserFromToken(accessToken);

      // Store auth state
      const authData = {
        user: extractedUser,
        token: accessToken,
      };
      localStorage.setItem("ecom_auth", JSON.stringify(authData));

      showToast("Logged in successfully", "success");

      // Check if user is admin and redirect accordingly
      const userRole = extractRole(extractedUser);
      if (userRole === "admin") {
        navigate("/admin/app/ecommerce/dashboard");
      } else {
        navigate("/");
      }
    },
    onError: (err) => {
      console.error("Login Error:", err);
      showToast(err || "Login failed. Please try again.", "error");
    },
  });

  const onFinish = (values) => {
    loginUser({
      username: values.email,
      password: values.password,
      remember: values.remember,
    });
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
              loading={isPending}
              disabled={isPending}
              block
              className={styles.button}
            >
              {isPending ? "Signing in..." : "Sign in"}
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


