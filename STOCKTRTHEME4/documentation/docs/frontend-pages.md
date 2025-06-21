# StockTR Frontend Pages

Complete documentation of all frontend pages, layouts, and functionality in the StockTR application.

## 📄 Pages Overview

The StockTR application uses Next.js 14 with the App Router, providing a modern, responsive user interface with multiple pages for different functionalities.

**Page Categories**:
- **Authentication Pages**: Login and signup
- **Main Application Pages**: Dashboard, profile, and stock management
- **Public Pages**: Landing page and information
- **Error Pages**: 404 and error handling

## 📁 Page Structure

```
app/
├── app/                    # Main app layout and pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── Login/                 # Login page
│   ├── globals.css        # Login-specific styles
│   └── page.tsx           # Login component
├── signup/                # Signup page
│   ├── globals.css        # Signup-specific styles
│   └── page.tsx           # Signup component
├── Profile/               # User profile page
│   ├── globals.css        # Profile-specific styles
│   └── page.tsx           # Profile component
├── favicon.ico            # App favicon
├── globals.css            # Global CSS
└── layout.tsx             # Root layout
```

---

## 🏠 Main Application Pages

### Home Page (Dashboard)

**File Location**: `client/src/app/app/page.tsx`

**Purpose**: Main dashboard displaying stock information, watchlist, and user overview.

**Features**:
- Stock search and display
- Watchlist management
- User profile overview
- Real-time stock data
- Quick actions

**Page Components**:
- Navigation bar
- Stock search interface
- Stock display cards
- Watchlist section
- User information panel

**Layout Structure**:
```tsx
// Home page layout
export default function HomePage() {
  return (
    <div className="home-page">
      <NavBar />
      <main className="main-content">
        <div className="dashboard-grid">
          <StockSearch />
          <StockDisplay />
          <WatchlistSection />
          <UserOverview />
        </div>
      </main>
    </div>
  );
}
```

**Responsive Design**:
- **Desktop**: Grid layout with sidebar
- **Tablet**: Stacked layout with navigation
- **Mobile**: Single column with collapsible sections

**State Management**:
- Stock data fetching
- Watchlist operations
- User authentication state
- Theme management

---

### Profile Page

**File Location**: `client/src/app/Profile/page.tsx`

**Purpose**: User profile management and settings.

**Features**:
- Profile information display
- Profile editing capabilities
- Password change functionality
- Profile icon management
- Account settings

**Page Components**:
- Profile header with avatar
- Profile information form
- Password change form
- Profile icon upload
- Account statistics

**Layout Structure**:
```tsx
// Profile page layout
export default function ProfilePage() {
  return (
    <div className="profile-page">
      <NavBar />
      <main className="profile-content">
        <div className="profile-header">
          <ProfileAvatar />
          <ProfileInfo />
        </div>
        <div className="profile-sections">
          <ProfileEditForm />
          <PasswordChangeForm />
          <AccountSettings />
        </div>
      </main>
    </div>
  );
}
```

**Form Handling**:
- Real-time validation
- Optimistic updates
- Error handling
- Success feedback

**Profile Sections**:
1. **Basic Information**: Username, email, display name
2. **Security**: Password change, two-factor authentication
3. **Preferences**: Theme, notifications, privacy settings
4. **Account**: Account statistics, activity history

---

## 🔐 Authentication Pages

### Login Page

**File Location**: `client/src/app/Login/page.tsx`

**Purpose**: User authentication and login functionality.

**Features**:
- Email and password login
- Remember me functionality
- Forgot password link
- Signup redirect
- Form validation

**Page Components**:
- Login form
- Branding and logo
- Error messages
- Loading states
- Navigation links

**Layout Structure**:
```tsx
// Login page layout
export default function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <Logo />
          <h1>Welcome Back</h1>
          <p>Sign in to your StockTR account</p>
        </div>
        <LoginForm />
        <div className="login-footer">
          <Link href="/signup">Don't have an account? Sign up</Link>
          <Link href="/forgot-password">Forgot password?</Link>
        </div>
      </div>
    </div>
  );
}
```

