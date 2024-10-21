import { TProduct } from "@customTypes/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "@utils";
import axios from "axios";

type TResponse = TProduct[];

const actGetProductByPrefix = createAsyncThunk(
  "products/actGetProductByPrefix",
  async (prefix: string | null, thunkAPi) => {
    const { rejectWithValue, signal } = thunkAPi;

    try {
      const query = prefix ? `/products` + `?${prefix}` : `/products`;
      const response = await axios.get<TResponse>(`${query}`, { signal });
      console.log(response)
      // To Get  Last Page
      let data;
      if (response.headers.link) {
        const linkLength = response.headers.link.split(",").length;
        const dirLast = response.headers.link.split(",")[linkLength - 1].match(/_page=(\d+)/g);
        const lastPage = dirLast.join("").split("=")[1];
         data = {
          records : response.data,
          lastPage,
        };
      } else {
         data = {
          records : response.data,
          lastPage:1,
        };
      }

      

      return data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetProductByPrefix;
