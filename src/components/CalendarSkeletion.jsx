'use client'
import styled from "styled-components";

const SkeletonWrapper = styled.div`
  flex-grow: 1;          // fill the remaining space next to Sidebar
  padding: 50px 20px 50px 50px;
  height: 80vh;
`;

const CalendarSkeleton = () => {
  return (
    <>
        <SkeletonWrapper>
            <p>Loading calendar...</p>
        </SkeletonWrapper>
    </>
  )
}

export default CalendarSkeleton