import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messageData: [],
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessageData: (state, action) => {
      state.messageData = action.payload;
    },
  },
});

export const { setMessageData } = messageSlice.actions;

export default messageSlice.reducer;
