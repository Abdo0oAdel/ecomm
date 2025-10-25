import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "./store/Auth/slice.js";
import { cartActions } from "./store/Cart/slice.js";
import { wishlistActions } from "./store/Wishlist/slice.js";
import { authAPI, cartAPI, wishlistAPI } from "./utils/api.js";
import AppRoutes from "./routes/AppRoutes.jsx";

function App() {
  const dispatch = useDispatch();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Verify authentication on app load
    const verifyAuth = async () => {
      try {
        const response = await authAPI.verify();
        if (response.success && response.user) {
          dispatch(authActions.login({ user: response.user }));

          // Load cart and wishlist from backend
          try {
            const [cartResponse, wishlistResponse] = await Promise.all([
              cartAPI.getCart(),
              wishlistAPI.getWishlist()
            ]);
            if (cartResponse.cart) {
              dispatch(cartActions.setCart(cartResponse.cart));
            }

            if (wishlistResponse.wishlist) {
              dispatch(wishlistActions.setWishlist(wishlistResponse.wishlist));
            }
          } catch (error) {
            console.error('❌ Error loading cart/wishlist:', error);
          }
        }
      } catch (error) {
        // User is not authenticated, do nothing
        console.log('Not authenticated:', error.message);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    verifyAuth();
  }, [dispatch]);

  if (isCheckingAuth) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
