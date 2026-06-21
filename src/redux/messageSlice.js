import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedUser: null,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { setSelectedUser } = messageSlice.actions;

export default messageSlice.reducer;
