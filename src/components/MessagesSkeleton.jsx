'use client'
import styled from "styled-components";

const SkeletonWrapper = styled.div`
  flex-grow: 1;          // fill the remaining space next to Sidebar
  padding: 50px 20px 50px 50px;
  height: 80vh;
`;

const MessagesSkeleton = () => {
  return (
    <>
        <SkeletonWrapper>
            <div style={{fontSize: '3.5rem', padding: '0 0 50px 0', display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: '1', minHeight: '80vh'}}>Loading...</div>
        </SkeletonWrapper>
    </>
  )
}

export default MessagesSkeleton