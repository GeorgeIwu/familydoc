import React from 'react';
import {PrivateRoute} from '../lib/components'
import List from './List'
import New from './New'

const Chat = () => (
  <div>
    <PrivateRoute exact path="/conversation" component={List} />
    <PrivateRoute exact path="/conversation/new" component={New} />
  </div>
);

export default Chat;
