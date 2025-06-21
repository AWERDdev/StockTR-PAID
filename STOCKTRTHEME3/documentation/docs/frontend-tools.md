# StockTR Frontend Tools

Complete documentation of all frontend tools, custom hooks, utilities, and helper functions in the StockTR application.

## 🛠️ Tools Overview

The StockTR frontend uses a comprehensive set of custom hooks and utilities to manage state, handle API calls, and provide reusable functionality across components.

**Tools Categories**:
- **Data Management**: App data, stock data, and watchlist management
- **User Management**: Authentication, profile, and user operations
- **Navigation**: Routing and navigation utilities
- **Validation**: Form validation and input checking
- **UI Utilities**: Theme management and UI helpers

## 📁 Tools Structure

```
tools/
├── useAppData.ts           # Application data management
├── useAppDataUpdate.ts     # Data update operations
├── useNavigation.ts        # Navigation utilities
├── useStock.ts            # Stock data management
├── useStockWatchList.ts   # Watchlist operations
├── useUserIcon.ts         # User icon management
├── useUserPasswordUpdate.ts # Password update functionality
└── useValidation.ts       # Form validation utilities
```

---

## 📊 Data Management Tools

### useAppData.ts

**File Location**: `client/src/tools/useAppData.ts`

**Purpose**: Centralized application data management and state handling.

**Features**:
- Global application state management
- User data persistence
- Theme management
- Loading states
- Error handling

**Hook Interface**:
```typescript
interface UseAppDataReturn {
  // User data
  user: User | null;
  isAuthenticated: boolean;
  
  // App state
  loading: boolean;
  error: string | null;
  
  // Theme management
  currentTheme: string;
  themes: Theme[];
  
  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setTheme: (theme: string) => void;
  
  // Utilities
  clearError: () => void;
  resetApp: () => void;
}
```

**Implementation Details**:
- Uses React Context for global state
- LocalStorage persistence for user data and theme
- Automatic error clearing
- Loading state management
- Theme switching with CSS custom properties

**Usage Examples**:
```typescript
// Access app data in components
const { user, isAuthenticated, loading, currentTheme } = useAppData();

// Update user data
const { setUser } = useAppData();
setUser(newUserData);

// Change theme
const { setTheme } = useAppData();
setTheme('dark-theme');
```

---

### useAppDataUpdate.ts

**File Location**: `client/src/tools/useAppDataUpdate.ts`

**Purpose**: Handle data update operations and synchronization.

**Features**:
- Real-time data updates
- Optimistic updates
- Data synchronization
- Cache management
- Background refresh

**Hook Interface**:
```typescript
interface UseAppDataUpdateReturn {
  // Update operations
  updateUserProfile: (updates: Partial<User>) => Promise<void>;
  updateUserPassword: (passwordData: PasswordUpdateData) => Promise<void>;
  updateUserIcon: (iconData: string) => Promise<void>;
  
  // Data refresh
  refreshUserData: () => Promise<void>;
  refreshStockData: () => Promise<void>;
  refreshWatchlist: () => Promise<void>;
  
  // State management
  updating: boolean;
  updateError: string | null;
  
  // Utilities
  clearUpdateError: () => void;
}
```

**Implementation Details**:
- Optimistic updates for better UX
- Error handling and rollback
- Background data synchronization
- Cache invalidation
- Loading state management

---

## 📈 Stock Data Tools

### useStock.ts

**File Location**: `client/src/tools/useStock.ts`

**Purpose**: Manage stock data fetching, caching, and real-time updates.

**Features**:
- Stock data fetching
- Real-time price updates
- Data caching
- Search functionality
- Error handling

