import { TOrderList } from "@customTypes/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

type TResponse = TOrderList[]

const actGetOrders = createAsyncThunk(
  "order/actGetOrders",
  async (_, thunkAPI) => {
    const {rejectWithValue,getState,signal}= thunkAPI
    const {auth} = getState() as RootState
    try {
        const response = await axios.get<TResponse>(`/orders?userId=${auth.user?.id}`,{signal})
        return response.data
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error))
    }
  }
);


export default actGetOrders