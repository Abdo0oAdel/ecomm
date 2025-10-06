import { Routes, Route } from "react-router-dom";
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

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Layout */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      {/* Protected Layout */}
      <Route element={<ProtectedLayout />}>
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
      </Route>

      <Route path="*" element={<Error />} />
    </Routes>
  );
}
