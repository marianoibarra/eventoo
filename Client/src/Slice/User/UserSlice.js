import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  image: '',
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
    },
  },
});

export const { setUser } = UserSlice.actions;

export default UserSlice.reducer;