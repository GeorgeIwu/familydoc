import React from 'react'

const ChatBoxMessage = () => {
  return (
    <div class="message-item">
        <div class="message-avatar">
            <figure class="avatar">
                <img src="http://via.placeholder.com/128X128" class="rounded-circle" alt="image" />
            </figure>
            <div>
                <h5>Mirabelle Tow</h5>
                <div class="time">01:20 PM <i class="ti-double-check text-info"></i></div>
            </div>
        </div>
        <div class="message-content">
            Hello how are you?
        </div>
    </div>
  )
}

export default ChatBoxMessage
