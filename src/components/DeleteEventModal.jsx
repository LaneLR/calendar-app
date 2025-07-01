"use client";
import styled from "styled-components";
import ModalButton from "./ModalButton";
import { useEffect, useState } from "react";
import UserOnEventInModal from "./UserOnEventInModal";

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
  max-width: ;
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
  max-width: 450px;
`;

const TextContainerLeftAlign = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  text-align: left;
  width: 80%;
  min-width: 100px;
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
  flex-flow: column nowrap;
`;

const ContactsAddedContainer = styled.div`
  width: 80%;
  max-height: 220px;
  background-color: #fff;
  margin: 0 0 20px 0;
  overflow-y: auto;
`;

const TextContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

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
      <ModalOverlay>
        <ModalWrapper>
          <ModalForm>
            <ModalFormContainer>
              <TextContainer>
                <TextContainerLeftAlign>
                  <h4 style={{ paddingBottom: "5px 0" }}>Event Title:</h4>
                </TextContainerLeftAlign>
                <p
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    paddingBottom: "20px 0",
                  }}
                >
                  {event.title}
                </p>
                <AddDatesContainers>
                  <div>
                    <TextContainerLeftAlign>
                      <h4 style={{ padding: "5px 0" }}>Start Time:</h4>
                    </TextContainerLeftAlign>
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        paddingBottom: "20px 0",
                      }}
                    >
                      {event.start
                        ? new Date(event.start).toLocaleString()
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <TextContainerLeftAlign>
                      <h4 style={{ padding: "5px 0" }}>End Time:</h4>
                    </TextContainerLeftAlign>
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        paddingBottom: "20px 0",
                      }}
                    >
                      {event.end ? new Date(event.end).toLocaleString() : "N/A"}
                    </p>
                  </div>
                </AddDatesContainers>
                <TextContainerLeftAlign>
                  <h4 style={{ width: "100%", padding: "5px 0" }}>
                    Invited Contacts
                  </h4>
                </TextContainerLeftAlign>

                <ContactsAddedContainer>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <UserOnEventInModal key={user.id} user={user} />
                    ))
                  ) : (
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        backgroundColor: "#fff",
                        paddingBottom: "20px 0",
                      }}
                    >
                      No contacts were invited
                    </p>
                  )}
                </ContactsAddedContainer>
                <ModalButtonWrapper>
                  <ModalButton onClick={onConfirm}>Delete</ModalButton>
                  <ModalButton onClick={onCancel}>Cancel</ModalButton>
                </ModalButtonWrapper>
              </TextContainer>
            </ModalFormContainer>
          </ModalForm>
        </ModalWrapper>
      </ModalOverlay>
    </>
  );
}
