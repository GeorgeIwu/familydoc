
import React from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useStore from './useStore'
import { StyledSearchBar } from './style'
import SearchItem from '../_lib/components/SearchItem'

const SearchBar = ({ userID, onSelect, children }) => {
  const [user, userActions] = useStore(userID)

  const handleChange = (event) => {
    userActions.searchUser(event.target.value)
  };

  return (
    <StyledSearchBar>
      <Autocomplete
        id="combo-box-demo"
        autoHighlight
        style={{ width: 300 }}
        options={user.search}
        getOptionLabel={(option) => option.given_name}
        renderOption={(option) => (
          <React.Fragment>
            <SearchItem item={option} attribute={'given_name'} handleAction={onSelect} />
          </React.Fragment>
        )}
        renderInput={(params) => <TextField {...params} onChange={handleChange} label="Search user" variant="outlined" />}
      />
    </StyledSearchBar>
  );
};

export default SearchBar;

