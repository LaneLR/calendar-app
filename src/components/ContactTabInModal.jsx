"use client";
import Image from "next/image";

export default function ContactTabInModal({ contact, isSelected, onToggle }) {
  const trashcanImage = "/images/trashcan.png";

  return (
    <div
      className={`contacts__tab-wrapper${
        isSelected ? " contacts__tab-wrapper--selected" : ""
      }`}
    >
      <div className="contacts__user-contact-icon-wrapper">
        <button
          className="contacts__user-contact-icon"
          type="button"
          onClick={() => onToggle(contact.id)}
        >
          {contact.username?.slice(0, 2).toUpperCase()}
        </button>
      </div>
      <div className="contacts__contact-snippet-wrapper">
        <button
          className="contacts__contact-snippet"
          type="button"
          onClick={() => onToggle(contact.id)}
        >
          {contact.username}
        </button>
      </div>
      <div className="contacts__contact-function-wrapper">
        <button
          className="contacts__delete-contact-btn"
          type="button"
          onClick={() => onToggle(contact.id)}
        >
          <Image
            src={trashcanImage}
            width={25}
            height={50}
            alt="Toggle contact"
            className={`contacts__delete-contact-icon${
              isSelected
                ? " contacts__delete-contact-icon--selected"
                : " contacts__delete-contact-icon--notselected"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
