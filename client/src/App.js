import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import {
  Bar,
  Games,
  Landing,
  GameDetails,
  Create,
  Genres,
  Search,
  Home,
  GenreDetails,
  Login,
  About,
} from "./components/index";

import { getGames, getGenres } from "./redux/actions";
import { useDispatch } from "react-redux";

function App() {
  // Preparamos el dispatch para la recuperacion de informacion
  const dispatch = useDispatch();

  // Pre-cargamos la informacion de redux
  // const games = useSelector((state) => state.originalGames);
  // const genres = useSelector((state) => state.genres);
  // const gamesPerPage = useSelector((state) => state.gamesPerPage);

  // En la primera renderizacion se recuperan los juegos y generos de la api
  useEffect(() => {
    dispatch(getGames());
    dispatch(getGenres());
    // eslint-disable-next-line
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="App">
            <Bar />
            <Landing />
          </div>
        }
      />
      <Route
        path="/game/:id"
        element={
          <div className="App">
            <Bar />
            <GameDetails />
          </div>
        }
      />
      <Route
        path="/home"
        element={
          <div className="App">
            <Bar />
            <Home />
          </div>
        }
      />
      <Route
        path="/search/:game"
        element={
          <div className="App">
            <Bar />
            <Search />
          </div>
        }
      />
      <Route
        path="/games"
        element={
          <div className="App">
            <Bar />
            <Games />
          </div>
        }
      />
      <Route
        path="/genres"
        element={
          <div className="App">
            <Bar />
            <Genres />
          </div>
        }
      />
      <Route
        path="/genre/:id"
        element={
          <div className="App">
            <Bar />
            <GenreDetails />
          </div>
        }
      />
      <Route
        path="/about"
        element={
          <div className="App">
            <Bar />
            <About />
          </div>
        }
      />
      <Route
        path="/login"
        element={
          <div className="App">
            <Bar />
            <Login />
          </div>
        }
      />
      <Route
        path="/create"
        element={
          <div className="App">
            <Bar />
            <Create />
          </div>
        }
      />
    </Routes>
  );
}

export default App;
