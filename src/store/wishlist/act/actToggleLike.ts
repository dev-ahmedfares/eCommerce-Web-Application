import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import {axiosErrorHandler } from "@utils";
import axios from "axios";



const actToggleLike = createAsyncThunk(
  "wishlist/actToggleLike",
  async (productId:number, thunkAPI) => {
    const { rejectWithValue,getState } = thunkAPI;
    const {auth} = getState() as RootState
    
    try {
        const isLikedBefore = await axios.get(`/wishlist?userId=${auth.user?.id}&productId=${productId}`)
        if(!isLikedBefore.data.length) {
            await axios.post(`/wishlist`,{userId:auth.user?.id,productId})
            return {type:"add",productId}
        } else {
            await axios.delete(`/wishlist/${isLikedBefore.data[0].id}`)
            return {type:"remove",productId}
        }

    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error))
    }
  }
);


export default actToggleLike