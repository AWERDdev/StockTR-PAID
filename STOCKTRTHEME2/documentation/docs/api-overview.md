# StockTR API Overview

## 🏗️ Architecture

The StockTR backend is built using the **MERN stack** with a modular, scalable architecture:

- **Runtime**: Node.js with Express.js framework
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) with bcrypt password hashing
- **API Design**: RESTful API with JSON responses
- **Security**: CORS protection, input validation, and secure headers

## 📁 Backend Structure

```
API/
├── index.js              # Main server entry point
├── AUTH/
│   └── UserAuth.js       # JWT authentication middleware
├── DB/
│   └── DB.js             # MongoDB connection configuration
├── Models/
│   ├── UserModel.js      # User data model
│   └── WatchlistModel.js # Watchlist data model
├── Routes/
│   ├── LoginRoute.js     # Authentication routes
│   ├── SignupRoute.js    # User registration routes
│   └── Stock.js          # Stock and watchlist routes
└── userUpdating/
    ├── UpdateUserPassword.js # Password update logic
    ├── UserProfileIcon.js    # Profile icon management
    └── UserWatchlist.js      # Watchlist operations
```

## 🔐 Authentication System

### JWT Token Flow

1. **Registration**: User creates account → password hashed → JWT token generated
2. **Login**: User credentials verified → JWT token generated and returned
3. **Protected Routes**: JWT token validated on each request
4. **Token Expiry**: Tokens expire after a set time (configurable)

### Security Features

- **Password Hashing**: bcrypt with salt rounds
- **Token Validation**: Middleware checks JWT on protected routes
- **CORS Protection**: Configured for specific origins
- **Input Validation**: Request data sanitization and validation

## 🗄️ Database Schema

### User Model
```javascript
{
  username: String (unique, required),
  email: String (unique, required),
  password: String (hashed, required),
  profileIcon: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

### Watchlist Model
```javascript
{
  userId: ObjectId (ref: User, required),
  symbol: String (required),
  companyName: String,
  addedAt: Date
}
```

## 🌐 API Base Configuration

- **Base URL**: `http://localhost:5000` (development)
- **API Prefix**: `/api`
- **Content-Type**: `application/json`
- **Response Format**: JSON with consistent structure

### Standard Response Format

```json
{
  "success": boolean,
  "message": "string",
  "data": object | array | null,
  "error": string | null
}
```

## 🔄 Request/Response Flow

1. **Client Request** → Express Router
2. **Middleware Processing** → Authentication, Validation, CORS
3. **Route Handler** → Business Logic
4. **Database Operation** → Mongoose Model
5. **Response** → JSON formatted response

## 📊 API Categories

### 1. Authentication Routes (`/api/auth/`)
- User registration and login
- JWT token generation and validation

### 2. User Management Routes (`/api/user/`)
- Profile retrieval and updates
- Password changes
- Profile icon management

### 3. Stock & Watchlist Routes (`/api/stocks/`, `/api/watchlist/`)
- Stock data retrieval
- Watchlist management (add/remove stocks)
- Real-time stock information

## 🛡️ Error Handling

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

### Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information",
  "data": null
}
```

## 🔧 Environment Variables

Required environment variables for the API:

```env
MONGODB_URI=mongodb://localhost:27017/stocktr
JWT_SECRET=your-secret-key
PORT=5000
CORS_ORIGIN=http://localhost:3000
```

## 📈 Performance Considerations

- **Database Indexing**: Unique indexes on username and email
- **Connection Pooling**: MongoDB connection optimization
- **Response Caching**: Implemented for stock data
- **Request Validation**: Input sanitization and validation

## 🔄 Middleware Stack

1. **CORS** - Cross-origin resource sharing
2. **Body Parser** - JSON request parsing
3. **Authentication** - JWT token validation (for protected routes)
4. **Error Handler** - Global error handling middleware

## 🧪 Testing Strategy

- **Unit Tests**: Individual function testing
- **Integration Tests**: API endpoint testing
- **Authentication Tests**: JWT flow validation
- **Database Tests**: CRUD operations verification

## 📚 Related Documentation

- [API Endpoints](./api-endpoints.md) - Detailed endpoint documentation
- [API Examples](./api-examples.md) - Request/response examples
- [Frontend Integration](./frontend-overview.md) - How frontend connects to API

---

**Next**: See [API Endpoints](./api-endpoints.md) for detailed endpoint documentation. 