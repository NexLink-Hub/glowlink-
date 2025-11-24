// Server-Side Validation Reference for GlowLink Backend
// =====================================================
// This file documents the recommended server-side validation logic to match
// the client-side Zod schemas defined in src/lib/schemas.ts

/**
 * POST /auth/login
 * Request body:
 * {
 *   email: string (must be valid email format)
 *   password: string (must be at least 8 characters)
 * }
 * 
 * Response:
 * {
 *   token: string (JWT token, should expire in ~1 hour)
 *   user: {
 *     email: string
 *     name?: string
 *   }
 * }
 * 
 * Validation rules:
 * - Email must be unique in database
 * - Email must be in valid email format (RFC 5322)
 * - Password should be hashed with bcrypt or similar (salt rounds: 10+)
 * - Only return token if credentials are valid
 * - Rate limit login attempts (e.g., 5 attempts per 15 minutes per IP)
 */

/**
 * POST /auth/register
 * Request body:
 * {
 *   firstName: string (2-100 characters)
 *   lastName: string (2-100 characters)
 *   email: string (valid email, must be unique)
 *   phone: string (must match international format)
 *   password: string (at least 8 characters)
 *   businessName: string (2-100 characters)
 *   specialty: enum ["makeup", "hair", "nails", "braids", "barber", "skincare"]
 *   location: string (2-100 characters)
 *   experience: enum ["1-2", "3-5", "5-10", "10+"]
 *   bio: string (10-500 characters)
 *   instagram?: string (optional, max 30 characters, alphanumeric + underscore + dot)
 * }
 * 
 * Response:
 * {
 *   token: string (JWT)
 *   user: {
 *     email: string
 *     name: string (firstName + lastName)
 *   }
 * }
 * 
 * Validation rules:
 * - All required fields must be present
 * - Email must be unique across all users
 * - Password should be hashed with bcrypt (salt rounds: 10+)
 * - Store specialty and experience as lowercase enums
 * - Trim all string inputs
 * - Reject suspicious patterns (SQL injection, XSS attempts)
 * - Store registration data in artists table with approval_status = "pending"
 * - Send verification email to confirm email address
 * - Return JWT only after email verification
 */

/**
 * HTTP Status Codes
 * - 200: OK (successful request)
 * - 201: Created (resource created)
 * - 400: Bad Request (validation failed)
 * - 401: Unauthorized (invalid credentials)
 * - 409: Conflict (email already exists)
 * - 429: Too Many Requests (rate limit exceeded)
 * - 500: Internal Server Error
 */

/**
 * Error Response Format
 * {
 *   error: string (machine-readable error code)
 *   message: string (human-readable error message)
 *   details?: object (field-specific errors, optional)
 * }
 * 
 * Example:
 * {
 *   error: "VALIDATION_ERROR",
 *   message: "Validation failed",
 *   details: {
 *     email: "Email already registered",
 *     password: "Password must be at least 8 characters"
 *   }
 * }
 */

/**
 * JWT Token Payload (example)
 * {
 *   sub: string (user ID)
 *   email: string
 *   role: string (enum: "artist", "client", "admin")
 *   iat: number (issued at - unix timestamp)
 *   exp: number (expiration - unix timestamp, ~3600 seconds)
 * }
 * 
 * Token should be signed with a strong secret key (min 32 bytes)
 * Use RS256 (RSA) or ES256 (ECDSA) for asymmetric signing in production
 */

/**
 * Security Recommendations
 * 1. Use HTTPS only (enforce in reverse proxy)
 * 2. Implement CORS carefully (allow specific origins only)
 * 3. Hash passwords with bcrypt, scrypt, or Argon2 (not MD5/SHA1)
 * 4. Store JWT secret in environment variables, never in code
 * 5. Implement email verification before account activation
 * 6. Use rate limiting on auth endpoints
 * 7. Log authentication attempts for security auditing
 * 8. Sanitize error messages (don't reveal if email exists/doesn't)
 * 9. Implement CSRF protection if using cookies
 * 10. Use HttpOnly, Secure, SameSite flags on authentication cookies
 */
