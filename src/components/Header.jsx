"use client";
import { useCalendar } from "@/context/CalendarContext";
import styled from "styled-components";
import EventFormModal from "./EventFormModal";

const HeaderWrapper = styled.div`
  min-height: 150px;
  max-height: 150px;
  width: 98.5%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lavender;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  box-shadow: 4px 6px 5px 3px rgba(0, 0, 0, 0.1);
`;

export default function Header({ children }) {
  const { user } = useCalendar();

  return (
    <>
      <HeaderWrapper>
        <HeaderContent>
          <p style={{ color: "black", fontSize: '1.4rem' }}>{user.username}</p>
          {children}
        </HeaderContent>
      </HeaderWrapper>
    </>
  );
}
