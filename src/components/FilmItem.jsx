import styled from "@emotion/styled";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import { useDispatch } from "react-redux";
import { removeMovie } from "../features/redux/watchLaterSlice";
const FilmItemCard = styled(Card)(({ theme }, props) => ({
  position: "relative",
  transition: "all 0.3s ease",
  transform: "Scale(1)",
  cursor: "pointer",
  height: "270px",

  "&.watch-later": {
    height: "300px",
  },
  "&:hover": {
    transform: "Scale(1.035)",
  },
  "&:hover .css-wv9yiz": {
    visibility: "visible",
  },
}));

const FilmItemImage = styled("div")(({ theme }) => ({
  position: "relative",
}));

const FilmItemTitle = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  textAlign: "center",
  fontWeight: "500",
}));

const BackGroundFilmCard = styled("div")(({ theme }) => ({
  backgroundColor: "black",
  position: "absolute",
  margin: "auto",
  height: "100%",
  width: "100%",
  opacity: "0.4",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  visibility: "hidden",
}));

const HDFilm = styled("div")(({ theme }) => ({
  backgroundColor: "yellow",
  position: "absolute",
  top: 0,
  left: 0,
  width: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderEndEndRadius: "10px",
  padding: "0 2px 2px 2px",
  fontWeight: "600",
  fontSize: "14px",
}));

const FilmItem = ({ item, type }) => {
  const dispatch = useDispatch();
  const handleRemoveMovie = async (value) => {
    await dispatch(removeMovie(value));
  };

  return (
    <FilmItemCard className={type === "watch-later" && "watch-later"}>
      <Link
        to={`/movie/${item.id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <FilmItemImage>
          <BackGroundFilmCard>
            <PlayCircleOutlineOutlinedIcon
              sx={{ color: "white", fontSize: "50px" }}
            />
          </BackGroundFilmCard>
          <HDFilm>HD</HDFilm>
          <CardMedia
            component="img"
            alt="green iguana"
            height="200"
            image={`https://image.tmdb.org/t/p/original/${item?.poster_path}`}
          />
        </FilmItemImage>
        <CardContent>
          <FilmItemTitle gutterBottom variant="h5" component="div">
            {item?.original_title.length > 30
              ? `${item?.original_title.substring(0, 30)}...`
              : item?.original_title}
          </FilmItemTitle>
        </CardContent>
      </Link>
      {type === "watch-later" && (
        <Button
          variant="contained"
          color="error"
          sx={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            right: "10px",
          }}
          onClick={() => handleRemoveMovie(item.watchId)}
        >
          Remove
        </Button>
      )}
    </FilmItemCard>
  );
};

export default FilmItem;
