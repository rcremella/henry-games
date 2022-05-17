import home from "../images/Home.jpg";
import s from "styled-components";

const Container = s.div`
    height: 100vh;
    width: 100%;
    background-image: url(${home});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
`;

export default function Home() {
  return <Container />;
}
