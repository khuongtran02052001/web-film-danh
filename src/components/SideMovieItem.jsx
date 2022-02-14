import { Rating, styled, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const SideMovieItemContainer = styled("div")(({ theme }) => ({
  marginBottom: "7px",
}));

const SideMovieItemWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  padding: "7px",
  cursor: "pointer",
  borderRadius: "5px",
  backgroundColor: "white",
  "&:hover": {
    backgroundColor: "#e0e0e0",
    color: "#f9a825",
  },

  "&:hover .css-1mbwlaz": {
    color: "#fbc02d",
  },
}));

const SideMovieItemImage = styled("img")(({ theme }) => ({
  flex: 1,
  height: "70px",
  minWidth: "60px",
  objectFit: "cover",
  borderRadius: "5px",
}));

const SideMovieItemInfo = styled("div")(({ theme }) => ({
  flex: 4,
  display: "flex",
  flexDirection: "column",
  marginLeft: "6px",
}));

const SideMovieItemInfoHeader = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const SideMovieItemInfoHd = styled("div")(({ theme }) => ({
  fontSize: "11px",
  fontWeight: "600",
  borderRadius: "2px",
  backgroundColor: "black",
  color: "white",
  padding: "0 3px 2px 3px",
}));

const SideMovieItemInfoTitle = styled(Typography)(({ theme }) => ({
  fontSize: "13px",
  fontWeight: "700",
  color: "black",
}));

const SideMovieItemInfoRate = styled("div")(({ theme }) => ({
  margin: "4px 0",
}));


const SideMovieItem = ({ item, hd }) => {
  return (
    <SideMovieItemContainer>
      <Link to={`/movie/${item.id}`} style={{ textDecoration: "none" }}>
        <SideMovieItemWrapper>
          <SideMovieItemImage
            alt=""
            src={`https://image.tmdb.org/t/p/original/${item?.poster_path}`}
          />
          <SideMovieItemInfo>
            <SideMovieItemInfoHeader>
              <SideMovieItemInfoTitle variant="h6" component="p">
                {item?.original_title?.length > 10
                  ? `${item?.original_title.substring(0, 10)}...`
                  : item?.original_title}
              </SideMovieItemInfoTitle>
              <SideMovieItemInfoHd>{hd}</SideMovieItemInfoHd>
            </SideMovieItemInfoHeader>
            <SideMovieItemInfoRate>
              <Rating
                name="half-rating-read"
                defaultValue={item?.vote_average ? item?.vote_average : 5}
                precision={0.5}
                size="small"
                readOnly
              />
            </SideMovieItemInfoRate>
          </SideMovieItemInfo>
        </SideMovieItemWrapper>
      </Link>
    </SideMovieItemContainer>
  );
};

export default SideMovieItem;
