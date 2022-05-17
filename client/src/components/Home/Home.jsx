import { useSelector } from "react-redux";
import s from "styled-components";
import { Product, Loader } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { ratingFilter, newestFilter, moreReviewsFilter } from "../../functions";
import Carrousel from "./Carrousel";

const Container = s.div`
 width: 94%;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 
 position: relative;
 margin-top: 30px;
`;

const Seccion = s.div`
 background-color: #77889961;
 background: linear-gradient(210deg, rgba(135, 135, 135, 0.3) 23%, rgba(0, 0, 0, 0.3) 70%);
 border-radius: 8px 8px 8px 8px;
 color: white;
 display: flex;
 flex-direction: column;
 margin: 12px 0px;
 font-weight: bold;
 height: 230px;
 justify-content: space-evenly;

 width: 90%;
//  @media (min-width: 1000px) {
//   background-color: red;
// }
`;

const Span = s.span`
  font-size: 22px;
  padding: 5px 20px;
  justify-content: initial;
  margin-top: 8px;
`;

const Button = s.button`
  // background-color: black;
  background: rgb(0,0,0);
// background: linear-gradient(210deg, rgba(0,0,0,0.7525210767900911) 23%, rgba(135,135,135,1) 70%);
  color: white;
  cursor:pointer;
  font-weight: bold;
  position: absolute;
  right: 109px;
  top: -55px;
  font-size: 15px;
  padding: 10px 15px;
  border-radius: 5px 5px 5px 5px;
  border-width: 0px;

  //  @media (max-width: 1000px) {
  //  background-color: red;
  //  }
`;

const Category = s.div`
 display: flex;
 justify-content: center;
 width: 100%
`;

export default function Rodri() {
  const games = useSelector((state) => state.originalGames);
  const navigate = useNavigate();

  return games.length ? (
    <>
      <Carrousel />
      <Container>
        <Button onClick={() => navigate("/games")}>SEE ALL GAMES!</Button>

        <Seccion>
          <Span>Los más destacados</Span>
          <Category>
            {moreReviewsFilter([...games])
              .slice(0, 5)
              .map((game) => {
                return (
                  <Link to={`/game/${game.id}`} key={game.id}>
                    <Product item={game} key={game.id} />
                  </Link>
                );
              })}
          </Category>
        </Seccion>

        <Seccion>
          <Span>Mejores calificados</Span>
          <Category>
            {ratingFilter([...games])
              .slice(0, 5)
              .map((game) => {
                return (
                  <Link to={`/game/${game.id}`} key={game.id}>
                    <Product item={game} key={game.id} />
                  </Link>
                );
              })}
          </Category>
        </Seccion>

        <Seccion>
          <Span>Los más nuevos</Span>
          <Category>
            {newestFilter([...games])
              .slice(0, 5)
              .map((game) => {
                return (
                  <Link to={`/game/${game.id}`} key={game.id}>
                    <Product item={game} />
                  </Link>
                );
              })}
          </Category>
        </Seccion>
      </Container>
    </>
  ) : (
    <Loader />
  );
}
