
import React from 'react'
import useStore from './useStore'
import ChatItem from './ChatItem';

const Chats = ({ loggedInUser, onClick }) => {
  const [chats, chatActions] = useStore(loggedInUser)

  const removeChat = async (chat) => chatActions.removeChat(chat)

  return (
    <div style={{}}>
      {chats.items.map(item =>
        <ChatItem key={item.id} chat={item.chat} isLast={false} onClick={onClick} onDelete={removeChat} />)}
    </div>
  )
}

export default Chats
