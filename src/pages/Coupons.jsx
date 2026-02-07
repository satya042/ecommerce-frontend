import React from "react";
import { Card, Typography, Button, Empty } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Coupons = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "2rem" }}>
      <Card>
        <Title level={2}>My Coupons</Title>
        <Empty
          description="No coupons available"
          style={{ marginTop: "2rem" }}
        />
        <Button type="primary" onClick={() => navigate(-1)} style={{ marginTop: "1rem" }}>
          Go Back
        </Button>
      </Card>
    </div>
  );
};

export default Coupons;
