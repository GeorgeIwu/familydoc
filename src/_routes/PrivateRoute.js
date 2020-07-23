import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {useStore} from '../_lib/hooks'
import AppBar from '../user/AppBar'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [store, storeActions] = useStore()
  const userID = store.auth.user.id

  return (
    <Route
      {...rest}
      render={props =>
        !userID
          ? <Redirect to={{ pathname: `/`, state: { from: props.location } }}/>
          : <AppBar userID={userID} handleLogout={storeActions.auth.logout} >
              <Component {...props} />
            </AppBar>
      }
    />
  );
};

export default PrivateRoute;


