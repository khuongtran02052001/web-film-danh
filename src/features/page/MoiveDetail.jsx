import styled from "@emotion/styled";
import {
  Alert,
  Button,
  Container,
  Grid,
  Rating,
  Skeleton,
  Snackbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ListFilm from "../../components/ListFilm";
import SideMovie from "../../components/SideMovie";
import { FetchDetailMovie, FetchSimilarMovie } from "../redux/movieSlice";
import { addMovie } from "../redux/watchLaterSlice";
import { v4 as uuidv4 } from "uuid";

const DetailMovieContainer = styled(Container)(({ theme }) => ({
  margin: "20px auto",
  padding: "10px",
}));

const DetailMovieImage = styled("img")(({ theme }) => ({
  borderRadius: "5px",
  width: "100%",
  height: "45vh",
  objectFit: "cover",
  marginTop: "5px",
}));

const DetailMovieButtonGroup = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  padding: "15px 0",
  gap: "10px",
}));

const DetailMovieTitle = styled(Typography)(({ theme }) => ({
  marginBottom: "5px",
  fontSize: "30px",
  fontWeight: "700",
  textTransform: "uppercase",
}));

const DetailMovieInfo = styled("div")(({ theme }) => ({
  borderRadius: "10px",
  backgroundColor: "#eeeeee",
  height: "35vh",
  overflowY: "auto",
  marginBottom: "15px",
  padding: "0px 10px",
}));

const DetailMovieInfoText = styled("p")(({ theme }) => ({
  margin: "10px 0",
  fontSize: "14px",
  fontWeight: 400,
}));

const DetailMovieRate = styled("div")(({ theme }) => ({
  borderRadius: "10px",
  backgroundColor: "#eeeeee",
  height: "8vh",
  padding: "10px",
}));

const DetailMovieRateText = styled("h5")(({ theme }) => ({
  fontSize: "20px",
  margin: "0 0 10px 0",
}));

const DetailMovieOverReviewText = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "700",
  letterSpacing: 1,
  color: "#f9a825",
  marginBottom: "10px",
}));

const DetailMovieOverReviewTitle = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "700",
  letterSpacing: 1,
  marginBottom: "5px",
  textTransform: "uppercase",
}));

const DetailMovieOverReviewContent = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  letterSpacing: 1,
  marginBottom: "5px",
}));

const DetailMovieRealtedText = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "700",
  letterSpacing: 1,
  color: "#f9a825",
}));

const DetailMovieRealtedContent = styled("div")(({ theme }) => ({}));

