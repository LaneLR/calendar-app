// components/DeleteEventModal.jsx
"use client";
import styled from "styled-components";
import ModalButton from "./ModalButton"; // or use your existing styled button

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
`;

const ModalContainer = styled.div`
  background-color: var(--color-modal-bg);
  color: var(--color-modal-text);
  width: 90%;
  max-width: 500px;
  padding: 20px;
  border-radius: 10px;
  margin: 100px auto;
`;

const UserList = styled.ul`
  padding: 0;
  margin: 10px 0 20px 0;
  list-style: none;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 20px;
`;

export default function DeleteEventModal({ event, onCancel, onConfirm }) {
  return (
    <Overlay>
      <ModalContainer>
        <h3>Delete Event</h3>
        <p><strong>Title:</strong> {event.title}</p>
        <p><strong>Invited Users:</strong></p>
        <UserList>
          {event.users?.map((u, i) => (
            <li key={i}>{u.username || u.name || `User ID ${u}`}</li>
          ))}
        </UserList>

        <ButtonGroup>
          <ModalButton onClick={onCancel}>Cancel</ModalButton>
          <ModalButton onClick={() => onConfirm(event.id)}>Delete</ModalButton>
        </ButtonGroup>
      </ModalContainer>
    </Overlay>
  );
}
