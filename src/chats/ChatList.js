
import React from 'react'
import useStore from './useStore'
import ChatItem from './ChatItem';

const ChatList = ({ userID, onClick }) => {
  const [chats, chatActions] = useStore(userID)

  const removeChat = async (chat) => chatActions.removeChat(chat)

  return (
    <div style={{}}>
      {chats.map(item =>
        <ChatItem key={item.id} chat={item.chat} isLast={false} onClick={onClick} onDelete={removeChat} />)}
    </div>
  )
}

export default ChatList
