/**
 * API Usage Examples
 * 
 * This file shows how to use the new API endpoints in your React components
 */

import { useQuery, useMutation } from "@tanstack/react-query";
import {
  userAPI,
  orderAPI,
  adminAPI,
  cartAPI,
  productAPI,
} from "../configs/apiClient";

/**
 * ============================================
 * 1. USER PROFILE (Protected)
 * ============================================
 */

// Example Component: Get User Profile
export const UserProfileExample = () => {
  const { data: profile, isLoading, error } = useQuery({
    queryKey: ["userProfile"],
    queryFn: userAPI.getProfile,
  });

  if (isLoading) return <div>Loading profile...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>{profile?.fullName}</h2>
      <p>Email: {profile?.email}</p>
      <p>Phone: {profile?.phone}</p>
    </div>
  );
};

// Example: Update User Profile
export const UpdateProfileExample = () => {
  const mutation = useMutation({
    mutationFn: userAPI.updateProfile,
    onSuccess: (data) => {
      console.log("Profile updated:", data);
      // Refetch profile data
    },
    onError: (error) => {
      console.error("Update failed:", error);
    },
  });

  const handleUpdate = () => {
    mutation.mutate({
      fullName: "Jane Doe",
      phone: "+1 555 0123",
    });
  };

  return <button onClick={handleUpdate}>Update Profile</button>;
};

/**
 * ============================================
 * 2. ORDERS (Protected)
 * ============================================
 */

// Example: Get All Orders
export const OrdersListExample = () => {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: orderAPI.getOrders,
  });

  if (isLoading) return <div>Loading orders...</div>;

  return (
    <div>
      {orders?.map((order) => (
        <div key={order.id}>
          <h3>Order {order.id}</h3>
          <p>Status: {order.status}</p>
          <p>Total: ${order.totalAmount}</p>
        </div>
      ))}
    </div>
  );
};

// Example: Get Specific Order
export const OrderDetailsExample = ({ orderId }) => {
  const { data: order, isLoading } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => orderAPI.getOrder(orderId),
  });

  if (isLoading) return <div>Loading order...</div>;

  return (
    <div>
      <h2>Order {order?.id}</h2>
      <p>Status: {order?.status}</p>
      <p>Items: {order?.items?.length}</p>
      <p>Total: ${order?.totalAmount}</p>
    </div>
  );
};

// Example: Create Order
export const CreateOrderExample = () => {
  const mutation = useMutation({
    mutationFn: orderAPI.createOrder,
    onSuccess: (data) => {
      console.log("Order created:", data);
      // Redirect to order details
    },
  });

  const handleCreateOrder = () => {
    mutation.mutate({
      items: [
        { productId: "prod_123", quantity: 2, price: 49.99 },
        { productId: "prod_456", quantity: 1, price: 29.99 },
      ],
      totalAmount: 129.97,
      shippingAddress: {
        street: "123 Main St",
        city: "Springfield",
        zip: "12345",
      },
    });
  };

  return <button onClick={handleCreateOrder}>Create Order</button>;
};

/**
 * ============================================
 * 3. ADMIN - PRODUCTS (Protected, Admin Only)
 * ============================================
 */

// Example: Get All Products (Admin)
export const AdminProductsExample = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["adminProducts"],
    queryFn: adminAPI.getProducts,
  });

  if (isLoading) return <div>Loading products...</div>;

  return (
    <div>
      {products?.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>Price: ${product.price}</p>
          <p>Stock: {product.stock}</p>
        </div>
      ))}
    </div>
  );
};

// Example: Create Product (Admin)
export const CreateProductExample = () => {
  const mutation = useMutation({
    mutationFn: adminAPI.createProduct,
    onSuccess: (data) => {
      console.log("Product created:", data);
      // Refetch products list
    },
    onError: (error) => {
      console.error("Creation failed:", error);
    },
  });

  const handleCreateProduct = () => {
    mutation.mutate({
      name: "New Product",
      description: "Product description",
      price: 99.99,
      category: "Electronics",
      stock: 50,
      image: "https://example.com/image.jpg",
    });
  };

  return (
    <button onClick={handleCreateProduct} disabled={mutation.isPending}>
      {mutation.isPending ? "Creating..." : "Create Product"}
    </button>
  );
};

// Example: Update Product (Admin)
export const UpdateProductExample = ({ productId }) => {
  const mutation = useMutation({
    mutationFn: (data) => adminAPI.updateProduct(productId, data),
    onSuccess: () => {
      console.log("Product updated");
    },
  });

  const handleUpdate = () => {
    mutation.mutate({
      price: 79.99,
      stock: 40,
    });
  };

  return <button onClick={handleUpdate}>Update Product</button>;
};

// Example: Delete Product (Admin)
export const DeleteProductExample = ({ productId }) => {
  const mutation = useMutation({
    mutationFn: () => adminAPI.deleteProduct(productId),
    onSuccess: () => {
      console.log("Product deleted");
    },
  });

  return (
    <button onClick={() => mutation.mutate()} disabled={mutation.isPending}>
      {mutation.isPending ? "Deleting..." : "Delete Product"}
    </button>
  );
};

