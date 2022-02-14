import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api/movieApi";

export const FetchCurrentListMovie = createAsyncThunk(
  "movie/currentListMovie",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.fetchCurrentFilm(value);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const FetchTopRateListMovie = createAsyncThunk(
  "movie/topRateListMovie",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.FetchTopRateFilm(value);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const FetchPlayNowListMovie = createAsyncThunk(
  "movie/playNowListMovie",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.FetchPlayNowFilm(value);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const FetchDetailMovie = createAsyncThunk(
  "movie/detailMovie",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.FetchDetailFilm(value);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const FetchSearchMovie = createAsyncThunk(
  "movie/searchMovie",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.FetchSearchFilm(value);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const FetchComingSoonMovie = createAsyncThunk(
  "movie/comingSoonMovie",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.FetchComingSoonFilm(value);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const FetchNewMovie = createAsyncThunk(
  "movie/newMovie",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.FetchTopRateFilm(value);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const FetchSimilarMovie = createAsyncThunk(
  "movie/similarMovie",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.FetchSimilarFilm(value);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const movieSlice = createSlice({
  name: "moive",
  initialState: {
    //current movie
    listMovieCurrent: [],
    isLoadingListMovieCurrent: true,
    listMovieCurrentError: null,

    //top rate movie
    listMovieTopRated: [],
    isLoadingListMovieTopRated: true,
    listMovieTopRatedError: null,

    //play now movie
    listMoviePlayNow: [],
    isLoadingListMoviePlayNow: true,
    listMoviePlayNowError: null,

    //search movie
    listMovieSearch: [],
    isLoadingListMovieSearch: true,
    listMovieSearchError: null,

    //coming soon movie
    listMovieCommingSoon: [],
    isLoadingListMovieCommingSoon: true,
    listMovieCommingSoonError: null,

    //new movie
    listMovieNew: [],
    isLoadingListMovieNew: true,
    listMovieNewError: null,

    //similar movie
    listMovieSimilar: [],
    isLoadingListMovieSimilar: true,
    listMovieSimilarError: null,

    //movie detail
    moviveDetail: {},
    isLoadingMoviveDetail: true,
    moviveDetailError: null,
  },
  extraReducers: {
    //current movie
    [FetchCurrentListMovie.pending]: (state, action) => {
      state.isLoadingListMovieCurrent = true;
    },
    [FetchCurrentListMovie.fulfilled]: (state, action) => {
      state.isLoadingListMovieCurrent = false;
      state.listMovieCurrent = action.payload;
      state.listMovieCurrentError = null;
    },
    [FetchCurrentListMovie.rejected]: (state, action) => {
      state.isLoadingListMovieCurrent = false;
      state.listMovieCurrentError = action.payload;
    },

    //top rate movie
    [FetchTopRateListMovie.pending]: (state, action) => {
      state.isLoadingListMovieTopRated = true;
    },
    [FetchTopRateListMovie.fulfilled]: (state, action) => {
      state.isLoadingListMovieTopRated = false;
      state.listMovieTopRated = action.payload;
      state.listMovieTopRatedError = null;
    },
    [FetchTopRateListMovie.rejected]: (state, action) => {
      state.isLoadingListMovieTopRated = false;
      state.listMovieTopRatedError = action.payload;
    },

    //play now movie
    [FetchPlayNowListMovie.pending]: (state, action) => {
      state.isLoadingListMoviePlayNow = true;
    },
    [FetchPlayNowListMovie.fulfilled]: (state, action) => {
      state.isLoadingListMoviePlayNow = false;
      state.listMoviePlayNow = action.payload;
      state.listMoviePlayNowError = null;
    },
    [FetchPlayNowListMovie.rejected]: (state, action) => {
      state.isLoadingListMoviePlayNow = false;
      state.listMoviePlayNowError = action.payload;
    },

    //search movie
    [FetchSearchMovie.pending]: (state, action) => {
      state.isLoadingListMovieSearch = true;
    },
    [FetchSearchMovie.fulfilled]: (state, action) => {
      state.isLoadingListMovieSearch = false;
      state.listMovieSearch = action.payload;
      state.listMovieSearchError = null;
    },
    [FetchSearchMovie.rejected]: (state, action) => {
      state.isLoadingListMovieSearch = false;
      state.listMovieSearchError = action.payload;
    },

    //coming soon movie
    [FetchComingSoonMovie.pending]: (state, action) => {
      state.isLoadingListMovieCommingSoon = true;
    },
    [FetchComingSoonMovie.fulfilled]: (state, action) => {
      state.isLoadingListMovieCommingSoon = false;
      state.listMovieCommingSoon = action.payload;
      state.listMovieCommingSoonError = null;
    },
    [FetchComingSoonMovie.rejected]: (state, action) => {
      state.isLoadingListMovieCommingSoon = false;
      state.listMovieSearchError = action.payload;
    },

    //new movie
    [FetchNewMovie.pending]: (state, action) => {
      state.isLoadingListMovieNew = true;
    },
    [FetchNewMovie.fulfilled]: (state, action) => {
      state.isLoadingListMovieNew = false;
      state.listMovieNew = action.payload;
      state.listMovieNewError = null;
    },
    [FetchNewMovie.rejected]: (state, action) => {
      state.isLoadingListMovieNew = false;
      state.listMovieSearchError = action.payload;
    },

    //similar movie
    [FetchSimilarMovie.pending]: (state, action) => {
      state.isLoadingListMovieSimilar = true;
    },
    [FetchSimilarMovie.fulfilled]: (state, action) => {
      state.isLoadingListMovieSimilar = false;
      state.listMovieSimilar = action.payload;
      state.listMovieSimilarError = null;
    },
    [FetchSimilarMovie.rejected]: (state, action) => {
      state.isLoadingListMovieSimilar = false;
      state.listMovieSimilarError = action.payload;
    },

    //detail movie
    [FetchDetailMovie.pending]: (state, action) => {
      state.isLoadingMoviveDetail = true;
    },
    [FetchDetailMovie.fulfilled]: (state, action) => {
      state.isLoadingMoviveDetail = false;
      state.moviveDetail = action.payload;
      state.moviveDetailError = null;
    },
    [FetchDetailMovie.rejected]: (state, action) => {
      state.isLoadingMoviveDetail = false;
      state.moviveDetail = action.payload;
    },
  },
});

const movieReducer = movieSlice.reducer;

export default movieReducer;
