
import React from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useStore from './useStore'
import { StyledSearchBar } from './style'
import SearchItem from '../_lib/components/SearchItem'

const SearchBar = ({ chatID, onSelect, items }) => {
  const [members, membersActions] = useStore(chatID)

  const handleChange = (event) => {
    membersActions.searchUser(event.target.value)
  };

  const getAction = (user) => {
    return items.find(i => i.userID === user.id) && onSelect
  };

  return (
    <StyledSearchBar>
      <Autocomplete
        id="combo-box-demo"
        autoHighlight
        style={{ width: 300 }}
        options={members.search}
        getOptionLabel={(option) => option.given_name}
        renderOption={(item) => (
          <React.Fragment>
            <SearchItem item={item} attribute={'given_name'} handleAction={getAction(item)} />
          </React.Fragment>
        )}
        renderInput={(params) => <TextField {...params} onChange={handleChange} label="Search user" variant="outlined" />}
      />
    </StyledSearchBar>
  );
};

export default SearchBar;

