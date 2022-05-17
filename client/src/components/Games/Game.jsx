import { useDispatch, useSelector } from "react-redux";
import s from "styled-components";
import { addGame, getGames } from "../../redux/actions";

const Container = s.div`
  background: linear-gradient(210deg,rgba(135,135,135,0.3) 23%,rgba(0,0,0,0.3) 70%);
  height: 240px;
  width: 250px;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  border-radius: 3px 3px 3px 3px;
  color: white;
  padding: 2px;
`;

const Image = s.img`
  height: 140px;
  width: 240px;
  object-fit: cover;
  object-position: center;
  border-radius: 3px 3px 3px 3px;
`;

const Genres = s.div`
  height: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Genre = s.span`
  height: 18px;
  color: black;
  padding: 1px 3px;
  margin: 0px 4px;
  font-size: 13px;
  font-family: sans-serif;
  border-radius: 5px 5px 5px 5px;
  background-color: #5c616c;
`;

const Span = s.span`
  margin: 5px 0px 10px 0px;
  width: 95%;
  font-size: 16px;
  font-weight: bold;
`;

const Stars = s.div`
  display: flex;
  position: absolute;
  bottom: 0;
  top: 35px;
`;

const Button = s.button`
  position: absolute;
  top: 5px;
  right: 5px;
  
  height: 22px;
  width: 72px;

  padding: 1px 2px;
  border-radius: 6px 0px 6px 6px;
  border-width: 0px;
  
  font-weight: bold;
  color: black;
  background-color: white;

  :hover {
    background-color: #242424;
    color: white;
  }
`;

export default function Details({ item }) {
  const dispatch = useDispatch(),
    game = useSelector((state) => state.originalGames).filter(
      (game) => game.id.toString() === item.id.toString()
    )[0];

  function saveGame(e) {
    e.preventDefault();
    console.log(item);

    const formData = new FormData();

    formData.append("imageRoute", item.background_image);
    formData.append("id", item.id);
    formData.append("name", item.name);
    formData.append("description", "No description");
    formData.append("released", item.released);
    formData.append("rating", item.rating);

    dispatch(addGame(formData));
    dispatch(getGames());
  }

  return (
    <Container>
      {/* Si no se encontró el juego en memoria entonces añadimos el boton */}
      {!game?.id ? (
        <Button onClick={(e) => saveGame(e)}>Add now!</Button>
      ) : null}

      <Image src={item.background_image} />
      <Stars>
        {item.rating ? (
          [...Array(Math.round(item.rating))].map((star, index) => (
            <span key={index}>&#9733;</span>
          ))
        ) : (
          <span>&#9733;</span>
        )}
      </Stars>

      <Genres>
        <Genre>
          {item.genres?.length
            ? item.genres
                ?.slice(0, 3)
                .map((genre) => genre.name)
                .join(" | ")
            : "No genre"}
        </Genre>
      </Genres>
      <Span>{item.name}</Span>
    </Container>
  );
}
