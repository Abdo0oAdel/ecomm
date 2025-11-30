# E-Commerce Application - Project Structure

## Overview
This is a modern e-commerce web application built with React, Redux, and Vite.

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
├── .env                       # Environment variables
├── public/                    # Static assets
├── src/                       # Source code
├── project-structure.md       # Project structure documentation
├── swagger.json               # API documentation (Swagger)
└── vercel.json                # Vercel deployment configuration
```


## Public Directory
```
public/
├── Zenon.png                  # Brand logo (PNG format)
└── Zenon.svg                  # Brand logo (SVG format)
```

## Source Directory Structure

### Main Files
```
src/
├── App.jsx
├── main.jsx
├── assets/
│   ├── imgs/
│   └── styles/
│       ├── globals.css
│       ├── mixins.css
│       ├── rtl.css
│       ├── styles.css
│       └── variables.css
├── components/
│   ├── AccountDropDown/
│   │   ├── AccountDrop.jsx
│   │   └── AccountDrop.module.css
│   ├── AdminSidebar/
│   │   ├── AdminSidebar.jsx
│   │   └── AdminSidebar.module.css
│   ├── Footer/
│   │   ├── Footer.jsx
│   │   └── Footer.module.css
│   ├── NavBar/
│   │   ├── NavBar.jsx
│   │   └── NavBar.module.css
│   ├── ProductCard/
│   │   ├── ProductCard.jsx
│   │   └── ProductCard.module.css
│   └── SideBar/
│       ├── SideBar.jsx
│       └── SideBar.module.css
├── hooks/
│   ├── useAuth.js
│   ├── useCart.js
│   ├── useCategories.js
│   ├── useCheckout.js
│   ├── useProduct.js
│   ├── useProducts.js
│   ├── useShipping.js
│   ├── useUsers.js
│   └── useWishlist.js
├── i18n/
│   ├── config.js
│   ├── ExampleUsage.jsx
│   ├── QUICK_REFERENCE.md
│   ├── README.md
│   └── locales/
│       ├── ar.json
│       ├── en.json
│       └── fr.json
├── layout/
│   ├── Layout.module.css
│   ├── ProtectedLayout.jsx
│   └── PublicLayout.jsx
├── pages/
│   ├── admin/
│   │   ├── AdminDashboard/
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── AdminDashboard.module.css
│   │   ├── OrderManagement/
│   │   │   ├── OrderForm.jsx
│   │   │   ├── OrderForm.module.css
│   │   │   ├── OrderList.jsx
│   │   │   ├── OrderList.module.css
│   │   │   ├── OrderManagement.jsx
│   │   │   ├── OrderManagement.module.css
│   │   │   ├── OrderModal.jsx
│   │   │   └── OrderModal.module.css
│   │   ├── ProductManagement/
│   │   │   ├── ProductForm.jsx
│   │   │   ├── ProductForm.module.css
│   │   │   ├── ProductList.jsx
│   │   │   ├── ProductList.module.css
│   │   │   ├── ProductManagement.jsx
│   │   │   ├── ProductManagement.module.css
│   │   │   ├── ProductModal.jsx
│   │   │   └── ProductModal.module.css
│   │   ├── UserManagement/
│   │   │   ├── UserManagement.jsx
│   │   │   └── UserManagement.module.css
│   ├── Error/
│   │   ├── Error.jsx
│   │   ├── Error.module.css
│   │   └── ErrorLogic.jsx
│   ├── Protected/
│   │   ├── Account/
│   │   ├── Cart/
│   │   ├── CheckOut/
│   │   ├── ShippingMap/
│   │   └── Wishlist/
│   ├── Public/
│   │   ├── About/
│   │   ├── Auth/
│   │   ├── Contact/
│   │   ├── FAQ/
│   │   ├── Home/
│   │   ├── Privacy/
│   │   ├── ProductDetails/
│   │   ├── Products/
│   │   ├── QRScanner/
│   │   ├── Support/
│   │   └── Terms/
├── routes/
│   ├── AdminRoute.jsx
│   ├── AppRoutes.jsx
│   └── ProtectedRoute.jsx
├── services/
│   ├── api.js
│   ├── cart.js
│   ├── categories.js
│   ├── checkout.js
│   ├── orders.js
│   ├── products.js
│   ├── shipping.js
│   └── users.js
├── store/
│   ├── index.js
│   ├── Auth/
│   │   ├── reducers.js
│   │   └── slice.js
│   ├── Cart/
│   │   ├── reducers.js
│   │   └── slice.js
│   ├── CheckOut/
│   │   ├── reducers.js
│   │   └── slice.js
│   ├── Theme/
│   │   ├── reducers.js
│   │   └── slice.js
│   ├── User/
│   │   └── slice.js
│   └── Wishlist/
│       ├── reducers.js
│       └── slice.js
├── utils/
│   ├── api.js
│   ├── authValidators.js
│   ├── helpers.js
│   ├── localStorage.js
│   └── tokenManager.js
```

## Technology Stack

### Core
- **React** - UI library
- **Redux Toolkit** - Global state management
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server

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

## Key Features

### Authentication & Security

### E-Commerce Functionality
- Product browsing and details
- Shopping cart management
- Wishlist functionality
- Checkout process
- User account management
- **Admin Dashboard** for managing users, products, and orders
- **Order Management** (view, update, and process orders)
- **Product Management** (add, edit, delete products)
- **User Management** (admin controls for users)

### UI/UX & Features
- Responsive navigation with user dropdown menu
- Theme switching (light/dark mode)
- Toast notifications for user feedback
- Modular component architecture
- Consistent styling with CSS modules
- **RTL (Right-to-Left) support** for Arabic and other languages
- **Shipping Map** for address selection and visualization
- **QR Scanner** for product and order scanning
- **Support Page** for customer inquiries

### Informational Pages
- About us with team section
- Contact form
- FAQ section
- Privacy policy
- Terms and conditions

### E-Commerce Functionality
- Product browsing and details
- Shopping cart management
- Wishlist functionality
- Checkout process
- User account management

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
- `/Support` - Support
- `/login` - Login
- `/signup` - Sign Up
- `/products` - Product
- `/products/:id` - Product Details

### Protected Routes (Requires Authentication)
- `/account` - User Account
- `/cart` - Shopping Cart
- `/checkout` - Check Out
- `/ShippingMap` - Shipping Map
- `/wishlist` - Wish List

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

### Security Best Practices
// ...existing code...
### Security Best Practices
- Access, refresh, and revoke tokens are managed via a token manager and stored in localStorage
- Google OAuth is used for secure signup/signin
- CORS configured with credentials support
- Secure flag enabled in production (HTTPS only)
- Password hashing ready for production (bcrypt)

## Running the Application

### Development Mode

**Start Frontend:**
```bash
npm run dev
```
Frontend runs on: `http://localhost:5173`

### Environment Variables
Frontend requires `.env` file:
```
VITE_API_BASE_URL=https://depiproject.runasp.net
VITE_GOOGLE_CLIENT_ID=165462429676-5dh45jrog5s8tsr5477u4q99o4somtb7.apps.googleusercontent.com
```

## Documentation Files
- **project-structure.md** - This file

---

*Last Updated: November 30, 2025*
*Architecture: Redux-based state management. Access, refresh, and revoke tokens are managed via a token manager and stored in localStorage. Google OAuth is used for signup/signin.*