# StockTR - Stock Trading & Watchlist Application

A full-stack MERN (MongoDB, Express.js, React/Next.js, Node.js) application for stock trading and watchlist management with user authentication and profile management.

## 🚀 Features

- **User Authentication**: Secure login/signup with JWT tokens
- **Stock Watchlist**: Add, remove, and manage stock watchlists
- **User Profiles**: Update profile information and passwords
- **Real-time Stock Data**: Fetch and display stock information
- **Responsive Design**: Works on desktop and mobile devices
- **Theme System**: Multiple color themes (light and dark modes)
- **Modular Architecture**: Clean, scalable code structure

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd StockTR-PAID
```

### 2. Backend Setup

```bash
# Navigate to the API directory
cd API

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### 3. Frontend Setup

```bash
# Navigate to the client directory
cd ../client

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

## ⚙️ Environment Configuration

### Backend Environment Variables (.env in API folder)

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/stocktr
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/stocktr

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here

# Server Port
PORT=5000

# CORS Origin (your frontend URL)
CORS_ORIGIN=http://localhost:3000
```

### Frontend Environment Variables (.env in client folder)

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5000

# App Name
NEXT_PUBLIC_APP_NAME=StockTR
```

## 🚀 Running the Application

### Development Mode

#### 1. Start the Backend Server

```bash
# In the API directory
cd API
npm run dev
# OR
npm start
```

The backend server will start on `http://localhost:5000`

#### 2. Start the Frontend Development Server

```bash
# In the client directory
cd client
npm run dev
```

The frontend will start on `http://localhost:3000`

### Production Mode

#### 1. Build the Frontend

```bash
# In the client directory
cd client
npm run build
```

#### 2. Start Production Server

```bash
# In the client directory
npm start
```

## 📁 Project Structure

```
StockTR-PAID/
├── API/                    # Backend server
│   ├── AUTH/              # Authentication middleware
│   ├── DB/                # Database configuration
│   ├── Models/            # MongoDB models
│   ├── Routes/            # API routes
│   ├── userUpdating/      # User update operations
│   └── index.js           # Main server file
├── client/                # Frontend application
│   ├── src/
│   │   ├── app/           # Next.js pages
│   │   ├── components/    # React components
│   │   ├── tools/         # Custom hooks and utilities
│   │   └── Types/         # TypeScript type definitions
│   └── public/            # Static assets
└── documentation/         # Project documentation
```

## 🔧 Available Scripts

### Backend (API folder)

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm test           # Run tests (if configured)
```

### Frontend (client folder)

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run ESLint
```

## 🌐 API Endpoints

The backend provides the following main endpoints:

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `PUT /api/user/password` - Update user password
- `GET /api/stocks` - Get stock data
- `GET /api/watchlist` - Get user watchlist
- `POST /api/watchlist` - Add stock to watchlist
- `DELETE /api/watchlist/:symbol` - Remove stock from watchlist

For detailed API documentation, see `docs/api-endpoints.md`

## 🎨 Themes

The application supports multiple themes:

1. **Default Light** - Clean, professional light theme
2. **Minimal Light** - Simple, minimal light theme
3. **Classic Dark** - Traditional dark theme
4. **Neon Dark** - Vibrant, neon-accented dark theme

Theme configuration is stored in `client/src/StockTRsstyling.json`

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Input validation and sanitization
- Secure HTTP headers

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check your connection string in `.env`
   - Verify network connectivity for Atlas

2. **Port Already in Use**
   - Change the port in your `.env` file
   - Kill processes using the port: `npx kill-port 5000`

3. **CORS Errors**
   - Verify `CORS_ORIGIN` in backend `.env` matches your frontend URL
   - Check that both servers are running

4. **Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check for TypeScript errors: `npm run lint`

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation in the `docs/` folder

## 🔄 Updates

To update the application:

```bash
# Pull latest changes
git pull origin main

# Update dependencies
cd API && npm install
cd ../client && npm install

# Restart servers
```

---

**Happy Trading! 📈** 