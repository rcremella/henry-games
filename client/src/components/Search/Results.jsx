import { useSelector } from "react-redux";
import { Game, Loader } from "../index";
import { ratingFilter } from "../../functions";
import { Link } from "react-router-dom";
import s from "styled-components";

const Container = s.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-flow: dense;
  grid-gap: 20px;
  
  justify-content: center;
  align-items: center;

  margin: 70px 0px;
`;

const LinkTo = s(Link)`
  text-decoration: none;
`;

export default function Results() {
  const results = useSelector((state) => state.results).filter(
    (result) => result.background_image
  );

  return results[0] ? (
    <Container>
      {ratingFilter([...results]).map((result) => {
        return (
          <LinkTo to={`/game/${result.id}`} key={result.id}>
            <Game item={result}></Game>
          </LinkTo>
        );
      })}
    </Container>
  ) : (
    <Loader />
  );
}
