
import React from 'react'
import styled from "styled-components";
import Grid from '@material-ui/core/Grid';

import MessageList from "../messages/MessageList";
import MemberList from "../members/MemberList";
// import ChatMedicals from "./ChatMedicals";
import { useStore } from '../_lib/hooks'
import Tabs from "../_lib/components/Tabs";


const StyledGrid = styled(Grid)`
  .root: {
    flex-grow: 1
  }
`

const ConversationsItem = ({ history, location }) => {
  const [store] = useStore()
  const chatID = location.pathname.split("/").pop()
  const userID = store.auth.user.id

  return (
    <StyledGrid container className={'root'} spacing={2}>
      <Grid item xs={2}>
      </Grid>
      <Grid item xs={8}>
        <Tabs>
          <MessageList tabName='Messages' userID={userID} chatID={chatID} />
          <MemberList tabName='Members' userID={userID} chatID={chatID} />
          {/*<ChatMedicals tabName='Medicals' chatApi={chatApi} /> */}
        </Tabs>
      </Grid>
    </StyledGrid>
  )
}

export default ConversationsItem

