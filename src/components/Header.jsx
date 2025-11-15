"use client";
import { useCalendar } from "@/context/CalendarContext";
import { useRouter } from "next/navigation";
import Square from "./Square";
import Button from "./Button";
import Link from "next/link";

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
      console.error("Error occurred while handling logout: ", err);
      return;
    }
  };

  return (
    <>
      <div className="header__wrapper">
        <Square />
        {isLoggedIn ? (
          <div className="header__button-container">
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
          </div>
        ) : (
          <div className="header__button-container">
            <Link href={"/login"}>
              <Button>Login</Button>
            </Link>
            <Link href={"/register"}>
              <Button>Register</Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
