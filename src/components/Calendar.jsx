"use client";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "@/styles/custom-calendar.scss";
import moment from "moment";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useCalendar } from "@/context/CalendarContext";
import EventFormModal from "./EventFormModal";

const CalendarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  width: 98%;
  padding: 10px;
  box-sizing: border-box;
`;

const CalendarSizing = styled.div`
  flex-grow: 1;
  width: 100%;
  max-width: 1200px;
  height: 100%;
`;

const localizer = momentLocalizer(moment);

export default function UserCalendar() {
  const {
    events,
    addEvent,
    user,
    setEvents,
    calendarView,
    setCalendarView,
    deleteEvent,
    isLoggedIn,
    date,
    setDate,
    contacts,
    setShowModal,
    showModal,
  } = useCalendar();

  const [modalStart, setModalStart] = useState(null);
  const [modalEnd, setModalEnd] = useState(null);

  const handleSelectSlot = async ({ start, end }) => {
    setModalStart(start)
    setModalEnd(end)
    setShowModal(true)
  };

  const fetchEvents = async () => {
    try {
      const res = await fetch(`/api/events?userId=${user.id}`);
      const data = await res.json();

      if (Array.isArray(data.events)) {
        const parsedEvents = data.events.map((event) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }));

        setEvents(parsedEvents);
      }
    } catch (err) {
      console.error("Error getting events:", err);
    }
  };

  const handleDeleteEvent = async (event) => {
    if (!event || !event.id) {
      console.error("Invalid event for deletion");
      return;
    }

    try {
      const res = await fetch(`/api/events/${event.id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        console.error("Delete failed:", data.error);
        return;
      }
      deleteEvent(event.id);
    } catch (err) {
      console.error("Error occurred while trying to delete event: ", err);
    }
  };

  useEffect(() => {
    if (isLoggedIn && user?.id) {
      fetchEvents();
    }
  }, [user?.id]);

  return (
    <>
      <CalendarWrapper>
        <CalendarSizing>
          <Calendar
            key={user?.id || "calendar"}
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            view={calendarView}
            onView={(view) => setCalendarView(view)}
            selectable
            date={date}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleDeleteEvent}
            onNavigate={(date) => setDate(date)}
            style={{ minHeight: "494px", minWidth: "452px" }}
          />
          {showModal && <EventFormModal start={modalStart} end={modalEnd} />}
        </CalendarSizing>
      </CalendarWrapper>
    </>
  );
}
