import React, { useMemo, useState } from "react";
import { Steps, Form, Input, Button, Radio } from "antd";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import styles from "./styles/Checkout.module.css";

const { Step } = Steps;

const Checkout = () => {
  const { items, totals, clearCart } = useCart();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [current, setCurrent] = useState(0);
  const [address, setAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const estimatedDelivery = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toLocaleDateString();
  }, []);

  const onAddressFinish = (values) => {
    setAddress(values);
    setCurrent(1);
  };

  const placeOrder = () => {
    setPlacingOrder(true);
    setTimeout(() => {
      const id = `ORD-${Math.floor(Math.random() * 900000 + 100000)}`;
      setOrderId(id);
      clearCart();
      setPlacingOrder(false);
      setCurrent(3);
      showToast("Order placed successfully", "success");
    }, 900);
  };

  if (!items.length && !orderId) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1rem",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
          Your cart is empty
        </h2>
        <p style={{ color: "#6b7280" }}>Add items before checking out.</p>
      </div>
    );
  }

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order placed:", formData);
  };

  const subtotal = 50.0;
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div style={{ padding: "2rem 1.5rem", maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.75rem", marginBottom: "1.5rem" }}>Checkout</h1>

      <Steps current={current} responsive style={{ marginBottom: "2rem" }}>
        <Step title="Address" />
        <Step title="Review" />
        <Step title="Payment" />
        <Step title="Done" />
      </Steps>

      {current === 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,2fr) minmax(0,1fr)",
            gap: "2rem",
          }}
        >
          <div>
            <h2 style={{ fontSize: "1.1rem", marginBottom: "0.75rem" }}>
              Shipping address
            </h2>
            <Form layout="vertical" onFinish={onAddressFinish}>
              <Form.Item
                label="Full name"
                name="name"
                initialValue={user?.name}
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[{ required: true, message: "Please enter phone" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Address line"
                name="line1"
                rules={[{ required: true, message: "Please enter address" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="City" name="city">
                <Input />
              </Form.Item>
              <Form.Item label="Postal code" name="zip">
                <Input />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  backgroundColor: "#679830",
                  borderColor: "#679830",
                }}
              >
                Continue
              </Button>
            </Form>
          </div>
          <div>
            <h3 style={{ marginBottom: "0.5rem" }}>Order summary</h3>
            <p style={{ fontSize: "0.9rem", color: "#6b7280" }}>
              Estimated delivery by <strong>{estimatedDelivery}</strong>.
            </p>
          </div>
        </div>
      )}

      {current === 1 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,2fr) minmax(0,1fr)",
            gap: "2rem",
          }}
        >
          <div>
            <h2 style={{ fontSize: "1.1rem", marginBottom: "0.75rem" }}>
              Review items
            </h2>
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                }}
              >
                <span>
                  {item.title} × {item.quantity}
                </span>
                <span>£{(item.priceNumber || 0) * item.quantity}</span>
              </div>
            ))}
          </div>
          <div>
            <h3 style={{ marginBottom: "0.5rem" }}>Shipping to</h3>
            {address && (
              <p style={{ fontSize: "0.9rem" }}>
                {address.name}
                <br />
                {address.line1}
                <br />
                {address.city} {address.zip}
                <br />
                Phone: {address.phone}
              </p>
            )}
            <h3 style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
              Price details
            </h3>
            <p>Subtotal: £{totals.subtotal.toFixed(2)}</p>
            <p>Tax: £{totals.tax.toFixed(2)}</p>
            <p>Shipping: {totals.shipping ? `£${totals.shipping.toFixed(2)}` : "Free"}</p>
            <p style={{ fontWeight: 600, marginTop: "0.5rem" }}>
              Total: £{totals.total.toFixed(2)}
            </p>
            <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
              <Button onClick={() => setCurrent(0)}>Back</Button>
              <Button
                type="primary"
                onClick={() => setCurrent(2)}
                style={{
                  backgroundColor: "#679830",
                  borderColor: "#679830",
                }}
              >
                Continue to payment
              </Button>
            </div>
          </div>
        </div>
      )}

      {current === 2 && (
        <div style={{ maxWidth: 500 }}>
          <h2 style={{ fontSize: "1.1rem", marginBottom: "0.75rem" }}>
            Payment
          </h2>
          <Radio.Group
            onChange={(e) => setPaymentMethod(e.target.value)}
            value={paymentMethod}
          >
            <Radio value="cod">Cash on delivery</Radio>
            <Radio value="card">Card (simulated)</Radio>
          </Radio.Group>

          {paymentMethod === "card" && (
            <div style={{ marginTop: "1rem" }}>
              <Form layout="vertical">
                <Form.Item label="Card number">
                  <Input placeholder="1111 2222 3333 4444" />
                </Form.Item>
                <Form.Item label="Name on card">
                  <Input />
                </Form.Item>
              </Form>
            </div>
          )}

          <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.5rem" }}>
            <Button onClick={() => setCurrent(1)}>Back</Button>
            <Button
              type="primary"
              loading={placingOrder}
              onClick={placeOrder}
              style={{
                backgroundColor: "#679830",
                borderColor: "#679830",
              }}
            >
              Place order
            </Button>
          </div>
        </div>
      )}

      {current === 3 && (
        <div
          style={{
            minHeight: "40vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "1.6rem", marginBottom: "0.5rem" }}>
            Thank you for your order!
          </h2>
          <p style={{ marginBottom: "0.5rem" }}>
            Your order ID is <strong>{orderId}</strong>.
          </p>
          <p style={{ marginBottom: "1rem", fontSize: "0.9rem", color: "#6b7280" }}>
            An email confirmation will be sent shortly. Estimated delivery by{" "}
            <strong>{estimatedDelivery}</strong>.
          </p>
          <Button
            type="primary"
            onClick={() => setCurrent(0)}
            style={{
              backgroundColor: "#679830",
              borderColor: "#679830",
            }}
          >
            Continue shopping
          </Button>
        </div>
      )}
    </div>
  );
};

export default Checkout;


