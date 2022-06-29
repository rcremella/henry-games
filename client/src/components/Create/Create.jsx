import React, { useEffect, useState } from "react";
import s from "styled-components";
import { useDispatch } from "react-redux";
import { addGame, getGames } from "../../redux/actions";
import {
  Popup,
  SelectComponent,
  File,
  StarRating,
  Name,
  Description,
} from "../index";
import { imageContainer, validate } from "../../functions";
import Released from "./Released";

const Container = s.div`
    display: flex;
    width: 85%;
    height: 100vh;
`;

const Form = s.form`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100vh;
    padding: 0px 100px;
`;

const NewDiv = s.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 105px;
`;

const OldDiv = s.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 165px;
`;

const Select = s.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 135px;
`;

const Label = s.label`
    font-size: 18px;
    font-weight: bold;
    color: white;
    padding: 10px 0px;  
`;

const Error = s.p`
    font-size: 14px;
    // font-weight: bold;
    color: #ff5d5d;
    // margin: 10px;
`;

const Right = s.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  width: 500px;
  height: 600px;
`;

const Left = s.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 600px;
`;

const ImageContainer = s.div`
  width: 450px;
  height: 300px;
  position: relative;
  background-color: grey;
  border-radius: 5px 5px 5px 5px;
`;

const InputImage = s.input`
  width: 450px;
  height: 300px;
  opacity: 0;
  z-index: 2;
  position:relative;
`;

const SubmitButton = s.button`
  position: absolute;
  bottom: 30px;
  right: 0px;
  height: 40px;
  width: 80px;
  font-size: 14px;
  background-color: white;
  padding: 5px;
  border: 0;
  font-weight: bold;
  
  border-radius: 5%;
  margin-top: 10px;
  :hover { background-color: #8ea87c; color: white;  }
`;

export default function Create() {
  useEffect(() => {
    setPopup(localStorage.getItem("flag"));
    setMessage(JSON.parse(localStorage.getItem("game")));

    localStorage.removeItem("flag");

    window.scrollTo(0, 0);
  }, []);

  const date = new Date(),
    dispatch = useDispatch();

  const [inputs, setInputs] = useState({
      released: date.toISOString().slice(0, 10),
    }),
    [popup, setPopup] = useState(),
    [message, setMessage] = useState(),
    [errors, setErrors] = useState({});

  const handleSubmit = (inputs) => {
    if (inputs.image) {
      if (!Object.keys(errors)[0]) {
        localStorage.setItem("flag", true);

        localStorage.setItem(
          "game",
          JSON.stringify({
            name: inputs.name,
            id: inputs.id,
          })
        );

        const formData = new FormData();

        formData.append("image", inputs.image);
        formData.append("imageRoute", `../dbImages/${inputs.id}.jpg`);
        formData.append("id", inputs.id);
        formData.append("name", inputs.name);
        formData.append("description", inputs.description);
        formData.append("released", inputs.released);
        formData.append("rating", inputs.rating);
        formData.append("genres", inputs.genre);

        dispatch(addGame(formData));
        dispatch(getGames());
      }
    } else {
      setErrors(validate(inputs, "image"));
    }
  };

  useEffect(() => {
    setInputs({
      ...inputs,
      genre:
        typeof inputs.genres === "object"
          ? Object.keys(inputs.genres)
              .map((genre) => inputs.genres[genre].id)
              .join(",")
          : 0,
    });
    // eslint-disable-next-line
  }, [inputs.genres]);

  const setImage = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.files[0],
    });

    imageContainer(e);
  };

  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
      id: "DB" + date.toString().slice(16, 24).split(":").join(""),
    });

    setErrors(validate({ ...inputs, [e.target.name]: e.target.value }));
  };

  return (
    <Container>
      {popup && (
        <Popup
          setPopup={setPopup}
          header={"New game added!"}
          body={`${message.name} has been successfully added to the library.`}
          button={"SEE THE GAME"}
          id={message.id}
        />
      )}

      <Form
        onSubmit={(e) => {
          e.preventDefault();

          handleSubmit(inputs);
          setPopup(true);
          dispatch(getGames);
        }}
        method="POST"
        encType="multipart/form-data"
      >
        <Left>
          <NewDiv>
            <Label>Name</Label>
            <Name onChange={onChange} />
            {errors.name && <Error>{errors.name}</Error>}
          </NewDiv>

          <OldDiv>
            <Label>Description</Label>

            <Description onChange={onChange} />
            {errors.description && <Error>{errors.description}</Error>}
          </OldDiv>

          <div style={{ display: "flex", width: "100%" }}>
            <NewDiv>
              <Label>Release</Label>
              <Released onChange={onChange} released={inputs.released} />

              {errors.released && <Error>{errors.released}</Error>}
            </NewDiv>

            <NewDiv>
              <Label>Rating</Label>
              <StarRating inputs={inputs} setInputs={setInputs} />
            </NewDiv>
          </div>

          <OldDiv>
            <Select>
              <Label>Genres (Select up to three!)</Label>
              <SelectComponent setInputs={setInputs} inputs={inputs} />
            </Select>
            {errors.genre && <Error>{errors.genre}</Error>}
          </OldDiv>
        </Left>

        <Right>
          <Label>Image</Label>
          <ImageContainer id="imageContainer">
            <InputImage name="image" type="file" onChange={setImage} />

            {inputs.image ? null : <File />}

            {errors.image && <Error>{errors.image}</Error>}
          </ImageContainer>

          <div>
            <SubmitButton
              disabled={
                inputs.name &&
                inputs.description &&
                inputs.image &&
                inputs.genre
                  ? false
                  : true
              }
              type="submit"
              name="submit"
              value="Submit"
            >
              Submit
            </SubmitButton>
          </div>
        </Right>
      </Form>
    </Container>
  );
}
