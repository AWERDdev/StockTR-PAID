# StockTR Backend Routes

Complete documentation of all backend routes and their implementations in the StockTR application.

## 🛣️ Route Structure

The backend uses Express.js with a modular route structure organized by functionality:

```
Routes/
├── LoginRoute.js     # Authentication routes
├── SignupRoute.js    # User registration routes
└── Stock.js          # Stock and watchlist routes
```

## 🔐 Authentication Routes

### LoginRoute.js

**File Location**: `API/Routes/LoginRoute.js`

**Purpose**: Handle user authentication and login functionality.

**Route**: `POST /api/auth/login`

**Implementation Details**:
- Validates user credentials (email and password)
- Compares hashed passwords using bcrypt
- Generates JWT token upon successful authentication
- Returns user data and token
- Handles authentication errors

**Middleware Used**:
- Input validation middleware
- Password hashing verification
- JWT token generation

**Error Handling**:
- Invalid credentials (401)
- Missing required fields (400)
- Server errors (500)

---

### SignupRoute.js

**File Location**: `API/Routes/SignupRoute.js`

**Purpose**: Handle new user registration and account creation.

**Route**: `POST /api/auth/signup`

**Implementation Details**:
- Validates user input (username, email, password)
- Checks for existing users (username/email uniqueness)
- Hashes password using bcrypt
- Creates new user in database
- Generates JWT token for immediate login
- Returns user data and token

**Validation Rules**:
- Username: 3-20 characters, alphanumeric
- Email: Valid email format, unique
- Password: Minimum 6 characters

**Database Operations**:
- User existence check
- New user creation
- Index validation

---

## 👤 User Management Routes

### User Profile Routes

**Routes Handled**:
- `GET /api/user/profile` - Retrieve user profile
- `PUT /api/user/profile` - Update user profile
- `PUT /api/user/password` - Update user password
- `PUT /api/user/profile-icon` - Update profile icon

**Authentication Required**: All routes require valid JWT token

**Implementation Details**:
- JWT token validation middleware
- User data retrieval and updates
- Password change with current password verification
- Profile icon upload and storage

---

## 📈 Stock Data Routes

### Stock.js

**File Location**: `API/Routes/Stock.js`

**Purpose**: Handle stock data retrieval and watchlist management.

**Routes Handled**:

#### `GET /api/stocks`
- **Purpose**: Get stock information for a specific symbol
- **Query Parameters**: `symbol` (required)
- **Implementation**: Fetches real-time stock data from external API
- **Response**: Stock price, change, volume, company info

#### `GET /api/stocks/search`
- **Purpose**: Search for stocks by symbol or company name
- **Query Parameters**: `query` (required), `limit` (optional)
- **Implementation**: Performs fuzzy search on stock database
- **Response**: Array of matching stocks

#### `GET /api/watchlist`
- **Purpose**: Get user's watchlist
- **Authentication**: Required
- **Implementation**: Retrieves user's saved stocks with current data
- **Response**: Array of watchlist items with real-time prices

#### `POST /api/watchlist`
- **Purpose**: Add stock to user's watchlist
- **Authentication**: Required
- **Body**: `{ symbol, companyName }`
- **Implementation**: Adds stock to user's watchlist
- **Validation**: Checks for duplicate entries

#### `DELETE /api/watchlist/:symbol`
- **Purpose**: Remove stock from user's watchlist
- **Authentication**: Required
- **Parameters**: `symbol` in URL
- **Implementation**: Removes specific stock from watchlist

---

## 🔧 Route Middleware

### Authentication Middleware

**File Location**: `API/AUTH/UserAuth.js`

**Purpose**: Verify JWT tokens and authenticate requests.

**Implementation**:
- Extracts JWT token from Authorization header
- Verifies token validity and expiration
- Decodes user information
- Attaches user data to request object
- Handles token errors and invalid tokens

**Usage**:
```javascript
// Applied to protected routes
router.get('/profile', authenticateToken, getUserProfile);
```

### Input Validation Middleware

**Purpose**: Validate and sanitize request data.

**Features**:
- Required field validation
- Data type checking
- Input sanitization
- Custom validation rules

### Error Handling Middleware

**Purpose**: Centralized error handling for all routes.

**Features**:
- Consistent error response format
- HTTP status code mapping
- Error logging
- Client-friendly error messages

---

## 📊 Route Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // Response data
  },
  "error": null
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "data": null,
  "error": "Detailed error information"
}
```

---

## 🔄 Route Flow

### Authentication Flow
1. **Request** → Route handler
2. **Validation** → Input validation middleware
3. **Authentication** → JWT verification middleware
4. **Processing** → Business logic
5. **Database** → Data operations
6. **Response** → Formatted response

### Stock Data Flow
1. **Request** → Stock route handler
2. **Validation** → Symbol validation
3. **External API** → Stock data fetch
4. **Processing** → Data formatting
5. **Response** → Stock information

### Watchlist Flow
1. **Request** → Watchlist route handler
2. **Authentication** → User verification
3. **Database** → Watchlist operations
4. **Stock Data** → Real-time price fetch
5. **Response** → Combined data

---

## 🛡️ Security Features

### Route Security
- **JWT Authentication**: All protected routes require valid tokens
- **Input Validation**: All inputs are validated and sanitized
- **Rate Limiting**: Prevents abuse and DDoS attacks
- **CORS Protection**: Cross-origin request handling
- **Error Handling**: Secure error messages without data leakage

### Data Protection
- **Password Hashing**: bcrypt with salt rounds
- **Token Expiration**: Configurable JWT expiration
- **Secure Headers**: HTTP security headers
- **Input Sanitization**: XSS and injection prevention

---

## 📈 Performance Optimization

### Route Optimization
- **Caching**: Stock data caching to reduce API calls
- **Database Indexing**: Optimized queries with proper indexes
- **Response Compression**: Gzip compression for responses
- **Connection Pooling**: Database connection optimization

### Monitoring
- **Request Logging**: All requests logged for monitoring
- **Error Tracking**: Error logging and alerting
- **Performance Metrics**: Response time monitoring
- **Usage Analytics**: Route usage statistics

---

## 🔧 Configuration

### Route Configuration
```javascript
// Route-specific configuration
const routeConfig = {
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  },
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true
  }
};
```

### Environment Variables
```env
# Route configuration
PORT=5000
CORS_ORIGIN=http://localhost:3000
JWT_SECRET=your-secret-key
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=100
```

---

## 📝 Route Documentation

### API Documentation
Each route includes:
- **Purpose**: What the route does
- **Method**: HTTP method (GET, POST, PUT, DELETE)
- **URL**: Complete endpoint URL
- **Parameters**: Query parameters, body data, URL parameters
- **Authentication**: Whether authentication is required
- **Response**: Expected response format
- **Errors**: Possible error responses

### Testing Routes
- **Unit Tests**: Individual route testing
- **Integration Tests**: Full request/response testing
- **Authentication Tests**: Token validation testing
- **Error Tests**: Error handling verification

---

## 🔄 Route Updates

### Versioning Strategy
- **URL Versioning**: `/api/v1/route`
- **Header Versioning**: `Accept: application/vnd.api+json;version=1`
- **Backward Compatibility**: Maintained for existing clients

### Migration Process
1. **New Route Creation**: Create new versioned route
2. **Testing**: Thorough testing of new routes
3. **Documentation**: Update API documentation
4. **Client Updates**: Update frontend to use new routes
5. **Deprecation**: Mark old routes as deprecated
6. **Removal**: Remove deprecated routes after grace period

---

**Next**: See [Database Models](./database-models.md) for detailed model documentation. 