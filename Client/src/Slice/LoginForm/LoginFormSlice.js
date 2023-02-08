import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://api.eventoo.online/user/login",
        formData
      );
      console.log(response);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("data", JSON.stringify(response.data.data));
      return response.data;
    } catch (error) {
      console.log(error)
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    errorMsg: null,
    user: null,
  },
  reducers: {
    setMessaggeError: (state, action) => {
      state.errorMsg = action.payload;
    },
    setMessaggeSend: (state, action) => {
      state.sendMsg = action.payload;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
      state.errorMsg = null;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.errorMsg = null;
      state.user = action.payload;
      state.loginIn = true;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.errorMsg = action.payload;
      state.user = null;
    },
  },
});
export const { setMessaggeError, setMessaggeSend } = authSlice.actions;

export default authSlice.reducer;
