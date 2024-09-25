import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';

// Async thunk for logging in a user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    const toastId = toast.loading("Please wait ...");
    try {
      const response = await axios.post(
        process.env.REACT_APP_BASEURL + "/user/login",
        credentials
      );
      toast.dismiss(toastId);
      toast.success(response.data.message);
      console.log(response.data);
      Cookies.set("token" , response.data.token)
      return response.data;
    } catch (error) {
      toast.dismiss(toastId);
      if (error.response) {
        toast.error(error.response.data.message || "An error occurred");
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        toast.error("Network error. Please try again later.");
        return rejectWithValue({ message: "Network error" });
      } else {
        toast.error("An unexpected error occurred.");
        return rejectWithValue({ message: "Unexpected error" });
      }
    }
  }
);

// Async thunk for logging out a user
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(process.env.REACT_APP_BASEURL + "/user/logout");

    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Logout failed" });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoggedIn: false,
    status: "idle",
    error: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    clearUser(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isLoggedIn = false;
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
