import s from "styled-components";

const Container = s.div`
  height: 150px;
  width: 280px;

  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  color: white;
  // padding: 15px;
  margin: 5px;
  `;

const Image = s.img`
  // border-radius: 1%;
  height: 150px;
  width: 280px;
  object-fit: cover;
  object-position: top;
  border-radius: 5px 5px 5px 5px;
`;

const Span = s.span`
  position: absolute;
  color: white;
  bottom: 10px;
  left: 10px;
  font-weight: bold;
  font-size: 15px;
  text-shadow: 1px 1px black;
  // text-shadow: 0 0 3px black, 0 0 5px white;
`;

export default function Details(props) {
  return (
    <Container>
      <Image src={props.item.background_image}></Image>
      <Span>{props.item.name}</Span>
    </Container>
  );
}
