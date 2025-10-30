import { useDispatch, useSelector } from 'react-redux';
import { wishlistActions } from '../store/Wishlist/slice';
import { wishlistAPI } from '../utils/api';

export const useWishlist = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.wishlist);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const addToWishlist = async (item) => {
    try {
      // Optimistically update UI
      dispatch(wishlistActions.addToWishlist(item));

      // Sync with backend if authenticated
      if (isAuthenticated) {
        await wishlistAPI.addToWishlist(item);
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  };

  const removeFromWishlist = async (itemId) => {
    try {
      // Optimistically update UI
      dispatch(wishlistActions.removeFromWishlist(itemId));

      // Sync with backend if authenticated
      if (isAuthenticated) {
        await wishlistAPI.removeFromWishlist(itemId);
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw error;
    }
  };

  const clearWishlist = async () => {
    try {
      // Optimistically update UI
      dispatch(wishlistActions.clearWishlist());

      // Sync with backend if authenticated
      if (isAuthenticated) {
        await wishlistAPI.clearWishlist();
      }
    } catch (error) {
      console.error('Error clearing wishlist:', error);
      throw error;
    }
  };

  const moveAllToBag = () => {
    dispatch(wishlistActions.moveAllToBag());
  };

  return {
    items,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    moveAllToBag,
  };
};

