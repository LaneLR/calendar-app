"use client";
import { useCalendar } from "@/context/CalendarContext";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  min-height: 150px;
  max-height: 150px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
`;

const HeaderContent = styled.div`
  background-color: lavender;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  box-shadow: 4px 6px 5px 3px rgba(0, 0, 0, 0.1);
`;

export default function Header({ children }) {
  const { user } = useCalendar()

  return (
    <>
      <HeaderWrapper>
        <HeaderContent><p style={{color: 'black'}}>
          {user.username}</p>{children}</HeaderContent>
      </HeaderWrapper>
    </>
  );
}
