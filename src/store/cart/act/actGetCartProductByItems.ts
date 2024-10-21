import { RootState } from "./../../store";

import { TProduct } from "@customTypes/index";
import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { axiosErrorHandler } from "@utils";

type TResponse = TProduct[];

const actGetCartProductsByItem = createAsyncThunk(
  "cart/actGetCartProductByItems",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState, fulfillWithValue,signal } = thunkAPI;
    const { cart } = getState() as RootState;

    if (!Object.keys(cart.items).length) return fulfillWithValue([]);
    
    const products = Object.keys(cart.items)
      .map((id) => `id=${id}`)
      .join("&");
    
    try {
      const response = await axios.get<TResponse>(`/products?${products}`,{signal});
      return response.data;
    } catch (error) {
     return rejectWithValue(axiosErrorHandler(error))
    }
  }
);

export default actGetCartProductsByItem;
