
import React from 'react'
import styled from "styled-components";
import Grid from '@material-ui/core/Grid';

import ChatList from "../chats/ChatList";
import { useStore } from '../_lib/hooks'


const StyledGrid = styled(Grid)`
  .root: {
    flex-grow: 1
  }
`

const Conversations = ({ history }) => {
  const [store] = useStore()

  const handleSelect = (item) => {
    history.push(`/conversation/${item.id}`)
  }

  return (
    <StyledGrid container className={'root'} spacing={2}>
      <Grid item xs={12}>
        <ChatList userID={store.auth.user.id} handleSelect={handleSelect} />
      </Grid>
    </StyledGrid>
  )
}

export default Conversations

