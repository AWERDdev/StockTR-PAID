# StockTR User Update System

Complete documentation of the user update system, profile management, and user operations in the StockTR application.

## 👤 User Update Overview

The StockTR application provides comprehensive user management capabilities including profile updates, password changes, profile icon management, and watchlist operations.

**Update Operations**:
- Profile information updates
- Password changes with verification
- Profile icon upload and management
- Watchlist management
- Account settings modifications

## 📁 User Update Structure

### File Organization

```
userUpdating/
├── UpdateUserPassword.js # Password update functionality
├── UserProfileIcon.js    # Profile icon management
└── UserWatchlist.js      # Watchlist operations
```

### Update Categories

- **Profile Updates**: Username, email, and basic information
- **Security Updates**: Password changes and verification
- **Visual Updates**: Profile icon upload and management
- **Data Updates**: Watchlist management and preferences

---

## 🔐 Password Update System

### UpdateUserPassword.js

**File Location**: `API/userUpdating/UpdateUserPassword.js`

**Purpose**: Handle secure password updates with current password verification.

### Password Update Flow

1. **Current Password Verification**: Verify user's current password
2. **New Password Validation**: Validate new password requirements
3. **Password Hashing**: Hash new password with bcrypt
4. **Database Update**: Update password in database
5. **Security Logging**: Log password change for security

### Implementation Details

```javascript
// Password update function
const updateUserPassword = async (userId, currentPassword, newPassword) => {
  try {
    // Find user by ID
    const user = await UserModel.findById(userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    
    if (!isCurrentPasswordValid) {
      throw new Error('Current password is incorrect');
    }

    // Validate new password
    const passwordErrors = validatePassword(newPassword);
    if (passwordErrors.length > 0) {
      throw new Error(passwordErrors.join(', '));
    }

    // Check if new password is same as current
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      throw new Error('New password must be different from current password');
    }

    // Update password (will be hashed by pre-save middleware)
    user.password = newPassword;
    user.updatedAt = new Date();
    
    await user.save();

    // Log password change
    await logPasswordChange(userId, req.ip);

    return {
      success: true,
      message: 'Password updated successfully'
    };

  } catch (error) {
    throw new Error(`Password update failed: ${error.message}`);
  }
};
```

### Password Validation

```javascript
// Enhanced password validation
const validatePassword = (password) => {
  const errors = [];

  // Length validation
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (password.length > 128) {
    errors.push('Password must be less than 128 characters');
  }

  // Character requirements
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

  // Common password check
  const commonPasswords = ['password', '123456', 'qwerty', 'admin'];
  if (commonPasswords.includes(password.toLowerCase())) {
    errors.push('Password is too common, please choose a stronger password');
  }

  return errors;
};
```

### Security Logging

```javascript
// Password change logging
const logPasswordChange = async (userId, ipAddress) => {
  const logEntry = {
    userId: userId,
    action: 'password_change',
    timestamp: new Date(),
    ipAddress: ipAddress,
    userAgent: req.get('User-Agent'),
    success: true
  };

  await SecurityLogModel.create(logEntry);
};
```

---

## 🖼️ Profile Icon Management

### UserProfileIcon.js

**File Location**: `API/userUpdating/UserProfileIcon.js`

**Purpose**: Handle profile icon upload, storage, and management.

### Icon Update Flow

1. **File Validation**: Validate uploaded image file
2. **Image Processing**: Resize and optimize image
3. **Storage**: Store image in cloud storage or database
4. **URL Generation**: Generate accessible URL for icon
5. **Database Update**: Update user profile with icon URL

### Implementation Details

