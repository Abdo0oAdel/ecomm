import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "./store/Auth/slice.js";
import { cartActions } from "./store/Cart/slice.js";
import { wishlistActions } from "./store/Wishlist/slice.js";
import { cartAPI, wishlistAPI } from "./utils/api.js";
import { tokenManager } from "./utils/tokenManager.js";
import AppRoutes from "./routes/AppRoutes.jsx";

function App() {
  const dispatch = useDispatch();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Check if user has valid tokens in localStorage
    const checkAuthTokens = async () => {
      try {
        const accessToken = tokenManager.getAccessToken();
        const refreshToken = tokenManager.getRefreshToken();

        // If tokens exist, user is authenticated
        if (accessToken && refreshToken) {
          // Try to load cart and wishlist from backend
          try {
            const [cartResponse, wishlistResponse] = await Promise.all([
              cartAPI.getCart(),
              wishlistAPI.getWishlist()
            ]);
            if (cartResponse?.cart) {
              dispatch(cartActions.setCart(cartResponse.cart));
            }

            if (wishlistResponse?.wishlist) {
              dispatch(wishlistActions.setWishlist(wishlistResponse.wishlist));
            }
          } catch (error) {
            console.error('❌ Error loading cart/wishlist:', error);
            // If we get 401, tokens might be invalid - they'll be cleared by fetchWithAuth
          }
        }
      } catch (error) {
        console.error('Error checking auth tokens:', error);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuthTokens();
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
