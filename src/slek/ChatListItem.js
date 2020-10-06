import React from 'react'

const ChatListItem = () => {
  return (
    <li class="list-group-item">
        <figure class="avatar avatar-state-success">
            <img src="http://via.placeholder.com/128X128" class="rounded-circle" alt="image" />
        </figure>
        <div class="users-list-body">
            <div>
                <h5 class="text-primary">Townsend Seary</h5>
                <p>What's up, how are you?</p>
            </div>
            <div class="users-list-action">
                <div class="new-message-count">3</div>
                <small class="text-primary">03:41 PM</small>
            </div>
        </div>
    </li>
  )
}

export default ChatListItem
