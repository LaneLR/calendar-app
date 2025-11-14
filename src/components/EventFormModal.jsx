"use client";
import { useCalendar } from "@/context/CalendarContext";
import { useState } from "react";

import ContactTabInModal from "./ContactTabInModal";
import ModalButton from "./ModalButton";

// ...styles moved to _event_modal.scss

export default function EventFormModal({ start, end }) {
  const {
    showModal,
    setShowModal,
    contacts,
    addEvent,
    setEvents,
    user,
    refreshEvents,
  } = useCalendar();

  const [title, setTitle] = useState("");
  const [selectContacts, setSelectContacts] = useState([]);

  const [startTime, setStartTime] = useState(start || null);
  const [endTime, setEndTime] = useState(end || null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!startTime || !endTime || !title) {
      console.error("Missing start, end, or title");
      return;
    }

    const userIds = [user.id, ...selectContacts];
    const newEvent = {
      title,
      end: endTime.toISOString(),
      start: startTime.toISOString(),
      userIds,
    };

    try {
      const res = await fetch(`/api/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });
      const data = await res.json();

      if (!res.ok) {
        console.error("Could not create event", data);
        return;
      }

      addEvent({
        ...data.event,
        start: new Date(data.event.start),
        end: new Date(data.event.end),
      });

      await refreshEvents();
      setShowModal(false);
    } catch (err) {
      console.error("Error occurred while submitting form: ", err);
      return;
    }
  };

  function formatLocalDateTime(date) {
    const pad = (n) => (n < 10 ? "0" + n : n);
    return (
      date.getFullYear() +
      "-" +
      pad(date.getMonth() + 1) +
      "-" +
      pad(date.getDate()) +
      "T" +
      pad(date.getHours()) +
      ":" +
      pad(date.getMinutes())
    );
  }

  return (
    <>
      <div className="modal__overlay">
        <div className="modal__wrapper">
          <form className="modal__form" onSubmit={handleSubmit}>
            <div className="modal__form-container">
              <div className="modal__text-container-left-align">
                <h4>Event Title:</h4>
              </div>
              <input
                className="modal__title-bar"
                placeholder="Title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <div className="modal__add-dates-containers">
                <div>
                  <div className="modal__text-container-left-align">
                    <h4>Start Time:</h4>
                  </div>
                  <input
                    className="modal__start-time-bar"
                    type="datetime-local"
                    value={startTime ? formatLocalDateTime(startTime) : ""}
                    onChange={(e) => setStartTime(new Date(e.target.value))}
                  />
                </div>
                <div>
                  <div className="modal__text-container-left-align">
                    <h4>End Time:</h4>
                  </div>
                  <input
                    className="modal__end-time-bar"
                    type="datetime-local"
                    value={endTime ? formatLocalDateTime(endTime) : ""}
                    onChange={(e) => setEndTime(new Date(e.target.value))}
                  />
                </div>
              </div>

              <div className="modal__text-container-left-align">
                <h4>Add Contacts</h4>
              </div>
              <div className="modal__contacts-added-container">
                {contacts.map((contact) => (
                  <ContactTabInModal
                    key={contact.id}
                    contact={contact}
                    isSelected={selectContacts.includes(contact.id)}
                    onToggle={(id) => {
                      setSelectContacts((prev) =>
                        prev.includes(id)
                          ? prev.filter((cid) => cid !== id)
                          : [...prev, id]
                      );
                    }}
                  />
                ))}
              </div>

              <div className="modal__button-wrapper">
                <ModalButton type="submit">Confirm</ModalButton>
                <ModalButton
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setTitle("");
                    setEndTime(null);
                    setStartTime(null);
                    setSelectContacts([]);
                  }}
                >
                  Cancel
                </ModalButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
