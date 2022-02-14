import { Container, styled, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ListFilm from "../../components/ListFilm";

const WatchLaterConatiner = styled(Container)(({ theme }) => ({
  marginTop: "15px",
}));

const WatchLaterWrapper = styled("div")(({ theme }) => ({}));

const WatchLaterTitle = styled(Typography)(({ theme }) => ({
  fontSize: "25px",
  fontWeight: "600",
  letterSpacing: 0.5,
  alignItems: "center",
  textAlign: "center",
  textTransform: "uppercase",
}));

const WatchLaterMovieList = styled("div")(({ theme }) => ({}));

const WatchLaterEmpTy = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "30vh",
}));

const WatchLaterTextEmpty = styled(Typography)(({ theme }) => ({
  letterSpacing: 1,
  fontSize: "23px",
}));
const WatchLaterMovieItem = styled("div")(({ theme }) => ({}));

const WatchLater = () => {
  const { listWatch, isListWatchLoading } = useSelector(
    (state) => state.watchLater
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <WatchLaterConatiner maxWidth="lg">
      <WatchLaterWrapper>
        <WatchLaterTitle variant="h6" component="h6">
          Your movie watch list
        </WatchLaterTitle>
        <WatchLaterMovieList>
          {listWatch.results.length >= 1 ? (
            <WatchLaterMovieItem>
              <ListFilm
                movieList={listWatch}
                isLoading={isListWatchLoading}
                error={null}
                limit={listWatch.results.length}
                type="watch-later"
              />
            </WatchLaterMovieItem>
          ) : (
            <WatchLaterEmpTy>
              <WatchLaterTextEmpty variant="h6" component="h6">
                Your playlist is empty,{" "}
                <Link to="/" style={{ color: "blue" }}>
                  Add more movies
                </Link>
              </WatchLaterTextEmpty>
            </WatchLaterEmpTy>
          )}
        </WatchLaterMovieList>
      </WatchLaterWrapper>
    </WatchLaterConatiner>
  );
};

export default WatchLater;
