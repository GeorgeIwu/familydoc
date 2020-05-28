import React from 'react';
import { useStore } from '../components/hooks';

import Content from './elements/Content'
import Footer from './elements/Footer'
import Login from './elements/Login'
import Ribbon from './elements/Ribbon'
import Signup from './elements/Signup'
import PageStyle from './elements/style'

const Welcome = () => {
  const [_, storeActions] = useStore()

  const onLinkClick = (id) => (e) => {
    e.preventDefault()
    document.getElementById(id).scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }

  return (
    <PageStyle>
      <div className="header">
          <div className="home-menu pure-menu pure-menu-horizontal pure-menu-fixed">
              <a className="pure-menu-heading" href="/">Your Site</a>

              <ul className="pure-menu-list">
                  <li className="pure-menu-item pure-menu-selected"><a href="/" className="pure-menu-link">Home</a></li>
                  <li className="pure-menu-item"><a href="/#" onClick={onLinkClick('signup')} className="pure-menu-link">Sign Up</a></li>
                  <li className="pure-menu-item"><a href="/#" onClick={onLinkClick('login')} className="pure-menu-link">Login</a></li>
              </ul>
          </div>
      </div>

      <div className="splash-container">
        <div className="splash">
            <h1 className="splash-head">Big Bold Text</h1>
            <p className="splash-subhead">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
            <p>
                <a href="http://purecss.io" className="pure-button pure-button-primary">Get Started</a>
            </p>
        </div>
      </div>


      <div className="content-wrapper">
        <Content />
        <Ribbon />
        <Login login={storeActions.login} />
        <Signup signup={storeActions.signup} />
        <Footer />
      </div>

    </PageStyle>
  )
};

export default Welcome;
