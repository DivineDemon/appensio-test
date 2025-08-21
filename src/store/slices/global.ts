import { createSlice } from "@reduxjs/toolkit";

const initialState: GlobalState = {
  token: "",
  vapiId: "",
  business: {
    id: "",
    name: "",
    country: "",
    industry: "",
  },
  twilioNumber: "",
  forgotEmail: "",
  newPassword: "",
  end_date: new Date("2025-06-17"),
  start_date: new Date("2025-06-16"),
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setVapiId: (state, action) => {
      state.vapiId = action.payload as string;
    },
    setToken: (state, action) => {
      state.token = action.payload as string;
    },
    setBusiness: (state, action) => {
      state.business = action.payload as typeof state.business;
    },
    setTwilioNumber: (state, action) => {
      state.twilioNumber = action.payload as string;
    },
    setForgotEmail: (state, action) => {
      state.forgotEmail = action.payload as string;
    },
    setNewPassword: (state, action) => {
      state.newPassword = action.payload as string;
    },
    setEndDate: (state, action) => {
      state.end_date = action.payload as Date;
    },
    setStartDate: (state, action) => {
      state.start_date = action.payload as Date;
    },
  },
});

export const {
  setToken,
  setVapiId,
  setBusiness,
  setNewPassword,
  setForgotEmail,
  setTwilioNumber,
  setEndDate,
  setStartDate,
} = globalSlice.actions;
export default globalSlice.reducer;
