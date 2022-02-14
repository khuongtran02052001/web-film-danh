import {
  Alert,
  Container,
  Rating,
  Skeleton,
  Snackbar,
  styled,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import SideMovieItem from "./SideMovieItem";
const SideMovieConatiner = styled(Container)(({ theme }) => ({
  border: "1px solid #eeeeee",
  borderRadius: "20px",
  padding: "0 15px 25px 15px",
  backgroundColor: "#eeeeee",
  marginBottom: "20px",
}));

const SideMovieHeader = styled("div")(({ theme }) => ({
  padding: "10px",
}));

const SideMovieTitle = styled(Typography)(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "600",
  letterSpacing: 0.5,
  alignItems: "center",
  textAlign: "center",
  textTransform: "uppercase",
}));

const SideMovieHeaderContent = styled("div")(({ theme }) => ({}));

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

const SideMovie = ({ title, movieList, isLoading, error, hd }) => {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    error !== null && setOpen(true);
  }, [error]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <SideMovieConatiner>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Your connection is having problems!
        </Alert>
      </Snackbar>
      <SideMovieHeader>
        <SideMovieTitle variant="h6" component="h6">
          {title}
        </SideMovieTitle>
      </SideMovieHeader>
      {isLoading ? (
        <SideMovieHeaderContent>
          {new Array(Number(8)).fill(0).map((item, index) => (
            <SideMovieItemWrapper key={index}>
              <Skeleton
                variant="rectangular"
                height={70}
                width={60}
                animation="wave"
              />
              <SideMovieItemInfo>
                <SideMovieItemInfoHeader>
                  <SideMovieItemInfoTitle variant="h6" component="p">
                    <Skeleton
                      variant="rectangular"
                      height={10}
                      width={100}
                      animation="wave"
                    />
                  </SideMovieItemInfoTitle>
                  <SideMovieItemInfoHd>
                    <Skeleton
                      variant="rectangular"
                      height={10}
                      width={30}
                      animation="wave"
                    />
                  </SideMovieItemInfoHd>
                </SideMovieItemInfoHeader>
                <SideMovieItemInfoRate>
                  <Rating
                    name="half-rating-read"
                    precision={0.5}
                    size="small"
                    readOnly
                  />
                </SideMovieItemInfoRate>
              </SideMovieItemInfo>
            </SideMovieItemWrapper>
          ))}
        </SideMovieHeaderContent>
      ) : (
        <SideMovieHeaderContent>
          {movieList?.results?.slice(0, 8)?.map((item, index) => (
            <SideMovieItem item={item} key={index} hd={hd} />
          ))}
        </SideMovieHeaderContent>
      )}
    </SideMovieConatiner>
  );
};

export default SideMovie;
