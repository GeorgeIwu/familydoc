
import React from 'react'
import styled from "styled-components";
import List from '@material-ui/core/List'
import ChatList from "../chats/ChatList";
import { useStore } from '../_lib/hooks'

const StyledDiv = styled.div`
  background-color: grey
  padding: 5px
  list: {
    background-color: yellow;
  }
`

const Conversations = ({ history }) => {
  const [store] = useStore()

  const handleSelect = (item) => {
    history.push(`/conversation/${item.id}`)
  }

  return (
    <StyledDiv>
      <List >
        <ChatList userID={store.auth.user.id} handleSelect={handleSelect} />
      </List>
    </StyledDiv>
  )
}

export default Conversations

