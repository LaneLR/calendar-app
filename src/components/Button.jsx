import styled from "styled-components";

const ButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1.1rem;
  border: none;
  background-color: var(--color-toolbar-button);
  padding: 15px;
  border-radius: 15px;
  cursor: pointer;
  width: auto;

  &:hover {
  background-color: var(--color-toolbar-button-hover)
  }
`;

export default function Button({ children, type = 'button', ...props }) {
  return <><ButtonWrapper type={type} {...props}>{children}</ButtonWrapper></>;
}
