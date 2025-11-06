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
    // Set up callback to sync Redux when tokens are cleared from anywhere
    tokenManager.setOnTokensClearedCallback(() => {
      dispatch(authActions.logout());
    });

    // Check if user has valid tokens in localStorage and restore to Redux
    const checkAuthTokens = async () => {
      try {
        // Check if tokens exist and are valid
        if (tokenManager.hasTokens()) {
          // Extract user info from access token
          const user = tokenManager.getUserFromToken();

          if (user) {
            // Restore authentication state in Redux
            dispatch(authActions.restoreAuth({ user }));

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
              console.error('Error loading cart/wishlist:', error);
              // If we get 401, tokens might be invalid
              // Clear tokens and logout from Redux
              tokenManager.clearTokens();
                    }
          } else {
            // Tokens exist but can't decode user info - clear them
            tokenManager.clearTokens();
          }
        }
      } catch (error) {
        console.error('Error checking auth tokens:', error);
        tokenManager.clearTokens();
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
