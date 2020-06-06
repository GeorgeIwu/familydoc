
import React from 'react'

const ChatMessages = ({ chatApi }) => {
  const [chat, chatActions] = chatApi

  const removeMessage = async (message) => {
    chatActions.removeMessage(message)
  }

  return (
    <div style={{}}>
      {chat.messages && chat.messages.items.map(message => (
          <div key={message.id}>
            <div style={{display: 'inline-block', marginRight: '20px'}}>
              <p style={{}}>{message.text}</p>
            </div>
            <div style={{display: 'inline-block', backgroundColor: 'grey'}} onClick={() => removeMessage(message)}>X</div>
          </div>
        ))
      }
    </div>
  )
}

export default ChatMessages
