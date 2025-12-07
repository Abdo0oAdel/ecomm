import { useDispatch, useSelector } from 'react-redux';
import { wishlistActions } from '../store/Wishlist/slice';
import { wishlistAPI } from '../utils/api';
import Swal from 'sweetalert2';

export const useWishlist = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.wishlist);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const addToWishlist = async (item) => {
    try {
      if (isAuthenticated) {
        await wishlistAPI.addToWishlist(item.id);
        // Re-fetch wishlist from backend to ensure UI is in sync
        await fetchWishlist();
      } else {
        dispatch(wishlistActions.addToWishlist(item));
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Add to Wishlist',
        text: error.message || 'Unable to add item to wishlist. Please try again.',
      });
      throw error;
    }
  };

  const removeFromWishlist = async (itemId) => {
    try {
      dispatch(wishlistActions.removeFromWishlist(itemId));
      if (isAuthenticated) {
        await wishlistAPI.removeFromWishlist(itemId);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Remove from Wishlist',
        text: error.message || 'Unable to remove item from wishlist. Please try again.',
      });
      throw error;
    }
  };

  const clearWishlist = async () => {
    try {
      dispatch(wishlistActions.clearWishlist());
      if (isAuthenticated) {
        await wishlistAPI.clearWishlist();
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Clear Wishlist',
        text: error.message || 'Unable to clear wishlist. Please try again.',
      });
      throw error;
    }
  };

  const moveAllToBag = () => {
    dispatch(wishlistActions.moveAllToBag());
  };

  // Toggle wishlist: add if not present, remove if present
  const toggleWishlist = async (item) => {
    const exists = items.some((i) => i.id === item.id);
    if (exists) {
      await removeFromWishlist(item.id);
    } else {
      await addToWishlist(item);
    }
  };

  // Fetch wishlist from backend and update Redux
  const fetchWishlist = async () => {
    try {
      const response = await wishlistAPI.getWishlist();
      // Axios wraps the response in .data
      const data = response.data || response;
      const rawItems = Array.isArray(data) ? data : data.items || [];

      // Fetch product details for each wishlist item to get image and more
      const itemsWithDetails = await Promise.all(
        rawItems.map(async (item) => {
          try {
            // Dynamically import getProductById to avoid circular deps
            const { getProductById } = await import('../services/products');
            const product = await getProductById(item.productId);
            return {
              id: item.productId,
              name: item.productName,
              currentPrice: item.price,
              image: product.imageURL || product.image || '',
              originalPrice: product.originalPrice,
              discount: product.discount,
              isInStock: product.isInStock,
              stock: product.stock,
              rating: product.rating,
              reviews: product.reviews,
              // Add more fields as needed
            };
          } catch (e) {
            // fallback if product fetch fails
            return {
              id: item.productId,
              name: item.productName,
              currentPrice: item.price,
              image: '',
            };
          }
        })
      );
      dispatch(wishlistActions.setWishlist(itemsWithDetails));
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Load Wishlist',
        text: error.message || 'Unable to load wishlist. Please try again.',
      });
    }
  };

  return {
    items,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    moveAllToBag,
    toggleWishlist,
    fetchWishlist,
  };
};

