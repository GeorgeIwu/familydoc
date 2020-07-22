import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {useStore} from '../hooks'
import AppBar from './AppBar'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [store, storeActions] = useStore()

  const {user} = store
  const isAuthed = !!(user && user.id)

  return (
    <Route
      {...rest}
      render={props =>
        isAuthed ? <AppBar logout={storeActions.logoutUser} ><Component {...props} /></AppBar>
          : <Redirect to={{ pathname: `/`, state: { from: props.location } }}/>
      }
    />
  );
};

export default PrivateRoute;


