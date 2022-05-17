import s from "styled-components";

const Container = s.div`
    position: absolute;
    top: 50%;
    bottom: 50%;
    left: 20%;
`;

const Span = s.span`
    font-size: 20px;
    font-weight: bold;
`;

export default function File() {
  return (
    <Container>
      <Span>Choose a file or drag it here!</Span>
    </Container>
  );
}
