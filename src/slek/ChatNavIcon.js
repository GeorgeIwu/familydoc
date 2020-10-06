import React from 'react'

const NavIcon = ({active = false, title = 'No title', icon = '', badge = '' }) => {
  return (
    <li>
        <a class={active ? 'active' : ''} title={title} data-navigation-target={title} data-toggle="tooltip" data-placement="right" href='#/'>
            <span class={`badge ${badge}`}></span>
            <i data-feather={icon}></i>
        </a>
    </li>
  )
}


export default NavIcon
