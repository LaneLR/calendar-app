"use client";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  min-height: 150px;
  max-height: 150px;
  width: 98%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const HeaderContent = styled.div`
  background-color: lightblue;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  box-shadow: 4px 6px 5px 3px rgba(0, 0, 0, 0.1);
`;

export default function Header({ children }) {
  return (
    <>
      <HeaderWrapper>
        <HeaderContent>{children}</HeaderContent>
      </HeaderWrapper>
    </>
  );
}
