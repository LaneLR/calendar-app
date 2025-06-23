"use client";
import Link from "next/link";
import styled from "styled-components";

const SidebarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 75vh;
  background-color: rgba(89, 208, 255, 0.3);
  border-radius: 8px;
  box-shadow: 4px 6px 5px 3px rgba(0, 0, 0, 0.1);
  min-width: 130px;
  max-width: 130px;
  flex-flow: column nowrap;
  margin: 10px 0 0 10px;
`;

const SidebarTabContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-flow: column nowrap;
  width: 100%;
  gap: 5px;
`;

const SidebarTab = styled(Link)`
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 3px;
  width: 100%;
  border: 1px solid white;
  height: 40px;
  color: black;
  background-color: yellow;
  cursor: pointer;
  border-radius: 7px;

  &:first-of-type {
    margin-top: 10px;
  }
`;

export default function Sidebar({ children }) {
  return (
    <>
      <SidebarWrapper>
        <SidebarTabContainer>
          <SidebarTab href="/">Calendar</SidebarTab>
          <SidebarTab href="/messages">Messages</SidebarTab>
          <SidebarTab href="/contacts">Contacts</SidebarTab>
        </SidebarTabContainer>
      </SidebarWrapper>
    </>
  );
}
