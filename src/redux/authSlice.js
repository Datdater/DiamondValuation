import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../services/auth.service.js";
import { setMessage } from "./messageSlide.js";

const user = JSON.parse(localStorage.getItem("auth"))?.userInformation;

export const register = createAsyncThunk(
  "auth/register",
  async (
    {
      username,
      password,
      email,
      firstName,
      lastName,
      phone,
      address,
      identityDocument,
    },
    thunkAPI,
  ) => {
    try {
      const response = await AuthService.register(
        username,
        password,
        email,
        firstName,
        lastName,
        phone,
        address,
        identityDocument,
      );
      console.log("Response:", response); // Log the entire response object
      const message = response?.data?.message || "Registration successful";
      thunkAPI.dispatch(setMessage(message));

      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const registerByGoogle = createAsyncThunk(
  "auth/google-register",
  async (
    { email, firstName, lastName, phone, address, identityDocument },
    thunkAPI,
  ) => {
    try {
      const response = await AuthService.registerByGoogle(
        email,
        firstName,
        lastName,
        phone,
        address,
        identityDocument,
      );
      console.log("Response:", response); // Log the entire response object
      const message = response?.data?.message || "Registration successful";
      thunkAPI.dispatch(setMessage(message));

      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ usernameOrEmail, password, user }, thunkAPI) => {
    try {
      let data;
      if (user) {
        data = user; // Assume user is provided directly for Google login
      } else {
        data = await AuthService.login(usernameOrEmail, password);
      }
      return { user: data.userInformation };
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await AuthService.logout();
    return null;
  } catch (error) {
    const message =
      error?.response?.data?.message || error.message || error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue(message);
  }
});

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async ({ authID, oldPassword, newPassword }, thunkAPI) => {
    try {
      const response = await AuthService.updateCustomerPassword(
        authID,
        oldPassword,
        newPassword,
      );
      const message =
        response?.data?.message || "Password updated successfully";
      thunkAPI.dispatch(setMessage(message));

      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.isLoggedIn = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.errorMessage = action.payload.message;
        state.isLoggedIn = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state) => {
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        // Handle successful password update if needed
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.errorMessage = action.payload.message; // Assuming payload contains message
        // Additional handling for password update failure
      });
  },
});

const { reducer } = authSlice;
export default reducer;
