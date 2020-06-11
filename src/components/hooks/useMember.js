
import { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'

import {getChat} from '../graphql/queries'
import {createMemberChat, deleteMemberChat} from '../graphql/mutations'
import {onCreateMemberChat, onDeleteMemberChat} from '../graphql/subscriptions'
import {updater, subscriber, createdMemberChat, deletedMemberChat, TYPE} from '../utils'

const GetChat = gql(getChat);
const CreateMemberChat = gql(createMemberChat)
const DeleteMemberChat = gql(deleteMemberChat)
const OnCreateMemberChat = gql(onCreateMemberChat)
const OnDeleteMemberChat = gql(onDeleteMemberChat)

const memberActions = (owner, chat, actions) => {
  const {id: memberChatChatId} = chat
  const { createMemberChat = () => {}, deleteMemberChat = () => {} } = actions

  const addMember = async (user) => {
    const input = { memberChatChatId, memberChatMemberId: user.id, createdAt: new Date() }
    return await createMemberChat({
      variables: { input },
      context: { serializationKey: 'CREATE_MEMBER' },
      optimisticResponse: createdMemberChat(chat, user),
      update: updater(TYPE.createMemberChat, { query: GetChat, variables: { id: memberChatChatId } }),
    })
  }

  const removeMember = async (member) => {
    const input = { id: member.id }
    return await deleteMemberChat({
      variables: { input },
      context: { serializationKey: 'DELETE_MEMBER' },
      optimisticResponse: deletedMemberChat(member, chat),
      update: updater(TYPE.deleteMemberChat, { query: GetChat, variables: { id: memberChatChatId } }),
    })
  }

  return {addMember, removeMember}
}

const useMember = (chatId = '', userId = '') => {
  const [chat, setChat] = useState({})
  const [createMemberChat] = useMutation(CreateMemberChat)
  const [deleteMemberChat] = useMutation(DeleteMemberChat)
  const { subscribeToMore, data } = useQuery(GetChat, {variables: { id: chatId }})

  const owner = userId

  useEffect(() => {
    subscribeToMore({document: OnCreateMemberChat, variables: { owner }, updateQuery: subscriber(TYPE.onCreateMemberChat)})
    subscribeToMore({document: OnDeleteMemberChat, variables: { owner }, updateQuery: subscriber(TYPE.onDeleteMemberChat)})
  }, [owner, subscribeToMore])

  useEffect(() => {
    if (data) {
      setChat(data.getChat)
    }
  }, [data])

  const members = chat && chat.members
  const actions = memberActions(owner, chat, { createMemberChat, deleteMemberChat })
  return [members, actions]
}

export {memberActions, useMember}
