# StockTR Authentication System

Complete documentation of the authentication system, JWT implementation, and security features in the StockTR application.

## 🔐 Authentication Overview

The StockTR application uses **JWT (JSON Web Tokens)** for secure authentication with bcrypt password hashing and comprehensive security measures.

**Authentication Flow**:
1. User registration with password hashing
2. User login with credential verification
3. JWT token generation and validation
4. Protected route access control
5. Token refresh and expiration handling

## 🏗️ Authentication Architecture

### File Structure

```
AUTH/
└── UserAuth.js       # JWT authentication middleware

userUpdating/
├── UpdateUserPassword.js # Password update functionality
├── UserProfileIcon.js    # Profile icon management
└── UserWatchlist.js      # Watchlist operations
```

### Authentication Components

- **JWT Token Management**: Token generation, validation, and refresh
- **Password Security**: bcrypt hashing with salt rounds
- **Route Protection**: Middleware for protected endpoints
- **Session Management**: Token-based session handling
- **Security Headers**: HTTP security implementation

---

## 🔑 JWT Implementation

### UserAuth.js

**File Location**: `API/AUTH/UserAuth.js`

**Purpose**: JWT token verification and authentication middleware.

### Token Generation

```javascript
// JWT token generation for user login/signup
const generateToken = (userId, email) => {
  return jwt.sign(
    { 
      userId: userId,
      email: email,
      iat: Date.now()
    },
    process.env.JWT_SECRET,
    { 
      expiresIn: '24h' // Token expires in 24 hours
    }
  );
};
```

### Token Verification

```javascript
// Middleware to verify JWT tokens
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required',
      error: 'No token provided'
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Invalid or expired token',
        error: err.message
      });
    }

    req.user = decoded; // Attach user data to request
    next();
  });
};
```

### Token Payload Structure

```javascript
// JWT token payload
{
  "userId": "user_object_id",
  "email": "user@example.com",
  "iat": 1640995200000, // Issued at timestamp
  "exp": 1641081600000  // Expiration timestamp
}
```

---

## 🔒 Password Security

### bcrypt Implementation

**Hashing Configuration**:
- **Algorithm**: bcrypt
- **Salt Rounds**: 12 (configurable)
- **Hash Format**: `$2b$12$...`

### Password Hashing

```javascript
// Password hashing in user model
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    try {
      // Hash password with 12 salt rounds
      this.password = await bcrypt.hash(this.password, 12);
    } catch (error) {
      return next(error);
    }
  }
  next();
});
```

### Password Verification

```javascript
// Password verification during login
const verifyPassword = async (plainPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    throw new Error('Password verification failed');
  }
};
```

### Password Update

```javascript
// Password change with current password verification
const updatePassword = async (userId, currentPassword, newPassword) => {
  const user = await UserModel.findById(userId);
  
  if (!user) {
    throw new Error('User not found');
  }

  // Verify current password
  const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
  
  if (!isCurrentPasswordValid) {
    throw new Error('Current password is incorrect');
  }

  // Update to new password (will be hashed by pre-save middleware)
  user.password = newPassword;
  await user.save();
  
  return { success: true, message: 'Password updated successfully' };
};
```

---

## 🛡️ Security Features

### Input Validation

```javascript
// User input validation
const validateUserInput = (userData) => {
  const errors = [];

  // Username validation
  if (!userData.username || userData.username.length < 3 || userData.username.length > 20) {
    errors.push('Username must be between 3 and 20 characters');
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!userData.email || !emailRegex.test(userData.email)) {
    errors.push('Valid email address is required');
  }

  // Password validation
  if (!userData.password || userData.password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  return errors;
};
```

### Rate Limiting

```javascript
// Rate limiting for authentication endpoints
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: 'Too many authentication attempts',
    error: 'Rate limit exceeded'
  }
});

// Apply to authentication routes
app.use('/api/auth', authLimiter);
```

### CORS Protection

```javascript
// CORS configuration
const cors = require('cors');

const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
```

### Security Headers

```javascript
// Security headers middleware
const helmet = require('helmet');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
```

---

## 🔄 Authentication Flow

### Registration Flow

1. **Input Validation**: Validate username, email, and password
2. **Duplicate Check**: Check for existing users
3. **Password Hashing**: Hash password with bcrypt
4. **User Creation**: Create new user in database
5. **Token Generation**: Generate JWT token
6. **Response**: Return user data and token

### Login Flow

1. **Input Validation**: Validate email and password
2. **User Lookup**: Find user by email
3. **Password Verification**: Compare with hashed password
4. **Token Generation**: Generate new JWT token
5. **Response**: Return user data and token

### Protected Route Flow

1. **Token Extraction**: Extract JWT from Authorization header
2. **Token Verification**: Verify token signature and expiration
3. **User Context**: Attach user data to request
4. **Route Handler**: Execute protected route logic
5. **Response**: Return protected data

---

## 🔧 Authentication Configuration

### Environment Variables

