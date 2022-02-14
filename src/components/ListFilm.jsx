import styled from "@emotion/styled";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import {
  Alert,
  Card,
  CardContent,
  Container,
  Grid,
  Pagination,
  Skeleton,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import FilmItem from "./FilmItem";

const ListFilmContainer = styled(Container)(({ theme }) => ({
  height: "100%",
  border: "1px solid #eeeeee",
  borderRadius: "20px",
  padding: "0 15px 25px 15px",
  backgroundColor: "#eeeeee",
}));

const ListFilmHeader = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "10px",
}));

const ListFilmTitle = styled(Typography)(({ theme }) => ({
  fontSize: "25px",
  fontWeight: "600",
  letterSpacing: 0.5,
  alignItems: "center",
  textAlign: "center",
  textTransform: "uppercase",
}));

const LisFilmSeeMore = styled(Typography)(({ theme }) => ({
  fontSize: "15px",
  fontWeight: "300",
  letterSpacing: 0.5,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  textAlign: "center",

  "&:hover a": {
    transform: "Scale(1.02)",
    color: "blue",
  },

  "& a": {
    textDecoration: "none",
    color: "black",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    transition: " transform 0.5s linear",
    transform: "Scale(1)",
  },
}));

const ListFilmContent = styled(Grid)(({ theme }) => ({}));

const Selected = styled("select")(({ theme }) => ({
  cursor: "pointer",
  padding: "0 7px",
  borderRadius: "5px",
  backgroundColor: "#fafafa",
  border: "1px solid #e0e0e0",
  "&:focus": {
    outline: "none",
  },
}));

const ListFilm = ({
  title,
  movieList,
  isLoading,
  type,
  handleChange,
  page,
  link,
  error,
  limit,
  // handleSelected,
}) => {
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
    <ListFilmContainer maxWidth="lg">
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Your connection is having problems!
        </Alert>
      </Snackbar>
      <ListFilmHeader>
        {title && (
          <ListFilmTitle variant="h6" component="h6">
            {title}
          </ListFilmTitle>
        )}

        {type === "all" ? (
          <Selected
            // onChange={(e) => handleSelected(e.target.value)}
            defaultValue={"none"}
          >
            <option value={"none"} disabled>
              Filter
            </option>
            <option value={"az"}>A-Z</option>
            <option value={"za"}>Z-A</option>
          </Selected>
        ) : type === "similar" || type === "watch-later" ? (
          ""
        ) : (
          <LisFilmSeeMore variant="caption" component="span">
            <Link to={link}>
              See more <KeyboardArrowDownOutlinedIcon />
            </Link>
          </LisFilmSeeMore>
        )}
      </ListFilmHeader>
      <ListFilmContent container spacing={3}>
        {isLoading ? (
          new Array(Number(limit)).fill(0).map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card>
                <Skeleton variant="rectangular" height={240} animation="wave" />
                <CardContent>
                  <Skeleton variant="text" height={40} animation="wave" />
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : type === "all" ? (
          <>
            {movieList?.results?.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <FilmItem item={item} />
              </Grid>
            ))}
            <Grid item xs={12} sx={{}}>
              <Pagination
                count={Number(movieList?.total_pages)}
                sx={{ display: "flex", justifyContent: "flex-end" }}
                page={Number(page)}
                onChange={handleChange}
              />
            </Grid>
          </>
        ) : type === "similar" ? (
          movieList?.results?.slice(0, Number(limit)).map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <FilmItem item={item} />
            </Grid>
          ))
        ) : type === "watch-later" ? (
          movieList?.results?.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <FilmItem item={item} type={type} />
            </Grid>
          ))
        ) : (
          movieList?.results?.slice(0, Number(limit))?.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <FilmItem item={item} />
            </Grid>
          ))
        )}
      </ListFilmContent>
    </ListFilmContainer>
  );
};

export default ListFilm;
