import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
  isLogged: false,
  id: null,
  name: null,
  isNewUser: null,
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
      axios.defaults.headers.common["authorization"] = "Bearer " + response.data.token;
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
      axios.defaults.headers.common["authorization"] = "Bearer " + response.data.token;
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

export const googleLogin = createAsyncThunk(
  "user/googleLogin",
  async ({credential, setShowSessionModal}, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://api.eventoo.com.ar/user/auth",
        { credential }
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("id", response.data.id);
      axios.defaults.headers.common["authorization"] = "Bearer " + response.data.token;
      console.log(response.data)
      if(!response.data.isNewUser) {
        setShowSessionModal(null)
      } else {
        setShowSessionModal("register")
      }
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

export const update = createAsyncThunk(
  "user/update",
  async ({ input, setShowSessionModal }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        "https://api.eventoo.com.ar/user/",
        {
          born: input.born,
          address_line: input.address_line,
          city: input.city,
          state: input.state,
          country: input.country,
          zip_code: input.zip_code
        }
      );
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
      window.google.accounts.id.disableAutoSelect();
      axios.defaults.headers.common["authorization"] = null;
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
    [googleLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [googleLogin.fulfilled]: (state, action) => {
      return {
        ...action.payload.data,
        isLogged: true,
        isNewUser: action.payload.isNewUser,
        loading: false,
        error: null,
      };
    },
    [googleLogin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = null;
    },
    [update.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [update.fulfilled]: (state, action) => {
      return {
        ...state,
        address: action.payload.data.address,
        born: action.payload.data.born,
        loading: false,
        error: null,
      };
    },
    [update.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = null;
    },
  },
});

export const { logOut, clearErrors } = UserSlice.actions;

export default UserSlice.reducer;
