"use client";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

const SquareWrapper = styled.div`
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SquareContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0);
  width: 100%;
  height: 100%;
  border-radius: 8px;
  box-shadow: 4px 6px 5px 3px rgba(0, 0, 0, 0);
`;

export default function Square() {
  return (
    <>
      <SquareWrapper>
        <SquareContent>
          {/* <Image
          className="logo"
            src="/images/PlanzLogo.png"
            height={125}
            width={100}
            alt="Planz Logo"
            style={{ objectFit: "contain", padding: '9px' }}
          /> */}
          <Link href={"/"}>
            <Image
              className="logo"
              src={"/images/PlanzCalendar.png"}
              width={100}
              height={90}
              alt="Planz Calendar Logo"
              style={{ padding: "10px" }}
            />
          </Link>

          <div
            style={{
              display: "flex",
              alignContent: "flex-end",
              height: "100%",
            }}
          >
            <Image
              src={"/images/PlanzText.png"}
              width={190}
              height={60}
              alt="Planz Text Logo"
              style={{marginLeft: '10px'}}
            />
          </div>
        </SquareContent>
      </SquareWrapper>
    </>
  );
}
