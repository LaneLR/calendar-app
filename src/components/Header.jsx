"use client";
import { useCalendar } from "@/context/CalendarContext";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import Square from "./Square";
import Button from "./Button";
import Link from "next/link";

const HeaderWrapper = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  align-items: center;
  margin: 0 20px 0 0;
`;

const WelcomeText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: var(--color-header-button);
`;

export default function Header() {
  const { user, isLoggedIn, logoutUser, toggleDarkMode, theme } = useCalendar();

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
      <HeaderWrapper>
        <Square />
        {isLoggedIn ? (
          <ButtonContainer>
            <Link href={"/"}>
              <Button>Calendar</Button>
            </Link>
            <Link href={"/contacts"}>
              <Button>Contacts</Button>
            </Link>
            {theme === "light" ? (
              <Button onClick={() => toggleDarkMode()}>Dark</Button>
            ) : (
              <Button onClick={() => toggleDarkMode()}>Light</Button>
            )}
            <Button onClick={() => handleLogout()}>Logout</Button>
          </ButtonContainer>
        ) : (
          <ButtonContainer>
            <Link href={"/login"}>
              <Button>Login</Button>
            </Link>
            <Link href={"/register"}>
              <Button>Register</Button>
            </Link>
          </ButtonContainer>
        )}
      </HeaderWrapper>
    </>
  );
}
