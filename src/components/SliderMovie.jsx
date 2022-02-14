import {
  Alert,
  Container,
  Skeleton,
  Snackbar,
  styled,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { useDispatch, useSelector } from "react-redux";
import { FetchCurrentListMovie } from "../features/redux/movieSlice";
import { Link } from "react-router-dom";

const SliderContainer = styled(Container)(({ theme }) => ({
  marginBottom: "20px",
  height: "100%",
  border: "1px solid #eeeeee",
  borderRadius: "20px",
  backgroundColor: "#eeeeee",
  padding: "10px 25px 25px 25px",
}));

const SliderWrapper = styled("div")(({ theme }) => ({
  borderRadius: "5px",
}));

const SliderTitle = styled(Typography)(({ theme }) => ({
  fontSize: "25px",
  fontWeight: "600",
  letterSpacing: 0.5,
  alignItems: "center",
  textTransform: "uppercase",
  marginBottom: "8px",
}));

const SliderItem = styled("div")(({ theme }) => ({
  color: "white",
  maxWidth: "270px",
  position: "relative",
  transition: "transform 0.25s linear",
  transform: "TranslateY(0px)",
  "&:hover": {
    transform: "TranslateY(-5px)",
  },

  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
  },

  [theme.breakpoints.up("sm")]: {
    maxWidth: "250px",
  },

  [theme.breakpoints.up("md")]: {
    maxWidth: "279px",
  },
}));

const SliderItemImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "280px",
  objectFit: "cover",
  borderRadius: "5px",

  [theme.breakpoints.down("sm")]: {
    height: "200px",
  },

  [theme.breakpoints.up("sm")]: {
    height: "250px",
  },

  [theme.breakpoints.up("md")]: {
    height: "280px",
  },
}));

const SliderItemContentBackGround = styled("div")(({ theme }) => ({
  position: "absolute",
  bottom: "0",
  width: "100%",
  height: "60px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#212121",
  opacity: 0.7,
  borderEndEndRadius: "5px",
  borderEndStartRadius: "5px",
}));

const SliderItemContent = styled(Typography)(({ theme }) => ({
  color: "#fdd835",
  position: "absolute",
  bottom: "15px",
  left: 0,
  right: 0,
  zIndex: 1,
  textAlign: "center",
  textTransform: "uppercase",
  fontWeight: "700",
  opacity: 1,
  fontSize: "18px",
}));

const LeftArrow = styled("div")(({ theme }) => ({
  position: "absolute",
  zIndex: 1,
  top: "35%",
  height: "80px",
  right: "16px",
  width: "35px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  backgroundColor: "#424242",
  opacity: "0.5",
  borderRadius: "8px 0 0 8px",

  "&:hover": {
    backgroundColor: "#616161",
    opacity: "0.7",
  },

  [theme.breakpoints.down("sm")]: {
    right: "0px",
    height: "65px",
    top: "31%",
  },

  [theme.breakpoints.up("sm")]: {
    right: "7px",
  },
}));

const RightArrow = styled("div")(({ theme }) => ({
  position: "absolute",
  zIndex: 1,
  top: "35%",
  height: "80px",
  left: 0,
  width: "35px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  backgroundColor: "#424242",
  opacity: "0.5",

  "&:hover": {
    backgroundColor: "#616161",
    opacity: "0.7",
  },
  borderRadius: "0 8px 8px 0 ",

  [theme.breakpoints.down("sm")]: {
    height: "65px",
    top: "31%",
  },

  [theme.breakpoints.up("sm")]: {
    left: "1px",
  },
}));

const SliderMovie = () => {
  const {
    //current movie
    listMovieCurrent,
    isLoadingListMovieCurrent,
    listMovieCurrentError,
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
    listCurrentMovie();
  }, [dispatch]);

  const SampleNextArrow = (props) => {
    const { onClick } = props;
    return (
      <LeftArrow onClick={onClick}>
        <ArrowForwardIosOutlinedIcon
          sx={{ color: "white", fontSize: "30px" }}
        />
      </LeftArrow>
    );
  };

  const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return (
      <RightArrow onClick={onClick}>
        <ArrowBackIosNewOutlinedIcon
          sx={{ color: "white", fontSize: "30px" }}
        />
      </RightArrow>
    );
  };
  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
        },
      },
    ],
  };
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    listMovieCurrentError !== null && setOpen(true);
  }, [listMovieCurrentError]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <SliderContainer maxWidth="lg">
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Your connection is having problems!
        </Alert>
      </Snackbar>
      <SliderTitle variant="h6" component="h6">
        recommended movie
      </SliderTitle>
      <SliderWrapper>
        <Slider {...settings}>
          {isLoadingListMovieCurrent
            ? new Array(8).fill(0).map((item, index) => (
                <SliderItem key={index}>
                  <Skeleton
                    variant="rectangular"
                    height={300}
                    animation="wave"
                    sx={{ borderRadius: "5px" }}
                  />
                </SliderItem>
              ))
            : listMovieCurrent.results?.slice(0, 6)?.map((item, index) => (
                <Link to={`/movie/${item.id}`} key={index}>
                  <SliderItem>
                    <SliderItemImage
                      alt=""
                      src={`https://image.tmdb.org/t/p/original/${item?.poster_path}`}
                    />
                    <SliderItemContent variant="h6" component="h6">
                      {item?.original_title.length > 20
                        ? `${item?.original_title.substring(0, 20)}...`
                        : item?.original_title}
                    </SliderItemContent>
                    <SliderItemContentBackGround></SliderItemContentBackGround>
                  </SliderItem>
                </Link>
              ))}
        </Slider>
      </SliderWrapper>
    </SliderContainer>
  );
};

export default SliderMovie;
