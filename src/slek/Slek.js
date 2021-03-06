import React from 'react'

const Slek = () => {
  return (
    <div class="layout">

    {/*  navigation */}
    <nav class="navigation">
        <div class="nav-group">
            <ul>
                <li class="logo">
                    <a href="#">logo</a>
                </li>
                <li>
                    <a class="active" data-navigation-target="chats" href="#" data-toggle="tooltip" title="Chats"
                       data-placement="right">
                        <span class="badge badge-warning"></span>
                        <i data-feather="message-circle"></i>
                    </a>
                </li>
                <li>
                    <a data-navigation-target="friends" href="#" data-toggle="tooltip"
                       title="Friends" data-placement="right">
                        <span class="badge badge-danger"></span>
                        <i data-feather="user"></i>
                    </a>
                </li>
                <li>
                    <a data-navigation-target="favorites" data-toggle="tooltip" title="Favorites" data-placement="right"
                       href="#">
                        <i data-feather="star"></i>
                    </a>
                </li>
                <li class="brackets">
                    <a data-navigation-target="archived" href="#" data-toggle="tooltip"
                       title="Archived" data-placement="right">
                        <i data-feather="archive"></i>
                    </a>
                </li>
                <li>
                    <a href="#" class="dark-light-switcher" data-toggle="tooltip" title="Dark mode"
                       data-placement="right">
                        <i data-feather="moon"></i>
                    </a>
                </li>
                <li data-toggle="tooltip" title="User menu" data-placement="right">
                    <a href="./login.html" data-toggle="dropdown">
                        <figure class="avatar">
                            <img src="http://via.placeholder.com/128X128" class="rounded-circle" alt="image" />
                        </figure>
                    </a>
                    <div class="dropdown-menu">
                        <a href="#" class="dropdown-item" data-toggle="modal" data-target="#editProfileModal">Edit
                            profile</a>
                        <a href="#" class="dropdown-item" data-navigation-target="contact-information">Profile</a>
                        <a href="#" class="dropdown-item" data-toggle="modal" data-target="#settingModal">Settings</a>
                        <div class="dropdown-divider"></div>
                        <a href="login.html" class="dropdown-item text-danger">Logout</a>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
    {/*  ./ navigation */}

    {/*  content */}
    <div class="content">

        {/*  sidebar group */}
        <div class="sidebar-group">

            {/*  Chats sidebar */}
            <div id="chats" class="sidebar active">
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
                <form>
                    <input type="text" class="form-control" placeholder="Search chats" />
                </form>
                <div class="sidebar-body">
                    <ul class="list-group list-group-flush">
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
                        <li class="list-group-item">
                            <figure class="avatar avatar-state-warning">
                                <img src="http://via.placeholder.com/128X128" class="rounded-circle" alt="image" />
                            </figure>
                            <div class="users-list-body">
                                <div>
                                    <h5 class="text-primary">Forest Kroch</h5>
                                    <p>
                                        <i class="fa fa-camera mr-1"></i> Photo
                                    </p>
                                </div>
                                <div class="users-list-action">
                                    <div class="new-message-count">1</div>
                                    <small class="text-primary">Yesterday</small>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item open-chat">
                            <div>
                                <figure class="avatar">
                                    <img src="http://via.placeholder.com/128X128" class="rounded-circle" alt="image" />
                                </figure>
                            </div>
                            <div class="users-list-body">
                                <div>
                                    <h5>Byrom Guittet</h5>
                                    <p>I sent you all the files. Good luck with 😃</p>
                                </div>
                                <div class="users-list-action">
                                    <small class="text-muted">11:05 AM</small>
                                    <div class="action-toggle">
                                        <div class="dropdown">
                                            <a data-toggle="dropdown" href="#">
                                                <i data-feather="more-horizontal"></i>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <a href="#" class="dropdown-item">Open</a>
                                                <a href="#" data-navigation-target="contact-information"
                                                   class="dropdown-item">Profile</a>
                                                <a href="#" class="dropdown-item">Add to archive</a>
                                                <div class="dropdown-divider"></div>
                                                <a href="#" class="dropdown-item text-danger">Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div>
                                <figure class="avatar">
                                    <img src="http://via.placeholder.com/128X128" class="rounded-circle" alt="image" />
                                </figure>
                            </div>
                            <div class="users-list-body">
                                <div>
                                    <h5>Margaretta Worvell</h5>
                                    <p>I need you today. Can you come with me?</p>
                                </div>
                                <div class="users-list-action">
                                    <small class="text-muted">03:41 PM</small>
                                    <div class="action-toggle">
                                        <div class="dropdown">
                                            <a data-toggle="dropdown" href="#">
                                                <i data-feather="more-horizontal"></i>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <a href="#" class="dropdown-item">Open</a>
                                                <a href="#" data-navigation-target="contact-information"
                                                   class="dropdown-item">Profile</a>
                                                <a href="#" class="dropdown-item">Add to archive</a>
                                                <div class="dropdown-divider"></div>
                                                <a href="#" class="dropdown-item text-danger">Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <figure class="avatar">
                                <span class="avatar-title bg-warning bg-success rounded-circle">
                                    <i class="fa fa-users"></i>
                                </span>
                            </figure>
                            <div class="users-list-body">
                                <div>
                                    <h5>😍 My Family 😍</h5>
                                    <p><strong>Maher Ruslandi: </strong>Hello!!!</p>
                                </div>
                                <div class="users-list-action">
                                    <small class="text-muted">Yesterday</small>
                                    <div class="action-toggle">
                                        <div class="dropdown">
                                            <a data-toggle="dropdown" href="#">
                                                <i data-feather="more-horizontal"></i>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <a href="#" class="dropdown-item">Open</a>
                                                <a href="#" data-navigation-target="contact-information"
                                                   class="dropdown-item">Profile</a>
                                                <a href="#" class="dropdown-item">Add to archive</a>
                                                <div class="dropdown-divider"></div>
                                                <a href="#" class="dropdown-item text-danger">Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div>
                                <figure class="avatar avatar-state-warning">
                                    <img src="http://via.placeholder.com/128X128" class="rounded-circle" alt="image" />
                                </figure>
                            </div>
                            <div class="users-list-body">
                                <div>
                                    <h5>Jennica Kindred</h5>
                                    <p>
                                        <i class="fa fa-video-camera mr-1"></i>
                                        Video
                                    </p>
                                </div>
                                <div class="users-list-action">
                                    <small class="text-muted">03:41 PM</small>
                                    <div class="action-toggle">
                                        <div class="dropdown">
                                            <a data-toggle="dropdown" href="#">
                                                <i data-feather="more-horizontal"></i>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <a href="#" class="dropdown-item">Open</a>
                                                <a href="#" data-navigation-target="contact-information"
                                                   class="dropdown-item">Profile</a>
                                                <a href="#" class="dropdown-item">Add to archive</a>
                                                <div class="dropdown-divider"></div>
                                                <a href="#" class="dropdown-item text-danger">Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div>
                                <figure class="avatar">
                                    <span class="avatar-title bg-info rounded-circle">M</span>
                                </figure>
                            </div>
                            <div class="users-list-body">
                                <div>
                                    <h5>Marvin Rohan</h5>
                                    <p>Have you prepared the files?</p>
                                </div>
                                <div class="users-list-action">
                                    <small class="text-muted">Yesterday</small>
                                    <div class="action-toggle">
                                        <div class="dropdown">
                                            <a data-toggle="dropdown" href="#">
                                                <i data-feather="more-horizontal"></i>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <a href="#" class="dropdown-item">Open</a>
                                                <a href="#" data-navigation-target="contact-information"
                                                   class="dropdown-item">Profile</a>
                                                <a href="#" class="dropdown-item">Add to archive</a>
                                                <div class="dropdown-divider"></div>
                                                <a href="#" class="dropdown-item text-danger">Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div>
                                <figure class="avatar">
                                    <img src="http://via.placeholder.com/128X128" class="rounded-circle" alt="image" />
                                </figure>
                            </div>
                            <div class="users-list-body">
                                <div>
                                    <h5>Townsend Seary</h5>
                                    <p>Where are you?</p>
                                </div>
                                <div class="users-list-action">
                                    <small class="text-muted">03:41 PM</small>
                                    <div class="action-toggle">
                                        <div class="dropdown">
                                            <a data-toggle="dropdown" href="#">
                                                <i data-feather="more-horizontal"></i>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <a href="#" class="dropdown-item">Open</a>
                                                <a href="#" data-navigation-target="contact-information"
                                                   class="dropdown-item">Profile</a>
                                                <a href="#" class="dropdown-item">Add to archive</a>
                                                <div class="dropdown-divider"></div>
                                                <a href="#" class="dropdown-item text-danger">Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div>
                                <figure class="avatar">
                                    <span class="avatar-title bg-secondary rounded-circle">G</span>
                                </figure>
                            </div>
                            <div class="users-list-body">
                                <div>
                                    <h5>Gibb Ivanchin</h5>
                                    <p>I want to visit them.</p>
                                </div>
                                <div class="users-list-action">
                                    <small class="text-muted">03:41 PM</small>
                                    <div class="action-toggle">
                                        <div class="dropdown">
                                            <a data-toggle="dropdown" href="#">
                                                <i data-feather="more-horizontal"></i>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <a href="#" class="dropdown-item">Open</a>
                                                <a href="#" data-navigation-target="contact-information"
                                                   class="dropdown-item">Profile</a>
                                                <a href="#" class="dropdown-item">Add to archive</a>
                                                <div class="dropdown-divider"></div>
                                                <a href="#" class="dropdown-item text-danger">Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div>
                                <figure class="avatar">
                                    <img src="http://via.placeholder.com/128X128" class="rounded-circle" alt="image" />
                                </figure>
                            </div>
                            <div class="users-list-body">
                                <div>
                                    <h5>Harald Kowalski</h5>
                                    <p>Reports are ready.</p>
                                </div>
                                <div class="users-list-action">
                                    <small class="text-muted">03:41 PM</small>
                                    <div class="action-toggle">
                                        <div class="dropdown">
                                            <a data-toggle="dropdown" href="#">
                                                <i data-feather="more-horizontal"></i>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <a href="#" class="dropdown-item">Open</a>
                                                <a href="#" data-navigation-target="contact-information"
                                                   class="dropdown-item">Profile</a>
                                                <a href="#" class="dropdown-item">Add to archive</a>
                                                <div class="dropdown-divider"></div>
                                                <a href="#" class="dropdown-item text-danger">Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div>
                                <figure class="avatar">
                                    <span class="avatar-title bg-success rounded-circle">A</span>
                                </figure>
                            </div>
                            <div class="users-list-body">
                                <div>
                                    <h5>Afton McGilvra</h5>
                                    <p>I do not know where is it. Don't ask me, please.</p>
                                </div>
                                <div class="users-list-action">
                                    <small class="text-muted">03:41 PM</small>
                                    <div class="action-toggle">
                                        <div class="dropdown">
                                            <a data-toggle="dropdown" href="#">
                                                <i data-feather="more-horizontal"></i>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <a href="#" class="dropdown-item">Open</a>
                                                <a href="#" data-navigation-target="contact-information"
                                                   class="dropdown-item">Profile</a>
                                                <a href="#" class="dropdown-item">Add to archive</a>
                                                <div class="dropdown-divider"></div>
                                                <a href="#" class="dropdown-item text-danger">Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div>
                                <figure class="avatar">
                                    <img src="http://via.placeholder.com/128X128" class="rounded-circle" alt="image" />
                                </figure>
                            </div>
                            <div class="users-list-body">
                                <div>
                                    <h5>Alexandr Donnelly</h5>
                                    <p>Can anyone enter the meeting?</p>
                                </div>
                                <div class="users-list-action">
                                    <small class="text-muted">03:41 PM</small>
                                    <div class="action-toggle">
                                        <div class="dropdown">
                                            <a data-toggle="dropdown" href="#">
                                                <i data-feather="more-horizontal"></i>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <a href="#" class="dropdown-item">Open</a>
                                                <a href="#" data-navigation-target="contact-information"
                                                   class="dropdown-item">Profile</a>
                                                <a href="#" class="dropdown-item">Add to archive</a>
                                                <div class="dropdown-divider"></div>
                                                <a href="#" class="dropdown-item text-danger">Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            {/*  ./ Chats sidebar */}

            {/*  Friends sidebar */}
            <div id="friends" class="sidebar">
                <header>
                    <span>Friends</span>
                    <ul class="list-inline">
                        <li class="list-inline-item" data-toggle="tooltip" title="Add friends">
                            <a class="btn btn-outline-light" href="#" data-toggle="modal" data-target="#addFriends">
                                <i data-feather="user-plus"></i>
                            </a>
                        </li>
                        <li class="list-inline-item d-xl-none d-inline">
                            <a href="#" class="btn btn-outline-light text-danger sidebar-close">
                                <i data-feather="x"></i>
                            </a>
                        </li>
                    </ul>
                </header>
                <form>
                    <input type="text" class="form-control" placeholder="Search friends" />
                </form>
                <div class="sidebar-body">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item" data-navigation-target="chats">
                            <div>
                                <figure class="avatar">
                                    <img src="http://via.placeholder.com/128X128" class="rounded-circle" alt="image" />
                                </figure>
                            </div>
                            <div class="users-list-body">
                                <div>
                                    <h5>Harrietta Souten</h5>
                                    <p>Dental Hygienist</p>
                                </div>
                                <div class="users-list-action">
                                    <div class="action-toggle">
                                        <div class="dropdown">
                                            <a data-toggle="dropdown" href="#">
                                                <i data-feather="more-horizontal"></i>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <a href="#" class="dropdown-item">New chat</a>
                                                <a href="#" data-navigation-target="contact-information"
                                                   class="dropdown-item">Profile</a>
                                                <div class="dropdown-divider"></div>
                                                <a href="#" class="dropdown-item text-danger">Block</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item" data-navigation-target="chats">
                            <div>
                                <figure class="avatar avatar-state-warning">
                                    <span class="avatar-title bg-success rounded-circle">A</span>
                                </figure>
                            </div>
                            <div class="users-list-body">
                                <div>
                                    <h5>Aline McShee</h5>
                                    <p>Marketing Assistant</p>
                                </div>
                                <div class="users-list-action">
                                    <div class="action-toggle">
                                        <div class="dropdown">
                                            <a data-toggle="dropdown" href="#">
                                                <i data-feather="more-horizontal"></i>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <a href="#" class="dropdown-item">New chat</a>
                                                <a href="#" data-navigation-target="contact-information"
                                                   class="dropdown-item">Profile</a>
                                                <div class="dropdown-divider"></div>
                                                <a href="#" class="dropdown-item text-danger">Block</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item" data-navigation-target="chats">
                            <div>
                                <figure class="avatar avatar-state-success">
                                    <img src="http://via.placeholder.com/128X128" class="rounded-circle" alt="image" />
                                </figure>
                            </div>
                            <div class="users-list-body">
                                <div>
                                    <h5>Brietta Blogg</h5>
                                    <p>Actuary</p>
                                </div>
                                <div class="users-list-action">
                                    <div class="action-toggle">
                                        <div class="dropdown">
                                            <a data-toggle="dropdown" href="#">
                                                <i data-feather="more-horizontal"></i>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <a href="#" class="dropdown-item">New chat</a>
                                                <a href="#" data-navigation-target="contact-information"
                                                   class="dropdown-item">Profile</a>
                                                <div class="dropdown-divider"></div>
                                                <a href="#" class="dropdown-item text-danger">Block</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item" data-navigation-target="chats">
                            <div>
                                <figure class="avatar avatar-state-success">
                                    <img src="http://via.placeholder.com/128X128" class="rounded-circle" alt="image" />
                                </figure>
                            </div>
                            <div class="users-list-body">
                                <div>
                                    <h5>Karl Hubane</h5>
                                    <p>Chemical Engineer</p>
                                </div>
                                <div class="users-list-action">
                                    <div class="action-toggle">
                                        <div class="dropdown">
                                            <a data-toggle="dropdown" href="#">
                                                <i data-feather="more-horizontal"></i>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <a href="#" class="dropdown-item">New chat</a>
                                                <a href="#" data-navigation-target="contact-information"
                                                   class="dropdown-item">Profile</a>
                                                <div class="dropdown-divider"></div>
                                                <a href="#" class="dropdown-item text-danger">Block</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item" data-navigation-target="chats">
                            <div>
                                <figure class="avatar">
                                    <img src="http://via.placeholder.com/128X128" class="rounded-circle" alt="image" />
                                </figure>
                            </div>
                            <div class="users-list-body">
                                <div>
                                    <h5>Jillana Tows</h5>
                                    <p>Project Manager</p>
                                </div>
                                <div class="users-list-action">
                                    <div class="action-toggle">
                                        <div class="dropdown">
                                            <a data-toggle="dropdown" href="#">
                                                <i data-feather="more-horizontal"></i>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <a href="#" class="dropdown-item">New chat</a>
                                                <a href="#" data-navigation-target="contact-information"
                                                   class="dropdown-item">Profile</a>
                                                <div class="dropdown-divider"></div>
                                                <a href="#" class="dropdown-item text-danger">Block</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item" data-navigation-target="chats">
                            <div>
                                <figure class="avatar avatar-state-success">
                                    <span class="avatar-title bg-info rounded-circle">AD</span>
                                </figure>
                            </div>
                            <div class="users-list-body">
                                <div>
                                    <h5>Alina Derington</h5>
                                    <p>Nurse</p>
                                </div>
                                <div class="users-list-action">
                                    <div class="action-toggle">
                                        <div class="dropdown">
                                            <a data-toggle="dropdown" href="#">
                                                <i data-feather="more-horizontal"></i>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <a href="#" class="dropdown-item">New chat</a>
                                                <a href="#" data-navigation-target="contact-information"
                                                   class="dropdown-item">Profile</a>
                                                <div class="dropdown-divider"></div>
                                                <a href="#" class="dropdown-item text-danger">Block</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item" data-navigation-target="chats">
                            <div>
                                <figure class="avatar avatar-state-secondary">
                                    <span class="avatar-title bg-warning rounded-circle">S</span>
                                </figure>
                            </div>
                            <div class="users-list-body">
                                <div>
                                    <h5>Stevy Kermeen</h5>
                                    <p>Associate Professor</p>
                                </div>
                                <div class="users-list-action">
                                    <div class="action-toggle">
                                        <div class="dropdown">
                                            <a data-toggle="dropdown" href="#">
                                                <i data-feather="more-horizontal"></i>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <a href="#" class="dropdown-item">New chat</a>
                                                <a href="#" data-navigation-target="contact-information"
                                                   class="dropdown-item">Profile</a>
                                                <div class="dropdown-divider"></div>
                                                <a href="#" class="dropdown-item text-danger">Block</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item" data-navigation-target="chats">
                            <div>
                                <figure class="avatar">
                                    <img src="http://via.placeholder.com/128X128" class="rounded-circle" alt="image" />
                                </figure>
                            </div>
                            <div class="users-list-body">
                                <div>
                                    <h5>Stevy Kermeen</h5>
                                    <p>Senior Quality Engineer</p>
                                </div>
                                <div class="users-list-action">
                                    <div class="action-toggle">
                                        <div class="dropdown">
                                            <a data-toggle="dropdown" href="#">
                                                <i data-feather="more-horizontal"></i>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <a href="#" class="dropdown-item">New chat</a>
                                                <a href="#" data-navigation-target="contact-information"
                                                   class="dropdown-item">Profile</a>
                                                <div class="dropdown-divider"></div>
                                                <a href="#" class="dropdown-item text-danger">Block</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item" data-navigation-target="chats">
                            <div>
                                <figure class="avatar">
                                    <img src="http://via.placeholder.com/128X128" class="rounded-circle" alt="image" />
                                </figure>
                            </div>
                            <div class="users-list-body">
                                <div>
                                    <h5>Gloriane Shimmans</h5>
                                    <p>Web Designer</p>
                                </div>
                                <div class="users-list-action">
                                    <div class="action-toggle">
                                        <div class="dropdown">
                                            <a data-toggle="dropdown" href="#">
                                                <i data-feather="more-horizontal"></i>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <a href="#" class="dropdown-item">New chat</a>
                                                <a href="#" data-navigation-target="contact-information"
                                                   class="dropdown-item">Profile</a>
                                                <div class="dropdown-divider"></div>
                                                <a href="#" class="dropdown-item text-danger">Block</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item" data-navigation-target="chats">
                            <div>
                                <figure class="avatar avatar-state-warning">
                                    <span class="avatar-title bg-secondary rounded-circle">B</span>
                                </figure>
                            </div>
                            <div class="users-list-body">
                                <div>
                                    <h5>Bernhard Perrett</h5>
                                    <p>Software Engineer</p>
                                </div>
                                <div class="users-list-action">
                                    <div class="action-toggle">
                                        <div class="dropdown">
                                            <a data-toggle="dropdown" href="#">
                                                <i data-feather="more-horizontal"></i>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <a href="#" class="dropdown-item">New chat</a>
                                                <a href="#" data-navigation-target="contact-information"
                                                   class="dropdown-item">Profile</a>
                                                <div class="dropdown-divider"></div>
                                                <a href="#" class="dropdown-item text-danger">Block</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            {/*  ./ Friends sidebar */}

            {/*  Favorites sidebar */}
            <div id="favorites" class="sidebar">
                <header>
                    <span>Favorites</span>
                    <ul class="list-inline">
                        <li class="list-inline-item d-xl-none d-inline">
                            <a href="#" class="btn btn-outline-light text-danger sidebar-close">
                                <i data-feather="x"></i>
                            </a>
                        </li>
                    </ul>
                </header>
                <form>
                    <input type="text" class="form-control" placeholder="Search favorites"/>
                </form>
                <div class="sidebar-body">
                    <ul class="list-group list-group-flush users-list">
                        <li class="list-group-item">
                            <div class="users-list-body">
                                <div>
                                    <h5>Jennica Kindred</h5>
                                    <p>I know how important this file is to you. You can trust me ;)</p>
                                </div>
                                <div class="users-list-action">
                                    <div class="action-toggle">
                                        <div class="dropdown">
                                            <a data-toggle="dropdown" href="#">
                                                <i data-feather="more-horizontal"></i>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <a href="#" class="dropdown-item">Open</a>
                                                <a href="#" class="dropdown-item">Remove favorites</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="users-list-body">
                                <div>
                                    <h5>Marvin Rohan</h5>
                                    <p>Lorem ipsum dolor sitsdc sdcsdc sdcsdcs</p>
                                </div>
                                <div class="users-list-action">
                                    <div class="action-toggle">
                                        <div class="dropdown">
                                            <a data-toggle="dropdown" href="#">
                                                <i data-feather="more-horizontal"></i>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <a href="#" class="dropdown-item">Open</a>
                                                <a href="#" class="dropdown-item">Remove favorites</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="users-list-body">
                                <div>
                                    <h5>Frans Hanscombe</h5>
                                    <p>Lorem ipsum dolor sitsdc sdcsdc sdcsdcs</p>
                                </div>
                                <div class="users-list-action">
                                    <div class="action-toggle">
                                        <div class="dropdown">
                                            <a data-toggle="dropdown" href="#">
                                                <i data-feather="more-horizontal"></i>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <a href="#" class="dropdown-item">Open</a>
                                                <a href="#" class="dropdown-item">Remove favorites</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="users-list-body">
                                <div>
                                    <h5>Karl Hubane</h5>
                                    <p>Lorem ipsum dolor sitsdc sdcsdc sdcsdcs</p>
                                </div>
                                <div class="users-list-action">
                                    <div class="action-toggle">
                                        <div class="dropdown">
                                            <a data-toggle="dropdown" href="#">
                                                <i data-feather="more-horizontal"></i>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <a href="#" class="dropdown-item">Open</a>
                                                <a href="#" class="dropdown-item">Remove favorites</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            {/*  ./ Stars sidebar */}

            {/*  Archived sidebar */}
            <div id="archived" class="sidebar">
                <header>
                    <span>Archived</span>
                    <ul class="list-inline">
                        <li class="list-inline-item d-xl-none d-inline">
                            <a href="#" class="btn btn-outline-light text-danger sidebar-close">
                                <i data-feather="x"></i>
                            </a>
                        </li>
                    </ul>
                </header>
                <form>
                    <input type="text" class="form-control" placeholder="Search archived"/>
                </form>
                <div class="sidebar-body">
                    <ul class="list-group list-group-flush users-list">
                        <li class="list-group-item">
                            <figure class="avatar">
                                <span class="avatar-title bg-danger rounded-circle">M</span>
                            </figure>
                            <div class="users-list-body">
                                <div>
                                    <h5>Mercedes Pllu</h5>
                                    <p>I know how important this file is to you. You can trust me ;)</p>
                                </div>
                                <div class="users-list-action">
                                    <div class="action-toggle">
                                        <div class="dropdown">
                                            <a data-toggle="dropdown" href="#">
                                                <i data-feather="more-horizontal"></i>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <a href="#" class="dropdown-item">Open</a>
                                                <a href="#" class="dropdown-item">Restore</a>
                                                <div class="dropdown-divider"></div>
                                                <a href="#" class="dropdown-item text-danger">Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <figure class="avatar">
                                <span class="avatar-title bg-secondary rounded-circle">R</span>
                            </figure>
                            <div class="users-list-body">
                                <div>
                                    <h5>Rochelle Golley</h5>
                                    <p>Lorem ipsum dolor sitsdc sdcsdc sdcsdcs</p>
                                </div>
                                <div class="users-list-action">
                                    <div class="action-toggle">
                                        <div class="dropdown">
                                            <a data-toggle="dropdown" href="#">
                                                <i data-feather="more-horizontal"></i>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-right">
                                                <a href="#" class="dropdown-item">Open</a>
                                                <a href="#" class="dropdown-item">Restore</a>
                                                <div class="dropdown-divider"></div>
                                                <a href="#" class="dropdown-item text-danger">Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            {/*  ./ Archived sidebar */}

        </div>
        {/*  ./ sidebar group */}

        {/*  chat */}
        <div class="chat">
            <div class="chat-header">
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
            </div>
            <div class="chat-body"> {/*  .no-message */}
                {/*
                <div class="no-message-container">
                    <div class="row mb-5">
                        <div class="col-md-4 offset-4">
                            <img src="./dist/media/svg/undraw_empty_xct9.svg" class="img-fluid" alt="image" />
                        </div>
                    </div>
                    <p class="lead">Select a chat to read messages</p>
                </div>
                */}
                <div class="messages">
                    <div class="message-item outgoing-message">
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
                    <div class="message-item">
                        <div class="message-avatar">
                            <figure class="avatar">
                                <img src="http://via.placeholder.com/128X128" class="rounded-circle" alt="image" />
                            </figure>
                            <div>
                                <h5>Byrom Guittet</h5>
                                <div class="time">01:35 PM</div>
                            </div>
                        </div>
                        <div class="message-content">
                            I'm fine, how are you 😃
                        </div>
                    </div>
                    <div class="message-item outgoing-message">
                        <div class="message-avatar">
                            <figure class="avatar">
                                <img src="http://via.placeholder.com/128X128" class="rounded-circle" alt="image" />
                            </figure>
                            <div>
                                <h5>Mirabelle Tow</h5>
                                <div class="time">05:31 PM <i class="ti-double-check text-info"></i></div>
                            </div>
                        </div>
                        <div class="message-content">
                            I'm fine thank you. I expect you to send me some files.
                        </div>
                    </div>
                    <div class="message-item">
                        <div class="message-avatar">
                            <figure class="avatar">
                                <img src="http://via.placeholder.com/128X128" class="rounded-circle" alt="image" />
                            </figure>
                            <div>
                                <h5>Byrom Guittet</h5>
                                <div class="time">10:12 PM</div>
                            </div>
                        </div>
                        <div class="message-content">
                            What files are you talking about? I'm sorry I can't remember right now.
                        </div>
                    </div>
                    <div class="message-item outgoing-message">
                        <div class="message-avatar">
                            <figure class="avatar">
                                <img src="http://via.placeholder.com/128X128" class="rounded-circle" alt="image" />
                            </figure>
                            <div>
                                <h5>Mirabelle Tow</h5>
                                <div class="time">11:56 PM <i class="ti-double-check text-info"></i></div>
                            </div>
                        </div>
                        <div class="message-content">
                            I want those files for you. I want you to send 1 PDF and 1 image file.
                        </div>
                    </div>
                    <div class="message-item">
                        <div class="message-avatar">
                            <figure class="avatar">
                                <img src="http://via.placeholder.com/128X128" class="rounded-circle" alt="image" />
                            </figure>
                            <div>
                                <h5>Byrom Guittet</h5>
                                <div class="time">11:59 PM</div>
                            </div>
                        </div>
                        <div class="message-content message-file">
                            <div class="file-icon">
                                <i class="fa fa-file-pdf-o"></i>
                            </div>
                            <div>
                                <div>important_documents.pdf <i class="text-muted small">(50KB)</i></div>
                                <ul class="list-inline">
                                    <li class="list-inline-item mb-0"><a href="#">Download</a></li>
                                    <li class="list-inline-item mb-0"><a href="#">View</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="message-item messages-divider sticky-top" data-label="Today"></div>
                    <div class="message-item">
                        <div class="message-avatar">
                            <figure class="avatar">
                                <img src="http://via.placeholder.com/128X128" class="rounded-circle" alt="image" />
                            </figure>
                            <div>
                                <h5>Byrom Guittet</h5>
                                <div class="time">07:15 AM</div>
                            </div>
                        </div>
                        <div class="message-content">
                            I'm about to send the other file now.
                        </div>
                    </div>
                    <div class="message-item outgoing-message">
                        <div class="message-avatar">
                            <figure class="avatar">
                                <img src="http://via.placeholder.com/128X128" class="rounded-circle" alt="image" />
                            </figure>
                            <div>
                                <h5>Mirabelle Tow</h5>
                                <div class="time">07:45 AM <i class="ti-double-check text-info"></i></div>
                            </div>
                        </div>
                        <div class="message-content">
                            Thank you so much. These files are very important to me. I guess you didn't make any changes
                            to these files. So I need the original versions of these files. Thank you very much again.
                        </div>
                    </div>
                    <div class="message-item">
                        <div class="message-avatar">
                            <figure class="avatar">
                                <img src="http://via.placeholder.com/128X128" class="rounded-circle" alt="image" />
                            </figure>
                            <div>
                                <h5>Byrom Guittet</h5>
                                <div class="time">08:00 AM</div>
                            </div>
                        </div>
                        <div class="message-content">
                            I thank you. We are glad to help you. 😃
                        </div>
                    </div>
                    <div class="message-item outgoing-message">
                        <div class="message-avatar">
                            <figure class="avatar">
                                <img src="http://via.placeholder.com/128X128" class="rounded-circle" alt="image" />
                            </figure>
                            <div>
                                <h5>Mirabelle Tow</h5>
                                <div class="time">09:23 AM <i class="ti-double-check text-info"></i></div>
                            </div>
                        </div>
                        <div class="message-content">
                            😃 😃 ❤ ❤
                        </div>
                    </div>
                    <div class="message-item">
                        <div class="message-avatar">
                            <figure class="avatar">
                                <img src="http://via.placeholder.com/128X128" class="rounded-circle" alt="image" />
                            </figure>
                            <div>
                                <h5>Byrom Guittet</h5>
                                <div class="time">10:43 AM</div>
                            </div>
                        </div>
                        <figure>
                            <img src="http://via.placeholder.com/1200X900" class="w-25 img-fluid rounded" alt="image" />
                        </figure>
                    </div>
                    <div class="message-item outgoing-message">
                        <div class="message-avatar">
                            <figure class="avatar">
                                <img src="http://via.placeholder.com/128X128" class="rounded-circle" alt="image" />
                            </figure>
                            <div>
                                <h5>Mirabelle Tow</h5>
                                <div class="time">10:50 AM <i class="ti-double-check text-info"></i></div>
                            </div>
                        </div>
                        <div class="message-content">
                            You are good ❤❤
                        </div>
                    </div>
                    <div class="message-item messages-divider" data-label="1 message unread"></div>
                    <div class="message-item">
                        <div class="message-avatar">
                            <figure class="avatar">
                                <img src="http://via.placeholder.com/128X128" class="rounded-circle" alt="image" />
                            </figure>
                            <div>
                                <h5>Byrom Guittet</h5>
                                <div class="time">11:05 AM</div>
                            </div>
                        </div>
                        <div class="message-content">
                            I sent you all the files. Good luck with 😃
                        </div>
                    </div>
                </div>
            </div>
            <div class="chat-footer">
                <form>
                    <div>
                        <button class="btn btn-light mr-3" data-toggle="tooltip" title="Emoji" type="button">
                            <i data-feather="smile"></i>
                        </button>
                    </div>
                    <input type="text" class="form-control" placeholder="Write a message."/>
                    <div class="form-buttons">
                        <button class="btn btn-light" data-toggle="tooltip" title="Add files" type="button">
                            <i data-feather="paperclip"></i>
                        </button>
                        <button class="btn btn-light d-sm-none d-block" data-toggle="tooltip"
                                title="Send a voice record" type="button">
                            <i data-feather="mic"></i>
                        </button>
                        <button class="btn btn-primary" type="submit">
                            <i data-feather="send"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        {/*  ./ chat */}

        <div class="sidebar-group">
            <div id="contact-information" class="sidebar">
                <header>
                    <span>Profile</span>
                    <ul class="list-inline">
                        <li class="list-inline-item">
                            <a href="#" class="btn btn-outline-light text-danger sidebar-close">
                                <i data-feather="x"></i>
                            </a>
                        </li>
                    </ul>
                </header>
                <div class="sidebar-body">
                    <div class="pl-4 pr-4">
                        <div class="text-center">
                            <figure class="avatar avatar-xl mb-4">
                                <img src="http://via.placeholder.com/128X128" class="rounded-circle" alt="image" />
                            </figure>
                            <h5 class="mb-1">Mirabelle Tow</h5>
                            <small class="text-muted font-italic">Last seen: Today</small>

                            <ul class="nav nav-tabs justify-content-center mt-5" id="myTab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab"
                                       aria-controls="home" aria-selected="true">About</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab"
                                       aria-controls="profile" aria-selected="false">Media</a>
                                </li>
                            </ul>
                        </div>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <p class="text-muted">Lorem ipsum is a pseudo-Latin text used in web design, typography,
                                    layout, and printing in place of English to emphasise design elements over content.
                                    It's also called placeholder (or filler) text. It's a convenient tool for
                                    mock-ups.</p>
                                <div class="mt-4 mb-4">
                                    <h6>Phone</h6>
                                    <p class="text-muted">(555) 555 55 55</p>
                                </div>
                                <div class="mt-4 mb-4">
                                    <h6>City</h6>
                                    <p class="text-muted">Germany / Berlin</p>
                                </div>
                                <div class="mt-4 mb-4">
                                    <h6>Website</h6>
                                    <p>
                                        <a href="#">www.franshanscombe.com</a>
                                    </p>
                                </div>
                                <div class="mt-4 mb-4">
                                    <h6 class="mb-3">Social media accounts</h6>
                                    <ul class="list-inline social-links">
                                        <li class="list-inline-item">
                                            <a href="#" class="btn btn-sm btn-floating btn-facebook"
                                               data-toggle="tooltip" title="Facebook">
                                                <i class="fa fa-facebook"></i>
                                            </a>
                                        </li>
                                        <li class="list-inline-item">
                                            <a href="#" class="btn btn-sm btn-floating btn-twitter"
                                               data-toggle="tooltip" title="Twitter">
                                                <i class="fa fa-twitter"></i>
                                            </a>
                                        </li>
                                        <li class="list-inline-item">
                                            <a href="#" class="btn btn-sm btn-floating btn-dribbble"
                                               data-toggle="tooltip" title="Dribbble">
                                                <i class="fa fa-dribbble"></i>
                                            </a>
                                        </li>
                                        <li class="list-inline-item">
                                            <a href="#" class="btn btn-sm btn-floating btn-whatsapp"
                                               data-toggle="tooltip" title="Whatsapp">
                                                <i class="fa fa-whatsapp"></i>
                                            </a>
                                        </li>
                                        <li class="list-inline-item">
                                            <a href="#" class="btn btn-sm btn-floating btn-linkedin"
                                               data-toggle="tooltip" title="Linkedin">
                                                <i class="fa fa-linkedin"></i>
                                            </a>
                                        </li>
                                        <li class="list-inline-item">
                                            <a href="#" class="btn btn-sm btn-floating btn-google" data-toggle="tooltip"
                                               title="Google">
                                                <i class="fa fa-google"></i>
                                            </a>
                                        </li>
                                        <li class="list-inline-item">
                                            <a href="#" class="btn btn-sm btn-floating btn-behance"
                                               data-toggle="tooltip" title="Behance">
                                                <i class="fa fa-behance"></i>
                                            </a>
                                        </li>
                                        <li class="list-inline-item">
                                            <a href="#" class="btn btn-sm btn-floating btn-instagram"
                                               data-toggle="tooltip" title="Instagram">
                                                <i class="fa fa-instagram"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="mt-4 mb-4">
                                    <h6 class="mb-3">Settings</h6>
                                    <div class="form-group">
                                        <div class="form-item custom-control custom-switch">
                                            <input type="checkbox" class="custom-control-input" id="customSwitch11"/>
                                            <label class="custom-control-label" for="customSwitch11">Block</label>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="form-item custom-control custom-switch">
                                            <input type="checkbox" class="custom-control-input" checked=""
                                                   id="customSwitch12"/>
                                            <label class="custom-control-label" for="customSwitch12">Mute</label>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="form-item custom-control custom-switch">
                                            <input type="checkbox" class="custom-control-input" id="customSwitch13"/>
                                            <label class="custom-control-label" for="customSwitch13">Get
                                                notification</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <h6 class="mb-3 d-flex align-items-center justify-content-between">
                                    <span>Recent Files</span>
                                    <a href="#" class="btn btn-link small">
                                        <i data-feather="upload" class="mr-2"></i> Upload
                                    </a>
                                </h6>
                                <div>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item pl-0 pr-0 d-flex align-items-center">
                                            <a href="#">
                                                <i class="fa fa-file-pdf-o text-danger mr-2"></i> report4221.pdf
                                            </a>
                                        </li>
                                        <li class="list-group-item pl-0 pr-0 d-flex align-items-center">
                                            <a href="#">
                                                <i class="fa fa-image text-muted mr-2"></i> avatar_image.png
                                            </a>
                                        </li>
                                        <li class="list-group-item pl-0 pr-0 d-flex align-items-center">
                                            <a href="#">
                                                <i class="fa fa-file-excel-o text-success mr-2"></i>
                                                excel_report_file2020.xlsx
                                            </a>
                                        </li>
                                        <li class="list-group-item pl-0 pr-0 d-flex align-items-center">
                                            <a href="#">
                                                <i class="fa fa-file-text-o text-warning mr-2"></i> articles342133.txt
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    {/*  ./ content */}

</div>
  )
}

export default Slek
