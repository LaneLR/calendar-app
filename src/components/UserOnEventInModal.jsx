"use client";
import Image from "next/image";
import styled from "styled-components";

const TabWrapper = styled.div`
  width: 100%;
  display: flex;
  background-color: ${({ isSelected }) =>
    isSelected
      ? "var(--color-selected-contact-bg)"
      : "var(--color-notselected-contact-bg)"};
  color: #fff;
  transition: background-color 0.2s ease;
`;

const UserContactIconWrapper = styled.div`
  min-width: 13%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 20px 7px 15px;
  color: var(--color-contacts-text);
`;

const UserContactIcon = styled.button`
  cursor: pointer;
  border: none;
  height: 40px;
  width: 40px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-user-icon);
  color: var(--color-contacts-icon-text);
`;

const ContactSnippetWrapper = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  flex-grow: 1;
  font-size: 1.2rem;
  font-weight: 500;
  padding: 10px;
`;

const ContactSnippet = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--color-contacts-text);
`;

const ContactFunctionWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 100%;
  position: relative;
`;


export default function UserOnEventInModal({ user }) {

    return (
        <TabWrapper isSelected={isSelected}>
          <UserContactIconWrapper>
            <UserContactIcon>
              {user.username?.slice(0, 2).toUpperCase()}
            </UserContactIcon>
          </UserContactIconWrapper>
    
          <ContactSnippetWrapper>
            <ContactSnippet>{user.username}</ContactSnippet>
          </ContactSnippetWrapper>
          
          <ContactFunctionWrapper>
          </ContactFunctionWrapper>
        </TabWrapper>
      );
}