import s from "styled-components";
import { Genre, Loader } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = s.div`
 width: 95%
`;

const LinkTo = s(Link)`
  text-decoration: none;

`;

const GenresCont = s.div`
  padding: 70px 20px 10px;
  display: grid;
  // flex-direction: column;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-flow: dense;
  grid-gap: 0px 15px;

  // background-color: grey;
  height: 92vh;
`;

export default function Genres() {
  const genres = useSelector((state) => state.genres);

  return genres.length ? (
    <Container>
      <GenresCont>
        {genres.map((genre) => {
          return (
            <LinkTo to={`/genre/${genre.slug}`} key={genre.id}>
              <Genre item={genre} />
            </LinkTo>
          );
        })}
      </GenresCont>
    </Container>
  ) : (
    <Loader />
  );
}