**Hook Interface**:
```typescript
interface UseStockReturn {
  // Stock data
  stockData: StockData | null;
  searchResults: StockData[];
  
  // State
  loading: boolean;
  searching: boolean;
  error: string | null;
  
  // Actions
  fetchStock: (symbol: string) => Promise<void>;
  searchStocks: (query: string) => Promise<void>;
  clearStockData: () => void;
  clearSearchResults: () => void;
  
  // Real-time updates
  startRealTimeUpdates: (symbol: string) => void;
  stopRealTimeUpdates: () => void;
  
  // Utilities
  isRealTimeActive: boolean;
}
```

**Implementation Details**:
- Debounced search functionality
- Real-time WebSocket connections
- Data caching with expiration
- Error retry logic
- Loading state management

**Stock Data Interface**:
```typescript
interface StockData {
  symbol: string;
  companyName: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap?: string;
  peRatio?: number;
  dividendYield?: number;
  lastUpdated: Date;
}
```

**Usage Examples**:
```typescript
// Fetch stock data
const { fetchStock, stockData, loading } = useStock();
await fetchStock('AAPL');

// Search stocks
const { searchStocks, searchResults, searching } = useStock();
await searchStocks('Apple');

// Real-time updates
const { startRealTimeUpdates, stopRealTimeUpdates } = useStock();
startRealTimeUpdates('AAPL');
```

---

### useStockWatchList.ts

**File Location**: `client/src/tools/useStockWatchList.ts`

**Purpose**: Manage user watchlist operations and real-time updates.

**Features**:
- Watchlist management (add/remove)
- Real-time watchlist updates
- Watchlist synchronization
- Bulk operations
- Data persistence

**Hook Interface**:
```typescript
interface UseStockWatchListReturn {
  // Watchlist data
  watchlist: StockData[];
  watchlistCount: number;
  
  // State
  loading: boolean;
  updating: boolean;
  error: string | null;
  
  // Actions
  addToWatchlist: (symbol: string, companyName: string) => Promise<void>;
  removeFromWatchlist: (symbol: string) => Promise<void>;
  updateWatchlistItem: (symbol: string, updates: Partial<WatchlistItem>) => Promise<void>;
  refreshWatchlist: () => Promise<void>;
  
  // Utilities
  isInWatchlist: (symbol: string) => boolean;
  getWatchlistItem: (symbol: string) => StockData | undefined;
  clearWatchlist: () => void;
}
```

**Implementation Details**:
- Optimistic updates for better UX
- Real-time price updates for watchlist items
- Local state synchronization
- Error handling with rollback
- Bulk operation support

**Watchlist Item Interface**:
```typescript
interface WatchlistItem extends StockData {
  addedAt: Date;
  notes?: string;
  lastUpdated: Date;
}
```

**Usage Examples**:
```typescript
// Add to watchlist
const { addToWatchlist, watchlist } = useStockWatchList();
await addToWatchlist('AAPL', 'Apple Inc.');

// Remove from watchlist
const { removeFromWatchlist } = useStockWatchList();
await removeFromWatchlist('AAPL');

// Check if in watchlist
const { isInWatchlist } = useStockWatchList();
const isWatched = isInWatchlist('AAPL');
```

---

## 👤 User Management Tools

### useUserIcon.ts

**File Location**: `client/src/tools/useUserIcon.ts`

**Purpose**: Handle user profile icon upload, management, and display.

**Features**:
- Icon upload and validation
- Image processing
- Cloud storage integration
- Icon display management
- Fallback handling

**Hook Interface**:
```typescript
interface UseUserIconReturn {
  // Icon data
  userIcon: string | null;
  iconLoading: boolean;
  iconError: string | null;
  
  // Actions
  uploadIcon: (file: File) => Promise<void>;
  removeIcon: () => Promise<void>;
  updateIcon: (iconUrl: string) => Promise<void>;
  
  // Utilities
  validateIcon: (file: File) => ValidationResult;
  getIconUrl: (userId: string) => string;
  getFallbackIcon: () => string;
}
```

**Implementation Details**:
- File validation (size, type, dimensions)
- Image compression and optimization
- Cloud storage upload
- Fallback icon handling
- Loading state management

