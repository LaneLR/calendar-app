"use client";
import { useCalendar } from "@/context/CalendarContext";
import styled from "styled-components";
import DetailsMessageTab from "./DetailsMessageTab";
import { usePathname } from "next/navigation";
import DetailsContactTab from "./DetailsContactTab";

const ComponentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ContactsSectionWrapper = styled.div`
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  max-width: 1200px;
  box-sizing: border-box;
  border: 2px solid black;
  border-radius: 8px;
  overflow: hidden;
  background-color: darkgray;
  color: white;
`;

const TabsLayout = styled.div`
  border-bottom: 2px solid black;
  width: 100%;
  height: auto;
  display: flex;
`;

const EmptyInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export default function DetailsContainer() {
  const { messages, contacts, searchTerm, result } = useCalendar();
  const pathname = usePathname();

  return (
    <ComponentWrapper>
      <ContactsSectionWrapper>
        {pathname.startsWith("/messages") ? (
          //message section below
          <>
            {messages?.length === 0 ? (
              <EmptyInfoWrapper>
                <h1>You have no Messages</h1>
              </EmptyInfoWrapper>
            ) : (
              <>
                {messages?.map((message, i) => (
                  <TabsLayout key={i}>
                    <DetailsMessageTab message={message} />
                  </TabsLayout>
                ))}
              </>
            )}
          </>
        ) : (
          //end messages section
          // contacts section below
          <>
            {Array.isArray(contacts) &&
            contacts.length === 0 &&
            searchTerm.length < 3 ? (
              <EmptyInfoWrapper>
                <h1>You have no Contacts</h1>
              </EmptyInfoWrapper>
            ) : Array.isArray(contacts) &&
              contacts.length > 0 &&
              searchTerm.length < 3 ? (
              <>
                {contacts.map((contact, i) => (
                  <TabsLayout key={i}>
                    <DetailsContactTab contact={contact} />
                  </TabsLayout>
                ))}
              </>
            ) : searchTerm.length >= 3 && result.length > 0 ? (
              <>
                {result.map((contact, i) => (
                  <TabsLayout key={i}>
                    <DetailsContactTab contact={contact} />
                  </TabsLayout>
                ))}
              </>
            ) : searchTerm.length >= 3 && result.length === 0 ? (
              <EmptyInfoWrapper>
                <h1>No results found</h1>
              </EmptyInfoWrapper>
            ) : (
              <EmptyInfoWrapper>
                <h1>Loading...</h1>
              </EmptyInfoWrapper>
            )}
          </>
          //end contacts section
        )}
      </ContactsSectionWrapper>
    </ComponentWrapper>
  );
}