```env
# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d

# Security Configuration
BCRYPT_SALT_ROUNDS=12
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=5

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

### JWT Configuration

```javascript
// JWT configuration object
const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  algorithm: 'HS256',
  issuer: 'stocktr-app',
  audience: 'stocktr-users'
};
```

---

## 📱 Client-Side Authentication

### Token Storage

```javascript
// Secure token storage in localStorage
const storeToken = (token) => {
  try {
    localStorage.setItem('authToken', token);
  } catch (error) {
    console.error('Failed to store token:', error);
  }
};

const getToken = () => {
  try {
    return localStorage.getItem('authToken');
  } catch (error) {
    console.error('Failed to retrieve token:', error);
    return null;
  }
};

const removeToken = () => {
  try {
    localStorage.removeItem('authToken');
  } catch (error) {
    console.error('Failed to remove token:', error);
  }
};
```

### Request Interceptor

```javascript
// Axios request interceptor for authentication
axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
```

### Response Interceptor

```javascript
// Axios response interceptor for token handling
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      removeToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

---

## 🔄 Token Refresh

### Refresh Token Implementation

```javascript
// Refresh token generation
const generateRefreshToken = (userId) => {
  return jwt.sign(
    { userId, type: 'refresh' },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
};

// Token refresh endpoint
const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: 'Refresh token required'
    });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await UserModel.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token'
      });
    }

    // Generate new access token
    const newAccessToken = generateToken(user._id, user.email);
    
    res.json({
      success: true,
      data: {
        accessToken: newAccessToken,
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      }
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid refresh token'
    });
  }
};
```

---

## 🚨 Error Handling

### Authentication Errors

```javascript
// Authentication error handler
const handleAuthError = (error, req, res, next) => {
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
      error: 'Token verification failed'
    });
  }

  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired',
      error: 'Please login again'
    });
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      error: error.message
    });
  }

  // Default error
  res.status(500).json({
    success: false,
    message: 'Authentication error',
    error: 'Internal server error'
  });
};
```

### Password Error Handling

```javascript
// Password-related error handling
const handlePasswordError = (error) => {
  if (error.message.includes('password')) {
    return {
      success: false,
      message: 'Password error',
      error: error.message
    };
  }

  if (error.message.includes('bcrypt')) {
    return {
      success: false,
      message: 'Password processing error',
      error: 'Password could not be processed'
    };
  }

  return {
    success: false,
    message: 'Authentication error',
    error: error.message
  };
};
```

---

## 📊 Authentication Monitoring

### Login Attempts Tracking

```javascript
// Track login attempts for security
const trackLoginAttempt = async (email, success) => {
  const attempt = {
    email,
    success,
    timestamp: new Date(),
    ip: req.ip,
    userAgent: req.get('User-Agent')
  };

  // Store in database for monitoring
  await LoginAttemptModel.create(attempt);
};
```

### Security Metrics

```javascript
// Authentication metrics
const authMetrics = {
  totalLogins: 0,
  failedLogins: 0,
  successfulLogins: 0,
  tokenRefreshes: 0,
  passwordChanges: 0
};

// Update metrics
const updateAuthMetrics = (metric) => {
  authMetrics[metric]++;
};
```

---

## 🔧 Testing Authentication

### Unit Tests

```javascript
// Authentication unit tests
describe('Authentication', () => {
  test('should hash password correctly', async () => {
    const password = 'testpassword123';
    const hashedPassword = await bcrypt.hash(password, 12);
    
    expect(hashedPassword).not.toBe(password);
    expect(await bcrypt.compare(password, hashedPassword)).toBe(true);
  });

  test('should generate valid JWT token', () => {
    const userId = 'user123';
    const email = 'test@example.com';
    const token = generateToken(userId, email);
    
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });

  test('should verify JWT token correctly', () => {
    const userId = 'user123';
    const email = 'test@example.com';
    const token = generateToken(userId, email);
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    expect(decoded.userId).toBe(userId);
    expect(decoded.email).toBe(email);
  });
});
```

### Integration Tests

```javascript
// Authentication integration tests
describe('Authentication Endpoints', () => {
  test('should register new user', async () => {
    const userData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    };

    const response = await request(app)
      .post('/api/auth/signup')
      .send(userData);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.token).toBeDefined();
  });

  test('should login existing user', async () => {
    const loginData = {
      email: 'test@example.com',
      password: 'password123'
    };

    const response = await request(app)
      .post('/api/auth/login')
      .send(loginData);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.token).toBeDefined();
  });
});
```

---

## 🔄 Security Updates

### Password Policy Updates

```javascript
// Enhanced password validation
const validatePassword = (password) => {
  const errors = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (!/(?=.*[a-z])/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/(?=.*\d)/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (!/(?=.*[@$!%*?&])/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return errors;
};
```

### Token Security Enhancements

```javascript
// Enhanced JWT configuration
const enhancedJwtConfig = {
  secret: process.env.JWT_SECRET,
  expiresIn: '1h', // Shorter expiration for security
  refreshExpiresIn: '7d',
  algorithm: 'HS256',
  issuer: 'stocktr-app',
  audience: 'stocktr-users',
  subject: 'user-authentication',
  jwtid: true, // Include JWT ID for additional security
  noTimestamp: false,
  header: {
    typ: 'JWT'
  }
};
```

---

**Next**: See [User Update System](./user-update-system.md) for detailed user management documentation. 