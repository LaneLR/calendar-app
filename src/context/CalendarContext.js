"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";

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

  const router = useRouter();

  const loginUser = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);

    //fetch the data immediately at log in
    fetch(`/api/events?userId=${userData.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.events)) {
          const parsedEvents = data.events.map((event) => ({
            ...event,
            start: new Date(event.start),
            end: new Date(event.end),
          }));
          setEvents(parsedEvents);
        }
      })
      .catch((err) => {
        console.error("Error fetching events after login:", err);
      });
  };

  const logoutUser = () => {
    setUser({
      username: "",
      password: "",
    });
    setIsLoggedIn(false);
    setTimeout(() => {
      router.refresh();
      router.push("/");
    }, 100);
  };

  const addEvent = (newEvent) => {
    setEvents((prev = []) => [...prev, newEvent]);
  };

  const deleteEvent = (deleted) => {
    setEvents((prev) => prev.filter((e) => e.title !== deleted));
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
        selectedDate,
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
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

export const useCalendar = () => useContext(CalendarContext);
