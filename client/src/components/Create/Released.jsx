import s from "styled-components";

const Input = s.input`
    font-size: 13px;
    background-color: #ffffffe6;
    margin-left: 5px;
    
    border-radius: 5px 5px 5px 5px;
    border-width: 0;

    width: 140px;
    height: 34px;
    padding: 0px;
    text-align: center;
`;

export default function Released({ onChange, released }) {
  return (
    <Input
      type="date"
      required="required"
      name="released"
      onChange={(e) => onChange(e)}
      defaultValue={released}
    />
  );
}
