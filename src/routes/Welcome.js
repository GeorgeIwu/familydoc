import React from 'react';
import { useStore } from '../_lib/hooks';

import Content from '../_lib/components/Content'
import Footer from '../_lib/components/Footer'
import Login from '../_lib/components/Login'
import Ribbon from '../_lib/components/Ribbon'
import Signup from '../_lib/components/Signup'
import PageStyle from '../_lib/components/style'

const Welcome = () => {
  const [store, storeActions] = useStore()

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
        <Login login={storeActions.auth.login} loading={store.auth.loading}/>
        <Signup signup={storeActions.auth.signup} />
        <Footer />
      </div>

    </PageStyle>
  )
};

export default Welcome;
