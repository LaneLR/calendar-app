"use client";

import ModalButton from "./ModalButton";
import { useEffect, useState } from "react";
import UserOnEventInModal from "./UserOnEventInModal";

// ...styles moved to _event_modal.scss

export default function DeleteEventModal({ event, onCancel, onConfirm }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!event) return;

    if (Array.isArray(event.Users)) {
      setUsers(event.Users);
    } else {
      setUsers([]);
    }
  }, [event]);

  return (
    <>
      <div className="modal__overlay">
        <div className="modal__wrapper">
          <form className="modal__form">
            <div className="modal__form-container">
              <div className="modal__delete-modal-text-container">
                <div className="modal__text-container-center-align">
                  <p className="modal__delete-modal-title">Event Title:</p>
                </div>
                <p className="modal__delete-modal-event-title">{event.title}</p>
                <div className="modal__add-dates-containers">
                  <div>
                    <div className="modal__text-container-center-align">
                      <p className="modal__delete-modal-label">Start Time:</p>
                    </div>
                    <p className="modal__delete-modal-event-date">
                      {event.start
                        ? new Date(event.start).toLocaleString()
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <div className="modal__text-container-center-align">
                      <p className="modal__delete-modal-label">End Time:</p>
                    </div>
                    <p className="modal__delete-modal-event-date">
                      {event.end ? new Date(event.end).toLocaleString() : "N/A"}
                    </p>
                  </div>
                </div>
                <div className="modal__text-container-center-align">
                  <p className="modal__delete-modal-label">Invited Contacts</p>
                </div>

                <div className="modal__contacts-added-container">
                  {users.length > 0 ? (
                    users.map((user) => (
                      <UserOnEventInModal key={user.id} user={user} />
                    ))
                  ) : (
                    <div className="modal__text-container-center-align">
                      <p className="modal__delete-modal-no-contacts">
                        No contacts were invited
                      </p>
                    </div>
                  )}
                </div>
                <div className="modal__button-wrapper">
                  <ModalButton onClick={onConfirm}>Delete</ModalButton>
                  <ModalButton onClick={onCancel}>Cancel</ModalButton>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
