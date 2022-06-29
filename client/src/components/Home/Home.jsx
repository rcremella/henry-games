import { useSelector } from "react-redux";
import s from "styled-components";
import { Product, Loader } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { ratingFilter, newestFilter, moreReviewsFilter } from "../../functions";
import Carrousel from "./Carrousel";
import { useEffect } from "react";

const Container = s.div`
 width: 94%;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 
 position: relative;
 margin-top: 30px;

 @media (max-width: 900px) {
  width: 100%;
 }
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

 @media (max-width: 900px) {
  width: 100%;
  border-radius: 0;
 }
`;

const Span = s.span`
  font-size: 22px;
  padding: 5px 20px;
  justify-content: initial;
  margin-top: 8px;
`;

const Button = s.button`
  background: rgb(0,0,0);
  color: white;
  cursor:pointer;
  font-weight: bold;
  position: absolute;
  right: 109px;
  top: -10px;
  font-size: 15px;
  padding: 10px 15px;
  border-radius: 5px 5px 5px 5px;
  border-width: 0px;
  z-index: 2;

   @media (max-width: 900px) {
    top: 25px; 
    right: 10%;
   }
`;

const Category = s.div`
 display: flex;
 padding-left: 1%;

 width: 98%;
 overflow-x: scroll;

 -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }

  
`;

export default function Rodri() {
  const games = useSelector((state) => state.originalGames);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return games.length ? (
    <>
      <Carrousel />
      <Container>
        <Button onClick={() => navigate("/games")}>SEE ALL GAMES!</Button>

        <Seccion>
          <Span>Los más destacados</Span>
          <Category>
            {moreReviewsFilter([...games])
              .slice(0, 7)
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
              .slice(0, 7)
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
              .slice(0, 7)
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
