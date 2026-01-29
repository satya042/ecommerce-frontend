import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Card, Typography } from "antd";
import { useToast } from "../../context/ToastContext";
import styles from "./styles/ForgotPassword.module.css";

const { Title, Text } = Typography;

const ForgotPassword = () => {
  const { showToast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const onFinish = (values) => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      showToast(
        `If an account exists for ${values.email}, a reset link has been sent.`,
        "success"
      );
    }, 800);
  };

  return (
    <div className={styles.forgot_password_container}>
      <Card className={styles.card}>
        <Title level={3} className={styles.title}>
          Forgot password
        </Title>
        <Text type="secondary" className={styles.text_secondary}>
          Enter your email and we&apos;ll send you instructions to reset it.
        </Text>

        <Form
          layout="vertical"
          className={styles.form}
          onFinish={onFinish}
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

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              block
              className={styles.button}
            >
              Send reset link
            </Button>
          </Form.Item>
        </Form>

        <div className={styles.footer}>
          <Text type="secondary" className={styles.footer_text}>
            Remember your password?{" "}
            <Link to="/login" className={styles.footer_link}>
              Back to login
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPassword;


