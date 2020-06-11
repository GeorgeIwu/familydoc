
import { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'

import {getChat} from '../graphql/queries'
import {createMemberChat, deleteMemberChat} from '../graphql/mutations'
import {onCreateMemberChat, onDeleteMemberChat} from '../graphql/subscriptions'
import {updater, subscriber, createdMember, deletedMember, TYPE} from '../utils'

const GetChat = gql(getChat);
const CreateMemberChat = gql(createMemberChat)
const DeleteMemberChat = gql(deleteMemberChat)
const OnCreateMemberChat = gql(onCreateMemberChat)
const OnDeleteMemberChat = gql(onDeleteMemberChat)

const memberActions = (owner, chat, actions) => {
  const {id: memberChatChatId} = chat
  const { createMember = () => {}, deleteMember = () => {} } = actions

  const addMember = async (user) => {
    const input = { memberChatChatId, memberChatMemberId: user.id, createdAt: new Date() }
    return await createMember({
      variables: { input },
      context: { serializationKey: 'CREATE_MEMBER' },
      optimisticResponse: createdMember(chat, user),
      update: updater(TYPE.createMember, { query: GetChat, variables: { id: memberChatChatId } }),
    })
  }

  const removeMember = async (member) => {
    const input = { id: member.id }
    return await deleteMember({
      variables: { input },
      context: { serializationKey: 'DELETE_MEMBER' },
      optimisticResponse: deletedMember(member, chat),
      update: updater(TYPE.deleteMember, { query: GetChat, variables: { id: memberChatChatId } }),
    })
  }

  return {addMember, removeMember}
}

const useMember = (chatId = '', userId = '') => {
  const [chat, setChat] = useState({})
  const [createMember, { data: newMber }] = useMutation(CreateMemberChat)
  const [deleteMember] = useMutation(DeleteMemberChat)
  const { subscribeToMore, data } = useQuery(GetChat, {variables: { id: chatId }})

  console.log({data, newMber})
  const owner = userId

  useEffect(() => {
    subscribeToMore({document: OnCreateMemberChat, variables: { owner }, updateQuery: subscriber(TYPE.onCreateMember)})
    subscribeToMore({document: OnDeleteMemberChat, variables: { owner }, updateQuery: subscriber(TYPE.onDeleteMember)})
  }, [owner, subscribeToMore])

  useEffect(() => {
    if (data) {
      setChat(data.getChat)
    }
  }, [data])

  const members = chat && chat.members
  const actions = memberActions(owner, chat, { createMember, deleteMember })
  return [members, actions]
}

export {memberActions, useMember}
