"use client";
import { useCalendar } from "@/context/CalendarContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ...styles moved to _sidebar.scss

export default function Sidebar() {
  const { isLoggedIn, logoutUser, toggleDarkMode } = useCalendar();

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
      <div className="sidebar">
        <div className="sidebar__tab-container">
          <Link href="/" className="sidebar__tab">
            Calendar
          </Link>
          <Link href="/contacts" className="sidebar__tab">
            Contacts
          </Link>
          {isLoggedIn ? (
            <button
              className="sidebar__tab sidebar__tab--div"
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/login" className="sidebar__tab">
                Login
              </Link>
              <Link href="/register" className="sidebar__tab">
                Create account
              </Link>
            </>
          )}
          <button onClick={() => toggleDarkMode()}>Toggle</button>
        </div>
      </div>
    </>
  );
}
