
import React, { useState } from 'react'
import Input from "@material-ui/core/Input";
import useStore from './useStore'
import SearchItem from '../_lib/components/SearchItem'

const Search = ({ userID, onSelect, children }) => {
  const [value, setValue] = useState('')
  const [user, userActions] = useStore(userID)

  const handleChange = (event) => {
    const name = event.target.value
    setValue(name)
    userActions.searchUser(name, 'RECEIVER')
  };

  return (
    <div>
      <Input
        onChange={handleChange}
        name='name'
        placeholder='search user'
        value={value}
      />
        {user.search.map(item => children
            ? children(item)
            : <SearchItem item={item} attribute={'name'} handleAction={onSelect} />)
        }
    </div>
  );
};

export default Search;

