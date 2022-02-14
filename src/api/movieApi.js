import axiosClient from "./axiosClient";

export const fetchCurrentFilm = (value) =>
  axiosClient.get(
    `movie/${value.name}?api_key=3188bb7dbaa53a7ce7d0aa6f14684d7a&language=en-US&page=${value.page}`
  );

export const FetchTopRateFilm = (value) =>
  axiosClient.get(
    `movie/${value.name}?api_key=3188bb7dbaa53a7ce7d0aa6f14684d7a&language=en-US&page=${value.page}`
  );

export const FetchPlayNowFilm = (value) =>
  axiosClient.get(
    `movie/${value.name}?api_key=3188bb7dbaa53a7ce7d0aa6f14684d7a&language=en-US&page=${value.page}`
  );

export const FetchDetailFilm = (movie_id) =>
  axiosClient.get(
    `movie/${movie_id}?api_key=3188bb7dbaa53a7ce7d0aa6f14684d7a&language=en-US`
  );

export const FetchSearchFilm = (value) =>
  axiosClient.get(
    `search/movie?api_key=3188bb7dbaa53a7ce7d0aa6f14684d7a&language=en-US&query=${value.search}&page=${value.page}&include_adult=false`
  );

export const FetchComingSoonFilm = (value) =>
  axiosClient.get(
    `movie/${value.name}?api_key=3188bb7dbaa53a7ce7d0aa6f14684d7a&language=en-US&page=${value.page}`
  );

export const FetchSimilarFilm = (value) =>
  axiosClient.get(
    `movie/${value.movie_id}/${value.name}?api_key=3188bb7dbaa53a7ce7d0aa6f14684d7a&language=en-US&page=${value.page}`
  );
