import React from 'react'

const NavIconWithMenu = ({title = 'No title', icon = '', children = ''}) => {
  return (
    <li data-toggle="tooltip" title={title} data-placement="right">
        <a href="./login.html" data-toggle="dropdown">
            <figure class={icon}>
                <img src="http://via.placeholder.com/128X128" class="rounded-circle" alt="avatar" />
            </figure>
        </a>
        <div class="dropdown-menu">
            {children}
        </div>
    </li>
  )
}


export default NavIconWithMenu
