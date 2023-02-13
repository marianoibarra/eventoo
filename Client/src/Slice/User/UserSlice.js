import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: null,
  email: null,
  image: null,
  loginOk: false,
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
      state.id = action.payload.id
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
});

export const { setUser, setUserOff } = UserSlice.actions;

export default UserSlice.reducer;