**Validation Result Interface**:
```typescript
interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}
```

**Usage Examples**:
```typescript
// Upload icon
const { uploadIcon, userIcon, iconLoading } = useUserIcon();
const file = event.target.files[0];
await uploadIcon(file);

// Validate before upload
const { validateIcon } = useUserIcon();
const validation = validateIcon(file);
if (validation.isValid) {
  await uploadIcon(file);
}
```

---

### useUserPasswordUpdate.ts

**File Location**: `client/src/tools/useUserPasswordUpdate.ts`

**Purpose**: Handle user password updates with validation and security.

**Features**:
- Password validation
- Current password verification
- Secure password update
- Error handling
- Success feedback

**Hook Interface**:
```typescript
interface UseUserPasswordUpdateReturn {
  // State
  updating: boolean;
  error: string | null;
  success: boolean;
  
  // Actions
  updatePassword: (passwordData: PasswordUpdateData) => Promise<void>;
  validatePassword: (password: string) => ValidationResult;
  
  // Utilities
  clearError: () => void;
  clearSuccess: () => void;
  resetState: () => void;
}
```

**Password Update Data Interface**:
```typescript
interface PasswordUpdateData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
```

**Implementation Details**:
- Strong password validation
- Current password verification
- Secure API communication
- Error handling and feedback
- Success state management

**Usage Examples**:
```typescript
// Update password
const { updatePassword, updating, error } = useUserPasswordUpdate();
await updatePassword({
  currentPassword: 'oldpass',
  newPassword: 'newpass123',
  confirmPassword: 'newpass123'
});

// Validate password
const { validatePassword } = useUserPasswordUpdate();
const validation = validatePassword('newpass123');
```

---

## 🧭 Navigation Tools

### useNavigation.ts

**File Location**: `client/src/tools/useNavigation.ts`

**Purpose**: Handle navigation, routing, and URL management.

**Features**:
- Programmatic navigation
- Route protection
- URL parameter handling
- Navigation history
- Deep linking

**Hook Interface**:
```typescript
interface UseNavigationReturn {
  // Navigation actions
  navigate: (path: string, options?: NavigationOptions) => void;
  navigateBack: () => void;
  navigateForward: () => void;
  replace: (path: string) => void;
  
  // Route information
  currentPath: string;
  currentParams: Record<string, string>;
  currentQuery: Record<string, string>;
  
  // Navigation state
  canGoBack: boolean;
  canGoForward: boolean;
  
  // Utilities
  buildUrl: (path: string, params?: Record<string, string>) => string;
  parseUrl: (url: string) => ParsedUrl;
  isActiveRoute: (path: string) => boolean;
}
```

**Navigation Options Interface**:
```typescript
interface NavigationOptions {
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
}
```

**Implementation Details**:
- Next.js router integration
- Route protection logic
- URL parameter parsing
- Navigation history tracking
- Deep linking support

**Usage Examples**:
```typescript
// Navigate to page
const { navigate } = useNavigation();
navigate('/profile');

// Navigate with parameters
const { buildUrl } = useNavigation();
const url = buildUrl('/stocks', { symbol: 'AAPL' });
navigate(url);

// Check active route
const { isActiveRoute } = useNavigation();
const isActive = isActiveRoute('/dashboard');
```

---

## ✅ Validation Tools

### useValidation.ts

**File Location**: `client/src/tools/useValidation.ts`

**Purpose**: Provide form validation and input checking utilities.

**Features**:
- Form validation
- Input sanitization
- Custom validation rules
- Error message management
- Real-time validation

**Hook Interface**:
```typescript
interface UseValidationReturn {
  // Validation functions
  validateEmail: (email: string) => ValidationResult;
  validatePassword: (password: string) => ValidationResult;
  validateUsername: (username: string) => ValidationResult;
  validateStockSymbol: (symbol: string) => ValidationResult;
  
  // Form validation
  validateForm: (formData: Record<string, any>, rules: ValidationRules) => ValidationResult;
  
  // Utilities
  sanitizeInput: (input: string) => string;
  formatError: (error: string) => string;
  clearValidation: () => void;
}
```

