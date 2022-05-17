import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Loader from "../Loader.jsx";
import { Game } from "../index";
import s from "styled-components";

const Container = s.div`
  height: 100%;
  min-height: 100vh;

  // margin-top: 20px 0px;
`;

const Games = s.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-flow: dense;
  grid-gap: 20px;
  
  justify-content: center;
  align-items: center;

  margin: 80px 0px 20px 0px;
`;

const GameLink = s(Link)`
  text-decoration: none;  
`;

export default function GenreDetails() {
  const { id } = useParams();

  const games = useSelector((state) => state.originalGames).filter((game) => {
    return game?.genres?.find((genre) => genre.slug === id);
  });

  return games[0] ? (
    <Container>
      <Games>
        {games.map((game) => (
          <GameLink to={`/game/${game.id}`} key={game.id}>
            <Game item={game} />
          </GameLink>
        ))}
      </Games>
    </Container>
  ) : (
    <Loader />
  );
}
