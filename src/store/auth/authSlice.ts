import { isString, TLoading } from "@customTypes/index";
import { createSlice } from "@reduxjs/toolkit";
import actAuthRegister from "@store/auth/act/actAuthRegister";
import actAuthLogin from "./act/actAuthLogin";
type TAuthState = {
  loading: TLoading;
  error: null | string;
  accessToken: string | null;

  user: {
    firstName: string;
    lastName: string;
    email: string;
    id: number;
  } | null;
};

const initialState: TAuthState = {
  loading: "idle",
  error: null,
  accessToken: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUI: (state) => {
      state.error = null;
      state.loading = "idle";
    },
    authLogout: (state) => {
      state.accessToken = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // Register
    builder
      .addCase(actAuthRegister.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actAuthRegister.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(actAuthRegister.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) state.error = action.payload;
      });

    // Login
    builder
      .addCase(actAuthLogin.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actAuthLogin.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
      })
      .addCase(actAuthLogin.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) state.error = action.payload;
      });
  },
});

export { actAuthRegister, actAuthLogin };
export default authSlice.reducer;
export const { resetUI,authLogout } = authSlice.actions;
