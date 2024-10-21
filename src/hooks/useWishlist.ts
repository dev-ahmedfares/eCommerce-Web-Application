import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetWishlist, wishlistCleanUp } from "@store/wishlist/wishlistSlice";
import { useEffect } from "react";

export default function useWishlist() {
  const dispatch = useAppDispatch();
  const { productsFullInfo, loading, error } = useAppSelector(
    (state) => state.wishlist
  );

  const cartItems = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    const promise = dispatch(actGetWishlist("productsFullInfo"));

    return () => {
      promise.abort();
      dispatch(wishlistCleanUp());
    };
  }, [dispatch]);

  const products = productsFullInfo.map((prod) => {
    return {
      ...prod,
      isLiked: true,
      quantity: cartItems[prod.id],
      isAuthenticated: true,
    };
  });

  return { products, loading, error };
}
