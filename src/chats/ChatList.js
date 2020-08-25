
import React from 'react'
import styled from "styled-components";
import useStore from './useStore'
import ChatItem from './ChatItem';

const StyledDiv = styled.div`
  padding: 5px
`

const ChatList = ({ userID, handleSelect }) => {
  const [chats, chatActions] = useStore(userID)

  const removeChat = async (chat) => chatActions.removeChat(chat)

  return (
    <div>
      {chats.items.map(item =>
        <StyledDiv>
          <ChatItem key={item.id} chat={item} isLast={false} handleClick={handleSelect} onDelete={removeChat} />
        </StyledDiv>)}
    </div>
  )
}

export default ChatList
