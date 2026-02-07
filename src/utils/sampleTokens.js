/**
 * Sample JWT Tokens for Testing
 * These are example tokens to understand the structure
 */

/**
 * Example User Token Payload:
 * {
 *   "id": "123",
 *   "username": "john_doe",
 *   "fullName": "John Doe",
 *   "email": "john@example.com",
 *   "role": "user",
 *   "iat": 1703000000,
 *   "exp": 1703003600
 * }
 */

/**
 * Example Admin Token Payload:
 * {
 *   "id": "456",
 *   "username": "admin_user",
 *   "fullName": "Admin User",
 *   "email": "admin@example.com",
 *   "role": "admin",
 *   "iat": 1703000000,
 *   "exp": 1703003600
 * }
 */

// Sample Base64 encoded payloads (you can decode these):
// User: eyJpZCI6IjEyMyIsInVzZXJuYW1lIjoiam9obl9kb2UiLCJmdWxsTmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZSI6InVzZXIifQ==
// Admin: eyJpZCI6IjQ1NiIsInVzZXJuYW1lIjoiYWRtaW5fdXNlciIsImZ1bGxOYW1lIjoiQWRtaW4gVXNlciIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4ifQ==

import { decodeToken, extractUserFromToken, isTokenExpired } from "../utils/jwtUtils";

/**
 * Example usage:
 * 
 * const token = "eyJhbGci..."; // Your JWT token
 * 
 * // Extract just the user info
 * const user = extractUserFromToken(token);
 * console.log(user.fullName); // "John Doe"
 * console.log(user.role); // "user"
 * 
 * // Get full payload
 * const payload = decodeToken(token);
 * console.log(payload);
 * 
 * // Check expiration
 * if (isTokenExpired(token)) {
 *   console.log("Token is expired");
 * }
 */

// Test function to verify JWT decoding
export const testJWTDecoding = () => {
  // Example token structure (not a real token)
  const examplePayload = {
    id: "123",
    username: "john_doe",
    fullName: "John Doe",
    email: "john@example.com",
    role: "user",
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
  };

  console.log("Example JWT Payload:", examplePayload);
  console.log("User extracted would be:", {
    id: examplePayload.id,
    username: examplePayload.username,
    fullName: examplePayload.fullName,
    email: examplePayload.email,
    role: examplePayload.role,
  });
};

/**
 * Backend should respond with:
 * {
 *   "accessToken": "eyJhbGci...",
 *   "refreshToken": "eyJhbGci...",
 *   "expiresIn": 3600,
 *   "user": {
 *     "id": "123",
 *     "username": "john_doe",
 *     "fullName": "John Doe",
 *     "email": "john@example.com",
 *     "role": "user"
 *   }
 * }
 */
