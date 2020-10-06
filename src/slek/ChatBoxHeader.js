import React from 'react'

const ChatBoxHeader = () => {
  return (
    <div class="chat-header-user">
        <figure class="avatar">
            <img src="http://via.placeholder.com/128X128" class="rounded-circle" alt="image" />
        </figure>
        <div>
            <h5>Byrom Guittet</h5>
            <small class="text-success">
                <i>writing...</i>
            </small>
        </div>
    </div>
  )
}

export default ChatBoxHeader
