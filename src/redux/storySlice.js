import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storyData: [],
  storyList: [],
  currentUserStory: null,
};

const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {
    setStoryData: (state, action) => {
      state.storyData = action.payload;
    },
    setStoryList: (state, action) => {
      state.storyList = action.payload;
    },
    setCurrentUserStory: (state, action) => {
      state.currentUserStory = action.payload;
    },
  },
});

export const { setStoryData, setStoryList, setCurrentUserStory } =
  storySlice.actions;

export default storySlice.reducer;
