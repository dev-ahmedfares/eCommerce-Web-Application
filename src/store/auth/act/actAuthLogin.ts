import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

type TData = {
  email: string;
  password: string;
};

type TResponse = {
    accessToken:string,
    user:{
        firstName:string,
        lastName:string,
        id:number,
        email:string
    }
}
const actAuthLogin = createAsyncThunk(
  "auth/actAuthLogin",
  async (data: TData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axios.post<TResponse>(`/login`, data);
      
      return response.data
    } catch (error) {
        
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);


export default actAuthLogin