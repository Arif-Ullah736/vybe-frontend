import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loopData: [],
};

const loopSlice = createSlice({
  name: "loop",
  initialState,
  reducers: {
    setLoopData: (state, action) => {
      state.loopData = action.payload;
    },
  },
});

export const { setLoopData } = loopSlice.actions;

export default loopSlice.reducer;
