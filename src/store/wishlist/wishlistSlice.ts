import { isString, TLoading, TProduct } from "@customTypes/index";
import { createSlice } from "@reduxjs/toolkit";
import actToggleLike from "./act/actToggleLike";
import actGetWishlist from "./act/actGetWishlist";
import { authLogout } from "@store/auth/authSlice";

type TWishlistState = {
  productsId: number[];
  productsFullInfo: TProduct[];
  error: null | string;
  loading: TLoading;
};

const initialState: TWishlistState = {
  productsId: [],
  productsFullInfo: [],
  error: null,
  loading: "idle",
};
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    wishlistCleanUp: (state) => {
      state.productsFullInfo = [];
     
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actToggleLike.pending, (state) => {
        state.error = null;
      })
      .addCase(actToggleLike.fulfilled, (state, action) => {
        if (action.payload.type === "add") {
          state.productsId.push(action.payload.productId);
        } else if (action.payload.type === "remove") {
          state.productsId = state.productsId.filter(
            (el) => el !== action.payload.productId
          );

          state.productsFullInfo = state.productsFullInfo.filter(
            (prod) => prod.id !== action.payload.productId
          );
        }
      })
      .addCase(actToggleLike.rejected, (state, action) => {
        if (isString(action.payload)) state.error = action.payload;
      });

    builder
      .addCase(actGetWishlist.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetWishlist.fulfilled, (state, action) => {
        state.loading = "succeeded";

        if (action.payload.dataType === "productIds") {
          state.productsId = action.payload.data as number[];
        } else if (action.payload.dataType === "productsFullInfo") {
          state.productsFullInfo = action.payload.data as TProduct[];
        }
      })
      .addCase(actGetWishlist.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) state.error = action.payload;
      });

      // Reset Quantity when logout
      builder.addCase(authLogout,(state)=>{
        state.productsId=[]
      })
  },
});

export const { wishlistCleanUp } = wishlistSlice.actions;
export { actToggleLike, actGetWishlist };
export default wishlistSlice.reducer;
