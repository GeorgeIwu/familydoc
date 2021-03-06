import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import PrivateRoute from './PrivateRoute'
import Welcome from './Welcome';
// import Welcome from '../slek';
// import Welcome from '../mui';
import Recover from './Recover';
import Verify from './Verify';
import Conversations from './Conversations';
import ConversationsItem from './ConversationsItem';
// import ConversationAdd from './ConversationAdd';

const history = createBrowserHistory();

const Router = () => {
  return (
    <HashRouter history={history}>
      <div>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/verify" component={Verify} />
        <Route exact path="/forgot-password" component={Recover} />
        <PrivateRoute exact path="/conversation" component={Conversations} />
        <PrivateRoute exact path="/conversation/:id" component={ConversationsItem} />
        {/*<PrivateRoute exact path="/conversation/new" component={ConversationAdd} />*/}
      </div>
    </HashRouter>
  )
}

export default Router