**Form Validation**:
- Email format validation
- Password requirements
- Real-time feedback
- Error message display

**Authentication Flow**:
1. Form submission
2. Input validation
3. API authentication
4. Token storage
5. Redirect to dashboard

**Security Features**:
- CSRF protection
- Rate limiting
- Secure token handling
- Input sanitization

---

### Signup Page

**File Location**: `client/src/app/signup/page.tsx`

**Purpose**: New user registration and account creation.

**Features**:
- User registration form
- Terms and conditions
- Email verification
- Password strength indicator
- Account creation

**Page Components**:
- Registration form
- Terms acceptance
- Password strength meter
- Success confirmation
- Login redirect

**Layout Structure**:
```tsx
// Signup page layout
export default function SignupPage() {
  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-header">
          <Logo />
          <h1>Create Account</h1>
          <p>Join StockTR and start tracking your investments</p>
        </div>
        <SignupForm />
        <div className="signup-footer">
          <Link href="/login">Already have an account? Sign in</Link>
        </div>
      </div>
    </div>
  );
}
```

**Registration Process**:
1. Form validation
2. Username/email availability check
3. Password strength verification
4. Account creation
5. Email verification (optional)
6. Automatic login

**Form Fields**:
- Username (3-20 characters)
- Email address
- Password (minimum 8 characters)
- Confirm password
- Terms acceptance

---

## 🎨 Page Layouts

### Root Layout

**File Location**: `client/src/app/layout.tsx`

**Purpose**: Main application layout wrapper with global configuration.

**Features**:
- Global metadata
- Theme provider
- Authentication context
- Error boundaries
- Global styles

**Layout Structure**:
```tsx
// Root layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>StockTR - Stock Trading & Watchlist</title>
        <meta name="description" content="Track stocks and manage your watchlist" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

**Global Configuration**:
- HTML metadata
- Font loading
- Theme initialization
- Authentication setup
- Error handling

---

### App Layout

**File Location**: `client/src/app/app/layout.tsx`

**Purpose**: Layout for authenticated application pages.

**Features**:
- Navigation bar
- Sidebar (desktop)
- Content area
- Footer
- Responsive design

**Layout Structure**:
```tsx
// App layout
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app-layout">
      <NavBar />
      <div className="app-content">
        <Sidebar />
        <main className="main-content">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
```

**Responsive Behavior**:
- **Desktop**: Sidebar + main content
- **Tablet**: Collapsible sidebar
- **Mobile**: Full-width content with mobile navigation

---

## 🎯 Page Functionality

### Stock Management

**Stock Search**:
- Real-time search with debouncing
- Search suggestions
- Recent searches
- Search history

**Stock Display**:
- Current price and change
- Company information
- Price charts
- Add to watchlist button

**Watchlist Management**:
- Add/remove stocks
- Watchlist overview
- Price alerts
- Watchlist sharing

### User Management

**Profile Management**:
- Profile information editing
- Avatar upload
- Privacy settings
- Account preferences

**Security Features**:
- Password change
- Two-factor authentication
- Login history
- Account recovery

### Navigation

**Navigation Bar**:
- Logo and branding
- Main navigation links
- User menu
- Theme switcher
- Search functionality

**Breadcrumbs**:
- Page hierarchy
- Navigation history
- Quick navigation

---

## 📱 Responsive Design

### Mobile-First Approach

**Breakpoints**:
```css
/* Mobile: 320px - 768px */
@media (max-width: 768px) {
  /* Mobile styles */
}

