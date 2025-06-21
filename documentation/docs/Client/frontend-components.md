# StockTR Frontend Components

Detailed documentation for all React components in the StockTR application.

## 🧭 Navigation Components

### NavBar.tsx

**Purpose**: Main navigation bar for authenticated users.

**Props**:
```typescript
interface NavBarProps {
  user?: User;
  onLogout?: () => void;
  onThemeChange?: (theme: string) => void;
  currentTheme?: string;
}
```

**Features**:
- User profile display with avatar
- Quick access to watchlist
- Theme switcher
- Logout functionality
- Responsive mobile menu

**Usage**:
```tsx
import NavBar from '@/components/NavBar';

function AppLayout({ user }) {
  const handleLogout = () => {
    // Logout logic
  };

  const handleThemeChange = (theme) => {
    // Theme change logic
  };

  return (
    <NavBar
      user={user}
      onLogout={handleLogout}
      onThemeChange={handleThemeChange}
      currentTheme="default-light"
    />
  );
}
```

**Styling**:
```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: var(--background-color);
  border-bottom: 1px solid var(--border-color);
}

.navbar-mobile {
  display: none;
}

@media (max-width: 768px) {
  .navbar-desktop {
    display: none;
  }
  
  .navbar-mobile {
    display: block;
  }
}
```

---

### NavBarNoAUTH.tsx

**Purpose**: Navigation bar for unauthenticated users.

**Props**:
```typescript
interface NavBarNoAUTHProps {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
  appName?: string;
}
```

**Features**:
- App branding and logo
- Login/Signup buttons
- Clean, minimal design
- Call-to-action focused

**Usage**:
```tsx
import NavBarNoAUTH from '@/components/NavBarNoAUTH';

function LandingPage() {
  const handleLogin = () => {
    router.push('/login');
  };

  const handleSignup = () => {
    router.push('/signup');
  };

  return (
    <NavBarNoAUTH
      onLoginClick={handleLogin}
      onSignupClick={handleSignup}
      appName="StockTR"
    />
  );
}
```

---

### NavBarNoAUTH2.tsx

**Purpose**: Alternative navigation bar with different styling.

**Props**:
```typescript
interface NavBarNoAUTH2Props {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
  variant?: 'primary' | 'secondary';
}
```

**Features**:
- Alternative design variant
- Different color schemes
- Enhanced visual appeal
- Same functionality as NavBarNoAUTH

---

## 📈 Stock Components

### Stock.tsx

**Purpose**: Display individual stock information and data.

**Props**:
```typescript
interface StockProps {
  stockData: StockData;
  onAddToWatchlist?: (symbol: string) => void;
  onRemoveFromWatchlist?: (symbol: string) => void;
  isInWatchlist?: boolean;
  showActions?: boolean;
  variant?: 'card' | 'list' | 'compact';
}
```

**StockData Interface**:
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
}
```

**Features**:
- Real-time price display
- Price change indicators (positive/negative)
- Company information
- Add/remove from watchlist
- Multiple display variants
- Responsive design

**Usage**:
```tsx
import Stock from '@/components/Stock';

function StockDisplay() {
  const stockData = {
    symbol: 'AAPL',
    companyName: 'Apple Inc.',
    currentPrice: 150.25,
    change: 2.50,
    changePercent: 1.69,
    volume: 12345678
  };

  const handleAddToWatchlist = (symbol) => {
    // Add to watchlist logic
  };

  return (
    <Stock
      stockData={stockData}
      onAddToWatchlist={handleAddToWatchlist}
      variant="card"
      showActions={true}
    />
  );
}
```

**Styling Variants**:
```css
.stock-card {
  background: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.stock-list {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid var(--border-color);
}

.stock-compact {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}
```

---

### StockWatchList.tsx

**Purpose**: Display and manage user's stock watchlist.

**Props**:
```typescript
interface StockWatchListProps {
  watchlist: StockData[];
  onRemoveFromWatchlist: (symbol: string) => void;
  onRefresh?: () => void;
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
}
```

**Features**:
- Watchlist display with real-time data
- Remove stocks from watchlist
- Loading states
- Error handling
- Empty state with call-to-action
- Auto-refresh functionality

**Usage**:
```tsx
import StockWatchList from '@/components/StockWatchList';

function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRemove = async (symbol) => {
    try {
      await removeFromWatchlist(symbol);
      setWatchlist(prev => prev.filter(stock => stock.symbol !== symbol));
    } catch (error) {
      console.error('Failed to remove stock:', error);
    }
  };

  const handleRefresh = () => {
    // Refresh watchlist data
  };

  return (
    <StockWatchList
      watchlist={watchlist}
      onRemoveFromWatchlist={handleRemove}
      onRefresh={handleRefresh}
      loading={loading}
      emptyMessage="Your watchlist is empty. Add some stocks to get started!"
    />
  );
}
```

**Empty State**:
```tsx
const EmptyWatchlist = ({ message, onAddStock }) => (
  <div className="empty-watchlist">
    <div className="empty-icon">📈</div>
    <h3>No stocks in watchlist</h3>
    <p>{message}</p>
    <button onClick={onAddStock} className="btn-primary">
      Add Your First Stock
    </button>
  </div>
);
```

---

## 🛠️ Utility Components

### INFOBar.tsx

**Purpose**: Display information, status messages, and notifications.

**Props**:
```typescript
interface INFOBarProps {
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
  onClose?: () => void;
  showIcon?: boolean;
  dismissible?: boolean;
}
```

**Features**:
- Multiple message types (info, success, warning, error)
- Auto-dismiss functionality
- Manual close option
- Icon support
- Responsive design

**Usage**:
```tsx
import INFOBar from '@/components/INFOBar';

