
import React, { useState } from 'react'
import MessageBox from './MessageBox';
import SendBox from "./SendBox";

const ChatMessages = ({ chatApi }) => {
  const [chat, chatActions] = chatApi
  const [toggledMessage, setToggledMessage] = useState()

  const toggleMessage = (message) => setToggledMessage(message)

  const addMessage = async (message) => chatActions.addMessage(message)

  const removeMessage = async (message) => chatActions.removeMessage(message)

  const editMessage = async (message) => { chatActions.editMessage(message); toggleMessage(); }

  return (
    <div style={{}}>
      {chat.messages && chat.messages.items.map(message =>
        (message.id === (toggledMessage && toggledMessage.id))
          ? <SendBox handleSave={editMessage} handleCancel={toggleMessage} message={message} />
          : <MessageBox key={message.id} removeMessage={removeMessage} toggleMessage={toggleMessage} message={message} />
      )}
      <SendBox handleSend={addMessage} />
    </div>
  )
}

export default ChatMessages
