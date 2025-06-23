import Image from "next/image";
import styled from "styled-components";

const UserContactIconWrapper = styled.div`
  width: 13%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 20px 7px 15px;
`;

const UserContactIcon = styled.div`
  height: 60px;
  width: 60px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: orange;
    cursor: pointer;
`;

const MessageSnippetWrapper = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  flex-grow: 1;
  font-size: 1.2rem;
  font-weight: 500;
  padding: 10px;
    cursor: pointer;
`;

const MessageSnippet = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MessageFunctionWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  height: 100%;
  position: relative;
  
`;

export default function DetailsMessageTab({ message }) {
  const trashcanImage = "/images/trashcan.png";

  return (
    <>
      <UserContactIconWrapper>
        <UserContactIcon>
            {/* message.usericon */}
            User
            </UserContactIcon>
      </UserContactIconWrapper>
      <MessageSnippetWrapper>
        <MessageSnippet>
            {/* message.body */}
          Hey! This is Joey from SafeLite and I'm just letting you know that
          your windshield repair is almost done. I'll contact you in a couple hours to let you know when you can pick it up
        </MessageSnippet>
      </MessageSnippetWrapper>
      <MessageFunctionWrapper>
        <Image
          src={trashcanImage}
          width={25}
          height={50}
          alt="Delete chat icon"
          style={{margin: '0 10px', objectFit: 'contain',  cursor: 'pointer' }}
        />
      </MessageFunctionWrapper>
    </>
  );
}
