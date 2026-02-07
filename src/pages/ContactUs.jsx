import React from "react";
import { Card, Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

const ContactUs = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "2rem" }}>
      <Card>
        <Title level={2}>Contact Us</Title>
        <Paragraph>
          We would love to hear from you! Get in touch with us for any inquiries or support.
        </Paragraph>
        
        <div style={{ marginTop: "2rem" }}>
          <Paragraph>
            <strong>Email:</strong> support@ecommerce.com
          </Paragraph>
          <Paragraph>
            <strong>Phone:</strong> +1 (555) 123-4567
          </Paragraph>
          <Paragraph>
            <strong>Address:</strong> 123 Main St, City, Country
          </Paragraph>
        </div>

        <Button type="primary" onClick={() => navigate(-1)} style={{ marginTop: "1rem" }}>
          Go Back
        </Button>
      </Card>
    </div>
  );
};

export default ContactUs;
