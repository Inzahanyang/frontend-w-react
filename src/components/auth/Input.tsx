import styled from "styled-components";

interface IInputProps {
  type: string;
  placeholder: string;
}

const SInput = styled.input`
  width: 100%;
  border-radius: 3px;
  padding: 7px;
  background-color: #fafafa;
  border: 0.5px solid ${(props) => props.theme.borderColor};
  margin-top: 5px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
  }
`;

function Input(props: IInputProps) {
  return <SInput {...props} />;
}

export default Input;
