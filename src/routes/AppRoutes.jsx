import { useRoutes } from "react-router-dom";


import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import PublicLayout from "../layout/PublicLayout";
import ProtectedLayout from "../layout/ProtectedLayout";

import Home from "../pages/Public/Home/Home";
import Login from "../pages/Public/Auth/LogIn";
import SignUp from "../pages/Public/Auth/SignUp";
import About from "../pages/Public/About/About";
import Contact from "../pages/Public/Contact/Contact";
import FAQ from "../pages/Public/FAQ/FAQ";
import Terms from "../pages/Public/Terms/Terms";
import Privacy from "../pages/Public/Privacy/Privacy";
import Support from "../pages/Public/Support/Support";
import Products from "../pages/Public/Products/Products";
import ProductDetails from "../pages/Public/ProductDetails/ProductDetails";
import QRScanner from "../pages/Public/QRScanner/QRScanner";

import Cart from "../pages/Protected/Cart/Cart";
import Wishlist from "../pages/Protected/Wishlist/Wishlist";
import Checkout from "../pages/Protected/CheckOut/CheckOut";
import Account from "../pages/Protected/Account/Account";
import Cancellation from "../pages/Protected/Account/Cancellation";
import Reviews from "../pages/Protected/Account/Reviews";
import MyOrder from "../pages/Protected/Account/MyOrder";
import AddressBook from "../pages/Protected/Account/AddressBook/AddressBook";

import Error from "../pages/Error/Error";
import ShippingMap from "../pages/Protected/ShippingMap/ShippingMap";

import AdminDashboard from "../pages/admin/AdminDashboard/AdminDashboard";
import UserManagement from "../pages/admin/UserManagement/UserManagement";
import ProductManagement from "../pages/admin/ProductManagement/ProductManagement";
import OrderManagement from "../pages/admin/OrderManagement/OrderManagement.jsx";

const routes = [
  {
    element: <PublicLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/products", element: <Products /> },
      { path: "/products/:id", element: <ProductDetails /> },
      { path: "/faq", element: <FAQ /> },
      { path: "/terms", element: <Terms /> },
      { path: "/privacy", element: <Privacy /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/support", element: <Support /> },
      { path: "/qrscanner", element: <QRScanner /> },
      { path: "/ShippingMap", element: <ShippingMap /> },
      { path: "/*", element: <Error /> },
    ],
  },
  {
    element: <ProtectedLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "/account",
        element: (
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        ),
      },
      {
        path: "/Cancellation",
        element: (
          <ProtectedRoute>
            <Cancellation />
          </ProtectedRoute>
        ),
      },
      {
        path: "/Reviews",
        element: (
          <ProtectedRoute>
            <Reviews />
          </ProtectedRoute>
        ),
      },
      {
        path: "/MyOrder",
        element: (
          <ProtectedRoute>
            <MyOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: "/shipping-map/:id",
        element: (
          <ProtectedRoute>
            <ShippingMap />
          </ProtectedRoute>
        ),
      },
     {
       path: "/AddressBook",
       element: (
        <ProtectedRoute>
            <AddressBook />
        </ProtectedRoute>
    ),
    },
    ],
  },
    // Admin routes
  {
    element: <ProtectedLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/admin/AdminDashboard",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/UserManagement",
        element: (
          <AdminRoute>
            <UserManagement />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/ProductManagement",
        element: (
          <AdminRoute>
            <ProductManagement />
          </AdminRoute>
        ),
      },
      {
         path: "/admin/OrderManagement",
         element: (
           <AdminRoute>
             <OrderManagement />
           </AdminRoute>
         ),
      },
    ],
  },
];

export default function AppRoutes() {
  return useRoutes(routes);
}
