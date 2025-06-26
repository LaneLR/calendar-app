"use client";
import styled from "styled-components";
import Image from "next/image";

const SquareWrapper = styled.div`
  height: 150px;
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const SquareContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background-color: lavender;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  box-shadow: 4px 6px 5px 3px rgba(0, 0, 0, 0.1);
`;

export default function Square({ children }) {
  return (
    <>
      <SquareWrapper>
        <SquareContent>
          <Image
            src="/images/PlanzLogo.png"
            fill
            alt="Planz Logo"
            style={{ objectFit: "contain" }}
          />
        </SquareContent>
      </SquareWrapper>
    </>
  );
}
