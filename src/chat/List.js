
import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import Grid from '@material-ui/core/Grid';

import { useChat, useChats, useStore } from '../components/hooks'
import ChatListItem from "../components/ChatListItem";
import ChatList from "../components/ChatList";
import Tabs from "../components/Tabs";

import ChatMessages from "./elements/ChatMessages";
import ChatMedicals from "./elements/ChatMedicals";
import ChatMembers from "./elements/ChatMembers";

const StyledGrid = styled(Grid)`
  .root: {
    flex-grow: 1
  }
`

const Chats = ({history}) => {
  const [store] = useStore()
  const [chatId, setChatId] = useState()
  const [chats] = useChats(store.user.id)
  const chatApi = useChat(chatId, store.user.id)

  useEffect(() => {
    if (chats.items[0] && chats.items[0].id) {
      setChatId(chats.items[0].id)
    }
  }, [chats.items])

  return (
    <StyledGrid container className={'root'} spacing={2}>
      <Grid item xs={4}>
        <ChatList >
          {chats.items.map(chat =>
            <ChatListItem key={chat.id} chat={chat} isLast={false} onClick={() => setChatId(chat.id)} />)}
        </ChatList>
      </Grid>
      <Grid item xs={8}>
        <Tabs>
          <ChatMessages tabName='Messages' chatApi={chatApi} />
          <ChatMedicals tabName='Medicals' chatApi={chatApi} />
          <ChatMembers tabName='Memebers' chatApi={chatApi} />
        </Tabs>
      </Grid>
    </StyledGrid>
  )
}

export default Chats

