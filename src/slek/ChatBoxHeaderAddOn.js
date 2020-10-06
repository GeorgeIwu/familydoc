import React from 'react'

const ChatBoxHeaderAddOn = () => {
  return (
    <div class="chat-header-action">
        <ul class="list-inline">
            <li class="list-inline-item d-xl-none d-inline">
                <a href="#" class="btn btn-outline-light mobile-navigation-button">
                    <i data-feather="menu"></i>
                </a>
            </li>
            <li class="list-inline-item" data-toggle="tooltip" title="Voice call">
                <a href="#" class="btn btn-outline-light text-success" data-toggle="modal"
                data-target="#call">
                    <i data-feather="phone"></i>
                </a>
            </li>
            <li class="list-inline-item" data-toggle="tooltip" title="Video call">
                <a href="#" class="btn btn-outline-light text-warning" data-toggle="modal"
                data-target="#videoCall">
                    <i data-feather="video"></i>
                </a>
            </li>
            <li class="list-inline-item">
                <a href="#" class="btn btn-outline-light" data-toggle="dropdown">
                    <i data-feather="more-horizontal"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-right">
                    <a href="#" data-navigation-target="contact-information"
                    class="dropdown-item">Profile</a>
                    <a href="#" class="dropdown-item">Add to archive</a>
                    <a href="#" class="dropdown-item">Delete</a>
                    <div class="dropdown-divider"></div>
                    <a href="#" class="dropdown-item text-danger">Block</a>
                </div>
            </li>
        </ul>
    </div>
  )
}

export default ChatBoxHeaderAddOn
