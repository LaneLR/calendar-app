"use client";
import { useCalendar } from "@/context/CalendarContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const SidebarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 80%;
  background-color: lavender;
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
  height: 90%;
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
  background-color: rgb(187, 151, 194);
  cursor: pointer;
  border-radius: 7px;

  &:first-of-type {
    margin-top: 10px;
  }

    &:hover {
  background-color: rgb(149, 114, 156)
  }
`;

const SidebarTabDiv = styled.button`
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 3px;
  width: 100%;
  border: 1px solid white;
  height: 40px;
  color: black;
  background-color: rgb(187, 151, 194);
  cursor: pointer;
  border-radius: 7px;
  font-size: 1rem;

  &:hover {
  background-color: rgb(149, 114, 156)
  }
`;

export default function Sidebar() {
  const { isLoggedIn, logoutUser, toggleDarkMode} = useCalendar();

  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch(`/api/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        logoutUser();
        setTimeout(() => {
          router.refresh();
          router.push("/login");
        }, 100);
      }
    } catch (err) {
      console.log("Error occurred while handling logout: ", err);
      return;
    }
  };

  return (
    <>
      <SidebarWrapper>
        <SidebarTabContainer>
          <SidebarTab href="/">Calendar</SidebarTab>
          <SidebarTab href="/contacts">Contacts</SidebarTab>
          
          {isLoggedIn ? (
            <SidebarTabDiv
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </SidebarTabDiv>
          ) : (
            <>
              <SidebarTab href="/login">Login</SidebarTab>
              <SidebarTab href="/register">Create account</SidebarTab>
            </>
          )}<button onClick={() => toggleDarkMode()}>Toggle</button>
        </SidebarTabContainer>
      </SidebarWrapper>
    </>
  );
}
