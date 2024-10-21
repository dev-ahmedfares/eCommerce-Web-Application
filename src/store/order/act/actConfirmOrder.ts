import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

const actConfirmOrder = createAsyncThunk(
  "order/actConfirmOrder",
  async (subtotal: number, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { cart, auth } = getState() as RootState;

    const ordersItems = cart.productsFullInfo.map((el) => ({
      id: el.id,
      title: el.title,
      img: el.img,
      price: el.price,
      quantity: cart.items[el.id],
    }));

    const order = {
      userId: auth.user?.id,
      subtotal,
      items: ordersItems,
    };

    try {
      const response = await axios.post("/orders", order);

      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actConfirmOrder;