**Validation Rules Interface**:
```typescript
interface ValidationRules {
  [field: string]: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: any) => boolean;
    message?: string;
  };
}
```

**Implementation Details**:
- Comprehensive validation rules
- Real-time validation feedback
- Input sanitization
- Custom validation support
- Error message formatting

**Usage Examples**:
```typescript
// Validate email
const { validateEmail } = useValidation();
const emailValidation = validateEmail('user@example.com');

// Validate form
const { validateForm } = useValidation();
const formValidation = validateForm(formData, {
  username: { required: true, minLength: 3 },
  email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  password: { required: true, minLength: 8 }
});

// Sanitize input
const { sanitizeInput } = useValidation();
const cleanInput = sanitizeInput(userInput);
```

---

## 🎨 UI Utilities

### Theme Management

**Theme Configuration**:
```typescript
interface Theme {
  name: string;
  type: 'light' | 'dark';
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
  error: string;
}

interface ThemeManager {
  currentTheme: Theme;
  themes: Theme[];
  setTheme: (themeName: string) => void;
  toggleTheme: () => void;
  getThemeColors: () => CSSProperties;
}
```

**Theme Implementation**:
```typescript
// Theme management hook
const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(defaultTheme);
  
  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', theme.primary);
    root.style.setProperty('--secondary-color', theme.secondary);
    root.style.setProperty('--background-color', theme.background);
    root.style.setProperty('--text-color', theme.text);
    root.style.setProperty('--accent-color', theme.accent);
    root.style.setProperty('--error-color', theme.error);
  };
  
  const changeTheme = (themeName: string) => {
    const theme = themes.find(t => t.name === themeName);
    if (theme) {
      setCurrentTheme(theme);
      applyTheme(theme);
      localStorage.setItem('theme', themeName);
    }
  };
  
  return { currentTheme, changeTheme, themes };
};
```

---

## 🔧 Utility Functions

### API Utilities

**API Client**:
```typescript
// API client with authentication
const apiClient = {
  get: async (url: string, options?: RequestOptions) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options?.headers
      }
    });
    return handleResponse(response);
  },
  
  post: async (url: string, data: any, options?: RequestOptions) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options?.headers
      },
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  }
};
```

### Storage Utilities

**Local Storage Management**:
```typescript
// Local storage utilities
const storage = {
  get: (key: string) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },
  
  set: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },
  
  remove: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
};
```

### Error Handling

**Error Management**:
```typescript
// Error handling utilities
const errorHandler = {
  handleApiError: (error: any) => {
    if (error.response?.status === 401) {
      // Handle authentication error
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    return {
      message: error.response?.data?.message || error.message || 'An error occurred',
      status: error.response?.status || 500
    };
  },
  
  logError: (error: Error, context?: string) => {
    console.error(`Error in ${context || 'unknown context'}:`, error);
    // Send to error tracking service
  }
};
```

---

## 📊 Performance Optimization

### Memoization

**Custom Memoization Hook**:
```typescript
// Custom memoization hook
const useMemoizedValue = <T>(value: T, dependencies: any[]): T => {
  const memoizedValue = useMemo(() => value, dependencies);
  return memoizedValue;
};

// Usage
const memoizedStockData = useMemoizedValue(stockData, [stockData.symbol]);
```

### Debouncing

**Debounce Hook**:
```typescript
// Debounce hook for search
const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Usage
const debouncedSearchQuery = useDebounce(searchQuery, 300);
```

---

## 🔄 State Management

### Context Providers

**App Context Provider**:
```typescript
// App context provider
const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const value = {
    user,
    setUser,
    loading,
    setLoading,
    error,
    setError
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
```

---

**Next**: See [Frontend Pages](./frontend-pages.md) for detailed page documentation. 