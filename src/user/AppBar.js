
import React from 'react'
import { Link } from 'react-router-dom'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import useStore from './useStore'
import { StyledAppBar } from './style'

const AppBar = ({ children, userID, handleLogout, renderSearch = () => {} }) => {
  const [user] = useStore(userID)
  const [anchorEl, setAnchorEl] = React.useState(null)

  const onLogout= () => {
    handleLogout(userID)
  }

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
          
          {renderSearch({userID})}

          <Link to="/conversation/new" className={'link'}>
            <IconButton color="inherit" aria-label="add">
              <AddIcon />
            </IconButton>
          </Link>

          <div>
            <Typography variant="h6" className={'title'} onClick={handleAvatarOpen}>
              {user.given_name}
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
              <Typography onClick={onLogout} >Logout</Typography>
            </Popover>
          </div>
        </Toolbar>
      </StyledAppBar>
      {children}
    </div>
  );
};

export default AppBar;
