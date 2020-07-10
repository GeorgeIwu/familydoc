
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

const getChatMemberActions = (actions, chat) => ({
  addMember: Actions.getAddChatMember(actions.createChatMember, chat),
  editMember: Actions.getEditChatMember(actions.updateChatMember, chat),
  removeMember: Actions.getRemoveChatMember(actions.deleteChatMember, chat),
})

const useChatMember = (chatId = '', nextToken = '') => {
  const [createChatMember] = useMutation(CreateChatMember)
  const [updateChatMember] = useMutation(UpdateChatMember)
  const [deleteChatMember] = useMutation(DeleteChatMember)
  const { subscribeToMore, data: chat } = useQuery(GetChat, {variables: { id: chatId }} )

  useEffect(() => {
    subscribeToMore(Actions.updateAddChatMember(chat?.owner))
    subscribeToMore(Actions.updateEditChatMember(chat?.owner))
    subscribeToMore(Actions.updateRemoveChatMember(chat?.owner))
  }, [chat, subscribeToMore])

  const chatMemberData = chat?.getChat?.members
  const chatMemberActions = getChatMemberActions({ createChatMember, updateChatMember, deleteChatMember }, chat?.getChat)
  return [chatMemberData, chatMemberActions]
}

export {getChatMemberActions, useChatMember}
