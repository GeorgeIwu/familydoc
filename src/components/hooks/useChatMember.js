
import { useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'

import {getChat} from '../graphql/queries'
import {createChatMember, updateChatMember, deleteChatMember} from '../graphql/mutations'
import * as Actions from '../graphql/apollo'

const GetChat = gql(getChat);
const CreateChatMember = gql(createChatMember)
const UpdateChatMember = gql(updateChatMember)
const DeleteChatMember = gql(deleteChatMember)

const getChatMemberActions = (actions, chat, owner) => ({
  addMember: Actions.getAddChatMember(actions.createChatMember, chat, owner),
  editMember: Actions.getEditChatMember(actions.updateChatMember, chat, owner),
  removeMember: Actions.getRemoveChatMember(actions.deleteChatMember, chat, owner),
})

const useChatMember = (chatId = '', userId = '', nextToken = '') => {
  const [createChatMember] = useMutation(CreateChatMember)
  const [updateChatMember] = useMutation(UpdateChatMember)
  const [deleteChatMember] = useMutation(DeleteChatMember)
  const { subscribeToMore, data: chat } = useQuery(GetChat, {variables: { id: chatId }} )

  useEffect(() => {
    subscribeToMore(Actions.updateAddChatMember(userId))
    subscribeToMore(Actions.updateEditChatMember(userId))
    subscribeToMore(Actions.updateRemoveChatMember(userId))
  }, [userId, subscribeToMore])

  const chatMemberData = chat && chat.getChat && chat.getChat.members
  const chatMemberActions = getChatMemberActions({ createChatMember, updateChatMember, deleteChatMember }, chat.getChat, userId)
  return [chatMemberData, chatMemberActions]
}

export {getChatMemberActions, useChatMember}
