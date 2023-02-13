import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";


const initialState = {
};

export const TransactionVoucher = createSlice({
  name: 'voucher',
  initialState,
  reducers: {
    setTransaction: (state, action) => {
      state.buyer = action.payload.buyer;
      state.buyerId = action.payload.buyerId;
      state.createdAt = action.payload.createdAt;
      state.event = action.payload.event;
      state.eventId = action.payload.eventId;
      state.id = action.payload.id;
      state.payment_proof = action.payload.payment_proof;
      state.status = action.payload.status;
      state.tickets = action.payload.tickets;
      state.updatedAt = action.payload.updatedAt;
    },
  },

});

export const { setTransaction } = TransactionVoucher.actions;

export default TransactionVoucher.reducer;