/* Tablet: 768px - 1024px */
@media (min-width: 768px) and (max-width: 1024px) {
  /* Tablet styles */
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
  /* Desktop styles */
}
```

**Mobile Optimizations**:
- Touch-friendly interfaces
- Swipe gestures
- Mobile navigation
- Optimized forms
- Fast loading

**Tablet Optimizations**:
- Hybrid layouts
- Touch and mouse support
- Sidebar navigation
- Responsive grids

**Desktop Optimizations**:
- Full feature set
- Keyboard shortcuts
- Advanced interactions
- Multi-column layouts

---

## 🎨 Styling and Themes

### CSS Architecture

**Global Styles**:
```css
/* Global CSS variables */
:root {
  --primary-color: #1976d2;
  --secondary-color: #424242;
  --background-color: #f5f5f5;
  --text-color: #222222;
  --accent-color: #ff9800;
  --error-color: #d32f2f;
}

/* Global reset and base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--background-color);
}
```

**Component Styles**:
- CSS Modules for component isolation
- Utility classes for common styles
- Theme-aware styling
- Responsive design utilities

**Theme System**:
- CSS custom properties
- Dynamic theme switching
- Dark/light mode support
- Custom theme creation

---

## 🔄 Page State Management

### Authentication State

**User Context**:
```tsx
// User authentication context
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Authentication logic
  const login = async (email: string, password: string) => {
    // Login implementation
  };
  
  const logout = () => {
    // Logout implementation
  };
  
  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};
```

**Route Protection**:
```tsx
// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useUser();
  const router = useRouter();
  
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return user ? <>{children}</> : null;
};
```

### Page State

**Loading States**:
- Page loading indicators
- Skeleton screens
- Progressive loading
- Error states

**Error Handling**:
- Error boundaries
- Error pages
- User-friendly error messages
- Error reporting

---

## 📊 Performance Optimization

### Page Optimization

**Code Splitting**:
- Route-based code splitting
- Component lazy loading
- Dynamic imports
- Bundle optimization

**Image Optimization**:
- Next.js Image component
- WebP format support
- Responsive images
- Lazy loading

**Caching Strategy**:
- Static page caching
- API response caching
- Browser caching
- Service worker caching

### SEO Optimization

**Metadata Management**:
```tsx
// Page metadata
export const metadata = {
  title: 'StockTR - Stock Trading & Watchlist',
  description: 'Track stocks and manage your watchlist with real-time data',
  keywords: 'stocks, trading, watchlist, finance, investment',
  openGraph: {
    title: 'StockTR - Stock Trading & Watchlist',
    description: 'Track stocks and manage your watchlist',
    type: 'website',
    url: 'https://stocktr.com',
  },
};
```

**Structured Data**:
- JSON-LD markup
- Schema.org implementation
- Rich snippets
- Search engine optimization

---

## 🔧 Page Configuration

### Environment Configuration

**Environment Variables**:
```env
# Page configuration
NEXT_PUBLIC_APP_NAME=StockTR
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_PWA=true
```

**Feature Flags**:
- Analytics integration
- PWA functionality
- Real-time features
- Advanced features

### Page Settings

**Page Configuration**:
```typescript
// Page configuration object
const pageConfig = {
  title: 'StockTR',
  description: 'Stock Trading & Watchlist Application',
  theme: {
    default: 'light',
    options: ['light', 'dark', 'auto']
  },
  features: {
    realTime: true,
    analytics: true,
    pwa: true
  }
};
```

---

## 🧪 Page Testing

### Testing Strategy

**Unit Tests**:
- Component testing
- Hook testing
- Utility testing
- Page logic testing

**Integration Tests**:
- Page flow testing
- API integration testing
- User interaction testing
- Cross-browser testing

**E2E Tests**:
- Complete user journeys
- Authentication flows
- Stock management flows
- Profile management flows

### Testing Tools

**Testing Framework**:
- Jest for unit testing
- React Testing Library for component testing
- Cypress for E2E testing
- Playwright for cross-browser testing

---

## 📱 PWA Features

### Progressive Web App

**Service Worker**:
- Offline functionality
- Background sync
- Push notifications
- Cache management

**App Manifest**:
- App icons
- Theme colors
- Display mode
- Orientation settings

**Installation**:
- Add to home screen
- App-like experience
- Offline access
- Native features

---

**Next**: See [Configuration Files](./configuration-files.md) for detailed configuration documentation. 