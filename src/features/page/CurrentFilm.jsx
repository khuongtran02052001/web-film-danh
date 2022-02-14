import styled from "@emotion/styled";
import { Container, Grid, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ListFilm from "../../components/ListFilm";
import SideMovie from "../../components/SideMovie";
import { FetchCurrentListMovie } from "../redux/movieSlice";

const CurrentFilmContainer = styled(Container)(({ theme }) => ({
  marginTop: "15px",
}));

const CurrentFilmList = styled("div")(({ theme }) => ({
  marginBottom: "15px",
}));

const CurrentFilm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const name = location.pathname.split("/")[2];
  const defaultPage = location.search.split("=")[1];

  const [page, setPage] = useState(defaultPage);
  const handleChange = async (event, value) => {
    await setPage(value);
    await navigate(`/movie/popular?page=${value}`);
  };

  const {
    //top rate movie
    listMovieCurrent,
    isLoadingListMovieCurrent,
    listMovieCurrentError,

    //coming soon movie
    listMovieCommingSoon,
    isLoadingListMovieCommingSoon,
    listMovieCommingSoonError,

    //new movie
    listMovieNew,
    isLoadingListMovieNew,
    listMovieNewError,
  } = useSelector((state) => state.movieReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    // get list top rate movie
    const listfetchCurrentFilmMovie = async () => {
      try {
        await dispatch(FetchCurrentListMovie({ name, page }));
      } catch (error) {
        console.log(error);
      }
    };

    listfetchCurrentFilmMovie();
  }, [page, dispatch, name]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <CurrentFilmContainer maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8} md={8.5}>
          <CurrentFilmList>
            <ListFilm
              title="Current Film"
              movieList={listMovieCurrent}
              isLoading={isLoadingListMovieCurrent}
              type="all"
              page={page}
              handleChange={handleChange}
              error={listMovieCurrentError}
              limit={8}
            />
          </CurrentFilmList>
        </Grid>
        {matches ? (
          ""
        ) : (
          <Grid item xs={0} sm={4} md={3.5}>
            <SideMovie
              title="Coming Soon"
              movieList={listMovieCommingSoon}
              isLoading={isLoadingListMovieCommingSoon}
              error={listMovieCommingSoonError}
              hd="HD Trailer"
            />

            <SideMovie
              title="New Movie"
              movieList={listMovieNew}
              isLoading={isLoadingListMovieNew}
              error={listMovieNewError}
              hd="HD"
            />
          </Grid>
        )}
      </Grid>
    </CurrentFilmContainer>
  );
};

export default CurrentFilm;
