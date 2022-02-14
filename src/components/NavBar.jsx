import {
  AppBar,
  Drawer,
  IconButton,
  styled,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";

const ToolBarMenu = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  gap: "25px",
}));

const Logo = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    fontSize: "16px",
    gap: "10px",
  },
}));

const Search = styled("form")(({ theme }) => ({
  height: "30px",
  width: "250px",
  position: "relative",
  justifyContent: "center",
  alignItems: "center",
  padding: 0,
  backgroundColor: "white",
  borderRadius: "10px",

  [theme.breakpoints.down("sm")]: {
    flex: 24,
  },
}));

const MenuItem = styled("div")(({ theme }) => ({
  flex: 1,
  display: "flex",
  justifyContent: "center",

  "& > a": {
    color: "white",
    textDecoration: "none",
    fontWeight: "600",
    padding: "20px",
    transition: "all 0.25s linear",
  },
  "& > a: hover": {
    color: "#e0e0e0",
    transform: "TranslateY(-3px)",
  },
  "& > a.active": {
    color: "#fbc02d",
  },
}));

const SearchInput = styled("input")(({ theme }) => ({
  padding: "5px 10px",
  border: "none",
  width: "83%",
  top: 0,
  bottom: 0,
  backgroundColor: "unset",
  position: "absolute",
  "&:focus": {
    outline: "none",
  },
}));

const SearchIcon = styled("i")(({ theme }) => ({
  position: "absolute",
  right: 5,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
}));

const DrawerMenu = styled(Drawer)(({ theme }) => ({}));

const DrawerMenuList = styled("div")(({ theme }) => ({
  minWidth: "150px",
  display: "flex",
  flexDirection: "column",
  padding: "20px 15px",
  gap: "15px",

  "& > a": {
    color: "black",
    textDecoration: "none",
    fontWeight: "600",
    transition: "all 0.25s linear",
  },

  "& > a:hover": {
    color: "#e0e0e0",
  },
  "& > a.active": {
    color: "#fbc02d",
  },
}));

const Navbar = () => {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/movie?search=${searchValue}&page=1`);
    setSearchValue("");
  };
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const [openDrawer, setopenDrawer] = useState(false);
  const toggleDrawer = () => {
    setopenDrawer((prev) => !prev);
  };

  return (
    <AppBar position="static">
      <ToolBarMenu>
        <Logo variant="h5" component="p">
          <Link to="/" style={{ textDecoration: "none", color: "White" }}>
            MovieFilm
          </Link>
          {matches === false && (
            <>
              <IconButton onClick={toggleDrawer}>
                <MenuIcon sx={{ color: "white" }} />
              </IconButton>
              <DrawerMenu
                anchor="left"
                open={openDrawer}
                onClose={toggleDrawer}
              >
                <DrawerMenuList>
                  <NavLink to="/movie/now_playing?page=1">Now Playing</NavLink>
                  <NavLink to="/movie/top_rated?page=1">Top Rated</NavLink>
                  <NavLink to="/movie/watch-later">Watch Later</NavLink>
                </DrawerMenuList>
              </DrawerMenu>
            </>
          )}
        </Logo>
        <MenuItem>
          {matches && (
            <>
              <NavLink to="/movie/now_playing?page=1">Now Playing</NavLink>
              <NavLink to="/movie/top_rated?page=1">Top Rated</NavLink>
              <NavLink to="/movie/watch-later">Watch Later</NavLink>
            </>
          )}
        </MenuItem>
        <Search onSubmit={handleSearch}>
          <SearchInput
            placeholder="name, genres, ..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <SearchIcon>
            <SearchOutlinedIcon sx={{ color: "black", fontSize: "20px" }} />
          </SearchIcon>
        </Search>
      </ToolBarMenu>
    </AppBar>
  );
};

export default Navbar;
