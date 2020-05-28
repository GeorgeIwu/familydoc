import React from 'react';
import {PrivateRoute} from '../components'
import List from './List'
import New from './New'

const Chat = () => (
  <div>
    <PrivateRoute exact path="/chat" component={List} />
    <PrivateRoute exact path="/chat/new" component={New} />
  </div>
);

export default Chat;
