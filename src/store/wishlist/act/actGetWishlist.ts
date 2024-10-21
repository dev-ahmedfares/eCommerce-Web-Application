import { TProduct } from "@customTypes/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import { axiosErrorHandler } from "@utils";
import axios from "axios";

type TDataType = "productsFullInfo" | "productIds";

const actGetWishlist = createAsyncThunk(
  "wishlist/actGetWishlist",
  async (data: TDataType, thunkAPI) => {
    const { rejectWithValue, signal, getState } = thunkAPI;
    const { auth } = getState() as RootState;
    try {
      const userWishlist = await axios.get<{ productId: number }[]>(
        `/wishlist?userId=${auth.user?.id}`,
        { signal }
      );
      if (!userWishlist.data.length) {
        return { dataType: "empty", data:[]};
      }

      if (data === "productIds") {
        const concatenatedProductsId = userWishlist.data.map(
          (id) => id.productId
        );
        return { dataType: "productIds", data: concatenatedProductsId };

      } else {
        
        const concatenatedProductsId = userWishlist.data
          .map((id) => `id=${id.productId}`)
          .join("&");

        const products = await axios.get<TProduct[]>(`/products?${concatenatedProductsId}`);

        return { dataType: "productsFullInfo", data: products.data };
      }
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetWishlist;
