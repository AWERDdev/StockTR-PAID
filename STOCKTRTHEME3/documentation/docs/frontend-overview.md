# StockTR Frontend Overview

## 🏗️ Architecture

The StockTR frontend is built using **Next.js 14** with the App Router, featuring a modern React-based architecture:

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: CSS Modules with global styles
- **State Management**: React hooks and context
- **Authentication**: JWT token management
- **Theming**: Multi-theme support with JSON configuration
- **Responsive Design**: Mobile-first approach

## 📁 Project Structure

```
client/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── app/               # Main app layout and pages
│   │   ├── Login/             # Login page
│   │   ├── signup/            # Signup page
│   │   ├── Profile/           # User profile page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # Reusable React components
│   │   ├── NavBar.tsx         # Navigation bar (authenticated)
│   │   ├── NavBarNoAUTH.tsx   # Navigation bar (unauthenticated)
│   │   ├── NavBarNoAUTH2.tsx  # Alternative nav bar
│   │   ├── Stock.tsx          # Stock display component
│   │   ├── StockWatchList.tsx # Watchlist component
│   │   ├── INFOBar.tsx        # Information bar
│   │   └── LogoutButton.tsx   # Logout functionality
│   ├── tools/                 # Custom hooks and utilities
│   │   ├── useAppData.ts      # App data management
│   │   ├── useAppDataUpdate.ts # Data update hooks
│   │   ├── useNavigation.ts   # Navigation utilities
│   │   ├── useStock.ts        # Stock data hooks
│   │   ├── useStockWatchList.ts # Watchlist hooks
│   │   ├── useUserIcon.ts     # User icon management
│   │   ├── useUserPasswordUpdate.ts # Password update
│   │   └── useValidation.ts   # Form validation
│   ├── Types/                 # TypeScript type definitions
│   │   ├── StockData.ts       # Stock data types
│   │   └── User.ts            # User data types
│   └── config.js              # Configuration file
├── public/                    # Static assets
│   ├── file.svg              # File icon
│   ├── globe.svg             # Globe icon
│   ├── next.svg              # Next.js logo
│   ├── vercel.svg            # Vercel logo
│   └── window.svg            # Window icon
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── next.config.ts            # Next.js configuration
├── postcss.config.mjs        # PostCSS configuration
└── eslint.config.mjs         # ESLint configuration
```

## 🎨 Theme System

### Theme Configuration

Themes are defined in `src/StockTRsstyling.json` with four available themes:

1. **Default Light** - Professional light theme
2. **Minimal Light** - Clean, minimal light theme  
3. **Classic Dark** - Traditional dark theme
4. **Neon Dark** - Vibrant, neon-accented dark theme

### Theme Structure

```json
{
  "themes": [
    {
      "name": "Theme Name",
      "type": "light|dark",
      "primary": "#color",
      "secondary": "#color", 
      "background": "#color",
      "text": "#color",
      "accent": "#color",
      "error": "#color"
    }
  ]
}
```

### Theme Implementation

Themes are applied through CSS custom properties and can be switched dynamically:

```css
:root {
  --primary-color: var(--theme-primary);
  --secondary-color: var(--theme-secondary);
  --background-color: var(--theme-background);
  --text-color: var(--theme-text);
  --accent-color: var(--theme-accent);
  --error-color: var(--theme-error);
}
```

## 🔐 Authentication Flow

### Authentication State Management

The app uses React context and localStorage for authentication state:

```typescript
// Authentication context
interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}
```

### Protected Routes

Routes are protected using middleware and conditional rendering:

```typescript
// Route protection
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    redirect('/login');
  }
  
  return <>{children}</>;
};
```

## 📱 Responsive Design

### Breakpoints

The app uses a mobile-first approach with these breakpoints:

```css
/* Mobile: 320px - 768px */
/* Tablet: 768px - 1024px */
/* Desktop: 1024px+ */

@media (min-width: 768px) {
  /* Tablet styles */
}

@media (min-width: 1024px) {
  /* Desktop styles */
}
```

### Component Responsiveness

All components are designed to be responsive:

