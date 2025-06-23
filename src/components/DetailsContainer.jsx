"use client";
import { useCalendar } from "@/context/CalendarContext";
import { useContext } from "react";
import styled from "styled-components";
import DetailsMessageTab from "./DetailsMessageTab";
import { usePathname } from "next/navigation";
import DetailsContactTab from "./DetailsContactTab";

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-flow: column nowrap;
  height: 100%;
  width: 100%;
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
  const { messages } = useCalendar();
  const pathname = usePathname();

  return (
    <Wrapper>
      {pathname.startsWith("/messages") ? (
        <>
          {messages.length === 0 ? (
            <>
              {/* remove below lines */}
              <TabsLayout>
                <DetailsMessageTab />
              </TabsLayout>
              {/* remove above lines */}
              <EmptyInfoWrapper>
                <h1>You have no Messages</h1>
              </EmptyInfoWrapper>
            </>
          ) : (
            <>
              {messages.map((message, i) => (
                <TabsLayout key={i}>
                  <DetailsMessageTab message={message} />
                </TabsLayout>
              ))}
            </>
          )}
        </>
      ) : (
        <>
          {contacts.length === 0 ? (
            <>
              {/* remove below lines */}
              <TabsLayout>
                <DetailsContactTab />
              </TabsLayout>
              {/* remove above lines */}
              <EmptyInfoWrapper>
                <h1>You have no Contacts</h1>
              </EmptyInfoWrapper>
            </>
          ) : (
            <>
              {contacts.map((contact, i) => (
                <TabsLayout key={i}>
                  <DetailsContactTab contact={contact} />
                </TabsLayout>
              ))}
            </>
          )}
        </>
      )}
    </Wrapper>
  );
}
