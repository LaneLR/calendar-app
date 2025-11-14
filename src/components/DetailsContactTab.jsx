"use client";
import { useCalendar } from "@/context/CalendarContext";
import Image from "next/image";

export default function DetailsContactTab({
  contact,
  contactExists,
  addContacts,
  deleteContact,
}) {
  const trashcanImage = "/images/trashcan.png";
  return (
    <div className="contacts__tab-wrapper">
      <div className="contacts__user-contact-icon-wrapper">
        <div className="contacts__user-contact-icon">
          {contact.username.slice(0, 2).toUpperCase()}
        </div>
      </div>
      <div className="contacts__contact-snippet-wrapper">
        <div className="contacts__contact-snippet">{contact.username}</div>
      </div>
      {!contactExists ? (
        <button
          className="contacts__add-contact-button"
          onClick={() => addContacts(contact.id)}
        >
          +
        </button>
      ) : (
        <div className="contacts__contact-function-wrapper">
          <button
            className="contacts__delete-contact-btn"
            onClick={() => deleteContact(contact.id)}
          >
            <Image
              src={trashcanImage}
              width={25}
              height={50}
              alt="Delete contact icon"
              className="contacts__delete-contact-icon contacts__delete-contact-icon--selected"
            />
          </button>
        </div>
      )}
    </div>
  );
}
