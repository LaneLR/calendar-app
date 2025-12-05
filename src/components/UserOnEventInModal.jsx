"use client";

import Button from "./Button";

export default function UserOnEventInModal({ user, isSelected }) {
  return (
    <div
      className={`contacts__tab-wrapper${
        isSelected ? " contacts__tab-wrapper--selected" : ""
      }`}
    >
      <div className="contacts__user-contact-icon-wrapper">
        <button className="contacts__user-contact-icon">
          {user.username?.slice(0, 2).toUpperCase()}
        </button>
      </div>
      <div className="contacts__contact-snippet-wrapper">
        <button className="contacts__contact-snippet">{user.username}</button>
      </div>
    </div>
  );
}