const MoiveDetail = () => {
  const location = useLocation();
  const movie_id = location.pathname.split("/")[2];
  const {
    //detail movie
    moviveDetail,
    isLoadingMoviveDetail,
    moviveDetailError,

    //similar movie
    listMovieSimilar,
    isLoadingListMovieSimilar,
    listMovieSimilarError,

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
    const detailMovie = async () => {
      try {
        await dispatch(FetchDetailMovie(movie_id));
      } catch (error) {
        console.log(error);
      }
    };

    const listSimilarMovie = async () => {
      try {
        await dispatch(
          FetchSimilarMovie({ name: "similar", page: 1, movie_id })
        );
      } catch (error) {
        console.log(error);
      }
    };
    detailMovie();
    listSimilarMovie();
  }, [dispatch, movie_id]);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (moviveDetailError !== null) {
      setOpen(true);
      setMessage("Your connection is having problems!");
    }
  }, [moviveDetailError]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleAddWatchLater = async (value) => {
    await dispatch(addMovie({ ...value, watchId: uuidv4() }));
    await setOpen(true);
    await setMessage("Add movie to success list!");
  };

  const matchesMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <DetailMovieContainer maxWidth="lg">
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={
            message === "Add movie to success list!" ? "success" : "error"
          }
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8} md={8.5}>
          <Grid
            container
            sx={{ backgroundColor: "#e0e0e0", borderRadius: "10px" }}
          >
            {isLoadingMoviveDetail ? (
              <>
                <Grid item xs={12} sm={5} sx={{ padding: "10px" }}>
                  <Skeleton
                    variant="rectangular"
                    height={280}
                    animation="wave"
                    sx={{ borderRadius: "5px" }}
                  />
                  <DetailMovieButtonGroup>
                    <Button variant="contained" color="info" fullWidth disabled>
                      Trailer
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      fullWidth
                      disabled
                    >
                      Watch
                    </Button>
                    <Button
                      variant="contained"
                      color="warning"
                      fullWidth
                      disabled
                    >
                      Later
                    </Button>
                  </DetailMovieButtonGroup>
                </Grid>
                <Grid item xs={12} sm={7} sx={{ padding: "10px" }}>
                  <DetailMovieTitle variant="h5" component="h5">
                    <Skeleton
                      variant="rectangular"
                      height={30}
                      width={matches ? 350 : 320}
                      animation="wave"
                      sx={{ borderRadius: "5px" }}
                    />
                  </DetailMovieTitle>
                  <DetailMovieInfo>
                    <DetailMovieInfoText>
                      <Skeleton
                        variant="rectangular"
                        height={20}
                        width={matches ? 400 : 300}
                        animation="wave"
                        sx={{ borderRadius: "5px" }}
                      />
                    </DetailMovieInfoText>
                    <DetailMovieInfoText>
                      <Skeleton
                        variant="rectangular"
                        height={20}
                        width={matches ? 380 : 320}
                        animation="wave"
                        sx={{ borderRadius: "5px" }}
                      />
                    </DetailMovieInfoText>
                    <DetailMovieInfoText>
                      <Skeleton
                        variant="rectangular"
                        height={20}
                        width={matches ? 390 : 310}
                        animation="wave"
                        sx={{ borderRadius: "5px" }}
                      />
                    </DetailMovieInfoText>
                    <DetailMovieInfoText>
                      <Skeleton
                        variant="rectangular"
                        height={20}
                        width={matches ? 380 : 300}
                        animation="wave"
                        sx={{ borderRadius: "5px" }}
                      />
                    </DetailMovieInfoText>
                    <DetailMovieInfoText>
                      <Skeleton
                        variant="rectangular"
                        height={20}
                        width={matches ? 400 : 323}
                        animation="wave"
                        sx={{ borderRadius: "5px" }}
                      />
                    </DetailMovieInfoText>
                    <DetailMovieInfoText>
                      <Skeleton
                        variant="rectangular"
                        height={20}
                        width={matches ? 410 : 310}
                        animation="wave"
                        sx={{ borderRadius: "5px" }}
                      />
                    </DetailMovieInfoText>
                    <DetailMovieInfoText>
                      <Skeleton
                        variant="rectangular"
                        height={20}
                        width={250}
                        animation="wave"
                        sx={{ borderRadius: "5px" }}
                      />
                    </DetailMovieInfoText>
                  </DetailMovieInfo>
                  <DetailMovieRate>
                    <DetailMovieRateText>film Review</DetailMovieRateText>
                    <Rating
                      name="half-rating-read"
                      defaultValue={moviveDetail?.vote_average}
                      precision={0.5}
                      size="small"
                      max={10}
                      readOnly
                    />
                  </DetailMovieRate>
                </Grid>
                <Grid item xs={12} sx={{ padding: "12px" }}>
                  <div
                    style={{
                      padding: "10px",
                      backgroundColor: "#eeeeee",
                      borderRadius: "10px",
                    }}
                  >
                    <DetailMovieOverReviewText variant="h6" component="h6">
                      Overview:
                    </DetailMovieOverReviewText>
                    <DetailMovieOverReviewTitle variant="h5" component="h5">
                      <Skeleton
                        variant="rectangular"
                        height={30}
                        width={matches ? 380 : 300}
                        animation="wave"
                        sx={{ borderRadius: "5px", marginBottom: "10px" }}
                      />
                    </DetailMovieOverReviewTitle>
                    <DetailMovieOverReviewContent
                      variant="body2"
                      component="span"
                    >
                      {Array(8)
                        .fill(0)
                        .map((item, index) => (
                          <Skeleton
                            variant="rectangular"
                            height={15}
                            width={matches ? 750 : 330}
                            animation="wave"
                            sx={{ borderRadius: "5px", marginBottom: "8px" }}
                            key={index}
                          />
                        ))}
                    </DetailMovieOverReviewContent>
                  </div>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12} sm={5} sx={{ padding: "10px" }}>
                  <DetailMovieImage
                    src={`https://image.tmdb.org/t/p/original/${moviveDetail?.poster_path}`}
                    alt=""
                  />
                  <DetailMovieButtonGroup>
                    <Button variant="contained" color="info" fullWidth>
                      Trailer
                    </Button>
                    <Button variant="contained" color="error" fullWidth>
                      Watch
                    </Button>
                    <Button
                      variant="contained"
                      color="warning"
                      fullWidth
                      onClick={() => handleAddWatchLater(moviveDetail)}
                    >
                      Later
                    </Button>
                  </DetailMovieButtonGroup>
                </Grid>
                <Grid item xs={12} sm={7} sx={{ padding: "10px" }}>
                  <DetailMovieTitle variant="h5" component="h5">
                    {moviveDetail?.title}
                  </DetailMovieTitle>

                  <DetailMovieInfo>
                    <DetailMovieInfoText>
                      <b>State:</b>&nbsp;
                      {moviveDetail?.status}
                    </DetailMovieInfoText>
                    <DetailMovieInfoText>
                      <b>Producer:</b>&nbsp;
                      {moviveDetail?.production_companies.map(
                        (item) => item.name + ", "
                      )}
                    </DetailMovieInfoText>
                    <DetailMovieInfoText>
                      <b>Countries:</b>&nbsp;
                      {moviveDetail?.production_countries.map(
                        (item) => item.name + ", "
                      )}
                    </DetailMovieInfoText>
                    <DetailMovieInfoText>
                      <b>Date release:</b> {moviveDetail?.release_date}
                    </DetailMovieInfoText>
                    <DetailMovieInfoText>
                      <b>Time:</b> {moviveDetail?.runtime} minute
                    </DetailMovieInfoText>
                    <DetailMovieInfoText>
                      <b>Languages:</b>{" "}
                      {moviveDetail?.spoken_languages.map(
                        (item) => item.english_name + ", "
                      )}
                    </DetailMovieInfoText>
                    <DetailMovieInfoText>
                      Genres:{" "}
                      {moviveDetail?.genres.map((item) => item.name + ", ")}
                    </DetailMovieInfoText>
                  </DetailMovieInfo>
                  <DetailMovieRate>
                    <DetailMovieRateText>
                      film Review ({moviveDetail?.vote_count})
                    </DetailMovieRateText>
                    <Rating
                      name="half-rating-read"
                      defaultValue={moviveDetail.vote_average ? moviveDetail?.vote_average : 5}
                      precision={0.5}
                      size="small"
                      max={10}
                      readOnly
                    />
                  </DetailMovieRate>
                </Grid>
                <Grid item xs={12} sx={{ padding: "12px" }}>
                  <div
                    style={{
                      padding: "10px",
                      backgroundColor: "#eeeeee",
                      borderRadius: "10px",
                    }}
                  >
                    <DetailMovieOverReviewText variant="h6" component="h6">
                      Overview:
                    </DetailMovieOverReviewText>
                    <DetailMovieOverReviewTitle variant="h5" component="h5">
                      {moviveDetail?.title}
                    </DetailMovieOverReviewTitle>
                    <DetailMovieOverReviewContent
                      variant="body2"
                      component="span"
                    >
                      {moviveDetail?.overview}
                    </DetailMovieOverReviewContent>
                  </div>
                </Grid>
                <Grid item xs={12} sx={{ padding: "12px" }}>
                  <div
                    style={{
                      padding: "10px",
                      backgroundColor: "#eeeeee",
                      borderRadius: "10px",
                    }}
                  >
                    <DetailMovieRealtedText variant="h6" component="h6">
                      Related Movies
                    </DetailMovieRealtedText>
                    <DetailMovieRealtedContent>
                      <ListFilm
                        movieList={listMovieSimilar}
                        isLoading={isLoadingListMovieSimilar}
                        error={listMovieSimilarError}
                        type="similar"
                        limit={12}
                      />
                    </DetailMovieRealtedContent>
                  </div>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
        {matchesMobile ? (
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
    </DetailMovieContainer>
  );
};

export default MoiveDetail;