```javascript
// Profile icon update function
const updateUserProfileIcon = async (userId, iconData) => {
  try {
    // Validate icon data
    const validationResult = validateProfileIcon(iconData);
    if (!validationResult.isValid) {
      throw new Error(validationResult.error);
    }

    // Process and optimize image
    const processedIcon = await processProfileIcon(iconData);

    // Upload to cloud storage
    const iconUrl = await uploadToCloudStorage(processedIcon, userId);

    // Update user profile
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Remove old icon if exists
    if (user.profileIcon) {
      await removeOldIcon(user.profileIcon);
    }

    // Update with new icon
    user.profileIcon = iconUrl;
    user.updatedAt = new Date();
    
    await user.save();

    return {
      success: true,
      message: 'Profile icon updated successfully',
      data: {
        profileIcon: iconUrl
      }
    };

  } catch (error) {
    throw new Error(`Profile icon update failed: ${error.message}`);
  }
};
```

### Icon Validation

```javascript
// Profile icon validation
const validateProfileIcon = (iconData) => {
  const errors = [];

  // Check if icon data exists
  if (!iconData) {
    return { isValid: false, error: 'Icon data is required' };
  }

  // Validate file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (iconData.size > maxSize) {
    errors.push('Icon file size must be less than 5MB');
  }

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(iconData.type)) {
    errors.push('Icon must be a valid image file (JPEG, PNG, GIF, WebP)');
  }

  // Validate dimensions
  if (iconData.width > 2048 || iconData.height > 2048) {
    errors.push('Icon dimensions must be less than 2048x2048 pixels');
  }

  if (iconData.width < 64 || iconData.height < 64) {
    errors.push('Icon dimensions must be at least 64x64 pixels');
  }

  return {
    isValid: errors.length === 0,
    error: errors.join(', ')
  };
};
```

### Image Processing

```javascript
// Image processing and optimization
const processProfileIcon = async (iconData) => {
  const sharp = require('sharp');

  try {
    // Resize image to standard size
    const processedImage = await sharp(iconData.buffer)
      .resize(256, 256, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 85 })
      .toBuffer();

    return {
      buffer: processedImage,
      format: 'jpeg',
      width: 256,
      height: 256
    };

  } catch (error) {
    throw new Error('Image processing failed');
  }
};
```

### Cloud Storage Integration

```javascript
// Upload to cloud storage (AWS S3 example)
const uploadToCloudStorage = async (processedIcon, userId) => {
  const AWS = require('aws-sdk');
  const s3 = new AWS.S3();

  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: `profile-icons/${userId}-${Date.now()}.jpg`,
    Body: processedIcon.buffer,
    ContentType: 'image/jpeg',
    ACL: 'public-read'
  };

  try {
    const result = await s3.upload(params).promise();
    return result.Location;
  } catch (error) {
    throw new Error('Failed to upload icon to cloud storage');
  }
};
```

---

## 📋 Watchlist Management

### UserWatchlist.js

**File Location**: `API/userUpdating/UserWatchlist.js`

**Purpose**: Handle user watchlist operations including add, remove, and update.

### Watchlist Operations

#### Add to Watchlist

```javascript
// Add stock to user's watchlist
const addToWatchlist = async (userId, stockData) => {
  try {
    // Validate stock data
    const validationResult = validateStockData(stockData);
    if (!validationResult.isValid) {
      throw new Error(validationResult.error);
    }

    // Check if stock already exists in watchlist
    const existingStock = await WatchlistModel.findOne({
      userId: userId,
      symbol: stockData.symbol.toUpperCase()
    });

    if (existingStock) {
      throw new Error('Stock already exists in watchlist');
    }

    // Create new watchlist item
    const watchlistItem = new WatchlistModel({
      userId: userId,
      symbol: stockData.symbol.toUpperCase(),
      companyName: stockData.companyName,
      notes: stockData.notes || '',
      addedAt: new Date()
    });

    await watchlistItem.save();

    // Get updated watchlist with real-time data
    const updatedWatchlist = await getWatchlistWithStockData(userId);

    return {
      success: true,
      message: 'Stock added to watchlist successfully',
      data: {
        watchlistItem: watchlistItem,
        updatedWatchlist: updatedWatchlist
      }
    };

  } catch (error) {
    throw new Error(`Failed to add stock to watchlist: ${error.message}`);
  }
};
```

#### Remove from Watchlist

