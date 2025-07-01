"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const CalendarContext = createContext();

export function CalendarProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [calendarView, setCalendarView] = useState("month");
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [result, setResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [theme, setTheme] = useState("light");
  const [eventToDelete, setEventToDelete] = useState(null);

  const router = useRouter();

  const loginUser = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logoutUser = () => {
    document.documentElement.classList.remove("dark");
    setEventToDelete(null);
    setTheme("light");
    setUser({
      username: "",
      password: "",
    });
    setIsLoggedIn(false);
    setTimeout(() => {
      router.push("/login");
    }, 100);
    emptyEvents();
  };

  const addEvent = (newEvent) => {
    setEvents((prev = []) => [...prev, newEvent]);
  };

  const deleteEvent = (deleted) => {
    setEvents((prev) => prev.filter((e) => e.id !== deleted));
  };

  const handleDeleteEvent = async (event) => {
    if (!event?.id) return; //if event doesn't exist then stop
    setEventToDelete(event); //open modal for the event to delete

    try {
      const res = await fetch(`/api/events/${event.id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        console.error("Delete failed:", data.error);
        return;
      }

      deleteEvent(event.id);
      setEventToDelete(null);
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  const emptyEvents = () => {
    setEvents([]);
  };

  const addMessage = (newMessage) => {
    setMessages((prev = []) => [...prev, newMessage]);
  };

  const addContacts = async (contactId) => {
    if (!contactId || isNaN(contactId)) {
      console.error("Bad or invalid contactId: ", contactId);
      return;
    }

    try {
      await fetch(`/api/contacts/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, contactId }),
      });

      await loadContacts(user.id);
    } catch (err) {
      console.error("Error at addContacts: ", err);
    }
  };

  const loadContacts = async (userId) => {
    const res = await fetch(`/api/contacts?userId=${userId}`);
    const data = await res.json();
    setContacts(data.contacts);
    router.refresh();
  };

  const deleteContact = async (contactId) => {
    if (!contactId || isNaN(contactId)) {
      console.error("Bad or invalid Delete: ", contactId);
      return;
    }
    try {
      await fetch(`/api/contacts/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, contactId }),
      });

      await loadContacts(user.id);
    } catch (err) {
      console.error("Error at deleteContact: ", err);
    }
    setContacts((prev) => prev.filter((e) => e.name !== contactId));
  };

  const toggleDarkMode = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    const newTheme = isDark ? "dark" : "light";

    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  useEffect(() => {
    if (window.localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth-status", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setUser({
            id: data.user.userId,
            username: data.user.username,
          });
          setIsLoggedIn(true);
          await loadContacts(data.user.userId);
        }
      } catch (err) {
      } finally {
        setLoadingAuth(false);
      }
    };

    checkAuth();
  }, [user.id, events]);

  return (
    <CalendarContext.Provider
      value={{
        events,
        messages,
        contacts,
        user,
        isLoggedIn,
        loginUser,
        logoutUser,
        loadingAuth,
        setLoadingAuth,
        selectedDate,
        calendarView,
        showModal,
        setShowModal,
        setCalendarView,
        setSelectedDate,
        setEvents,
        setMessages,
        setContacts,
        addMessage,
        deleteContact,
        emptyEvents,
        deleteEvent,
        addEvent,
        handleDeleteEvent,
        result,
        setResult,
        searchTerm,
        setSearchTerm,
        loadContacts,
        addContacts,
        date,
        setDate,
        toggleDarkMode,
        theme,
        setTheme,
        eventToDelete,
        setEventToDelete,
      }}
    >
      {loadingAuth ? (
        <div
          style={{
            fontSize: "3.5rem",
            padding: "0 0 50px 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: "1",
            height: "100vh",
          }}
        >
          Loading...
        </div>
      ) : (
        children
      )}
    </CalendarContext.Provider>
  );
}

export const useCalendar = () => useContext(CalendarContext);
