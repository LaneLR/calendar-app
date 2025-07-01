"use client";
import { useCalendar } from "@/context/CalendarContext";
import { useState } from "react";
import styled from "styled-components";
import ContactTabInModal from "./ContactTabInModal";
import ModalButton from "./ModalButton";

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ModalForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 70%;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const ModalButtonWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

const ModalFormContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-flow: column nowrap;
  background-color: white;
  height: auto;
  width: 60%;
  padding: 30px;
  border-radius: 10px;
  min-width: 315px;
`;

const TextContainerLeftAlign = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  text-align: left;
  width: 80%;
`;

const TitleBar = styled.input`
  width: 80%;
  font-size: 1.1rem;
  margin: 0 0 20px 0;
`;

const AddDatesContainers = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  flex-flow: row nowrap;

  @media (max-width: 1588px) {
    flex-flow: column nowrap;
  }
`;

const StartTimeBar = styled.input`
  width: auto;
  font-size: 1.1rem;
  margin: 0 0 20px 0;

  @media (max-width: 1588px) {
    width: 100%;
  }
`;

const EndTimeBar = styled.input`
  width: auto;
  font-size: 1.1rem;
  margin: 0 0 20px 0;

  @media (max-width: 1588px) {
    width: 100%;
  }
`;

const ContactsAddedContainer = styled.div`
  width: 80%;
  height: auto;
  background-color: lightgray;
  margin: 0 0 20px 0;
`;

export default function EventFormModal({ contact }) {
  const { showModal, setShowModal, contacts, addEvent, setEvents, user } =
    useCalendar();

  const [title, setTitle] = useState("");
  const [selectContacts, setSelectContacts] = useState([]);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Start: ", start, " End: ", end, " Title: ", title);

    if (!start || !end || !title) {
      console.error("Missing start, end, or title");
      return;
    }

    const userIds = [user.id, ...selectContacts];
    const newEvent = {
      title,
      end: end.toISOString(),
      start: start.toISOString(),
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

      setShowModal(false);
    } catch (err) {
      console.error("Error occurred while submitting form: ", err);
      return;
    }
  };

  //type="datetime-local" sets time to UTC,
  //so adjust time to my local time
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
      <ModalOverlay>
        <ModalWrapper>
          <ModalForm onSubmit={handleSubmit}>
            <ModalFormContainer>
              <TextContainerLeftAlign>
                <h4>Event Title</h4>
              </TextContainerLeftAlign>
              <TitleBar
                placeholder="Title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <AddDatesContainers>
                <div>

                
                <TextContainerLeftAlign>
                  <h4>Start Time</h4>
                </TextContainerLeftAlign>
                <StartTimeBar
                  type="datetime-local"
                  value={start ? formatLocalDateTime(start) : ""}
                  onChange={(e) => setStart(new Date(e.target.value))}
                /></div><div>

                
                <TextContainerLeftAlign>
                  <h4>End Time</h4>
                </TextContainerLeftAlign>
                <EndTimeBar
                  type="datetime-local"
                  value={end ? formatLocalDateTime(end) : ""}
                  onChange={(e) => setEnd(new Date(e.target.value))}
                /></div>
              </AddDatesContainers>

              <TextContainerLeftAlign>
                <h4>Add Contacts</h4>
              </TextContainerLeftAlign>
              <ContactsAddedContainer>
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
              </ContactsAddedContainer>
              <ModalButtonWrapper>
                <ModalButton type="submit">Confirm</ModalButton>
                <ModalButton
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setTitle("");
                    setEnd(null);
                    setStart(null);
                    setSelectContacts([]);
                  }}
                >
                  Cancel
                </ModalButton>
              </ModalButtonWrapper>
            </ModalFormContainer>
          </ModalForm>
        </ModalWrapper>
      </ModalOverlay>
    </>
  );
}
