"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import loading from "@/app/loading";

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

  const router = useRouter();

  const loginUser = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logoutUser = () => {
    setUser({
      username: "",
      password: "",
    });
    setIsLoggedIn(false);
    setTimeout(() => {
      router.refresh();
      router.push("/login");
    }, 100);
    emptyEvents();
  };

  const addEvent = (newEvent) => {
    setEvents((prev = []) => [...prev, newEvent]);
  };

  const deleteEvent = (deleted) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this event?`
    );
    if (confirmDelete) {
      setEvents((prev) => prev.filter((e) => e.id !== deleted));
    }
  };

  const emptyEvents = () => {
    setEvents([]);
  };

  const addMessage = (newMessage) => {
    setMessages((prev = []) => [...prev, newMessage]);
  };

  const addContact = (newContact) => {
    setContacts((prev) => [...prev, newContact]);
  };

  const deleteContact = (deleted) => {
    setContacts((prev) => prev.filter((e) => e.name !== deleted));
  };

  useEffect(() => {
    const checkAuth = async () => {
      console.log("Checking auth status...");
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
          console.log("Auth successful. User:", data.user);
        }
      } catch (err) {
        console.error("Error checking auth status:", err);
      } finally {
        setLoadingAuth(false);
        console.log("setLoadingAuth(false)");
      }
    };

    checkAuth();
  }, []);

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
        setCalendarView,
        setSelectedDate,
        setEvents,
        addContact,
        setMessages,
        setContacts,
        addMessage,
        deleteContact,
        emptyEvents,
        deleteEvent,
        addEvent,
        result,
        setResult,
        searchTerm,
        setSearchTerm,
      }}
    >
      {loadingAuth ? <div>Loading...</div> : children}
    </CalendarContext.Provider>
  );
}

export const useCalendar = () => useContext(CalendarContext);
