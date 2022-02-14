import styled from "@emotion/styled";
import { Container, Grid, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ListFilm from "../../components/ListFilm";
import SideMovie from "../../components/SideMovie";
import { FetchTopRateListMovie } from "../redux/movieSlice";

const TopRatedContainer = styled(Container)(({ theme }) => ({
  marginTop: "15px",
}));

const TopRatedList = styled("div")(({ theme }) => ({
  marginBottom: "15px",
}));

const TopRated = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const name = location.pathname.split("/")[2];
  const defaultPage = location.search.split("=")[1];
  const [page, setPage] = useState(defaultPage);
  const handleChange = async (event, value) => {
    await setPage(value);
    await navigate(`/movie/top_rated?page=${value}`);
  };

  const {
    //top rate movie
    listMovieTopRated,
    isLoadingListMovieTopRated,
    listMovieTopRatedError,

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
        await dispatch(FetchTopRateListMovie({ name, page }));
      } catch (error) {
        console.log(error);
      }
    };

    listTopRatedMovie();
  }, [page, dispatch, name]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  // const [slectedValue, setSlectedValue] = useState("");

  // const handleSelected = (value) => {
  //   setSlectedValue(value);
  // };

  // const [dataMovie, setDataMovie] = useState([]);

  // useEffect(() => {
  //   if (slectedValue === "az") {
  //     setDataMovie((prev) =>
  //       [...prev].sort((a, b) => b.original_title - a.original_title)
  //     );
  //   } else if (slectedValue === "za") {
  //     setDataMovie((prev) =>
  //       [...prev].sort((a, b) => a.original_title - b.original_title)
  //     );
  //   } else {
  //     setDataMovie(listMovieTopRated);
  //   }
  // }, [slectedValue, listMovieTopRated]);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <TopRatedContainer maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8} md={8.5}>
          <TopRatedList>
            <ListFilm
              title="Top Rated"
              movieList={listMovieTopRated}
              isLoading={isLoadingListMovieTopRated}
              type="all"
              page={page}
              handleChange={handleChange}
              error={listMovieTopRatedError}
              limit={8}
            />
          </TopRatedList>
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
    </TopRatedContainer>
  );
};

export default TopRated;
