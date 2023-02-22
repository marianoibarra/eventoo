import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../App';
import { getBankAccounts } from '../BankAcount/BankAcount';
import { getFavorites } from '../Favorites/FavoritesSlice';

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

function getLocation(address) {
  if(address) {
    const inputValue = `${address.address_line}, ${address.city}, ${address.state}, ${address.country}`
    localStorage.setItem('location_inputValue', inputValue)
    const googleServices = new window.google.maps.places.AutocompleteService();
    return new Promise((resolve, reject) => {
      googleServices.getPlacePredictions({input: inputValue, type: ['Address']}, (res) => {
        resolve(res[0]);
      });
    });
  }
}

export const register = createAsyncThunk(
  "user/register",
  async ({ input, setShowSessionModal }, { rejectWithValue }) => {
    try {
      const response = await API.post(
        "/user/register",
        input
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("id", response.data.id);
       API.defaults.headers.common["authorization"] = "Bearer " + response.data.token;
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
  async ({ input, setShowSessionModal }, { rejectWithValue, dispatch }) => {
    try {
      const response = await API.post(
        "/user/login",
        input
      );
      const value = await getLocation(response.data.data.address)
      localStorage.setItem('location_value', JSON.stringify(value))
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("id", response.data.id);
      API.defaults.headers.common["authorization"] = "Bearer " + response.data.token;
      dispatch(getFavorites());
      dispatch(getBankAccounts());
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
  async ({credential, setShowSessionModal}, { rejectWithValue, dispatch }) => {
    try {
      const response = await API.post(
        "/user/auth",
        { credential }
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("id", response.data.id);
      API.defaults.headers.common["authorization"] = "Bearer " + response.data.token;
      dispatch(getFavorites());
      dispatch(getBankAccounts());
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
      const response = await API.put(
        "/user/",
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
      const response = await API.get("/user");
      return response.data;
    } catch (error) {
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
      localStorage.removeItem("location_inputValue");
      localStorage.removeItem("location_value");
      window.google.accounts.id.disableAutoSelect();
       API.defaults.headers.common["authorization"] = null;
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
      state.errorGetUser = action.payload;
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