function App() {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');

  const showMessage = (msg, type = 'info') => {
    setMessage(msg);
    setMessageType(type);
  };

  return (
    <div>
      {message && (
        <INFOBar
          message={message}
          type={messageType}
          duration={5000}
          onClose={() => setMessage('')}
          dismissible={true}
        />
      )}
      {/* Rest of app */}
    </div>
  );
}
```

**Styling by Type**:
```css
.info-bar {
  padding: 0.75rem 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.info-bar.info {
  background: var(--info-bg);
  color: var(--info-text);
  border: 1px solid var(--info-border);
}

.info-bar.success {
  background: var(--success-bg);
  color: var(--success-text);
  border: 1px solid var(--success-border);
}

.info-bar.warning {
  background: var(--warning-bg);
  color: var(--warning-text);
  border: 1px solid var(--warning-border);
}

.info-bar.error {
  background: var(--error-bg);
  color: var(--error-text);
  border: 1px solid var(--error-border);
}
```

---

### LogoutButton.tsx

**Purpose**: Handle user logout functionality.

**Props**:
```typescript
interface LogoutButtonProps {
  onLogout: () => void;
  variant?: 'button' | 'link' | 'icon';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  children?: React.ReactNode;
}
```

**Features**:
- Multiple display variants
- Token cleanup
- Redirect handling
- Confirmation dialog
- Customizable styling

**Usage**:
```tsx
import LogoutButton from '@/components/LogoutButton';

function UserMenu() {
  const handleLogout = () => {
    // Clear token
    localStorage.removeItem('token');
    // Redirect to login
    router.push('/login');
  };

  return (
    <div className="user-menu">
      <LogoutButton
        onLogout={handleLogout}
        variant="button"
        size="medium"
        className="logout-btn"
      >
        Logout
      </LogoutButton>
    </div>
  );
}
```

**Variants**:
```css
.logout-button {
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.logout-button:hover {
  background: var(--primary-dark);
}

.logout-link {
  color: var(--text-color);
  text-decoration: none;
  cursor: pointer;
}

.logout-link:hover {
  text-decoration: underline;
}

.logout-icon {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
}

.logout-icon:hover {
  background: var(--hover-bg);
}
```

---

## 📱 Form Components

### LoginForm.tsx

**Purpose**: User login form with validation.

**Props**:
```typescript
interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  loading?: boolean;
  error?: string | null;
  onForgotPassword?: () => void;
}
```

**Features**:
- Email and password validation
- Loading states
- Error display
- Forgot password link
- Remember me functionality

**Usage**:
```tsx
import LoginForm from '@/components/LoginForm';

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      await loginUser(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginForm
      onSubmit={handleLogin}
      loading={loading}
      error={error}
      onForgotPassword={() => router.push('/forgot-password')}
    />
  );
}
```

---

### SignupForm.tsx

**Purpose**: User registration form with validation.

**Props**:
```typescript
interface SignupFormProps {
  onSubmit: (userData: SignupData) => Promise<void>;
  loading?: boolean;
  error?: string | null;
  onLoginClick?: () => void;
}
```

**SignupData Interface**:
```typescript
interface SignupData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
```

**Features**:
- Username, email, and password validation
- Password confirmation
- Terms and conditions acceptance
- Loading states
- Error handling

---

## 🎨 Theme Components

### ThemeSwitcher.tsx

**Purpose**: Switch between different application themes.

**Props**:
```typescript
interface ThemeSwitcherProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
  themes: Theme[];
  variant?: 'dropdown' | 'buttons' | 'toggle';
}
```

**Theme Interface**:
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
```

**Features**:
- Multiple theme options
- Preview functionality
- Persistent theme selection
- Smooth transitions

