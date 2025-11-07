import { useRoutes } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
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
import Support from "../pages/Public/Support/Support.jsx";
import ProductDetails from "../pages/Public/ProductDetails/ProductDetails";

import Cart from "../pages/Protected/Cart/Cart";
import Wishlist from "../pages/Protected/Wishlist/Wishlist";
import Checkout from "../pages/Protected/CheckOut/CheckOut";
import Account from "../pages/Protected/Account/Account";
import Error from "../pages/Error/Error";
import ShippingMap from "../pages/Protected/ShippingMap/ShippingMap";

const routes = [
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/products/:id", element: <ProductDetails /> },
      { path: "/faq", element: <FAQ /> },
      { path: "/terms", element: <Terms /> },
      { path: "/privacy", element: <Privacy /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/support", element: <Support /> },

      // protected routes and should remove them after implement login
      // { path: "/cart", element: <Cart /> },
      // { path: "/wishlist", element: <Wishlist /> },
      // { path: "/checkout", element: <Checkout /> },
      { path: "/ShippingMap", element: <ShippingMap /> },
      // { path: "/account", element: <Account /> },
      // { path: "/*", element: <Error /> },
    ],
  },
  {
    element: <ProtectedLayout />,
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
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
];

export default function AppRoutes() {
  return useRoutes(routes);
}
