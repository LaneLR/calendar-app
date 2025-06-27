"use client";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "@/styles/custom-calendar.scss";
import moment from "moment";
import styled from "styled-components";
import { useEffect } from "react";
import { useCalendar } from "@/context/CalendarContext";

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
  } = useCalendar();

  const handleSelectSlot = async ({ start, end }) => {
    const title = window.prompt(
      `New event from ${start.toLocaleString()} to ${end.toLocaleString()}`
    );
    //if event doesn't have title, i.e. doesn't exist
    if (!title) return;

    const usersForEventByIds = [user.id];

    //for everyone in contacts, if invited add them to array
    for (const contact of contacts) {
      const invited = window.confirm(`Invite user: ${contact.username}`);
      if (invited) {
        usersForEventByIds.push(contact.id);
      }
    }

    const newEvent = {
      userIds: usersForEventByIds,
      title,
      start: start.toISOString(),
      end: end.toISOString(),
    };

    try {
      const res = await fetch(`/api/events`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newEvent),
      });
      const data = await res.json();

      if (!res.ok) {
        console.error("Error with event response: ");
        return;
      }

      addEvent({
        ...data.event,
        start: new Date(data.event.start),
        end: new Date(data.event.end),
      });
    } catch (err) {
      console.error("Error with event: ", err);
      return;
    }
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
        </CalendarSizing>
      </CalendarWrapper>
    </>
  );
}
