
import React, { useState } from 'react'
import useStore from './useStore'
import MessageBox from './MessageBox';
import SendBox from "./SendBox";

const Messages = ({ userID, chatID }) => {
  const [messages, messageActions] = useStore(chatID)
  const owner = userID

  const [toggledMessage, setToggledMessage] = useState()

  const toggleMessage = (message) => setToggledMessage(message)

  const addMessage = async (message) => messageActions.addMessage({owner, ...message})

  const removeMessage = async (message) => messageActions.removeMessage(message)

  const editMessage = async (message) => { messageActions.editMessage(message); toggleMessage(); }

  return (
    <div style={{}}>
      {messages && messages.items.map(message => (
        message.id === (toggledMessage && toggledMessage.id)
          ? <SendBox handleSave={editMessage} handleCancel={toggleMessage} message={message} />
          : <MessageBox key={message.id} removeMessage={removeMessage} toggleMessage={toggleMessage} message={message} />
      ))}
      <SendBox handleSend={addMessage} />
    </div>
  )
}

export default Messages
