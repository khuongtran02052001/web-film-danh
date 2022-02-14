import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./features/page/Home";
import MoiveDetail from "./features/page/MoiveDetail";
import NowPlaying from "./features/page/NowPlaying";
import TopRated from "./features/page/TopRated";
import CurrentFilm from "./features/page/CurrentFilm";
import SearchFilm from "./features/page/SearchFilm";
import Footer from "./components/Footer";
import { useDispatch } from "react-redux";
import {
  FetchComingSoonMovie,
  FetchNewMovie,
} from "./features/redux/movieSlice";
import WatchLater from "./features/page/WatchLater";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // get list coming soon movie
    const listComingSoonMovie = async () => {
      try {
        await dispatch(FetchComingSoonMovie({ name: "upcoming", page: 1 }));
      } catch (error) {
        console.log(error);
      }
    };

    // get list new movie
    const listNewMovie = async () => {
      try {
        await dispatch(FetchNewMovie({ name: "upcoming", page: 1 }));
      } catch (error) {
        console.log(error);
      }
    };

    listComingSoonMovie();
    listNewMovie();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MoiveDetail />} />
          <Route path="/movie/popular" element={<CurrentFilm />} />
          <Route path="/movie/now_playing" element={<NowPlaying />} />
          <Route path="/movie/top_rated" element={<TopRated />} />
          <Route path="/movie/" element={<SearchFilm />} />
          <Route path="/movie/watch-later" element={<WatchLater />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
