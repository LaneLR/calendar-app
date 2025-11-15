"use client";
import { useCalendar } from "@/context/CalendarContext";

import { usePathname } from "next/navigation";
import DetailsContactTab from "./DetailsContactTab";
import SearchBar from "./SearchBar";

export default function DetailsContainer() {
  const { messages, contacts, searchTerm, result } = useCalendar();
  const pathname = usePathname();

  return (
    <div className="contacts__component-wrapper">
      <div className="contacts__searchbar-container">
        <SearchBar />
      </div>

      <div className="contacts__text-container-left-align">
        <h2 className="contacts__title">Your Contacts</h2>
      </div>
      <div className="contacts__section-wrapper">
        {pathname.startsWith("/messages") ? (
          //message section below
          <>
            {messages?.length === 0 ? (
              <div className="contacts__empty-info-wrapper">
                <h1 className="contacts__empty-message">
                  You have no Messages
                </h1>
              </div>
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
              <div className="contacts__empty-info-wrapper">
                <h1 className="contacts__empty-message">
                  Your Contacts List is empty...
                </h1>
              </div>
            ) : Array.isArray(contacts) &&
              contacts.length > 0 &&
              searchTerm.length < 3 ? (
              <>
                {contacts.map((contact, i) => (
                  <div className="tabs-layout" key={i}>
                    <DetailsContactTab contact={contact} />
                  </div>
                ))}
              </>
            ) : searchTerm.length >= 3 && result.length > 0 ? (
              <>
                {result.map((contact, i) => (
                  <div className="contacts__tabs-layout" key={i}>
                    <DetailsContactTab contact={contact} />
                  </div>
                ))}
              </>
            ) : searchTerm.length >= 3 && result.length === 0 ? (
              <div className="contacts__empty-info-wrapper">
                <h1 className="contacts__empty-message">No results found</h1>
              </div>
            ) : (
              <div className="contacts__empty-info-wrapper">
                <h1 className="contacts__empty-message">Loading...</h1>
              </div>
            )}
          </>
          //end contacts section
        )}
      </div>
    </div>
  );
}
