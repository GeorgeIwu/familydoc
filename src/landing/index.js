import React from 'react';
import {PublicRoute} from '../lib/components'
import Welcome from './Welcome';
import Recover from './Recover';
import Verify from './Verify';


const Landing = () => (
  <div>
    <PublicRoute exact path="/" component={Welcome} />
    <PublicRoute exact path="/forgot-password" component={Recover} />
    <PublicRoute exact path="/verify" component={Verify} />
  </div>
);

export default Landing;
