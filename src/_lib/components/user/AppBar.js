
import React from 'react'
import styled from "styled-components";
import { Link } from 'react-router-dom'
import MuAppBar from "@material-ui/core/AppBar";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
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
  .popover {
    pointer-events: 'none',
    padding: 10px,
  }
`

const AppBar = ({ user = {name: 'Jane'}, logout = () => {}, children }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleAvatarOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <StyledAppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={'menu-button'} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>

          <Link to="/conversation/new" className={'link'}>
            <IconButton color="inherit" aria-label="add">
              <AddIcon />
            </IconButton>
          </Link>

          <div>
            <Typography variant="h6" className={'title'} onClick={handleAvatarOpen}>
              {user.name}
            </Typography>
            <Popover
              className={'popover'}
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              onClose={handleAvatarClose}
              disableRestoreFocus
            >
              <Typography onClick={logout} >Logout</Typography>
            </Popover>
          </div>
        </Toolbar>
      </StyledAppBar>
      {children}
    </div>
  );
};

export default AppBar;
