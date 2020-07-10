
import React from 'react'
import styled from "styled-components";
import Input from "@material-ui/core/Input";


const StyledSearchBar = styled.div`
  .root {
    flex-grow: 1
  }
  .menu-button {
    margin-right: 80%
  }
  .title {
    flex-grow: 1,
  }
  .link {
    color: white
  }
  .popover {
    pointer-events: 'none',
    padding: 10px,
  }
`

const SearchBar = ({ value, onChange = () => {}, children, onCreate}) => {

  const handleChange = (event) => {
    onChange(event)
  };

  return (
    <StyledSearchBar>
      <Input
        onChange={handleChange}
        name='name'
        placeholder='search user'
        value={value}
      />
      {onCreate && <div onClick={onCreate} >Create New</div>}
      {children}
      {<div>-------------------------------</div>}
    </StyledSearchBar>
  );
};

export default SearchBar;
