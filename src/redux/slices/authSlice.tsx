import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  token: "",
  loading: false,
  isLoggedIn: false,
  email: "",
  isAdmin: false,
  role: "",
  userId: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.loading = false;
      state.email = action.payload.name;
      state.isAdmin = action.payload.isAdmin;
      state.role = action.payload.role;
      state.userId = action.payload.userId;
    },
    logoutUser: (state) => {
      state.name = "";
      state.isLoggedIn = false;
      state.token = "";
      state.loading = false;
      state.email = "";
      state.isAdmin = false;
      state.role = "";
      state.userId = "";
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;

export default authSlice;
