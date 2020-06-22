
import React, { useEffect } from 'react'
import styled from "styled-components";
import Grid from '@material-ui/core/Grid';

import { useForm, useStore } from '../components/hooks'

const StyledGrid = styled(Grid)`
  .root: {
    padding: 90px
  }
`

const ChatAdd = ({ history }) => {
  const [store, storeActions] = useStore()
  const [form, formActions] = useForm({ email: '', family_name: '', given_name: '', phone_number: '' })

  const {given_name, family_name, phone_number, email} = form.values
  const onChange = (e) => formActions.change({ name: e.target.name, value: e.target.value })
  const onSubmit = async () => { await storeActions.addReceiver(form.values); history.push('/chat') }

  return (
    <StyledGrid container className={'root'} spacing={2}>
      <label htmlFor="given_name">First name</label>
      <input name='given_name' type='text' onChange={onChange} value={given_name} />

      <label htmlFor="family_name">Surname</label>
      <input name='family_name' type='text' onChange={onChange} value={family_name} />

      <label htmlFor="email">Email</label>
      <input name='email' type='text' onChange={onChange} value={email} />

      <label htmlFor="phone_number">Phone number</label>
      <input name='phone_number' type='text' onChange={onChange} value={phone_number} />

      <button className="pure-button" disabled={form.errors} onClick={onSubmit}>Sumbit</button>
    </StyledGrid>
  )
}

export default ChatAdd

