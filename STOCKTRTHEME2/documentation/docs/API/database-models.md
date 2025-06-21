# StockTR Database Models

Complete documentation of all database models, schemas, and relationships in the StockTR application.

## 🗄️ Database Overview

The StockTR application uses **MongoDB** as the primary database with **Mongoose ODM** for schema management and data validation.

**Database Name**: `stocktr`
**Connection**: MongoDB Atlas (cloud) or local MongoDB instance

## 📁 Model Structure

```
Models/
├── UserModel.js      # User account and profile data
└── WatchlistModel.js # User watchlist and stock data
```

## 👤 User Model

**File Location**: `API/Models/UserModel.js`

### Schema Definition

```javascript
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  profileIcon: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
```

### Field Descriptions

#### `username`
- **Type**: String
- **Required**: Yes
- **Unique**: Yes
- **Validation**: 3-20 characters, alphanumeric
- **Purpose**: User's display name and login identifier
- **Index**: Unique index for fast lookups

#### `email`
- **Type**: String
- **Required**: Yes
- **Unique**: Yes
- **Validation**: Valid email format
- **Purpose**: Primary contact and login identifier
- **Index**: Unique index for fast lookups

#### `password`
- **Type**: String
- **Required**: Yes
- **Validation**: Minimum 6 characters
- **Purpose**: Hashed password for authentication
- **Security**: Hashed using bcrypt with salt rounds

#### `profileIcon`
- **Type**: String
- **Required**: No
- **Default**: null
- **Purpose**: URL or base64 string for user avatar
- **Storage**: Can be external URL or base64 encoded image

#### `createdAt`
- **Type**: Date
- **Default**: Current timestamp
- **Purpose**: Account creation timestamp
- **Index**: For analytics and user tracking

#### `updatedAt`
- **Type**: Date
- **Default**: Current timestamp
- **Purpose**: Last profile update timestamp
- **Auto-update**: Updated on every save operation

### Indexes

```javascript
// Unique indexes for fast lookups
userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });

// Compound indexes for common queries
userSchema.index({ createdAt: -1 });
userSchema.index({ updatedAt: -1 });
```

### Virtual Fields

```javascript
// Virtual for user's full profile URL
userSchema.virtual('profileUrl').get(function() {
  return `/api/user/${this._id}/profile`;
});

// Virtual for account age
userSchema.virtual('accountAge').get(function() {
  return Date.now() - this.createdAt.getTime();
});
```

### Methods

```javascript
// Instance method to update profile
userSchema.methods.updateProfile = function(updates) {
  Object.assign(this, updates);
  this.updatedAt = new Date();
  return this.save();
};

// Instance method to change password
userSchema.methods.changePassword = function(newPassword) {
  this.password = newPassword; // Will be hashed by pre-save middleware
  this.updatedAt = new Date();
  return this.save();
};
```

### Static Methods

```javascript
// Find user by email
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

// Find user by username
userSchema.statics.findByUsername = function(username) {
  return this.findOne({ username: username });
};

// Get user count
userSchema.statics.getUserCount = function() {
  return this.countDocuments();
};
```

### Middleware (Hooks)

```javascript
// Pre-save middleware for password hashing
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  this.updatedAt = new Date();
  next();
});

// Pre-remove middleware for cleanup
userSchema.pre('remove', async function(next) {
  // Remove associated watchlist items
  await WatchlistModel.deleteMany({ userId: this._id });
  next();
});
```

---

## 📋 Watchlist Model

**File Location**: `API/Models/WatchlistModel.js`

### Schema Definition

```javascript
const watchlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  symbol: {
    type: String,
    required: true,
    uppercase: true,
    trim: true
  },
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    maxlength: 500,
    default: ''
  }
});
```

### Field Descriptions

#### `userId`
- **Type**: ObjectId (Reference to User)
- **Required**: Yes
- **Purpose**: Links watchlist item to specific user
- **Index**: For fast user-specific queries

#### `symbol`
- **Type**: String
- **Required**: Yes
- **Validation**: Uppercase, trimmed
- **Purpose**: Stock symbol (e.g., AAPL, GOOGL)
- **Index**: For symbol-based queries

#### `companyName`
- **Type**: String
- **Required**: Yes
- **Validation**: Trimmed
- **Purpose**: Full company name for display
- **Example**: "Apple Inc."

#### `addedAt`
- **Type**: Date
- **Default**: Current timestamp
- **Purpose**: When stock was added to watchlist
- **Index**: For sorting by addition date

#### `lastUpdated`
- **Type**: Date
- **Default**: Current timestamp
- **Purpose**: Last time watchlist item was updated
- **Auto-update**: Updated on every save operation

#### `notes`
- **Type**: String
- **Required**: No
- **Max Length**: 500 characters
- **Purpose**: User notes about the stock
- **Default**: Empty string

### Indexes

```javascript
// Compound unique index to prevent duplicate stocks per user
watchlistSchema.index({ userId: 1, symbol: 1 }, { unique: true });

// Indexes for common queries
watchlistSchema.index({ userId: 1, addedAt: -1 });
watchlistSchema.index({ symbol: 1 });
watchlistSchema.index({ lastUpdated: -1 });
```

### Virtual Fields

```javascript
// Virtual for days since added
watchlistSchema.virtual('daysSinceAdded').get(function() {
  return Math.floor((Date.now() - this.addedAt.getTime()) / (1000 * 60 * 60 * 24));
});

// Virtual for stock URL
watchlistSchema.virtual('stockUrl').get(function() {
  return `/api/stocks?symbol=${this.symbol}`;
});
```

### Methods

