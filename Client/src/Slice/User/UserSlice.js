import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLogged: false,
  id: null,
  name: null,
  last_name: null,
  email: null,
  profile_pic: null,
  born: null,
  isBanned: null,
  emailIsVerify: null,
  createdAt: null,
  updatedAt: null,
  roleAdmin: null,
  address: {
    address_line: null,
    city: null,
    state: null,
    country: null,
    zip_code: null,
  },
};

export const register = createAsyncThunk(
  "user/register",
  async ({ input, setShowSessionModal }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://api.eventoo.com.ar/user/register",
        input
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("id", response.data.id);
      setShowSessionModal(null);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async ({ input, setShowSessionModal }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://api.eventoo.com.ar/user/login",
        input
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("id", response.data.id);
      setShowSessionModal(null);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (undefined, { rejectWithValue }) => {
    try {
      const response = await axios("https://api.eventoo.com.ar/user");
      return response.data;
    } catch (error) {
      console.log(error);
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state, action) => {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      return initialState
    },
    clearErrors: (state, action) => {
      state.error = null;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [login.fulfilled]: (state, action) => {
      return {
        ...action.payload.data,
        isLogged: true,
        loading: false,
        error: null,
      };
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = null;
    },
    [register.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [register.fulfilled]: (state, action) => {
      return {
        ...action.payload.data,
        isLogged: true,
        loading: false,
        error: null,
      };
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = null;
    },
    [getUserData.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getUserData.fulfilled]: (state, action) => {
      return {
        ...action.payload,
        isLogged: true,
        loading: false,
        error: null,
      };
    },
    [getUserData.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = null;
    },
  },
});

export const { logOut, clearErrors } = UserSlice.actions;

export default UserSlice.reducer;
