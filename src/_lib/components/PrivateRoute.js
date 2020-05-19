import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {useStore} from '../hooks'
import AppBars from './AppBars'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [store] = useStore()

  const {data} = store.auth
  const isAuthed = !!(data && data.attributes)

  return (
    <Route
      {...rest}
      render={props =>
        isAuthed ? <AppBars><Component {...props} /></AppBars>
          : <Redirect to={{ pathname: `/`, state: { from: props.location } }}/>
      }
    />
  );
};

export default PrivateRoute;


