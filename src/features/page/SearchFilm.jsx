import styled from "@emotion/styled";
import { Container, Grid, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ListFilm from "../../components/ListFilm";
import SideMovie from "../../components/SideMovie";
import { FetchSearchMovie } from "../redux/movieSlice";

const SearchContainer = styled(Container)(({ theme }) => ({
  marginTop: "15px",
}));

const SearchList = styled("div")(({ theme }) => ({
  marginBottom: "15px",
}));

const SearchFilm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const search = location.search.split("=")[1].toString().split("&")[0];
  const defaultPage = location.search.split("=")[2];

  const [page, setPage] = useState(defaultPage);
  const handleChange = async (event, value) => {
    await setPage(value);
    await navigate(`/movie?search=${search}&page=${value}`);
  };
  const {
    //top rate movie
    listMovieSearch,
    isLoadingListMovieSearch,
    listMovieSearchError,

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
    const listTopRatedMovie = async () => {
      try {
        await dispatch(FetchSearchMovie({ search, page }));
      } catch (error) {
        console.log(error);
      }
    };

    listTopRatedMovie();
  }, [dispatch, search, page]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <SearchContainer maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8} md={8.5}>
          <SearchList>
            <ListFilm
              title={`Results for ${search}`}
              movieList={listMovieSearch}
              isLoading={isLoadingListMovieSearch}
              type="all"
              search
              page={page}
              handleChange={handleChange}
              error={listMovieSearchError}
              limit={8}
            />
          </SearchList>
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
    </SearchContainer>
  );
};

export default SearchFilm;
