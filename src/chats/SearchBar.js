
import React from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useStore from './useStore'
import { StyledSearchBar } from './style'
import SearchItem from '../_lib/components/SearchItem'

const SearchBar = ({ userID, onSelect }) => {
  const [chat, chatActions] = useStore(userID)

  const handleChange = (event) => {
    chatActions.searchChat(event.target.value)
  };

  const isMember = (chat) => chat?.members?.items.find(member => member.userID === userID)

  return (
    <StyledSearchBar>
      <Autocomplete
        id="combo-box-demo"
        style={{ width: 300 }}
        options={chat.search}
        getOptionLabel={(option) => option.name}
        renderOption={(item) => (
          <React.Fragment>
            <SearchItem item={item} attribute={'name'} onAction={!isMember(item) && onSelect} actionName={'Chat'} />
          </React.Fragment>
        )}
        renderInput={(params) => <TextField {...params} onChange={handleChange} label="Search user" variant="outlined" />}
      />
    </StyledSearchBar>
  );
};

export default SearchBar;

