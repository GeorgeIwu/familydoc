import React from 'react';

const MessageBox = ({ removeMessage, toggleMessage, message }) => {

  const onRemove = () => {
    removeMessage(message)
  }

  const onToggle = () => {
    toggleMessage(message)
  }

  return (
    <div key={message.id}>
      <div style={{display: 'inline-block', marginRight: '20px'}}>
        <p style={{}}>{message.text}</p>
      </div>
      <div style={{display: 'inline-block', backgroundColor: 'grey'}} onClick={onRemove}>X</div>
      <div style={{display: 'inline-block', marginLeft: '5px'}} onClick={onToggle}>edit</div>
    </div>
  );
}

export default MessageBox
