# StockTR API Endpoints

Complete documentation for all available API endpoints in the StockTR application.

## 🔐 Authentication Endpoints

### POST `/api/auth/signup`

Register a new user account.

**Request Body:**
```json
{
  "username": "string (required, 3-20 characters)",
  "email": "string (required, valid email format)",
  "password": "string (required, minimum 6 characters)"
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "username": "john_doe",
      "email": "john@example.com",
      "profileIcon": null,
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt_token_here"
  },
  "error": null
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "data": null,
  "error": "Username already exists"
}
```

---

### POST `/api/auth/login`

Authenticate existing user and receive JWT token.

**Request Body:**
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "username": "john_doe",
      "email": "john@example.com",
      "profileIcon": "icon_url",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt_token_here"
  },
  "error": null
}
```

**Response (Error - 401):**
```json
{
  "success": false,
  "message": "Invalid credentials",
  "data": null,
  "error": "Email or password is incorrect"
}
```

---

## 👤 User Management Endpoints

### GET `/api/user/profile`

Get current user's profile information.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "id": "user_id",
    "username": "john_doe",
    "email": "john@example.com",
    "profileIcon": "icon_url",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "error": null
}
```

**Response (Error - 401):**
```json
{
  "success": false,
  "message": "Unauthorized",
  "data": null,
  "error": "Invalid or missing token"
}
```

---

### PUT `/api/user/profile`

Update user profile information.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "username": "string (optional, 3-20 characters)",
  "email": "string (optional, valid email format)"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "user_id",
    "username": "new_username",
    "email": "newemail@example.com",
    "profileIcon": "icon_url",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "error": null
}
```

---

### PUT `/api/user/password`

Update user password.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "currentPassword": "string (required)",
  "newPassword": "string (required, minimum 6 characters)"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Password updated successfully",
  "data": null,
  "error": null
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Password update failed",
  "data": null,
  "error": "Current password is incorrect"
}
```

---

### PUT `/api/user/profile-icon`

Update user profile icon.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "profileIcon": "string (required, valid URL or base64)"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Profile icon updated successfully",
  "data": {
    "profileIcon": "new_icon_url"
  },
  "error": null
}
```

---

## 📈 Stock Data Endpoints

### GET `/api/stocks`

Get stock information for a specific symbol.

**Query Parameters:**
```
symbol: string (required) - Stock symbol (e.g., AAPL, GOOGL)
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Stock data retrieved successfully",
  "data": {
    "symbol": "AAPL",
    "companyName": "Apple Inc.",
    "currentPrice": 150.25,
    "change": 2.50,
    "changePercent": 1.69,
    "volume": 12345678,
    "marketCap": "2.5T",
    "peRatio": 25.5,
    "dividendYield": 0.65
  },
  "error": null
}
```

**Response (Error - 404):**
```json
{
  "success": false,
  "message": "Stock not found",
  "data": null,
  "error": "Symbol INVALID not found"
}
```

---

### GET `/api/stocks/search`

Search for stocks by company name or symbol.

**Query Parameters:**
```
query: string (required) - Search term
limit: number (optional, default: 10) - Maximum results
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Search completed successfully",
  "data": [
    {
      "symbol": "AAPL",
      "companyName": "Apple Inc.",
      "exchange": "NASDAQ"
    },
    {
      "symbol": "AAPL.L",
      "companyName": "Apple Inc.",
      "exchange": "LSE"
    }
  ],
  "error": null
}
```

---

## 📋 Watchlist Endpoints

### GET `/api/watchlist`

Get user's watchlist.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Watchlist retrieved successfully",
  "data": [
    {
      "id": "watchlist_id",
      "symbol": "AAPL",
      "companyName": "Apple Inc.",
      "currentPrice": 150.25,
      "change": 2.50,
      "changePercent": 1.69,
      "addedAt": "2024-01-01T00:00:00.000Z"
    },
    {
      "id": "watchlist_id_2",
      "symbol": "GOOGL",
      "companyName": "Alphabet Inc.",
      "currentPrice": 2750.00,
      "change": -15.50,
      "changePercent": -0.56,
      "addedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "error": null
}
```

---

### POST `/api/watchlist`

Add a stock to user's watchlist.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "symbol": "string (required) - Stock symbol",
  "companyName": "string (optional) - Company name"
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Stock added to watchlist successfully",
  "data": {
    "id": "watchlist_id",
    "symbol": "AAPL",
    "companyName": "Apple Inc.",
    "userId": "user_id",
    "addedAt": "2024-01-01T00:00:00.000Z"
  },
  "error": null
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Failed to add stock to watchlist",
  "data": null,
  "error": "Stock already exists in watchlist"
}
```

---

### DELETE `/api/watchlist/:symbol`

Remove a stock from user's watchlist.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**URL Parameters:**
```
symbol: string (required) - Stock symbol to remove
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Stock removed from watchlist successfully",
  "data": null,
  "error": null
}
```

**Response (Error - 404):**
```json
{
  "success": false,
  "message": "Stock not found in watchlist",
  "data": null,
  "error": "Stock AAPL not found in watchlist"
}
```

---

## 🔍 Error Codes Reference

| Status Code | Description | Common Causes |
|-------------|-------------|---------------|
| 200 | Success | Request completed successfully |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid input data, validation errors |
| 401 | Unauthorized | Missing or invalid JWT token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource already exists |
| 500 | Internal Server Error | Server-side error |

## 🔧 Rate Limiting

- **Authentication endpoints**: 5 requests per minute
- **Stock data endpoints**: 100 requests per minute
- **Watchlist endpoints**: 50 requests per minute
- **User management endpoints**: 20 requests per minute

## 📝 Notes

1. **Authentication**: All endpoints except `/api/auth/signup` and `/api/auth/login` require a valid JWT token in the Authorization header.

2. **Content-Type**: All requests should use `application/json` content type.

3. **CORS**: The API supports CORS for frontend integration.

4. **Validation**: All input data is validated and sanitized before processing.

5. **Error Handling**: All errors return consistent JSON response format.

---

**Next**: See [API Examples](./api-examples.md) for practical usage examples. 