- **Navigation**: Collapsible menu on mobile
- **Stock Cards**: Stack vertically on mobile, grid on desktop
- **Forms**: Full-width inputs on mobile
- **Tables**: Scrollable on mobile devices

## 🔄 State Management

### Custom Hooks

The app uses custom hooks for state management:

```typescript
// Stock data management
const useStock = () => {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch stock data
  const fetchStock = async (symbol: string) => { /* ... */ };
  
  return { stockData, loading, error, fetchStock };
};

// Watchlist management
const useStockWatchList = () => {
  const [watchlist, setWatchlist] = useState<StockData[]>([]);
  
  // Add/remove from watchlist
  const addToWatchlist = async (symbol: string) => { /* ... */ };
  const removeFromWatchlist = async (symbol: string) => { /* ... */ };
  
  return { watchlist, addToWatchlist, removeFromWatchlist };
};
```

### Data Flow

1. **User Action** → Component
2. **Custom Hook** → API Call
3. **State Update** → UI Re-render
4. **Local Storage** → Persistence

## 🎯 Key Components

### Navigation Components

#### NavBar.tsx (Authenticated)
- User profile display
- Watchlist access
- Logout functionality
- Theme switcher

#### NavBarNoAUTH.tsx (Unauthenticated)
- Login/Signup links
- App branding
- Public navigation

### Stock Components

#### Stock.tsx
- Stock price display
- Price change indicators
- Company information
- Add to watchlist button

#### StockWatchList.tsx
- Watchlist display
- Remove from watchlist
- Real-time price updates
- Empty state handling

### Utility Components

#### INFOBar.tsx
- Information display
- Status messages
- Loading indicators

#### LogoutButton.tsx
- Logout functionality
- Token cleanup
- Redirect handling

## 🛠️ Development Tools

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ]
  }
}
```

### ESLint Configuration

```javascript
export default {
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    '@typescript-eslint/recommended'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn'
  }
};
```

## 🚀 Performance Optimization

### Code Splitting

- **Route-based splitting**: Each page is automatically code-split
- **Component lazy loading**: Heavy components loaded on demand
- **Dynamic imports**: API calls and utilities loaded as needed

### Image Optimization

- **Next.js Image component**: Automatic optimization
- **WebP format**: Modern image formats
- **Responsive images**: Different sizes for different devices

### Caching Strategy

- **Static assets**: Long-term caching
- **API responses**: Short-term caching with revalidation
- **User data**: Local storage with expiration

## 🔧 Configuration

### Environment Variables

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_NAME=StockTR

# Feature Flags
NEXT_PUBLIC_ENABLE_THEMES=true
NEXT_PUBLIC_ENABLE_REAL_TIME=true
```

### Next.js Configuration

```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost'],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};

export default nextConfig;
```

## 🧪 Testing Strategy

### Component Testing

- **Unit tests**: Individual component testing
- **Integration tests**: Component interaction testing
- **Accessibility tests**: ARIA compliance testing

### E2E Testing

- **User flows**: Complete user journey testing
- **Authentication**: Login/logout flow testing
- **Stock operations**: Watchlist management testing

## 📱 PWA Features

### Service Worker

- **Offline support**: Basic offline functionality
- **Caching**: API response caching
- **Background sync**: Data synchronization

### Manifest

- **App icons**: Multiple sizes for different devices
- **Theme colors**: Dynamic theme support
- **Display mode**: Standalone app experience

## 🔒 Security Features

### Client-Side Security

- **Input validation**: Form validation and sanitization
- **XSS prevention**: Content Security Policy
- **CSRF protection**: Token-based protection

### Data Protection

- **Token storage**: Secure token handling
- **Sensitive data**: No sensitive data in localStorage
- **HTTPS only**: Production HTTPS enforcement

## 📊 Analytics and Monitoring

### Performance Monitoring

- **Core Web Vitals**: Performance metrics tracking
- **Error tracking**: Error boundary implementation
- **User analytics**: Usage pattern analysis

### Error Handling

```typescript
// Global error boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}
```

---

**Next**: See [Frontend Components](./frontend-components.md) for detailed component documentation. 