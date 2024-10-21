import { isString, TLoading, TProduct } from "@customTypes/index";
import { createSlice } from "@reduxjs/toolkit";
import actGetProductByPrefix from "./act/actGetProductsByPrefix";
import actGetSingleProduct from "./act/actGetSingleProduct";

type TInitialState = {
  records: TProduct[];
  loading: TLoading;
  error: string | null;
  singleProduct: TProduct[];
  lastPage: number;
};

const initialState: TInitialState = {
  records: [],
  singleProduct: [],
  loading: "idle",
  error: null,
  lastPage: 1,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsCleanUp: (state) => {
      state.records = [];
      state.loading = "idle";
      state.lastPage = 1;
    },
    singleProductCleanUp: (state) => {
      state.singleProduct = [];
      state.records = [];
      state.loading = "idle";
      state.lastPage = 1;
    },
  },
  extraReducers: (builder) => {
    // Get Product By Category Prefix
    builder
      .addCase(actGetProductByPrefix.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetProductByPrefix.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.records = action.payload.records;
        state.lastPage = action.payload.lastPage;
      })
      .addCase(actGetProductByPrefix.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      });

    // Get Single Product By Id
    builder
      .addCase(actGetSingleProduct.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetSingleProduct.fulfilled, (state, action) => {
        state.loading = "succeeded";

        if (action.payload) {
          state.singleProduct = action.payload.singleProduct;
          state.records = action.payload.records;
        }
      })
      .addCase(actGetSingleProduct.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      });
  },
});
export const { productsCleanUp, singleProductCleanUp } = productSlice.actions;
export { actGetProductByPrefix, actGetSingleProduct };
export default productSlice.reducer;
