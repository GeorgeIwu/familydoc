import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {useStore} from '../_lib/hooks'
import AppBar from '../user/AppBar'
import SearchBar from '../chats/SearchBar'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [store, storeActions] = useStore()
  const userID = store.auth?.user?.id

  return (
    <Route
      {...rest}
      render={props =>
        !userID
          ? <Redirect to={{ pathname: `/`, state: { from: props.location } }}/>
          : <AppBar
              userID={userID}
              handleLogout={storeActions.auth.logout}
              renderSearch={({userID}) => <SearchBar userID={userID} />}
            >
              <Component {...props} />
            </AppBar>
      }
    />
  );
};

export default PrivateRoute;