```javascript
// Remove stock from user's watchlist
const removeFromWatchlist = async (userId, symbol) => {
  try {
    // Find and remove watchlist item
    const removedItem = await WatchlistModel.findOneAndDelete({
      userId: userId,
      symbol: symbol.toUpperCase()
    });

    if (!removedItem) {
      throw new Error('Stock not found in watchlist');
    }

    // Get updated watchlist
    const updatedWatchlist = await getWatchlistWithStockData(userId);

    return {
      success: true,
      message: 'Stock removed from watchlist successfully',
      data: {
        removedItem: removedItem,
        updatedWatchlist: updatedWatchlist
      }
    };

  } catch (error) {
    throw new Error(`Failed to remove stock from watchlist: ${error.message}`);
  }
};
```

#### Update Watchlist Item

```javascript
// Update watchlist item notes
const updateWatchlistItem = async (userId, symbol, updates) => {
  try {
    // Find watchlist item
    const watchlistItem = await WatchlistModel.findOne({
      userId: userId,
      symbol: symbol.toUpperCase()
    });

    if (!watchlistItem) {
      throw new Error('Stock not found in watchlist');
    }

    // Update allowed fields
    if (updates.notes !== undefined) {
      watchlistItem.notes = updates.notes;
    }

    watchlistItem.lastUpdated = new Date();
    await watchlistItem.save();

    return {
      success: true,
      message: 'Watchlist item updated successfully',
      data: {
        watchlistItem: watchlistItem
      }
    };

  } catch (error) {
    throw new Error(`Failed to update watchlist item: ${error.message}`);
  }
};
```

### Stock Data Validation

```javascript
// Validate stock data for watchlist
const validateStockData = (stockData) => {
  const errors = [];

  // Validate symbol
  if (!stockData.symbol || stockData.symbol.trim().length === 0) {
    errors.push('Stock symbol is required');
  }

  if (stockData.symbol && stockData.symbol.length > 10) {
    errors.push('Stock symbol must be less than 10 characters');
  }

  // Validate company name
  if (!stockData.companyName || stockData.companyName.trim().length === 0) {
    errors.push('Company name is required');
  }

  if (stockData.companyName && stockData.companyName.length > 100) {
    errors.push('Company name must be less than 100 characters');
  }

  // Validate notes
  if (stockData.notes && stockData.notes.length > 500) {
    errors.push('Notes must be less than 500 characters');
  }

  return {
    isValid: errors.length === 0,
    error: errors.join(', ')
  };
};
```

### Real-time Data Integration

```javascript
// Get watchlist with real-time stock data
const getWatchlistWithStockData = async (userId) => {
  try {
    // Get user's watchlist
    const watchlist = await WatchlistModel.find({ userId })
      .sort({ addedAt: -1 });

    // Fetch real-time data for each stock
    const watchlistWithData = await Promise.all(
      watchlist.map(async (item) => {
        try {
          // Fetch current stock data
          const stockData = await fetchStockData(item.symbol);
          
          return {
            ...item.toObject(),
            currentPrice: stockData.currentPrice,
            change: stockData.change,
            changePercent: stockData.changePercent,
            volume: stockData.volume,
            lastUpdated: new Date()
          };
        } catch (error) {
          // Return item without real-time data if fetch fails
          return {
            ...item.toObject(),
            currentPrice: null,
            change: null,
            changePercent: null,
            volume: null,
            lastUpdated: new Date()
          };
        }
      })
    );

    return watchlistWithData;

  } catch (error) {
    throw new Error('Failed to fetch watchlist with stock data');
  }
};
```

---

## 🔄 Profile Update System

### Profile Information Updates

