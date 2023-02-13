import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
export const axiosModeUsertDetail = createAsyncThunk(
  "eventDetail/axiosModeEventDetail",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`https://api.eventoo.com.ar/user`, id);
      return res.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);



const initialState = {
  name: null,
  email: null,
  image: null,
  loginOk:false
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.last_name = action.payload.last_name;
      state.email = action.payload.email;
      state.image = action.payload.profile_pic;
      state.loginOk = true;
      state.id = action.payload.id;
    },
    setUserOff: (state, action) => {
      state.name = null;
      state.last_name = null;
      state.email = null;
      state.image = null;
      state.loginOk = action.payload;
      state.id = null;
    },
  },
  extraReducers: {
    [axiosModeUsertDetail.pending]: (state) => {
      state.loading = true;
      state.errorMsg = null;
    },
    [axiosModeUsertDetail.fulfilled]: (state, action) => {
      state.loading = false;
      state.errorMsg = null;
      state.user = action.payload;
      state.loginIn = true;
    },
    [axiosModeUsertDetail.rejected]: (state, action) => {
      state.loading = false;
      state.errorMsg = action.payload;
      state.user = null;
    },
  },
});

export const { setUser, setUserOff } = UserSlice.actions;

export default UserSlice.reducer;