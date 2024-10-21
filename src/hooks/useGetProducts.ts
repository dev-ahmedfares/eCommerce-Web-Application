import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetProductByPrefix,
  productsCleanUp,
} from "@store/Product/productSlice";
import { useEffect } from "react";


export default function useGetProducts(prefix:string|null) {
  
  const { loading, error, records,lastPage } = useAppSelector((state) => state.products);

  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const likedProducts = useAppSelector((state) => state.wishlist.productsId);
  const {accessToken}= useAppSelector(state=> state.auth)
  
  useEffect(() => {
    const promise = dispatch(actGetProductByPrefix(prefix));
    return () => {
      promise.abort()
      dispatch(productsCleanUp());
    };
  }, [dispatch, prefix]);

 

  const productsFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: likedProducts.includes(el.id),
    isAuthenticated:accessToken ? true :false
  }));

  return {loading, error,productsFullInfo,lastPage };
}
