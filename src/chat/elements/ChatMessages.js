
import React, { useState } from 'react'
import Popover from '@material-ui/core/Popover';
import SendBox from "./SendBox";

const ChatMessages = ({ chatApi }) => {
  const [chat, chatActions] = chatApi
  const [editId, setEditId] = useState()

  const editMessage = (message) => setEditId(message && message.id)

  const removeMessage = async (message) => chatActions.removeMessage(message)

  const saveMessage = async (message) => {
    editMessage(null)
    if (!message) return
    message.id ? chatActions.editMessage(message) : chatActions.addMessage(message)
  }

  return (
    <div style={{}}>
      {chat.messages && chat.messages.items.map(message => {
        return (editId  === message.id)
          ? <SendBox handleSend={saveMessage} message={message} />
          : (<div key={message.id}>
              <div style={{display: 'inline-block', marginRight: '20px'}}>
                <p style={{}}>{message.text}</p>
              </div>
              <div style={{display: 'inline-block', backgroundColor: 'grey'}} onClick={() => removeMessage(message)}>X</div>
              <div style={{display: 'inline-block', marginLeft: '5px'}} onClick={() => editMessage(message)}>edit</div>
            </div>)
      })
      }
      <SendBox handleSend={saveMessage} />
    </div>
  )
}

export default ChatMessages
