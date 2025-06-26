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

  const deleteContact = async (deleted) => {
    if (!deleted || isNaN(deleted)) {
      console.error("Bad or invalid Delete: ", deleted);
      return;
    }
    try {
      await fetch(`/api/contacts/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deleted),
      });

      await loadContacts(user.id);
    } catch (err) {
      console.error("Error at deleteContact: ", err);
    }
    setContacts((prev) => prev.filter((e) => e.name !== deleted));
  };

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
  }, [user.id]);

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
        loadContacts,
        addContacts,
      }}
    >
      {loadingAuth ? <div>Loading...</div> : children}
    </CalendarContext.Provider>
  );
}

export const useCalendar = () => useContext(CalendarContext);
