import { configureStore , getDefaultMiddleware } from "@reduxjs/toolkit";
import { categorieSlice } from "../Slice/Filter/categorieSlice";
import { UserSlice } from "../Slice/User/UserSlice";
import { eventsSlice } from "../Slice/Events/EventsSlice";
import { eventSlice } from "../Slice/CreateEvent/CreateEvent";
import { forgot } from "../Slice/ForgotPass/ForgotPassSlice";
import { recover } from "../Slice/RecoverPass/RecoverPassSlice";
import { eventDetailSlice } from "../Slice/EventDetail/EventDetailSlice";
import { combinedFilterSlice } from "../Slice/Filter/combinedFilterSlice";
import { locationSlice } from "../Slice/Location/LocationSlice";
import { locationIpSlice } from "../Slice/Location/locationIpSlice";
import { transactionSlice } from "../Slice/transaction/TransactionSlice";
import { TransactionVoucher } from "../Slice/transaction/TransactionVoucher";
import { bankAccountSlice } from "../Slice/BankAcount/BankAcount";
import { eventsCreateForUserSlice } from "../Slice/EventsCreateForUser/CreateForUserSlice";
import { eventsBuysSlice } from "../Slice/EventsBuysForUser/BuysSlice";
import { adminSlice } from "../Slice/Admin/AdminSlice";
import {newFilterSlice} from "../Slice/newFilter/newFilterSlice";
import { favoritesSlice } from "../Slice/Favorites/FavoritesSlice";


const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
  reducer: {
    categories: categorieSlice.reducer,
    user: UserSlice.reducer,
    events: eventsSlice.reducer,
    event: eventSlice.reducer,
    forgot: forgot.reducer,
    recover: recover.reducer,
    eventDetail: eventDetailSlice.reducer,
    combinedFilter: combinedFilterSlice.reducer,
    locationSlice: locationSlice.reducer,
    transaction: transactionSlice.reducer,
    transactionVoucher: TransactionVoucher.reducer,
    locationIpSlice:locationIpSlice.reducer,
    bankAccounts: bankAccountSlice.reducer,
    eventsCreateForUserSlice:eventsCreateForUserSlice.reducer,
    eventsBuysSlice:eventsBuysSlice.reducer,
    admin:adminSlice.reducer,
    newFilter: newFilterSlice.reducer,
    favorites: favoritesSlice.reducer
  },
});

export default store;

//RECUERDA AVISARLE AL STORECOMMITER DE LOS CAMBIOS REALIZADOS EN ESTE ARCHIVO PARA QUE SUBA EL STORE DE FORMA CORRECTA.
