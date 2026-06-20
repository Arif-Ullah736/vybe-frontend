import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storyData: [],
  storyList: [],
  currentUserStory: null,
  viewedStories: [],
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
    markStoryAsViewed: (state, action) => {
      const storyId = action.payload;
      if (!state.viewedStories.includes(storyId)) {
        state.viewedStories.push(storyId);
      }
    },
  },
});

export const {
  setStoryData,
  setStoryList,
  setCurrentUserStory,
  markStoryAsViewed,
} = storySlice.actions;

export default storySlice.reducer;
