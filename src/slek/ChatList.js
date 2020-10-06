import React from 'react'
import ChatListHeader from './ChatListHeader'
import ChatListSearch from './ChatListSearch'
import ChatListItem from './ChatListItem'

const ChatList = () => {
  return (
        <div class="sidebar-group">

            <div id="chats" class="sidebar active">
                <ChatListHeader />
                <ChatListSearch />
                <div class="sidebar-body">
                    <ul class="list-group list-group-flush">
                        <ChatListItem />
                        <ChatListItem />
                        <ChatListItem />
                        <ChatListItem />
                        <ChatListItem />
                        <ChatListItem />
                        <ChatListItem />
                        <ChatListItem />
                        <ChatListItem />
                        <ChatListItem />
                        <ChatListItem />
                        <ChatListItem />
                    </ul>
                </div>
            </div>

        </div>
  )
}

export default ChatList
