# E-Commerce Application - Project Structure

## Overview
This is a modern e-commerce web application built with React, Redux, and Vite with secure JWT authentication using HTTP-only cookies.

## Root Directory
```
ecomm/
├── .git/                      # Git version control
├── .gitignore                 # Git ignore rules
├── .idea/                     # IDE configuration (JetBrains)
├── .vscode/                   # VS Code configuration
├── eslint.config.js           # ESLint configuration for code linting
├── index.html                 # Main HTML entry point
├── node_modules/              # NPM dependencies
├── package-lock.json          # Locked dependency versions
├── package.json               # Project dependencies and scripts
├── README.md                  # Project documentation
├── vite.config.js             # Vite bundler configuration
├── backend/                   # Express backend server
├── public/                    # Static assets
└── src/                       # Source code
```

## Backend Directory
```
backend/
├── .env                       # Environment variables (JWT secrets, etc.)
├── app.js                     # Express application with JWT auth
├── package.json               # Backend dependencies
├── users.json                 # User database (JSON file)
└── middleware/
    └── auth.js                # Authentication & authorization middleware
```

## Public Directory
```
public/
├── vite.svg                   # Vite logo
├── Zenon.png                  # Brand logo (PNG format)
└── Zenon.svg                  # Brand logo (SVG format)
```

## Source Directory Structure

### Main Files
```
src/
├── App.jsx                    # Root application component with auth verification
└── main.jsx                   # Application entry point
```

### Assets (`src/assets/`)
```
assets/
├── react.svg                  # React logo
├── imgs/                      # Image files
│   ├── image_Sec.jpg          # Section background image
│   ├── team-1.png             # Team member photo 1
│   ├── team-2.png             # Team member photo 2
│   └── team-3.png             # Team member photo 3
└── styles/                    # Global styles
    ├── globals.css            # Global CSS styles
    ├── mixins.css             # CSS mixins and utilities
    ├── styles.css             # Main stylesheet
    └── variables.css          # CSS variables (colors, spacing, etc.)
```

### Components (`src/components/`)
Reusable UI components organized by feature:

```
components/
├── Footer/
│   ├── Footer.jsx             # Footer component
│   └── Footer.module.css      # Footer styles
├── NavBar/
│   ├── NavBar.jsx             # Navigation bar with auth-aware UI
│   └── NavBar.module.css      # Navigation bar styles (includes user menu)
├── ProductCard/
│   ├── ProductCard.jsx        # Product card component
│   └── ProductCard.module.css # Product card styles
└── SideBar/
    ├── SideBar.jsx            # Sidebar component
    └── SideBar.module.css     # Sidebar styles
```

### Hooks (`src/hooks/`)
Custom React hooks:

```
hooks/
└── useAuth.js                 # Custom authentication hook (Redux integration)
```

### Layout (`src/layout/`)
Layout components for different application sections:

```
layout/
├── Layout.module.css          # Layout styles
├── ProtectedLayout.jsx        # Layout for authenticated routes
└── PublicLayout.jsx           # Layout for public routes
```

### Pages (`src/pages/`)
Page components organized by access level:

#### Error Pages
```
pages/Error/
├── Error.jsx                  # 404 and error page component
└── Error.module.css           # Error page styles
```

#### Protected Pages (Require Authentication)
```
pages/Protected/
├── Account/
│   ├── Account.jsx            # User account management
│   └── Account.module.css     # Account page styles
├── Cart/
│   ├── Cart.jsx               # Shopping cart page
│   └── Cart.module.css        # Cart page styles
├── CheckOut/
│   ├── CheckOut.jsx           # Checkout process page
│   └── CheckOut.module.css    # Checkout page styles
└── Wishlist/
    ├── Wishlist.jsx           # User wishlist page
    └── Wishlist.module.css    # Wishlist page styles
```

#### Public Pages (Accessible to All)
```
pages/Public/
├── About/
│   ├── About.jsx              # About us page
│   ├── About.module.css       # About page styles
│   ├── ServicesSection.jsx    # Services section component
│   ├── StatCard.jsx           # Statistics card component
│   ├── TeamWork.jsx           # Team section component
│   └── useCountUpOnVisible.jsx # Count-up animation hook
├── Auth/
│   ├── LogIn.jsx              # Login page
│   ├── LogIn.module.css       # Login page styles
│   ├── SignUp.jsx             # Sign up page
│   └── SignUp.module.css      # Sign up page styles
├── Contact/
│   ├── Contact.jsx            # Contact us page
│   └── Contact.module.css     # Contact page styles
├── FAQ/
│   ├── FAQ.jsx                # Frequently asked questions
│   └── FAQ.module.css         # FAQ page styles
├── Home/
│   ├── Home.jsx               # Homepage
│   └── Home.module.css        # Homepage styles
├── Privacy/
│   ├── Privacy.jsx            # Privacy policy page
│   └── Privacy.module.css     # Privacy page styles
├── ProductDetails/
│   ├── ProductDetails.jsx     # Product detail page
│   └── ProductDetails.module.css # Product detail styles
└── Terms/
    ├── Terms.jsx              # Terms and conditions page
    └── Terms.module.css       # Terms page styles
```

