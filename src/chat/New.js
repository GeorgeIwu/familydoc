
import React from 'react'
import styled from "styled-components";
import Grid from '@material-ui/core/Grid';

import { useChats, useForm, useStore } from '../components/hooks'
import Button from "../components/Button";
import Input from "../components/Input";

const StyledGrid = styled(Grid)`
  .root: {
    flex-grow: 1
  }
`

const ChatAdd = ({ history }) => {
  const [store] = useStore()
  const [_, chatsActions] = useChats(store.user.id)
  const [form, formActions] = useForm({ text: '' })
  const { values } = form

  const onChange = (e) => formActions.change({ name: e.target.name, value: e.target.value })

  const addChat = async () => {
    if (!values.text) return
    const input = { text: values.text }
    chatsActions.addChat(input)
    formActions.reset()
  }

  return (
    <StyledGrid container className={'root'} spacing={2}>
      <Input
        onChange={onChange}
        name='text'
        placeholder='add message'
        value={values.text}
      />
      <Button onClick={addChat}>Create Message</Button>
    </StyledGrid>
  )
}

export default ChatAdd

