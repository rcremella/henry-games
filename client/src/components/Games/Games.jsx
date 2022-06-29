import { useEffect, useState } from "react";
import s from "styled-components";
import { Game, Loader } from "./../index";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setPages, setGames, setFilters } from "../../functions";

const Container = s.div`
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  margin: 60px 0px;
  
  width: 100%;
  height: 100%;
  min-height: 94vh;
`;

const Grid = s.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-flow: dense;
  grid-gap: 20px;
  
  justify-content: center;
  align-items: center;
  
  // background-color: #333333;
  height: 100%;
  //width: 80%;
`;

const Bar = s.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  
  height: 50px;
  width: 80%;
`;

const Search = s.input`
  border-width: 0px;
  padding: 5px 5px;
  border-radius: 2px 2px 2px 2px;
`;

const Page = s.button`
  border-width: 0px;
  padding: 5px 5px;
  margin: 0px 2px;
  border-radius: 5px 5px 5px 5px;
`;

const Select = s.select`
  border-width: 0px;
  height: 26px;
  padding: 5px 2px;
  margin: 0px 2px;
  border-radius: 5px 5px 5px 5px;
`;

const GameLink = s(Link)`
  text-decoration: none;  
`;

export default function Games() {
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const originalGames = useSelector((state) => state.originalGames),
    games = useSelector((state) => state.games),
    pages = useSelector((state) => state.pages),
    [gamesPerPage, setGamesPerPage] = useState(
      useSelector((state) => state.gamesPerPage)
    );

  const onChange = (e) => {
    if (!e.target.value) {
      // Si el input está vacío entonces hacemos el corte
      setGames(originalGames.slice(0, gamesPerPage), dispatch);
    } else {
      setGames(
        originalGames.filter((game) =>
          game.name.toLowerCase().includes(e.target.value.toLowerCase())
        ),
        dispatch
      );
    }

    setPages(
      originalGames.filter((game) =>
        game.name.toLowerCase().includes(e.target.value.toLowerCase())
      ),
      gamesPerPage,
      dispatch
    );
  };

  const onClick = (e) => {
    if (e.target.name === "gamesPerPage" && e.target.value) {
      setGamesPerPage(Number(e.target.value));
      // dispatch(setGamesPerPage(e.target.value));
    } else {
      setFilters(e, originalGames, gamesPerPage, dispatch);
    }
  };

  useEffect(() => {
    setGames(originalGames.slice(0, gamesPerPage), dispatch);
    setPages(originalGames, gamesPerPage, dispatch);
    // eslint-disable-next-line
  }, [gamesPerPage]);

  useEffect(() => {
    setGames(originalGames.slice(0, gamesPerPage), dispatch);
    setPages(originalGames, gamesPerPage, dispatch);
    // eslint-disable-next-line
  }, [originalGames]);

  return originalGames.length ? (
    <Container>
      <Bar>
        <Search
          type="text"
          onChange={(e) => onChange(e)}
          placeholder="Buscar"
        />

        <div>
          {pages?.map((page) => {
            return (
              <Page
                key={page}
                name="Pages"
                onClick={(e) => {
                  onClick(e);
                }}
                value={page}
              >
                {page}
              </Page>
            );
          })}
        </div>

        <Select name="sort" id="sort" onChange={(e) => onClick(e)}>
          <option value="default">Ordenar por:</option>
          <option value="nombreAscendente">Nombre: de A a Z</option>
          <option value="nombreDescendente">Nombre: de Z a A</option>
          <option value="lanzamientoNuevos">Lanzamiento: más nuevos</option>
          <option value="lanzamientoAntiguos">Lanzamiento: más antiguos</option>
          <option value="calificacionAscendente">
            Calificación: más altas
          </option>
          <option value="calificacionDescendente">
            Calificación: más bajas
          </option>
        </Select>

        <Select
          name="gamesPerPage"
          id="gamesPerPage"
          onChange={(e) => onClick(e)}
        >
          <option value="">{`Games per page:`}</option>
          <option value="16">16</option>
          <option value="32">32</option>
          <option value="48">48</option>
          <option value="60">60</option>
        </Select>
      </Bar>

      {games.length ? (
        <Grid>
          {games.map((item) => {
            return (
              <GameLink to={`/game/${item.id}`} key={item.id}>
                <Game item={item} />
              </GameLink>
            );
          })}
        </Grid>
      ) : (
        <div>No existen coincidencias</div>
      )}
    </Container>
  ) : (
    <Loader />
  );
}
