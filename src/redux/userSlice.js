import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  suggestedUsers: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },

    setSuggestedUsers: (state, action) => {
      state.suggestedUsers = action.payload;
    },
  },
});

export const { setUserData, setSuggestedUsers } = userSlice.actions;

export default userSlice.reducer;
