import s from "styled-components";

const Container = s.div`
  display: flex;
  align-items: center;
  justify-content: center;

  background-size: cover;
  background-position: initial;
  background-repeat: no-repeat;

  height: 156.85px;

  border-radius: 5px 5px 5px 5px;
  // opacity: 0.75;

  // filter: blur(0px);
  // -webkit-filter: blur(8px);

  color: white;
  font-size: 40px;
`;

const GenreText = s.span`
 height: 100px;
 font-weight: bold;
 text-shadow: 0px 0px 1px black;
 
//  filter: blur(0px);
//     -webkit-filter: blur(0px);
`;

export default function Genre({ item }) {
  return (
    <Container style={{ backgroundImage: `url(${item.image_background})` }}>
      <GenreText>{item.name}</GenreText>
    </Container>
  );
}
