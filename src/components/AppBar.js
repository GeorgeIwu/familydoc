
import React from 'react'
import styled from "styled-components";
import { Link } from 'react-router-dom'
import MuAppBar from "@material-ui/core/AppBar";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';

const StyledAppBar = styled(MuAppBar)`
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
`

const AppBar = ({ user = {name: 'Jane'}, logout = () => {}, children }) => {

  return (
    <div>
      <StyledAppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={'menu-button'} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>

          <Link to="/chat/new" className={'link'}>
            <IconButton color="inherit" aria-label="add">
              <AddIcon />
            </IconButton>
          </Link>

          <Typography variant="h6" className={'title'}>
            {user.name}
          </Typography>
        </Toolbar>
      </StyledAppBar>
      {children}
    </div>
  );
};

export default AppBar;
