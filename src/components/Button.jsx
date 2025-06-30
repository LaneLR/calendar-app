import styled from "styled-components";

const ButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1.1rem;
  border: none;
  background-color: var(--color-header-button);
  padding: 15px;
  border-radius: 15px;
  cursor: pointer;
  width: auto;
  color: var(--color-header-text);
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: var(--color-header-button-hover);
    color: var(--color-header-text-hover);
  }
`;

export default function Button({ children, type = "button", ...props }) {
  return (
    <>
      <ButtonWrapper type={type} {...props}>
        {children}
      </ButtonWrapper>
    </>
  );
}
