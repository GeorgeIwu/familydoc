
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

