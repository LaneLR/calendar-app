"use client";

import Image from "next/image";
import Link from "next/link";

export default function Square() {
  return (
    <>
      <div className="calendar__square-wrapper">
        <div className="calendar__square-content">
          <Link href={"/"}>
            <Image
              className="calendar__logo"
              src={"/images/PlanzCalendar.png"}
              width={100}
              height={90}
              alt="Planz Calendar Logo"
            />
          </Link>
          <div className="calendar__square-logo-text">
            <Image
              src={"/images/PlanzText.png"}
              width={190}
              height={60}
              alt="Planz Text Logo"
            />
          </div>
        </div>
      </div>
    </>
  );
}
