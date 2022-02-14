import styled from "@emotion/styled";
import { Container, Grid, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ListFilm from "../../components/ListFilm";
import SideMovie from "../../components/SideMovie";
import { FetchPlayNowListMovie } from "../redux/movieSlice";

const NowPlayingContainer = styled(Container)(({ theme }) => ({
  marginTop: "15px",
}));

const NowPlayingList = styled("div")(({ theme }) => ({
  marginBottom: "15px",
}));

const NowPlaying = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const name = location.pathname.split("/")[2];
  const defaultPage = location.search.split("=")[1];

  const [page, setPage] = useState(defaultPage);
  const handleChange = async (event, value) => {
    await setPage(value);
    await navigate(`/movie/now_playing?page=${value}`);
  };

  const {
    //play now movie
    listMoviePlayNow,
    isLoadingListMoviePlayNow,
    listMoviePlayNowError,

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
    const listPlayNowMovie = async () => {
      try {
        await dispatch(FetchPlayNowListMovie({ name, page }));
      } catch (error) {
        console.log(error);
      }
    };

    listPlayNowMovie();
  }, [page, dispatch, name]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <NowPlayingContainer maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8} md={8.5}>
          <NowPlayingList>
            <ListFilm
              title="Now Playing"
              movieList={listMoviePlayNow}
              isLoading={isLoadingListMoviePlayNow}
              type="all"
              page={page}
              handleChange={handleChange}
              error={listMoviePlayNowError}
              limit={8}
            />
          </NowPlayingList>
        </Grid>
        {matches ? (
          " "
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
    </NowPlayingContainer>
  );
};

export default NowPlaying;
