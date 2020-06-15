
import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import Grid from '@material-ui/core/Grid';

import { useStore } from '../components/hooks'
import ChatListItem from "../components/ChatListItem";
import ChatList from "../components/ChatList";
import Tabs from "../components/Tabs";

import ChatMembers from "./elements/ChatMembers";
import ChatMessages from "./elements/ChatMessages";
import ChatMedicals from "./elements/ChatMedicals";

const StyledGrid = styled(Grid)`
  .root: {
    flex-grow: 1
  }
`

const Chats = ({history}) => {
  const [store] = useStore()
  const {chats} = store.user
  const [chat, setChat] = useState()

  useEffect(() => {
    if (chats.items[0] && chats.items[0].id) {
      setChat(chats.items[0].chat)
    }
  }, [chats])

  return (
    <StyledGrid container className={'root'} spacing={2}>
      <Grid item xs={4}>
        <ChatList >
          {chats.items.map(item =>
            <ChatListItem key={item.id} chat={item.chat} isLast={false} onClick={() => setChat(item.chat)} />)}
        </ChatList>
      </Grid>
      <Grid item xs={8}>
        <Tabs>
          {/*<ChatMessages tabName='Messages' chat={chat} />*/}
          {/*<ChatMembers tabName='Members' chat={chat} />*/}
          {/*<ChatMedicals tabName='Medicals' chatApi={chatApi} /> */}
        </Tabs>
      </Grid>
    </StyledGrid>
  )
}

export default Chats

