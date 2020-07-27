
import React from 'react'
import useStore from './useStore'
import ChatItem from './ChatItem';

const ChatList = ({ userID, handleSelect }) => {
  const [chats, chatActions] = useStore(userID)

  const removeChat = async (chat) => chatActions.removeChat(chat)

  return (
    <div style={{}}>
      {chats.map(item =>
        <ChatItem key={item.id} chat={item} isLast={false} handleClick={handleSelect} onDelete={removeChat} />)}
    </div>
  )
}

export default ChatList
