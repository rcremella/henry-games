import s from "styled-components";
import logo from "./../images/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { clearResults } from "../redux/actions";
import { useDispatch } from "react-redux";

const Container = s.div`
    display: flex;
    position: fixed;
    justify-content: center;
    align-items: center;
    gap: 30px;
    top: 0;
    background-color: #616773de;
    color: white;
    height: 60px;
    width: 70%;
    min-width: 748px;
    max-width: 910px;
    font-size: 15px;
    border-radius: 0px 0px 8px 8px; 
    z-index: 10;

    @media (max-width: 900px) {
      width: 100%;
      border-radius: 0px;
     }
`;

const Logo = s.img`
    margin: 3px;
    height: 50px;
    width: 70px;
`;

const LinkTo = s(Link)`
  height: 20px;
  color: white;
  text-decoration: none;
`;

const Input = s.input`
  padding: 5px 3px;
  border: none;
  border-radius: 2px;
`;

export default function Bar() {
  const navigate = useNavigate(),
    dispatch = useDispatch();

  const handleKey = (e) => {
    if (e.key === "Enter") {
      dispatch(clearResults());
      navigate(`/search/${e.target.value.trim().split(" ").join("%20")}`);
    }
  };

  return (
    <Container>
      <Link to="/home">
        <Logo src={logo} />
      </Link>
      <LinkTo to="/home">Inicio</LinkTo>
      <LinkTo to="/genres">Generos</LinkTo>
      <LinkTo to="/create">Crear</LinkTo>
      <LinkTo to="/about">Acerca de</LinkTo>
      <LinkTo to="/login">Login</LinkTo>
      <Input type="text" placeholder="Buscar" onKeyDown={(e) => handleKey(e)} />
    </Container>
  );
}
