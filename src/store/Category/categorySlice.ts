import { isString, TCategory, TLoading } from "@customTypes/index";
import { createSlice } from "@reduxjs/toolkit";
import { actGetGategories } from "./act/actGetCategories";

type TInitialState = {
  records: TCategory[];
  loading: TLoading;
  error: string | null;
};

const initialState: TInitialState = {
  records: [],
  loading: "idle",
  error: null,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    categoriesCleanUp: (state) => {
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetGategories.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetGategories.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(actGetGategories.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export const { categoriesCleanUp } = categorySlice.actions;
export { actGetGategories };
export default categorySlice.reducer;
