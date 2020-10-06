import React from 'react'
import ChatBoxHeader from './ChatBoxHeader'
import ChatBoxHeaderAddOn from './ChatBoxHeaderAddOn'
import ChatBoxMessage from './ChatBoxMessage'
import ChatBoxSender from './ChatBoxSender'

const ChatBox = () => {
  return (
        <div class="chat">
            <div class="chat-header">
                <ChatBoxHeader />
                <ChatBoxHeaderAddOn />
            </div>
            <div class="chat-body"> {/*  .no-message */}
                <div class="messages">
                    <ChatBoxMessage />
                    <ChatBoxMessage />
                    <ChatBoxMessage />
                    <ChatBoxMessage />
                    <ChatBoxMessage />
                    <ChatBoxMessage />
                    <div class="message-item messages-divider sticky-top" data-label="Today"></div>
                    <ChatBoxMessage />
                    <ChatBoxMessage />
                    <ChatBoxMessage />
                    <ChatBoxMessage />
                    <ChatBoxMessage />
                    <ChatBoxMessage />
                    <div class="message-item messages-divider" data-label="1 message unread"></div>
                    <ChatBoxMessage />
                </div>
            </div>
            <div class="chat-footer">
                <ChatBoxSender />
            </div>
        </div>
  )
}

export default ChatBox
