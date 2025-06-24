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

  const router = useRouter()

  const loginUser = (userData) => {
    setUser(userData);
  };

  const logoutUser = () => {
    setUser({
      username: "",
      password: "",
    });
    router.push('/')
  };

  const addEvent = (newEvent) => {
    setEvents((prev) => [...prev, newEvent]);
  };

  const deleteEvent = (deleted) => {
    setEvents((prev) => prev.filter((e) => e.title !== deleted));
  };

  const emptyEvents = () => {
    setEvents([]);
  };

  const addMessage = (newMessage) => {
    setMessages((prev) => [...prev, newMessage]);
  };

  const addContact = (newContact) => {
    setContacts((prev) => [...prev, newContact]);
  };

  const deleteContact = (deleted) => {
    setContacts((prev) => prev.filter((e) => e.name !== deleted));
  };

  return (
    <>
      <CalendarContext.Provider
        value={{
          events,
          messages,
          contacts,
          user,
          selectedDate,
          setSelectedDate,
          loginUser,
          logoutUser,
          addContact,
          addMessage,
          deleteContact,
          emptyEvents,
          deleteEvent,
          addEvent,
        }}
      >
        {children}
      </CalendarContext.Provider>
    </>
  );
}

export const useCalendar = () => useContext(CalendarContext);
