import React from 'react'
import NavIcon from './ChatNavIcon'
import NavIconWithMenu from './ChatNavIconMenu'

const ChatNav = () => {
  return (
    <nav class="navigation">
        <div class="nav-group">
            <ul>
                <li class="logo"><a href="#/">logo</a></li>
                <NavIcon active title="Chats" icon="message-circle" badge="badge-warning" />
                <NavIcon title="Friends" icon="user" badge="badge-danger" />
                <NavIcon title="Favorites" icon="user" />
                <NavIcon title="Archived" icon="archive" />
                <li class="brackets"/>

                <NavIconWithMenu title = 'User menu' icon = 'avatar'>
                    <div>
                        <a href="#/" class="dropdown-item" data-toggle="modal" data-target="#editProfileModal">Edit profile</a>
                        <a href="#/" class="dropdown-item" data-navigation-target="contact-information">Profile</a>
                        <a href="#/" class="dropdown-item" data-toggle="modal" data-target="#settingModal">Settings</a>
                        <div class="dropdown-divider"></div>
                        <a href="login.html" class="dropdown-item text-danger">Logout</a>
                    </div>
                </NavIconWithMenu>
            </ul>
        </div>
    </nav>
  )
}

export default ChatNav
