import { createSlice } from "@reduxjs/toolkit";

const planReducer = createSlice({
  name: "planReducer",
  initialState: {
    userPlan: JSON.parse(localStorage.getItem("userPlan")) || {},
  },
  reducers: {
    setUserPlan: (state, action) => {
      state.userPlan = action.payload;
      localStorage.setItem("userPlan", JSON.stringify(action.payload));
    },
  },
});

export const { setUserPlan } = planReducer.actions;
export default planReducer.reducer;
