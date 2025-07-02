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

const TextContainerCenterAlign = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
  width: 100%;
  min-width: 100px;
  textalign: "center";
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
                <TextContainerCenterAlign>
                  <p style={{ paddingBottom: "5px 0" }}>Event Title:</p>
                </TextContainerCenterAlign>
                <p
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    padding: "0 0 15px 0",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                  }}
                >
                  {event.title}
                </p>
                <AddDatesContainers>
                  <div>
                    <TextContainerCenterAlign>
                      <p style={{ padding: "5px 0" }}>Start Time:</p>
                    </TextContainerCenterAlign>
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        padding: "0 0 15px 0",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                      }}
                    >
                      {event.start
                        ? new Date(event.start).toLocaleString()
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <TextContainerCenterAlign>
                      <p style={{ padding: "5px 0" }}>End Time:</p>
                    </TextContainerCenterAlign>
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        padding: "0 0 15px 0",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                      }}
                    >
                      {event.end ? new Date(event.end).toLocaleString() : "N/A"}
                    </p>
                  </div>
                </AddDatesContainers>
                <TextContainerCenterAlign>
                  <p style={{ padding: "5px 0" }}>Invited Contacts</p>
                </TextContainerCenterAlign>

                <ContactsAddedContainer>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <UserOnEventInModal key={user.id} user={user} />
                    ))
                  ) : (
                    <TextContainerCenterAlign>
                      <p
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          backgroundColor: "#fff",
                          width: "auto",
                          padding: "0 0 15px 0",
                          fontSize: "1rem",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        No contacts were invited
                      </p>
                    </TextContainerCenterAlign>
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
