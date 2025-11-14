"use client";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import { useEffect, useState } from "react";
import { useCalendar } from "@/context/CalendarContext";
import EventFormModal from "./EventFormModal";
import DeleteEventModal from "./DeleteEventModal";
import { useRouter } from "next/navigation";

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
    refreshEvents,
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
        <div className="calendar__wrapper">
          <div className="calendar__sizing">
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
              className="calendar__component"
            />
            {showModal && <EventFormModal start={modalStart} end={modalEnd} />}
            {eventToDelete && typeof eventToDelete === "object" && (
              <DeleteEventModal
                event={eventToDelete}
                onCancel={() => setEventToDelete(null)}
                onConfirm={async () => {
                  await handleDeleteEvent(eventToDelete);
                  setEventToDelete(null);
                  router.refresh();
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
