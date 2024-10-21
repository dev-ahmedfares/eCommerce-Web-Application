import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

type TData= {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const actAuthRegister = createAsyncThunk(
  "auth/actRegister",
  async (data:TData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const response = await axios.post(`/users`,data)
        
        return response.data
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);


export default actAuthRegister