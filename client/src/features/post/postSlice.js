import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  post: [],
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk(
  "post/fetchPosts",
  async (args, thunkApi) => {
    try {
      const response = await axios.get("http://localhost:5001/api/posts");
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("Pending");
      })
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.posts = payload.posts;
        console.log("Fulfilled");
      })
      .addCase(fetchPosts.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload.message;
        console.log("Rejected", payload.message);
      });
  },
});

export default postSlice.reducer;
