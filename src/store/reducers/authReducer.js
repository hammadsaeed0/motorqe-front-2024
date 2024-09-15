import { createSlice } from "@reduxjs/toolkit";
const authReducer = createSlice({
  name: "authReducer",
  
  initialState: {
    userToken:JSON.parse(localStorage.getItem("userToken"))|| {},
  },
  reducers: {
    setUserToken: (state, action) => {
      state.userToken = action.payload;
      localStorage.setItem("userToken", JSON.stringify(action.payload));
    },
    logout: (state, { payload }) => {
      localStorage.removeItem(payload);
      if (payload === "userToken") {
        state.userToken = null;
        state.user = null;
      }
    },
  },
});
export const { setUserToken, logout } = authReducer.actions;
export default authReducer.reducer;
