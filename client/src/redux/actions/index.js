import axios from "axios";

export function getGames() {
  return async function (dispatch) {
    try {
      const resp = await axios.get("https://pi-rodri.herokuapp.com/videogames");

      if (resp) {
        dispatch({ type: "GET_GAMES", payload: resp.data });
      }
    } catch (err) {
      console.log(err, "error getgames");
    }
  };
}

export function getGenres() {
  return async function (dispatch) {
    try {
      const resp = await axios.get("https://pi-rodri.herokuapp.com/genres");

      if (resp) {
        dispatch({ type: "GET_GENRES", payload: resp.data });
      }
    } catch (err) {
      console.log(err, "error getgenres");
    }
  };
}

export function getResults(game) {
  return async function (dispatch) {
    try {
      const resp = await axios.get(
        `https://pi-rodri.herokuapp.com/search?name=${game}`
      );

      if (resp) {
        dispatch({ type: "GET_RESULTS", payload: resp.data.results });
      }
    } catch (err) {
      console.log(err, "error getresults");
    }
  };
}

export function clearResults() {
  return async function (dispatch) {
    dispatch({ type: "CLEAR_RESULTS" });
  };
}

export function setGamesPerPage(page) {
  return async function (dispatch) {
    dispatch({ type: "SET_GAMESPERPAGE", payload: parseInt(page) });
  };
}

export function addGame(props) {
  return async function (dispatch) {
    try {
      const resp = await axios.post(
        "https://pi-rodri.herokuapp.com/create",
        props
      );

      if (resp) {
        dispatch({
          type: "ADD_GAME",
          payload: props.entries ? Object.fromEntries(props.entries()) : props,
        });
      }
    } catch (err) {
      console.log(err, "error addgame");
    }
  };
}
