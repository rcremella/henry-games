import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import s from "styled-components";
import Loader from "../Loader.jsx";
import { getGame } from "../../functions.js";
import { addGame, getGames } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";

const Container = s.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 100vh;
  width: 80%;
  `;

const P = s.p`
  text-align: center;
  `;

const Info = s.div`
  width: 500px;
  color: white;
  font-weight: bold;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  `;

const FirstImg = s.img`
  object-fit: cover;
  width: 450px;
  height: 300px;
  border-radius: 5px 5px 0px 0px;
  margin: 20px 20px 2px 20px;
`;

const Miniatures = s.img`
  object-fit: cover;
  margin: 2px;
  width: 110px;
  height: 100px;

  :hover {
    opacity: 60.5%;
  }
`;

const Left = s.div`
 display: flex;
 flex-direction: column;
 align-items: center;
`;

const OtherImages = s.div`
  display: flex;
  margin-bottom: 100px;
`;

const Title = s.p`
 font-size: 20px;
 font-weight: bold;
 color: white;
`;

const Stars = s.div`
  display: flex;
  color: yellow;
  font-size: 17px;
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

export default function Details() {
  let params = useParams();
  const dispatch = useDispatch();

  const [game, setGame] = useState({ id: params.id });
  const [images, setImages] = useState({ portada: game.background_image });
  const games = useSelector((state) => state.originalGames);

  const UNDEFINED = "undefined";

  function saveGame(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("imageRoute", game.background_image);
    formData.append("id", game.id);
    formData.append("name", game.name);
    formData.append("description", game.description.slice(0, 254));
    formData.append("released", game.released);
    formData.append("rating", game.rating);

    dispatch(addGame(formData));
    dispatch(getGames());
  }

  useEffect(() => {
    getGame(params.id).then((game) => setGame(game));
    setImages({ ...images, portada: game.background_image });

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setImages({
      ...images,
      portada: game.background_image,
      miniaturas: game.screenshots,
    });

    if (game.description_raw) {
      game.description = game.description_raw.split("\n")[0];
    }
    // eslint-disable-next-line
  }, [game]);

  function changeImage(url) {
    setImages({ ...images, portada: url });
  }

  return game.name ? (
    <Container>
      <Left>
        <Title>{`${game.name}`}</Title>
        <FirstImg src={images.portada} alt="Image" />

        <OtherImages
          onMouseLeave={() => {
            changeImage(game.background_image);
          }}
        >
          {images.miniaturas?.slice(1, 5).map((picture) => {
            return (
              <Miniatures
                src={picture.image}
                key={picture.id}
                onClick={(e) => {
                  changeImage(e.target.src);
                }}
                onMouseOver={(e) => {
                  changeImage(e.target.src);
                }}
              />
            );
          })}
        </OtherImages>
      </Left>

      <Info>
        {games?.filter(
          (item) => item.id.toString() === game.id.toString()
        )[0] ? null : (
          <button
            onClick={(e) => {
              saveGame(e);
            }}
          >
            Save game!
          </button>
        )}

        <p>{`SKU: ${game.id}`}</p>

        <Genres>
          <Genre>
            {typeof game.genres === "object"
              ? game.genres
                  ?.slice(0, 3)
                  .map((genre) => genre.name)
                  .join(" | ")
              : "No genre"}
          </Genre>
        </Genres>

        <P>{parse(game.description)}</P>

        <Stars>
          {[
            ...Array(game.rating !== UNDEFINED ? Math.round(game.rating) : 1),
          ].map((star, index) => (
            <span key={index}>&#9733;</span>
          ))}
        </Stars>

        <p>{`${game.released}`}</p>
      </Info>
    </Container>
  ) : (
    <Loader />
  );
}
