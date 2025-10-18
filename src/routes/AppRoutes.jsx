import ProtectedRoute from "./ProtectedRoute";

import PublicLayout from "../layout/PublicLayout";
import ProtectedLayout from "../layout/ProtectedLayout";

import Home from "../pages/Public/Home/Home";
import About from "../pages/Public/About/About";
import Contact from "../pages/Public/Contact/Contact";
import FAQ from "../pages/Public/FAQ/FAQ";
import Terms from "../pages/Public/Terms/Terms";
import Privacy from "../pages/Public/Privacy/Privacy";

import Login from "../pages/Public/Auth/Login";
import SignUp from "../pages/Public/Auth/SignUp";
import ProductDetails from "../pages/Public/ProductDetails/ProductDetails";
import Cart from "../pages/Protected/Cart/Cart";
import Wishlist from "../pages/Protected/Wishlist/Wishlist";
import Checkout from "../pages/Protected/Checkout/Checkout";
import Account from "../pages/Protected/Account/Account";

import Error from "../pages/Error/Error";

import {useRoutes} from "react-router-dom";

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
      element: <Error />
  },
];

export default function AppRoutes() {
    return useRoutes(routes);
}
