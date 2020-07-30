
import React from 'react'
import styled from "styled-components";
import Grid from '@material-ui/core/Grid';

import ChatMessages from "../messages";
import ChatMembers from "../members";
import SearchBar from "../user/SearchBar";
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
          <ChatMessages tabName='Messages' userID={userID} chatID={chatID} />
          <div tabName='Members' >
            <SearchBar userID={userID} />
            <ChatMembers  userID={userID} chatID={chatID} />
          </div>
          {/*<ChatMedicals tabName='Medicals' chatApi={chatApi} /> */}
        </Tabs>
      </Grid>
    </StyledGrid>
  )
}

export default ConversationsItem

