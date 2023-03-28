import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Netflix from "./pages/Netflix";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Player from "./pages/Player";
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShows";
import MyList from "./pages/MyList";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Netflix />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/player/:key" element={<Player />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv" element={<TVShows />} />
        <Route path="/mylist" element={<MyList/>} />
      </Routes>
    </BrowserRouter>
  );
}
