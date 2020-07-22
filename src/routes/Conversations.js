
import React from 'react'
import styled from "styled-components";
import Grid from '@material-ui/core/Grid';

import ChatList from "../chats";
import { useStore } from '../lib/hooks'
import Tabs from "../lib/components/Tabs";

// import ChatMembers from "./ChatMembers";
// import ChatMessages from "./ChatMessages";
// import ChatMedicals from "./ChatMedicals";

const StyledGrid = styled(Grid)`
  .root: {
    flex-grow: 1
  }
`

const Chats = () => {
  const [store] = useStore()

  return (
    <StyledGrid container className={'root'} spacing={2}>
      <Grid item xs={4}>
        <ChatList user={store.auth.user.id} />
      </Grid>
      <Grid item xs={8}>
        <Tabs>
          {/*<ChatMessages tabName='Messages' chat={chat} />
          <ChatMembers tabName='Members' chat={chat} />
          {/*<ChatMedicals tabName='Medicals' chatApi={chatApi} /> */}
        </Tabs>
      </Grid>
    </StyledGrid>
  )
}

export default Chats

