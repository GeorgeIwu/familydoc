
import React from 'react'
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const StyledAppBar = styled(AppBar)`
  .root {
    flex-grow: 1
  }
  .menu-button {
    margin-right: 80%
  }
  .title {
    flex-grow: 1,
  }
`

const AppBars = ({ children }) => {

  return (
    <div>
      <StyledAppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={'menu-button'} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={'title'}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </StyledAppBar>
      {children}
    </div>
  );
};

export default AppBars;
