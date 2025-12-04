import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, Typography, Checkbox } from "antd";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import styles from "./styles/Register.module.css";

const { Title, Text } = Typography;

const Register = () => {
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }
    setLoading(true);
    try {
      await register({
        email: values.email,
        password: values.password,
        name: values.name,
      });
      showToast("Account created successfully", "success");
      navigate("/login");
    } catch (err) {
      showToast(err.message || "Registration failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.register_container}>
      <Card className={styles.card}>
        <Title level={3} className={styles.title}>
          Create account
        </Title>
        <Text type="secondary" className={styles.text_secondary}>
          Join us today and start shopping.
        </Text>

        <Form
          layout="vertical"
          onFinish={onFinish}
          className={styles.form}
        >
          <Form.Item
            label="Full Name"
            name="name"
            rules={[
              { required: true, message: "Please enter your full name" },
            ]}
          >
            <Input placeholder="John Doe" />
          </Form.Item>

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
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password placeholder="••••••••" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirm"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Passwords do not match")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="••••••••" />
          </Form.Item>

          <Form.Item name="terms" valuePropName="checked" noStyle>
            <Checkbox>
              I agree to the <Link to="/terms">Terms & Conditions</Link>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              className={styles.button}
            >
              Create account
            </Button>
          </Form.Item>
        </Form>

        <div className={styles.footer}>
          <Text type="secondary" className={styles.text_secondary}>
            Already have an account?{" "}
            <Link to="/login" className={styles.footer_link}>
              Sign in
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default Register;