/**
 * ============================================
 * 4. ADMIN - USERS (Protected, Admin Only)
 * ============================================
 */

// Example: Get All Users (Admin)
export const AdminUsersExample = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: adminAPI.getUsers,
  });

  if (isLoading) return <div>Loading users...</div>;

  return (
    <div>
      {users?.map((user) => (
        <div key={user.id}>
          <h3>{user.fullName}</h3>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      ))}
    </div>
  );
};

// Example: Get Specific User (Admin)
export const AdminUserDetailsExample = ({ userId }) => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["adminUser", userId],
    queryFn: () => adminAPI.getUser(userId),
  });

  if (isLoading) return <div>Loading user...</div>;

  return (
    <div>
      <h2>{user?.fullName}</h2>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
      <p>Phone: {user?.phone}</p>
    </div>
  );
};

// Example: Update User (Admin)
export const AdminUpdateUserExample = ({ userId }) => {
  const mutation = useMutation({
    mutationFn: (data) => adminAPI.updateUser(userId, data),
    onSuccess: () => {
      console.log("User updated");
    },
  });

  const handleMakeAdmin = () => {
    mutation.mutate({
      role: "admin",
    });
  };

  return (
    <button onClick={handleMakeAdmin} disabled={mutation.isPending}>
      {mutation.isPending ? "Updating..." : "Make Admin"}
    </button>
  );
};

// Example: Delete User (Admin)
export const AdminDeleteUserExample = ({ userId }) => {
  const mutation = useMutation({
    mutationFn: () => adminAPI.deleteUser(userId),
    onSuccess: () => {
      console.log("User deleted");
    },
  });

  return (
    <button onClick={() => mutation.mutate()} disabled={mutation.isPending}>
      {mutation.isPending ? "Deleting..." : "Delete User"}
    </button>
  );
};

/**
 * ============================================
 * 5. ADMIN - ORDERS (Protected, Admin Only)
 * ============================================
 */

// Example: Get All Orders (Admin)
export const AdminOrdersExample = () => {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["adminOrders"],
    queryFn: adminAPI.getOrders,
  });

  if (isLoading) return <div>Loading orders...</div>;

  return (
    <div>
      {orders?.map((order) => (
        <div key={order.id}>
          <h3>Order {order.id}</h3>
          <p>Customer: {order.customerName}</p>
          <p>Status: {order.status}</p>
          <p>Total: ${order.totalAmount}</p>
        </div>
      ))}
    </div>
  );
};

// Example: Update Order (Admin)
export const AdminUpdateOrderExample = ({ orderId }) => {
  const mutation = useMutation({
    mutationFn: (data) => adminAPI.updateOrder(orderId, data),
    onSuccess: () => {
      console.log("Order updated");
    },
  });

  const handleShip = () => {
    mutation.mutate({
      status: "shipped",
      trackingNumber: "TRACK123456",
    });
  };

  return (
    <button onClick={handleShip} disabled={mutation.isPending}>
      {mutation.isPending ? "Updating..." : "Mark as Shipped"}
    </button>
  );
};

/**
 * ============================================
 * 6. ERROR HANDLING PATTERN
 * ============================================
 */

// Example: Comprehensive error handling
export const ErrorHandlingExample = () => {
  const mutation = useMutation({
    mutationFn: userAPI.updateProfile,
    onSuccess: (data) => {
      console.log("Success:", data);
      // Show success toast
    },
    onError: (error) => {
      // Error messages:
      // "Token expired" -> Auto-refresh will handle, retry happens automatically
      // "Unauthorized" -> Insufficient permissions
      // "Validation error" -> Check request data
      // "Server error" -> Backend issue
      
      console.error("Error:", error);
      // Show error toast to user
    },
  });

  return (
    <div>
      {mutation.isError && (
        <div style={{ color: "red" }}>
          Error: {mutation.error?.message || "Something went wrong"}
        </div>
      )}
      <button onClick={() => mutation.mutate({ fullName: "New Name" })}>
        Update
      </button>
    </div>
  );
};

/**
 * ============================================
 * 7. TOKEN REFRESH IN COMPONENTS
 * ============================================
 */

import { useAuth } from "../context/AuthContext";

// Example: Manual token refresh if needed
export const ManualRefreshExample = () => {
  const { refreshAccessToken, user } = useAuth();

  const handleRefresh = async () => {
    try {
      await refreshAccessToken();
      console.log("Token refreshed successfully");
    } catch (error) {
      console.error("Refresh failed, user logged out");
      // User will be redirected to login automatically
    }
  };

  return (
    <div>
      <p>Hello {user?.fullName}</p>
      <button onClick={handleRefresh}>Refresh Token</button>
    </div>
  );
};

/**
 * ============================================
 * 8. COMMON PATTERNS
 * ============================================
 */

// Redirect when unauthorized (401)
// This is handled automatically by apiClient interceptor
// User will be redirected to /login

// Retry failed requests after token refresh
// This is handled automatically by apiClient interceptor
// Failed requests are queued and retried with new token

// CSRF Protection
// Ensure backend sends CSRF token if needed
// Include in request headers
