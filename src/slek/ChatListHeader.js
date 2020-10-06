import React from 'react'

const ChatListHeader = () => {
  return (
    <header>
        <span>Chats</span>
        <ul class="list-inline">
            <li class="list-inline-item" data-toggle="tooltip" title="New group">
                <a class="btn btn-outline-light" href="#" data-toggle="modal" data-target="#newGroup">
                    <i data-feather="users"></i>
                </a>
            </li>
            <li class="list-inline-item">
                <a class="btn btn-outline-light" data-toggle="tooltip" title="New chat" href="#"
                data-navigation-target="friends">
                    <i data-feather="plus-circle"></i>
                </a>
            </li>
            <li class="list-inline-item d-xl-none d-inline">
                <a href="#" class="btn btn-outline-light text-danger sidebar-close">
                    <i data-feather="x"></i>
                </a>
            </li>
        </ul>
    </header>
  )
}

export default ChatListHeader
