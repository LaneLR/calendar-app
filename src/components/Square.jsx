"use client";
import styled from "styled-components";

const SquareWrapper = styled.div`
  height: 150px;
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const SquareContent = styled.div`
  background-color: lightblue;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  box-shadow: 4px 6px 5px 3px rgba(0, 0, 0, 0.1);
`;

export default function Square({ children }) {
  return (
    <>
      <SquareWrapper>
        <SquareContent>{children}</SquareContent>
      </SquareWrapper>
    </>
  );
}
