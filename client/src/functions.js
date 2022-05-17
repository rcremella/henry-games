// import { useSelector } from "react-redux";
import axios from "axios";

export function imageContainer(e) {
  let reader = new FileReader();

  reader.readAsDataURL(e.target.files[0]);

  reader.onloadend = () => {
    let preview = document.getElementById("imageContainer"),
      image = document.createElement("img");

    image.src = reader.result;
    image.style =
      "height: 100%; width: 100%; position: absolute; left: 0; object-fit: cover; object-position: center; z-index: 1; border-radius: 5px 5px 5px 5px;";

    if (preview.children[1]) {
      preview.removeChild(preview.lastChild);
      preview.appendChild(image);
    } else {
      preview.appendChild(image);
    }
  };
}

export function validate(inputs, name) {
  let errors = {};

  if (!inputs.name) {
    errors.name = "Se debe completar el nombre";
  }

  if (!inputs.description) {
    errors.description = "Se debe completar con una descripcion";
  }

  if (!inputs.released) {
    errors.released = "La fecha es obligatoria";
  }

  if (!inputs.image && name === "image") {
    errors.image = "Se debe cargar una imagen";
  }

  return errors;
}

export function setPages(games, gamesPerPage, dispatch) {
  // Determinamos la cantidad de paginas
  const pagesNum = Math.ceil(games.length / gamesPerPage);

  // Creamos un array por cada pagina
  let pagesArray = [];

  for (let i = 0; i < pagesNum; i++) {
    pagesArray.push(i + 1);
  }

  // Guardamos en Redux la cantidad de paginas
  dispatch({ type: "SET_PAGES", payload: pagesArray });
}

export function setGames(games, dispatch) {
  dispatch({ type: "SET_GAMES", payload: games });
}

export async function getGame(id) {
  const resp = await axios.get(
    `https://henry-game.herokuapp.com/game?id=${id}`
  );

  return resp.data;
}

export function nameFilter(games, type = "Ascendente") {
  games.sort(function (a, b) {
    var x = a.name.toLowerCase();
    var y = b.name.toLowerCase();

    return type.includes("Ascendente")
      ? x < y
        ? -1
        : x > y
        ? 1
        : 0
      : y < x
      ? -1
      : y > x
      ? 1
      : 0;
  });

  return games;
}

export function ratingFilter(games, type = "Ascendente") {
  games.sort(function (a, b) {
    return type.includes("Ascendente")
      ? b.rating - a.rating
      : a.rating - b.rating;
  });

  return games;
}

export function newestFilter(games, type = "Nuevos") {
  games.sort(function (a, b) {
    var x = b.released?.toLowerCase();
    var y = a.released?.toLowerCase();

    return type.includes("Nuevos")
      ? x < y
        ? -1
        : x > y
        ? 1
        : 0
      : y < x
      ? -1
      : y > x
      ? 1
      : 0;
  });

  return games;
}

export function moreReviewsFilter(games, type = "") {
  games.sort(function (a, b) {
    return b.playtime - a.playtime;
  });

  return games;
}

export function setFilters(e, games, gamesPerPage, dispatch) {
  let gamesAux = games.slice(0);

  e.preventDefault();

  if (e.target.name === "Pages") {
    gamesAux = games.map((map) => {
      return map;
    });

    setGames(
      gamesAux.slice(
        gamesPerPage * (Number(e.target.value) - 1),
        gamesPerPage * Number(e.target.value)
      ),
      dispatch
    );
  } else {
    if (e.target.value.includes("nombre")) {
      setGames(
        nameFilter(gamesAux, e.target.value).slice(0, gamesPerPage),
        dispatch
      );

      games = nameFilter(games, e.target.value);
    } else if (e.target.value.includes("calificacion")) {
      setGames(
        ratingFilter(gamesAux, e.target.value).slice(0, gamesPerPage),
        dispatch
      );

      games = ratingFilter(games, e.target.value);
    } else if (e.target.value.includes("lanzamiento")) {
      setGames(
        newestFilter(gamesAux, e.target.value).slice(0, gamesPerPage),
        dispatch
      );

      games = newestFilter(games, e.target.value);
    }
  }
}
