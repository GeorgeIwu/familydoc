import React from 'react';
import styled from "styled-components";
import List from '@material-ui/core/List';

const StyledList = styled(List)`
  .root {
    flex-grow: 1
    width: 100%
    max-width: 36ch
    background-color: theme.palette.background.paper
  }
`

const ChatList = ({ children }) => {

  return (
    <StyledList className={'root'}>
      {children}
    </StyledList>
  );
}

export default ChatList
