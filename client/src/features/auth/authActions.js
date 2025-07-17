import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendUrl = "http://localhost:5001/api/user/auth";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkApi) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${backendUrl}/sign-in`,
        { email, password },
        config
      );
      localStorage.setItem("userToken", data.accessToken);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return thunkApi.rejectWithValue(error.response.data.message);
      } else {
        return thunkApi.rejectWithValue(error.message);
      }
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ firstName, lastName, email, password }, thunkApi) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${backendUrl}/sign-up`,
        { firstName, lastName, email, password },
        config
      );
      console.log("Data received from signUp:", data);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return thunkApi.rejectWithValue(error.response.data.message);
      } else {
        return thunkApi.rejectWithValue(error.message);
      }
    }
  }
);
