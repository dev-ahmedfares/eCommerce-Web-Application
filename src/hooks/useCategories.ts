import {
    actGetGategories,
    categoriesCleanUp,
  } from "@store/Category/categorySlice";
  import { useAppDispatch, useAppSelector } from "@store/hooks";
  import { useEffect } from "react";
  
export default function useCategories() {
    const { loading, records, error } = useAppSelector(
        (state) => state.categories
      );
      const dispatch = useAppDispatch();
    
      useEffect(() => {
        const promise = dispatch(actGetGategories());
        
        return () => {
          promise.abort()
           dispatch(categoriesCleanUp());
          
        };
      }, [dispatch]);

      return { loading, records, error }
}