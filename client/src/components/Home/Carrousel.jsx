import React, { useRef, useEffect, useState } from "react";
import { images } from "../../images/index.js";
import arrow from "../../images/Arrow.png";
import s from "styled-components";

const Container = s.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 80%;
  max-width: 1100px;
  margin-top: 70px;

  position: relative;
  border-radius: 5px 5px 5px 5px; 
  
  @media (max-width: 1100px) {
    height: 280px;
    width: 90%;
   }

   @media (max-width: 940px) {
    height: 250px;
    width: 100%;
   }
`;

const Banners = s.div`
  position: relative;
  width: 75%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px 5px 5px 5px;
`;

const Banner = s.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px 5px 5px 5px;
  z-index: 1;
`;

const PrevBanner = s.img`
  position: absolute;
  width: 10%;
  height: 90%;
  
  top: 18px;
  left: -8%;
  object-fit: cover;
  object-position: left;
  border-radius: 5px 5px 5px 5px;
  // filter: blur(0.5px);
  // -webkit-filter: blur(0.5px);
  opacity: 60%;

`;

const NextBanner = s.img`
  position: absolute;
  width: 10%;
  height: 90%;
  top: 18px;
  right: -8%;
  object-fit: cover;
  object-position: right;
  border-radius: 5px 5px 5px 5px;
  // filter: blur(0.5px);
  // -webkit-filter: blur(0.5px);
  opacity: 60%;
`;

const PrevButton = s.img`
  height: 100%;
  width: 100%;

  object-fit: cover;
  
  // Transparentar el fondo del logo 
  filter: invert(1.1);

  &: hover {
    filter: none;
  }
`;

const NextButton = s.img`
  height: 100%;
  width: 100%;

  object-fit: cover;
 
  transform: rotate(180deg);

  // Transparentar el fondo del logo 
  filter: invert(1.1);

  &: hover {
    filter: none;
  }
`;

const Button = s.div`
  height: 35px;
  width: 35px;

  position: absolute;
  top: 45%;
  z-index: 2;

  border-radius: 100px;

  &: hover {
    background-color: #ffffff78;
    cursor: pointer;
  }
`;

export default function Carrousel() {
  const imagesArray = Object.keys(images).map((image) => {
    return images[image];
  });

  const [current, setCurrent] = useState(0),
    length = imagesArray.length,
    timeoutRef = useRef();

  const prev = "prev",
    next = "next";

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCurrent((prevIndex) =>
          prevIndex === length - 1 ? 0 : prevIndex + 1
        ),
      5000
    );

    return () => {
      resetTimeout();
    };
    // eslint-disable-next-line
  }, [current]);

  function getIndex(action) {
    if (action === prev) {
      return current === 0 ? length - 1 : current - 1;
    } else {
      return current === length - 1 ? 0 : current + 1;
    }
  }

  function onClick(action) {
    setCurrent(getIndex(action));
  }

  return (
    <Container>
      <Button style={{ left: "8%" }}>
        <PrevButton
          src={arrow}
          name={prev}
          onClick={() => {
            onClick(prev);
          }}
        ></PrevButton>
      </Button>

      <Button style={{ right: "8%" }}>
        <NextButton
          src={arrow}
          name={next}
          onClick={() => {
            onClick(next);
          }}
        ></NextButton>
      </Button>

      <Banners>
        <PrevBanner key={getIndex(prev)} src={imagesArray[getIndex(prev)]} />
        <Banner key={current} src={imagesArray[current]} />
        <NextBanner key={getIndex(next)} src={imagesArray[getIndex(next)]} />
      </Banners>
    </Container>
  );
}
