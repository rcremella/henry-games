import s from "styled-components";

const Container = s.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 185px;
`;

const Textarea = s.textarea`
    width: 310px;
    font-size: 13px;
    background-color: #ffffffe6;
    margin-left: 5px;
    padding: 6px 2px;
    border-radius: 5px 5px 5px 5px;
    border-width: 0;
`;

export default function Description({ onChange }) {
  return (
    <Container>
      <Textarea
        style={{ resize: "none" }}
        name="description"
        rows="4"
        onChange={(e) => onChange(e)}
        placeholder="Now add some description!"
      ></Textarea>
    </Container>
  );
}
