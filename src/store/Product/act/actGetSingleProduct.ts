import { TProduct } from "@customTypes/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";
type TResponse = TProduct[]
const actGetSingleProduct = createAsyncThunk(
  "products/actGetSingleProduct",
  async (productId: number, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    console.log(productId);
    try {
      const singleProduct = await axios.get<TResponse>(`/products?id=${productId}`, {
        signal,
      });
      if (singleProduct.data.length) {
        const relatedProducts = await axios.get(
          `/products?cat_prefix=${singleProduct.data[0].cat_prefix}`
        );

        const records = relatedProducts.data.filter(
          (product: TProduct) => product.id !== productId
        );
          
        return {
          singleProduct:singleProduct.data,
          records,
        };
      }
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetSingleProduct;
