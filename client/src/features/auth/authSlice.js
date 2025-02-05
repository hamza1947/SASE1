import { createSlice } from "@reduxjs/toolkit";
import { login, signUp } from "./authActions.js";

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userToken"); // Delete token from storage
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("Pending");
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
        state.userToken = payload.accessToken;
        console.log("fulfilled response login: ", payload);
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        console.log("rejected response: ", payload);
      })
      // Register
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("Pending: ");
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true; // Registration successful
        console.log("fulfilled payload register: ", payload);
      })
      .addCase(signUp.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        console.log("rejected payload: ", payload);
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
