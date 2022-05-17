const axios = require("axios");

require("dotenv").config(); // Variables de entorno
const { Videogames, Genres } = require("../db");

const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const { API_KEY } = process.env;
var errorApi = false;

router.get("/game", async (req, res) => {
  const { id } = req.query;

  try {
    // Proceso con ID exclusivo de base de datos
    if (id.slice(0, 2) === "DB") {
      const game = await Videogames.findAll({ where: { id: id } });

      game[0] ? res.send(game[0]) : res.status(204).send();
    } else {
      const game = await axios
        .get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
        .then((resp) => resp.data);

      game.screenshots = await axios
        .get(`https://api.rawg.io/api/games/${id}/screenshots?key=${API_KEY}`)
        .then((resp) => resp.data.results);
      res.send(game);
    }
  } catch (err) {
    res.status(400).send("err");
  }
});

router.get("/videogames", (req, res) => {
  axios
    .get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=40`)
    .then((response) => {
      let games = response.data.results;

      axios
        .get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2&page_size=40`)
        .then((response) => {
          // Buscamos los juegos creados en la DB
          Videogames.findAll().then((dbGames) => {
            res.send([...games, ...response.data.results, ...dbGames]);
          });
        })
        .catch((err) => {
          errorApi = true;
        });
    })
    .catch((err) => {
      errorApi = true;
    });

  if (!errorApi) {
    // Tramiento de error
  }
});

router.get("/search", (req, res) => {
  const { name } = req.query;

  if (name) {
    axios
      .get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
      .then((response) => {
        res.send(response.data);
      })
      .catch((err) => console.log("err en search"));
  }
});

router.get("/genres", async (req, res) => {
  const genres = await Genres.findAll();

  if (genres[0]) {
    res.send(genres);
  } else {
    axios
      .get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
      .then((response) => {
        response.data.results?.map((genre) => {
          Genres.create({
            id: genre.id,
            name: genre.name,
            slug: genre.slug,
            image_background: genre.image_background,
          });
        });

        res.send(response.data.results);
      })
      .catch((err) => {
        errorApi = true;
      });
  }
});

router.post("/create", (req, res) => {
  const inputs = req.body;

  Videogames.create({
    id: inputs.id,
    name: inputs.name,
    description: inputs.description,
    released: inputs.released,
    rating: inputs.rating,
    background_image: inputs.imageRoute,
    genres: inputs.genres,
  })
    .then(() => {
      res.send(inputs);
    })
    .catch((err) => res.send(err));
});

module.exports = router;
