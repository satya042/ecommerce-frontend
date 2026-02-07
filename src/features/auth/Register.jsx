import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, Typography, Checkbox, Select, Upload, Avatar } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useToast } from "../../context/ToastContext";
import { useMutation } from "@tanstack/react-query";
import { authAPI } from "../../configs/apiClient";
import { extractUserFromToken } from "../../utils/jwtUtils";
import styles from "./styles/Register.module.css";

const { Title, Text } = Typography;
const { Option } = Select;

const Register = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  
  // Extract role from response (helper function)
  const extractRole = (userData) => {
    if (userData?.role) {
      return userData.role.toLowerCase();
    }
    return null;
  };

  const { mutate: registerUser, isPending } = useMutation({
    mutationFn: authAPI.register,
    onSuccess: (data) => {
      const accessToken = data.data.accessToken;
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

      showToast("Account created successfully", "success");

      // Check if user is admin and redirect accordingly
      const userRole = extractRole(extractedUser);
      if (userRole === "admin") {
        navigate("/admin/app/ecommerce/dashboard");
      } else {
        navigate("/");
      }
    },
    onError: (err) => {
      console.error("Registration Error:", err);
      showToast(err || "Registration failed. Please try again.", "error");
    },
  });

  // Handle avatar upload
  const handleAvatarUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatarPreview(e.target.result);
      formRef.current?.setFieldsValue({ avatar: e.target.result });
    };
    reader.readAsDataURL(file);
    return false; // Prevent default upload
  };

  const onFinish = async (values) => {
    // Prevent double submission
    if (isPending) return;

    // Validate form
    if (!values.fullName?.trim()) {
      showToast("Full name is required", "error");
      return;
    }
    if (!values.email?.trim()) {
      showToast("Email is required", "error");
      return;
    }
    if (!values.password) {
      showToast("Password is required", "error");
      return;
    }
    if (values.password !== values.confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }
    if (!values.gender) {
      showToast("Please select your gender", "error");
      return;
    }
    if (!values.phone?.trim()) {
      showToast("Phone number is required", "error");
      return;
    }

    const signupRequest = {
      fullName: values.fullName.trim(),
      username: values.email.trim(),
      password: values.password,
      gender: values.gender,
      avatar: values.avatar || null, // Base64 or null
      phone: values.phone.trim(),
    };

    registerUser(signupRequest);
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
          ref={formRef}
          layout="vertical"
          onFinish={onFinish}
          className={styles.form}
        >
          {/* Avatar Upload - Full Width */}
          <Form.Item
            label="Profile Picture"
            name="avatar"
            className={styles.full_width}
          >
            <div className={styles.avatar_upload}>
              <div className={styles.avatar_preview}>
                {avatarPreview ? (
                  <Avatar size={80} src={avatarPreview} />
                ) : (
                  <Avatar size={80} style={{ backgroundColor: "#679830" }}>
                    U
                  </Avatar>
                )}
              </div>
              <Upload
                accept="image/*"
                maxCount={1}
                beforeUpload={handleAvatarUpload}
                showUploadList={false}
              >
                <Button icon={<PlusOutlined />}>
                  Upload Photo
                </Button>
              </Upload>
            </div>
          </Form.Item>

          {/* Two Column Layout */}
          <div className={styles.form_row}>
            {/* Full Name - Left */}
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[
                { required: true, message: "Please enter your full name" },
                { min: 2, message: "Full name must be at least 2 characters" },
              ]}
              className={styles.form_col}
            >
              <Input placeholder="John Doe" size="large" />
            </Form.Item>

            {/* Email - Right */}
            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email address" },
              ]}
              className={styles.form_col}
            >
              <Input placeholder="you@example.com" size="large" type="email" />
            </Form.Item>
          </div>

          {/* Two Column Layout */}
          <div className={styles.form_row}>
            {/* Gender - Left */}
            <Form.Item
              label="Gender"
              name="gender"
              rules={[
                { required: true, message: "Please select your gender" },
              ]}
              className={styles.form_col}
            >
              <Select placeholder="Select your gender" size="large">
                <Option value="MALE">Male</Option>
                <Option value="FEMALE">Female</Option>
                <Option value="OTHER">Other</Option>
              </Select>
            </Form.Item>

            {/* Phone Number - Right */}
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                { required: true, message: "Please enter your phone number" },
                {
                  pattern: /^[0-9+\-\s()]*$/,
                  message: "Please enter a valid phone number",
                },
                { min: 10, message: "Phone number must be at least 10 digits" },
              ]}
              className={styles.form_col}
            >
              <Input placeholder="+1 (555) 123-4567" size="large" />
            </Form.Item>
          </div>

          {/* Two Column Layout */}
          <div className={styles.form_row}>
            {/* Password - Left */}
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
                { min: 6, message: "Password must be at least 6 characters" },
              ]}
              className={styles.form_col}
            >
              <Input.Password placeholder="••••••••" size="large" />
            </Form.Item>

            {/* Confirm Password - Right */}
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
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
              className={styles.form_col}
            >
              <Input.Password placeholder="••••••••" size="large" />
            </Form.Item>
          </div>

          {/* Terms & Conditions */}
          <Form.Item name="terms" valuePropName="checked" noStyle>
            <Checkbox>
              I agree to the <Link to="/terms">Terms & Conditions</Link>
            </Checkbox>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item className={styles.full_width}>
            <Button
              type="primary"
              htmlType="submit"
              loading={isPending}
              disabled={isPending}
              block
              size="large"
              className={styles.button}
            >
              {isPending ? "Creating account..." : "Create account"}
            </Button>
          </Form.Item>
        </Form>

        {/* Login Link */}
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