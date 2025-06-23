"use client";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "@/styles/custom-calendar.scss";
import moment from "moment";
import styled from "styled-components";
import { useState } from "react";
import { useCalendar } from "@/context/CalendarContext";

const CalendarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  width: 98%;
  padding: 10px;
  box-sizing: border-box;
`;

const CalendarSizing = styled.div`
  flex-grow: 1;
  width: 100%;
  max-width: 1200px;
  height: 100%;
`;

const localizer = momentLocalizer(moment);

export default function UserCalendar() {
  const {events, addEvent, selectedDate, setSelectedDate} = useCalendar();

  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt(
      `New event from ${start.toLocaleString()} to ${end.toLocaleString()}`
    );
    if (title) {
      addEvent({ start, end, title })
    }
  };

  return (
    <>
      <CalendarWrapper>
        <CalendarSizing>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor='start'
            endAccessor='end'
            defaultView="month"
            selectable
            onSelectSlot={handleSelectSlot}
            onSelectEvent={(event) => alert(`Event ${event.title} is on your calendar`)}
          />
        </CalendarSizing>
      </CalendarWrapper>
    </>
  );
}
