import { configureStore } from "@reduxjs/toolkit";
import { categorieSlice } from "../Slice/Filter/categorieSlice";
import { authSlice } from "../Slice/LoginForm/LoginFormSlice";
import { registerSlice } from "../Slice/CreateUse/CreateUserSlice";
import { UserSlice } from "../Slice/User/UserSlice"
import { eventsSlice } from "../Slice/Events/EventsSlice";
import { eventSlice } from "../Slice/CreateEvent/CreateEvent";

const store = configureStore({
  reducer: {
    categories: categorieSlice.reducer,
    auth: authSlice.reducer,
    register:registerSlice.reducer,
    user:UserSlice.reducer,
    events: eventsSlice.reducer,
    event: eventSlice.reducer,
  },
});

export default store;
