import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history';

import Landing from './landing';
import Conversation from './conversation';

const history = createBrowserHistory();

const Router = () => {
  return (
    <HashRouter history={history}>
      <div>
        <Route path="/" component={Landing} />
        <Route path="/conversation" component={Conversation} />
      </div>
    </HashRouter>
  )
}

export default Router
