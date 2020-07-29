
import React, { useState } from 'react'
import Input from "@material-ui/core/Input";
import Popover from '@material-ui/core/Popover';
import useStore from './useStore'
import { StyledSearchBar } from './style'
import SearchItem from '../_lib/components/SearchItem'

const Search = ({ userID, onSelect, children }) => {
  const [value, setValue] = useState('')
  const [user, userActions] = useStore(userID)
  const [anchorEl, setAnchorEl] = React.useState(null)

  // const handleAvatarOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleAvatarClose = () => {
  //   setAnchorEl(null);
  // };

  const handleChange = (event) => {
    setValue(event.target.value)
    setAnchorEl(event.currentTarget);
    userActions.searchUser(event.target.value, 'RECEIVER')
  };

  return (
    <StyledSearchBar>
      <Input
        onChange={handleChange}
        name='name'
        placeholder='search user'
        value={value}
      />
        {value && user.search.map(item => children
            ? children(item)
            : <Popover
                key={item.id}
                className={'popover'}
                open={!!value}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                disableRestoreFocus
              >
                <SearchItem item={item} attribute={'given_name'} handleAction={onSelect} />
              </Popover>)
        }
    </StyledSearchBar>
  );
};

export default Search;

