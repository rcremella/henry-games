import { useState } from "react";
import { useSelector } from "react-redux";
import s from "styled-components";

const Container = s.div`
    display: flex;
    flex-direction: inherit;
    justify-content: end;
    width: 320px;
    margin: 0px 4px;
    border-radius: 6px 6px 6px 6px;
    border-width: 0;
    background-color: #ffffff59;
    height: 170px;
`;

const Button = s.button`
    margin: 0px 4px 1px 4px;
    border-radius: 5px 5px 5px 5px;
    border-width: 0;
    background-color: #ffffffc4;
    font-size: 11px;
`;

const Select = s.select`
    width: 310px;
    margin: 2px 4px;
    border-radius: 7px 7px 7px 7px;
    border-width: 0;
`;

export default function SelectComponent({ setInputs, inputs }) {
  const [selectedValue, setSelectedValue] = useState([]);

  const genres = useSelector((state) => state.genres);

  const handleChange = ({ target }) => {
    const genre = genres.filter((genre) => genre.slug === target.value)[0];

    if (
      !selectedValue.filter((selected) => selected.slug === target.value)[0]
    ) {
      setSelectedValue((prevValue) => [...prevValue, genre]);

      setInputs({ ...inputs, genres: { ...selectedValue, genre } });
    }
  };

  const handleDelete = (e) => {
    setSelectedValue(
      selectedValue.filter((selected) => selected.slug !== e.target.value)
    );

    setInputs({
      ...inputs,
      genres: {
        ...selectedValue.filter((selected) => selected.slug !== e.target.value),
      },
    });
  };

  return (
    <Container>
      {selectedValue[0] ? (
        <div style={{ margin: 1, lineHeight: "25px" }}>
          <div>
            {selectedValue.map((selected) => (
              <Button
                value={selected.slug}
                key={selected.id}
                onClick={(e) => handleDelete(e)}
              >
                {selected.name} X
              </Button>
            ))}
          </div>
        </div>
      ) : null}

      <Select
        name="select"
        id=""
        multiple="multiple"
        size={3}
        onChange={(e) => handleChange(e)}
      >
        {genres[0] ? (
          genres.map((genre) => (
            <option
              value={genre.slug}
              key={genre.id}
              disabled={selectedValue.length > 2 ? true : false}
            >
              {genre.name}
            </option>
          ))
        ) : (
          <option>Loading...</option>
        )}
      </Select>
    </Container>
  );
}
