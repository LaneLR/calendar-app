"use client";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useCalendar } from "@/context/CalendarContext";
import EventFormModal from "./EventFormModal";
import DeleteEventModal from "./DeleteEventModal";
import { useRouter } from "next/router";

const CalendarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 75vh;
  width: 90vw;
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
    theme,
    eventToDelete,
    setEventToDelete,
  } = useCalendar();

  const [modalStart, setModalStart] = useState(null);
  const [modalEnd, setModalEnd] = useState(null);

  const router = useRouter();

  const handleSelectSlot = async ({ start, end }) => {
    if (!isLoggedIn) {
      alert("You must be logged in to create an event.");
      return;
    }
    setModalStart(start);
    setModalEnd(end);
    setShowModal(true);
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
      <div key={theme}>
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
              onSelectEvent={(event) => setEventToDelete(event)}
              onNavigate={(date) => setDate(date)}
              style={{
                minHeight: "494px",
                height: "100%",
                minWidth: "452px",
                boxShadow: "2px 3px 6px 4px rgba(0, 0, 0, 0.1)",
              }}
            />
            {showModal && <EventFormModal start={modalStart} end={modalEnd} />}
            {eventToDelete && typeof eventToDelete === "object" && (
              <DeleteEventModal
                event={eventToDelete}
                onCancel={() => setEventToDelete(null)}
                onConfirm={async () => {
                  await handleDeleteEvent(eventToDelete);
                  setEventToDelete(null);
                }}
              />
            )}
          </CalendarSizing>
        </CalendarWrapper>
      </div>
    </>
  );
}
