import s from "styled-components";

const Container = s.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Load = s.div`
  border: 10px solid #f3f3f3; 
  border-top: 10px solid #111111; 
  border-radius: 50%;
  width: 10px;
  height: 10px;
  animation: spin 2s linear infinite;

 @keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
  }
`;

export default function Loader() {
  return (
    <Container>
      <Load />
    </Container>
  );
}
