
import { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'

import {getChat} from '../graphql/queries'
import {createChatMember, deleteChatMember} from '../graphql/mutations'
import {onCreateChatMember, onDeleteChatMember} from '../graphql/subscriptions'
import {updater, subscriber, createdChatMember, deletedChatMember, TYPE} from '../utils'

const GetChat = gql(getChat);
const CreateChatMember = gql(createChatMember)
const DeleteChatMember = gql(deleteChatMember)
const OnCreateChatMember = gql(onCreateChatMember)
const OnDeleteChatMember = gql(onDeleteChatMember)

const memberActions = (owner, chat, actions) => {
  const {id: memberChatChatId} = chat
  const { createChatMember = () => {}, deleteChatMember = () => {} } = actions

  const addMember = async (user) => {
    const input = { memberChatChatId, memberChatMemberId: user.id, createdAt: new Date() }
    return await createChatMember({
      variables: { input },
      context: { serializationKey: 'CREATE_MEMBER' },
      optimisticResponse: createdChatMember(chat, user),
      update: updater(TYPE.createChatMember, { query: GetChat, variables: { id: memberChatChatId } }),
    })
  }

  const removeMember = async (member) => {
    const input = { id: member.id }
    return await deleteChatMember({
      variables: { input },
      context: { serializationKey: 'DELETE_MEMBER' },
      optimisticResponse: deletedChatMember(member, chat),
      update: updater(TYPE.deleteChatMember, { query: GetChat, variables: { id: memberChatChatId } }),
    })
  }

  return {addMember, removeMember}
}

const useMember = (chatId = '', userId = '') => {
  const [chat, setChat] = useState({})
  const [createChatMember] = useMutation(CreateChatMember)
  const [deleteChatMember] = useMutation(DeleteChatMember)
  const { subscribeToMore, data } = useQuery(GetChat, {variables: { id: chatId }})

  const owner = userId

  useEffect(() => {
    subscribeToMore({document: OnCreateChatMember, variables: { owner }, updateQuery: subscriber(TYPE.onCreateChatMember)})
    subscribeToMore({document: OnDeleteChatMember, variables: { owner }, updateQuery: subscriber(TYPE.onDeleteChatMember)})
  }, [owner, subscribeToMore])

  useEffect(() => {
    if (data) {
      setChat(data.getChat)
    }
  }, [data])

  const members = chat && chat.members
  const actions = memberActions(owner, chat, { createChatMember, deleteChatMember })
  return [members, actions]
}

export {memberActions, useMember}