### Routes (`src/routes/`)
Routing configuration:

```
routes/
├── AppRoutes.jsx              # Main application routes
└── ProtectedRoute.jsx         # Protected route wrapper component
```

### Store (`src/store/`)
Redux store configuration and slices:

```
store/
├── index.js                   # Redux store configuration
├── Auth/
│   ├── reducers.js            # Authentication reducers
│   └── slice.js               # Authentication slice
└── Theme/
    ├── reducers.js            # Theme reducers (light/dark mode)
    └── slice.js               # Theme slice
```

### Utils (`src/utils/`)
Utility functions and API configuration:

```
Utility functions and helpers:
├── api.js                     # API endpoints and authentication calls
└── helpers.js                 # Helper functions (HTTP-only cookie support)
```

## Technology Stack

### Core
- **React** - UI library
- **Redux Toolkit** - Global state management
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server

### Backend
- **Express** - Node.js web framework
- **JWT (jsonwebtoken)** - Token-based authentication
- **bcryptjs** - Password hashing (ready for production)
- **cookie-parser** - HTTP-only cookie handling

### Styling
- **CSS Modules** - Component-scoped styling
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Icon library

### State Management
- **Redux Toolkit** - Centralized state management
- **React-Redux** - React bindings for Redux

### Notifications
- **React Toastify** - Toast notifications for user feedback

### Development Tools
- **ESLint** - Code linting
- **Git** - Version control
- **Nodemon** - Auto-restart for backend development

## Key Features

### Authentication & Security
- JWT-based authentication with HTTP-only cookies
- Secure token storage (protected from XSS attacks)
- Protected routes for authenticated users
- Role-based authorization (admin/customer)
- Persistent login sessions
- Secure logout functionality

### E-Commerce Functionality
- Product browsing and details
- Shopping cart management
- Wishlist functionality
- Checkout process
- User account management

### UI/UX
- Responsive navigation with user dropdown menu
- Theme switching (light/dark mode)
- Toast notifications for user feedback
- Modular component architecture
- Consistent styling with CSS modules

### Informational Pages
- About us with team section
- Contact form
- FAQ section
- Privacy policy
- Terms and conditions

## Backend API Structure

### Authentication Endpoints
- `POST /api/auth/login` - User login (sets HTTP-only cookie)
- `POST /api/auth/register` - User registration (sets HTTP-only cookie)
- `GET /api/auth/verify` - Verify token validity (protected)
- `POST /api/auth/logout` - User logout (clears cookie, protected)
- `GET /api/auth/me` - Get current user profile (protected)
- `PUT /api/auth/me` - Update user profile (protected)

### Admin Endpoints
- `GET /api/admin/users` - Get all users (admin only, protected)

### User Endpoints
- `GET /api/users` - Get all users (public)
- `GET /api/users/:id` - Get user by ID (public)

## Routing Structure

### Public Routes
- `/` - Home
- `/about` - About Us
- `/contact` - Contact
- `/faq` - FAQ
- `/privacy` - Privacy Policy
- `/terms` - Terms & Conditions
- `/login` - Login
- `/signup` - Sign Up
- `/products/:id` - Product Details

### Protected Routes (Requires Authentication)
- `/account` - User Account
- `/cart` - Shopping Cart
- `/checkout` - Checkout
- `/wishlist` - Wishlist

### Error Routes
- `*` - 404 Error Page

## Development Guidelines

### File Naming Conventions
- Components: PascalCase (e.g., `ProductCard.jsx`)
- CSS Modules: `ComponentName.module.css`
- Utilities: camelCase (e.g., `helpers.js`)
- Hooks: camelCase with `use` prefix (e.g., `useAuth.js`)

### Component Organization
- Each component has its own directory
- Styles are co-located with components using CSS Modules
- Related sub-components are kept in the same directory

### State Management
- **Redux** - All global state (Authentication, Theme, Cart, Wishlist)
- **Local state** - Component-specific state using useState hook
- **No Context API** - Removed in favor of Redux for consistency

### Security Best Practices
- Tokens stored in HTTP-only cookies (not accessible via JavaScript)
- CORS configured with credentials support
- SameSite cookie attribute prevents CSRF attacks
- Secure flag enabled in production (HTTPS only)
- Password hashing ready for production (bcrypt)

## Running the Application

### Development Mode

**Start Backend:**
```bash
cd backend
npm run dev
```
Backend runs on: `http://localhost:3001`

**Start Frontend:**
```bash
npm run dev
```
Frontend runs on: `http://localhost:5173`

### Environment Variables
Backend requires `.env` file:
```
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
PORT=3001
NODE_ENV=development
```

## Documentation Files
- **AUTHENTICATION_GUIDE.md** - Complete authentication implementation details
- **QUICK_START.md** - Quick start guide for testing the app
- **SECURITY_IMPLEMENTATION.md** - HTTP-only cookie security documentation
- **project-structure.md** - This file

---

*Last Updated: October 18, 2025*
*Architecture: Redux-based state management with HTTP-only cookie authentication*
