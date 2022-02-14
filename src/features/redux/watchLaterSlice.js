import { createSlice } from "@reduxjs/toolkit";

const watchLaterSlice = createSlice({
  name: "watchLater",
  initialState: {
    listWatch: {
      results: [],
    },
    isListWatchLoading: false,
    error: null,
  },
  reducers: {
    addMovie: (state, action) => {
      state.listWatch.results.push(action.payload);
    },
    removeMovie: (state, action) => {
      state.listWatch.results = state.listWatch.results.filter(
        (item) => item.watchId !== action.payload
      );
    },
  },
});

export const { addMovie, removeMovie } = watchLaterSlice.actions;
const watchLaterReducer = watchLaterSlice.reducer;
export default watchLaterReducer;
