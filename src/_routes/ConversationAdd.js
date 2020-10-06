
import React, { useEffect } from 'react'
import styled from "styled-components";
import Grid from '@material-ui/core/Grid';

import UserForm from "../user/UserForm";
import { useStore } from '../_lib/hooks'

const StyledGrid = styled(Grid)`
  .root: {
    padding: 90px
  }
`

const ChatAdd = ({ history }) => {
  const [store] = useStore()

  const handleComplete = () => history.push('/conversation')

  return (
    <StyledGrid container className={'root'} spacing={2}>
      <UserForm userID={store.auth.user.id} onComplete={handleComplete} />
    </StyledGrid>
  )
}

export default ChatAdd

