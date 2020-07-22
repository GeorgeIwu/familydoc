import React from 'react';
import styled from "styled-components";
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const StyledItem = styled.div`
  inline: {
    display: inline
  }
`

const ChatListItem = ({
  chat = {},
  isLast = false,
  onClick = () => {},
  lastestAppt = '23-09-2020',
  lastestMessage = '— I will be in your neighborhood doing errands this…'
}) => {

  return (
    <StyledItem onClick={onClick}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={chat.name}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={'inline'}
                color="textPrimary"
              >
                Appointment
              </Typography>
              {lastestAppt}
            </React.Fragment>
          }
        />

      </ListItem>
      {!isLast && <Divider variant="inset" component="li" />}
    </StyledItem>
  );
}

export default ChatListItem
