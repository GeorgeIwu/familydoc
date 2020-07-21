
import React, { useState } from 'react'
import Input from "@material-ui/core/Input";
import SearchItem from './SearchItem'
import useStore from './useStore'

const Search = ({ loggedInUser, searchType, onSelect, children }) => {
  const [value, setValue] = useState('')
  const [results, searchActions] = useStore(searchType, loggedInUser)

  const handleChange = (event) => {
    setValue(event.target.value)
  };

  const filterResults = async (input) => searchActions.filter(input)

  return (
    <div>
      <Input
        onChange={handleChange}
        name='name'
        placeholder='search user'
        value={value}
      />
        {children
          ? results.map(item => children)
          : <SearchItem onSelect={onSelect} />}
    </div>
  );
};

export default Search;

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



