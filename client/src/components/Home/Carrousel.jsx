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
  margin-top: 70px;
  // margin-bottom: 70px;
  position: relative;
  border-radius: 5px 5px 5px 5px;                                 
`;

const Banners = s.div`
  position: relative;
  width: 750px;
  height: 300px;
  object-fit: cover;
  border-radius: 5px 5px 5px 5px;
`;

const Banner = s.img`
  position: absolute;
  width: 750px;
  height: 300px;
  object-fit: cover;
  border-radius: 5px 5px 5px 5px;
  z-index: 1;
`;

const PrevBanner = s.img`
  position: absolute;
  width: 90px;
  height: 260px;
  
  top: 18px;
  left: -80px;
  object-fit: cover;
  object-position: left;
  border-radius: 5px 5px 5px 5px;
  // filter: blur(0.5px);
  // -webkit-filter: blur(0.5px);
  opacity: 60%;

`;

const NextBanner = s.img`
  position: absolute;
  width: 90px;
  height: 260px;
  top: 18px;
  right: -80px;
  object-fit: cover;
  object-position: right;
  border-radius: 5px 5px 5px 5px;
  // filter: blur(0.5px);
  // -webkit-filter: blur(0.5px);
  opacity: 60%;
`;

const PrevButton = s.img`
  height: 35px;
  width: 50px;
  position: absolute;
  top: 45%;
  left: 175px;
  z-index: 1;
  
  // Transparentar el fondo del logo 
  filter: invert(1.1);
  // mix-blend-mode: multiply;
`;

const NextButton = s.img`
  height: 35px;
  width: 50px;
  position: absolute;
  top: 45%;
  right: 175px;
  transform: rotate(180deg);
  z-index: 1;

  // Transparentar el fondo del logo 
  filter: invert(1.1);
  // mix-blend-mode: multiply;
  
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
      <PrevButton
        src={arrow}
        name={prev}
        onClick={() => {
          onClick(prev);
        }}
      ></PrevButton>
      <NextButton
        src={arrow}
        name={next}
        onClick={() => {
          onClick(next);
        }}
      ></NextButton>

      <Banners>
        <PrevBanner key={getIndex(prev)} src={imagesArray[getIndex(prev)]} />
        <Banner key={current} src={imagesArray[current]} />
        <NextBanner key={getIndex(next)} src={imagesArray[getIndex(next)]} />
      </Banners>
    </Container>
  );
}