**Usage**:
```tsx
import ThemeSwitcher from '@/components/ThemeSwitcher';

function SettingsPage() {
  const [currentTheme, setCurrentTheme] = useState('default-light');
  const themes = [
    { name: 'Default Light', type: 'light' },
    { name: 'Minimal Light', type: 'light' },
    { name: 'Classic Dark', type: 'dark' },
    { name: 'Neon Dark', type: 'dark' }
  ];

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
    localStorage.setItem('theme', theme);
    // Apply theme logic
  };

  return (
    <ThemeSwitcher
      currentTheme={currentTheme}
      onThemeChange={handleThemeChange}
      themes={themes}
      variant="dropdown"
    />
  );
}
```

---

## 🔧 Layout Components

### Layout.tsx

**Purpose**: Main application layout wrapper.

**Props**:
```typescript
interface LayoutProps {
  children: React.ReactNode;
  showNavbar?: boolean;
  showFooter?: boolean;
  className?: string;
}
```

**Features**:
- Consistent layout structure
- Navigation integration
- Footer placement
- Responsive design
- Theme application

**Usage**:
```tsx
import Layout from '@/components/Layout';

function App() {
  return (
    <Layout showNavbar={true} showFooter={true}>
      <main>
        {/* Page content */}
      </main>
    </Layout>
  );
}
```

---

### LoadingSpinner.tsx

**Purpose**: Display loading states throughout the application.

**Props**:
```typescript
interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  text?: string;
  overlay?: boolean;
}
```

**Features**:
- Multiple sizes
- Custom colors
- Loading text
- Overlay mode
- Smooth animations

**Usage**:
```tsx
import LoadingSpinner from '@/components/LoadingSpinner';

function StockList() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <LoadingSpinner size="large" text="Loading stocks..." />;
  }

  return (
    <div>
      {/* Stock list content */}
    </div>
  );
}
```

---

## 📊 Data Display Components

### PriceDisplay.tsx

**Purpose**: Display stock prices with formatting and indicators.

**Props**:
```typescript
interface PriceDisplayProps {
  price: number;
  change?: number;
  changePercent?: number;
  currency?: string;
  showChange?: boolean;
  format?: 'compact' | 'detailed';
}
```

**Features**:
- Price formatting
- Change indicators
- Color coding (positive/negative)
- Multiple display formats
- Currency support

---

### Chart.tsx

**Purpose**: Display stock price charts and graphs.

**Props**:
```typescript
interface ChartProps {
  data: ChartData[];
  type?: 'line' | 'candlestick' | 'bar';
  timeframe?: '1D' | '1W' | '1M' | '3M' | '1Y';
  height?: number;
  showLegend?: boolean;
}
```

**Features**:
- Multiple chart types
- Timeframe selection
- Interactive elements
- Responsive design
- Customizable styling

---

## 🔍 Search Components

### SearchBar.tsx

**Purpose**: Search functionality for stocks and companies.

**Props**:
```typescript
interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
  showSuggestions?: boolean;
  suggestions?: SearchSuggestion[];
}
```

**Features**:
- Debounced search
- Search suggestions
- Auto-complete
- Clear functionality
- Loading states

---

## 📱 Mobile Components

### MobileMenu.tsx

**Purpose**: Mobile navigation menu.

**Props**:
```typescript
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  user?: User;
}
```

**Features**:
- Slide-out animation
- Touch gestures
- Backdrop overlay
- Menu item navigation
- User profile integration

---

## 🎯 Component Best Practices

### 1. Props Validation
```tsx
import PropTypes from 'prop-types';

Stock.propTypes = {
  stockData: PropTypes.shape({
    symbol: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
    currentPrice: PropTypes.number.isRequired,
    change: PropTypes.number,
    changePercent: PropTypes.number
  }).isRequired,
  onAddToWatchlist: PropTypes.func,
  variant: PropTypes.oneOf(['card', 'list', 'compact'])
};
```

### 2. Error Boundaries
```tsx
class ComponentErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong with this component.</div>;
    }

    return this.props.children;
  }
}
```

### 3. Accessibility
```tsx
// Always include proper ARIA labels
<button
  aria-label="Add Apple Inc. to watchlist"
  onClick={() => onAddToWatchlist('AAPL')}
>
  Add to Watchlist
</button>

// Use semantic HTML
<nav role="navigation" aria-label="Main navigation">
  {/* Navigation content */}
</nav>
```

### 4. Performance Optimization
```tsx
// Use React.memo for expensive components
const StockCard = React.memo(({ stockData, onAddToWatchlist }) => {
  return (
    <div className="stock-card">
      {/* Component content */}
    </div>
  );
});

// Use useCallback for event handlers
const handleAddToWatchlist = useCallback((symbol) => {
  onAddToWatchlist(symbol);
}, [onAddToWatchlist]);
```

---

**Next**: See [Frontend Examples](../frontend-examples.md) for practical usage examples and integration patterns. 