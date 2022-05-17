import s from "styled-components";
import { useNavigate } from "react-router-dom";
import checkmark from "../images/Checkmark.png";

const Container = s.div`
    display: flex;  
    position: absolute;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    z-index: 5;
    background-color: #00000057;
    `;

const Message = s.div`
    display: flex;  
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    position: relative;
    height: 232px;
    width: 430px;
    border-radius: 10px 10px 10px 10px;
    background-color: #b6b7aef2;
    -webkit-box-shadow: 0px 0px 34px 31px rgba(0,0,0,0.19); 
    box-shadow: 0px 0px 34px 31px rgba(0,0,0,0.19);   
`;

const Close = s.button`
    position: absolute;  
    top: 10px;
    right: 10px;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 30px;
    border-width: 0;
    border-radius: 5px 5px 5px 5px;
`;

const Button = s.button`
    position: absolute;  
    bottom: 10px;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 150px;
    border-width: 0;
    border-radius: 5px 5px 5px 5px;
`;

const Span = s.span`
    font-size: 20px;
    font-weight: bold;
    margin: 10px 10px 10px 10px;
`;

const P = s.p`
    font-size: 13px;
    font-weight: bold;
    margin: 10px 10px 60px 10px;
`;

const Checkmark = s.img`
     height: 40px;
     width: 40px;
     margin: 30px 10px 10px 10px;
`;

export default function Popup(props) {
  const navigate = useNavigate();

  const close = () => {
    props.setPopup();
  };

  return (
    <Container>
      <Message data-effect={"mfp-zoom-in"}>
        <Close onClick={close}>X</Close>
        <Checkmark src={checkmark} alt="checkmark icon" />
        <Span>{props.header}</Span>
        <P>{props.body}</P>
        <Button onClick={() => navigate(`/game/${props.id}`)}>
          {props.button}
        </Button>
      </Message>
    </Container>
  );
}
