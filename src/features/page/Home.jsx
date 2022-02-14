import styled from "@emotion/styled";
import { Container, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListFilm from "../../components/ListFilm";
import SideMovie from "../../components/SideMovie";
import SliderMovie from "../../components/SliderMovie";
import {
  FetchComingSoonMovie,
  FetchCurrentListMovie,
  FetchNewMovie,
  FetchPlayNowListMovie,
  FetchTopRateListMovie,
} from "../redux/movieSlice";

const HomeContainer = styled("div")(({ theme }) => ({
  marginTop: "20px",
}));

const HomeListFilm = styled("div")(({ theme }) => ({
  marginBottom: "15px",
}));

const Home = () => {
  const {
    //current movie
    listMovieCurrent,
    isLoadingListMovieCurrent,
    listMovieCurrentError,

    //top rate movie
    listMovieTopRated,
    isLoadingListMovieTopRated,
    listMovieTopRatedError,

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
    //get list current movie
    const listCurrentMovie = async () => {
      try {
        await dispatch(FetchCurrentListMovie({ name: "popular", page: 1 }));
      } catch (error) {
        console.log(error);
      }
    };

    // get list top rate movie
    const listTopRatedMovie = async () => {
      try {
        await dispatch(FetchTopRateListMovie({ name: "top_rated", page: 1 }));
      } catch (error) {
        console.log(error);
      }
    };

    // get list top rate movie
    const listPlayNowMovie = async () => {
      try {
        await dispatch(FetchPlayNowListMovie({ name: "now_playing", page: 1 }));
      } catch (error) {
        console.log(error);
      }
    };

    // get list coming soon movie
    const listComingSoonMovie = async () => {
      try {
        await dispatch(FetchComingSoonMovie({ name: "upcoming", page: 1 }));
      } catch (error) {
        console.log(error);
      }
    };

    // get list new movie
    const listNewMovie = async () => {
      try {
        await dispatch(FetchNewMovie({ name: "top_rated", page: 2 }));
      } catch (error) {
        console.log(error);
      }
    };

    listPlayNowMovie();
    listTopRatedMovie();
    listCurrentMovie();
    listComingSoonMovie();
    listNewMovie();
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <HomeContainer>
      <SliderMovie />
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} md={8.5}>
            <HomeListFilm>
              <ListFilm
                title="Current film"
                link="/movie/popular?page=1"
                movieList={listMovieCurrent}
                isLoading={isLoadingListMovieCurrent}
                error={listMovieCurrentError}
                limit={8}
              />
            </HomeListFilm>

            <HomeListFilm>
              <ListFilm
                title="Now Playing"
                link="/movie/now_playing?page=1"
                movieList={listMoviePlayNow}
                isLoading={isLoadingListMoviePlayNow}
                error={listMoviePlayNowError}
                limit={8}
              />
            </HomeListFilm>

            <HomeListFilm>
              <ListFilm
                title="Top Rated"
                link="/movie/top_rated?page=1"
                movieList={listMovieTopRated}
                isLoading={isLoadingListMovieTopRated}
                error={listMovieTopRatedError}
                limit={8}
              />
            </HomeListFilm>
          </Grid>
          <Grid item xs={12} sm={4} md={3.5}>
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
        </Grid>
      </Container>
    </HomeContainer>
  );
};

export default Home;