```javascript
// Update user profile information
const updateUserProfile = async (userId, profileUpdates) => {
  try {
    // Validate profile updates
    const validationResult = validateProfileUpdates(profileUpdates);
    if (!validationResult.isValid) {
      throw new Error(validationResult.error);
    }

    // Find user
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Check for duplicate username/email if being updated
    if (profileUpdates.username && profileUpdates.username !== user.username) {
      const existingUser = await UserModel.findOne({ 
        username: profileUpdates.username,
        _id: { $ne: userId }
      });
      
      if (existingUser) {
        throw new Error('Username already exists');
      }
    }

    if (profileUpdates.email && profileUpdates.email !== user.email) {
      const existingUser = await UserModel.findOne({ 
        email: profileUpdates.email.toLowerCase(),
        _id: { $ne: userId }
      });
      
      if (existingUser) {
        throw new Error('Email already exists');
      }
    }

    // Update profile fields
    Object.assign(user, profileUpdates);
    user.updatedAt = new Date();
    
    await user.save();

    return {
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          profileIcon: user.profileIcon,
          updatedAt: user.updatedAt
        }
      }
    };

  } catch (error) {
    throw new Error(`Profile update failed: ${error.message}`);
  }
};
```

### Profile Validation

```javascript
// Validate profile updates
const validateProfileUpdates = (updates) => {
  const errors = [];

  // Username validation
  if (updates.username !== undefined) {
    if (updates.username.length < 3 || updates.username.length > 20) {
      errors.push('Username must be between 3 and 20 characters');
    }

    if (!/^[a-zA-Z0-9_]+$/.test(updates.username)) {
      errors.push('Username can only contain letters, numbers, and underscores');
    }
  }

  // Email validation
  if (updates.email !== undefined) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(updates.email)) {
      errors.push('Valid email address is required');
    }
  }

  return {
    isValid: errors.length === 0,
    error: errors.join(', ')
  };
};
```

---

## 📊 Update Tracking and Analytics

### Update History

```javascript
// Track user updates for analytics
const trackUserUpdate = async (userId, updateType, updateData) => {
  const updateLog = {
    userId: userId,
    updateType: updateType, // 'profile', 'password', 'icon', 'watchlist'
    updateData: updateData,
    timestamp: new Date(),
    ipAddress: req.ip,
    userAgent: req.get('User-Agent')
  };

  await UserUpdateLogModel.create(updateLog);
};
```

### Update Statistics

```javascript
// Get user update statistics
const getUserUpdateStats = async (userId) => {
  const stats = await UserUpdateLogModel.aggregate([
    { $match: { userId: ObjectId(userId) } },
    { $group: {
      _id: '$updateType',
      count: { $sum: 1 },
      lastUpdate: { $max: '$timestamp' }
    }},
    { $sort: { count: -1 } }
  ]);

  return stats;
};
```

---

## 🔧 Error Handling

### Update Error Handling

```javascript
// Centralized error handling for user updates
const handleUpdateError = (error, operation) => {
  const errorMap = {
    'User not found': {
      status: 404,
      message: 'User not found',
      error: 'The specified user does not exist'
    },
    'Current password is incorrect': {
      status: 400,
      message: 'Password update failed',
      error: 'Current password is incorrect'
    },
    'Stock already exists in watchlist': {
      status: 409,
      message: 'Duplicate stock',
      error: 'This stock is already in your watchlist'
    },
    'Stock not found in watchlist': {
      status: 404,
      message: 'Stock not found',
      error: 'This stock is not in your watchlist'
    }
  };

  const errorInfo = errorMap[error.message] || {
    status: 500,
    message: `${operation} failed`,
    error: error.message
  };

  return {
    success: false,
    message: errorInfo.message,
    error: errorInfo.error,
    status: errorInfo.status
  };
};
```

---

## 🔄 Batch Operations

### Batch Watchlist Updates

```javascript
// Batch update watchlist items
const batchUpdateWatchlist = async (userId, updates) => {
  const results = [];

  for (const update of updates) {
    try {
      const result = await updateWatchlistItem(userId, update.symbol, update.changes);
      results.push({
        symbol: update.symbol,
        success: true,
        data: result.data
      });
    } catch (error) {
      results.push({
        symbol: update.symbol,
        success: false,
        error: error.message
      });
    }
  }

  return {
    success: true,
    message: 'Batch update completed',
    data: {
      results: results,
      total: updates.length,
      successful: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length
    }
  };
};
```

---

**Next**: See [Frontend Tools](./frontend-tools.md) for detailed frontend utility documentation. 