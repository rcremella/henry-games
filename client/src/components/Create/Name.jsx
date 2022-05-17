import s from "styled-components";

const Input = s.input`
    width: 310px;
    height: 22px;
    font-size: 13px;
    background-color: #ffffffe6;
    margin-left: 5px;
    padding: 6px 2px;
    border-radius: 5px 5px 5px 5px;
    border-width: 0;
`;

export default function Name({ onChange }) {
  return (
    <Input
      type="text"
      name="name"
      onChange={(e) => onChange(e)}
      placeholder="Put the name here!"
    />
  );
}