```javascript
// Instance method to update notes
watchlistSchema.methods.updateNotes = function(notes) {
  this.notes = notes;
  this.lastUpdated = new Date();
  return this.save();
};

// Instance method to refresh last updated
watchlistSchema.methods.refresh = function() {
  this.lastUpdated = new Date();
  return this.save();
};
```

### Static Methods

```javascript
// Get user's watchlist
watchlistSchema.statics.getUserWatchlist = function(userId) {
  return this.find({ userId }).sort({ addedAt: -1 });
};

// Check if stock exists in user's watchlist
watchlistSchema.statics.isInWatchlist = function(userId, symbol) {
  return this.exists({ userId, symbol });
};

// Get watchlist count for user
watchlistSchema.statics.getUserWatchlistCount = function(userId) {
  return this.countDocuments({ userId });
};
```

### Middleware (Hooks)

```javascript
// Pre-save middleware for validation
watchlistSchema.pre('save', function(next) {
  this.lastUpdated = new Date();
  next();
});

// Pre-remove middleware for cleanup
watchlistSchema.pre('remove', function(next) {
  // Any cleanup operations
  next();
});
```

---

## 🔗 Model Relationships

### One-to-Many: User to Watchlist

```javascript
// User has many watchlist items
UserModel.hasMany(WatchlistModel, { foreignKey: 'userId' });

// Watchlist belongs to one user
WatchlistModel.belongsTo(UserModel, { foreignKey: 'userId' });
```

### Population Examples

```javascript
// Get user with watchlist
const userWithWatchlist = await UserModel.findById(userId)
  .populate('watchlist')
  .exec();

// Get watchlist with user info
const watchlistWithUser = await WatchlistModel.find({ userId })
  .populate('userId', 'username email profileIcon')
  .exec();
```

---

## 📊 Database Operations

### User Operations

#### Create User
```javascript
const newUser = new UserModel({
  username: 'john_doe',
  email: 'john@example.com',
  password: 'securepassword123'
});
await newUser.save();
```

#### Find User
```javascript
// By email
const user = await UserModel.findByEmail('john@example.com');

// By username
const user = await UserModel.findByUsername('john_doe');

// By ID
const user = await UserModel.findById(userId);
```

#### Update User
```javascript
// Update profile
await user.updateProfile({
  username: 'new_username',
  email: 'newemail@example.com'
});

// Change password
await user.changePassword('newpassword123');
```

#### Delete User
```javascript
// Delete user (triggers cleanup of watchlist items)
await UserModel.findByIdAndDelete(userId);
```

### Watchlist Operations

#### Add to Watchlist
```javascript
const watchlistItem = new WatchlistModel({
  userId: user._id,
  symbol: 'AAPL',
  companyName: 'Apple Inc.',
  notes: 'Tech giant, strong fundamentals'
});
await watchlistItem.save();
```

#### Get User Watchlist
```javascript
const watchlist = await WatchlistModel.getUserWatchlist(userId);
```

#### Remove from Watchlist
```javascript
await WatchlistModel.findOneAndDelete({
  userId: user._id,
  symbol: 'AAPL'
});
```

#### Update Watchlist Item
```javascript
await watchlistItem.updateNotes('Updated notes about Apple');
```

---

## 🔍 Query Optimization

### Index Strategy

```javascript
// Primary indexes for fast lookups
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ username: 1 }, { unique: true });

// Compound indexes for common queries
watchlistSchema.index({ userId: 1, symbol: 1 }, { unique: true });
watchlistSchema.index({ userId: 1, addedAt: -1 });

// Text indexes for search
userSchema.index({ username: 'text', email: 'text' });
```

### Query Optimization

```javascript
// Efficient queries with proper indexing
const userWatchlist = await WatchlistModel
  .find({ userId })
  .sort({ addedAt: -1 })
  .limit(20)
  .lean(); // For read-only operations

// Aggregation for analytics
const watchlistStats = await WatchlistModel.aggregate([
  { $match: { userId: ObjectId(userId) } },
  { $group: {
    _id: null,
    totalStocks: { $sum: 1 },
    oldestStock: { $min: '$addedAt' },
    newestStock: { $max: '$addedAt' }
  }}
]);
```

---

## 🛡️ Data Validation

### Schema Validation

```javascript
// Custom validators
userSchema.path('email').validate(function(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}, 'Invalid email format');

watchlistSchema.path('symbol').validate(function(value) {
  const symbolRegex = /^[A-Z]{1,5}$/;
  return symbolRegex.test(value);
}, 'Invalid stock symbol format');
```

### Business Logic Validation

```javascript
// Pre-save validation
userSchema.pre('save', async function(next) {
  // Check for duplicate email
  const existingUser = await this.constructor.findOne({ 
    email: this.email, 
    _id: { $ne: this._id } 
  });
  
  if (existingUser) {
    throw new Error('Email already exists');
  }
  
  next();
});
```

---

## 📈 Performance Monitoring

### Query Performance

```javascript
// Enable query logging in development
mongoose.set('debug', process.env.NODE_ENV === 'development');

// Monitor slow queries
mongoose.set('debug', { color: true, shell: true });
```

### Database Metrics

```javascript
// Connection monitoring
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});
```

---

## 🔧 Configuration

### Database Configuration

```javascript
// Connection options
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  bufferMaxEntries: 0
};

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, dbOptions);
```

### Environment Variables

```env
# Database configuration
MONGODB_URI=mongodb://localhost:27017/stocktr
MONGODB_URI_PROD=mongodb+srv://username:password@cluster.mongodb.net/stocktr

# Connection settings
DB_MAX_POOL_SIZE=10
DB_TIMEOUT=5000
```

---

**Next**: See [Authentication System](./authentication-system.md) for detailed authentication documentation. 