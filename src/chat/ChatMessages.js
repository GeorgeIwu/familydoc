
import React, { useState } from 'react'
import { useMessage, useStore } from '../components/hooks'
import MessageBox from './elements/MessageBox';
import SendBox from "./elements/SendBox";

const ChatMessages = ({ chat = {} }) => {
  const [store] = useStore()
  const [messages, messageActions] = useMessage(chat.id, store.user.id)

  const [toggledMessage, setToggledMessage] = useState()

  const toggleMessage = (message) => setToggledMessage(message)

  const addMessage = async (message) => messageActions.addMessage(message)

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

export default ChatMessages
