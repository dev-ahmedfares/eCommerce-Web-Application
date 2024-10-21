import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetProductByPrefix,
  productsCleanUp,
} from "@store/Product/productSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function useProducts() {
  const { prefix } = useParams();
  const { loading, error, records } = useAppSelector((state) => state.products);

  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const likedProducts = useAppSelector((state) => state.wishlist.productsId);

  useEffect(() => {
    const promise = dispatch(actGetProductByPrefix(prefix as string));
    return () => {
      promise.abort()
      dispatch(productsCleanUp());
    };
  }, [dispatch, prefix]);

  const {accessToken}= useAppSelector(state=> state.auth)

  const productsFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: likedProducts.includes(el.id),
    isAuthenticated:accessToken ? true :false
  }));

  return {loading, error,productsFullInfo,prefix};
}
