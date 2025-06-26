"use client";
import Image from "next/image";
import styled from "styled-components";

const TabWrapper = styled.div`
width: 100%;
display: flex;
`

const UserContactIconWrapper = styled.div`
  min-width: 13%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 20px 7px 15px;
`;

const UserContactIcon = styled.div`
  height: 60px;
  width: 60px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: orange;
  cursor: pointer;
`;

const ContactSnippetWrapper = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  flex-grow: 1;
  font-size: 1.2rem;
  font-weight: 500;
  padding: 10px;
  cursor: pointer;
`;

const ContactSnippet = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AddContactButton = styled.button`
border: 0;
background-color: inherit;
font-size: 1.6rem;
width: auto;
padding: 0 5px;
cursor: pointer;
color: black;
`

const ContactFunctionWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  height: 100%;
  position: relative;
`;

export default function DetailsContactTab({ contact }) {
  const trashcanImage = "/images/trashcan.png";

  return (
    <TabWrapper>
      <UserContactIconWrapper>
        <UserContactIcon>
          {contact.username.slice(0, 2).toUpperCase()}
        </UserContactIcon>
      </UserContactIconWrapper>
      <ContactSnippetWrapper>
        <ContactSnippet>{contact.username}</ContactSnippet>
      </ContactSnippetWrapper>
      <AddContactButton>
        +
      </AddContactButton>
      <ContactFunctionWrapper>
        <Image
          src={trashcanImage}
          width={25}
          height={50}
          alt="Delete contact icon"
          style={{ margin: "0 10px", objectFit: "contain", cursor: "pointer" }}
        />
      </ContactFunctionWrapper>
    </TabWrapper>
  );
}
