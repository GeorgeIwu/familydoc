
import { useEffect } from 'react'
import gql from 'graphql-tag'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'

import {getChat, listChats} from '../graphql/queries'
import {createChat, createMessage, updateMessage, deleteMessage, createChatMember, updateChatMember, deleteChatMember} from '../graphql/mutations'
import {onCreateChat, onCreateMessage, onUpdateMessage, onDeleteMessage, onCreateChatMember, onUpdateChatMember, onDeleteChatMember} from '../graphql/subscriptions'
import { subscriber, TYPE } from '../utils'

const GetChat = gql(getChat);
const ListChats = gql(listChats);
const CreateChat = gql(createChat)
const OnCreateChat = gql(onCreateChat)
const CreateMessage = gql(createMessage)
const UpdateMessage = gql(updateMessage)
const DeleteMessage = gql(deleteMessage)
const OnCreateMessage = gql(onCreateMessage)
const OnUpdateMessage = gql(onUpdateMessage)
const OnDeleteMessage = gql(onDeleteMessage)
const CreateChatMember = gql(createChatMember)
const UpdateChatMember = gql(updateChatMember)
const DeleteChatMember = gql(deleteChatMember)
const OnCreateChatMember = gql(onCreateChatMember)
const OnUpdateChatMember = gql(onUpdateChatMember)
const OnDeleteChatMember = gql(onDeleteChatMember)

const useChat = (chatId = '', userId = '') => {
  const owner = userId
  const [createChat] = useMutation(CreateChat)
  const [createMessage] = useMutation(CreateMessage)
  const [updateMessage] = useMutation(UpdateMessage)
  const [deleteMessage] = useMutation(DeleteMessage)
  const [createChatMember] = useMutation(CreateChatMember)
  const [updateChatMember] = useMutation(UpdateChatMember)
  const [deleteChatMember] = useMutation(DeleteChatMember)
  const [getChat, { data: chat }] = useLazyQuery(GetChat, {variables: { id: chatId }})
  const [listChats, { data: chats }] = useLazyQuery(ListChats, {variables: { owner }})
  const [getMedicals, { subscribeToMore: subscribeToMoreMedicals, data: medicals }] = useLazyQuery(GetChat, {variables: { id: chatId }})
  const [getMessages, { subscribeToMore: subscribeToMoreMessages, data: messages }] = useLazyQuery(GetChat, {variables: { id: chatId }})
  const [getMembers, { subscribeToMore: subscribeToMoreMembers, data: members }] = useLazyQuery(GetChat, {variables: { id: chatId }})

  useEffect(() => {
    subscribeToMoreMessages({document: OnCreateMessage, variables: { owner }, updateQuery: subscriber(TYPE.onCreateMessage)})
    subscribeToMoreMessages({document: OnUpdateMessage, variables: { owner }, updateQuery: subscriber(TYPE.onUpdateMessage)})
    subscribeToMoreMessages({document: OnDeleteMessage, variables: { owner }, updateQuery: subscriber(TYPE.onDeleteMessage)})
  }, [owner, subscribeToMoreMessages])

  useEffect(() => {
    subscribeToMoreMembers({document: OnCreateChatMember, variables: { owner }, updateQuery: subscriber(TYPE.onCreateChatMember)})
    subscribeToMoreMembers({document: OnUpdateChatMember, variables: { owner }, updateQuery: subscriber(TYPE.onUpdateChatMember)})
    subscribeToMoreMembers({document: OnDeleteChatMember, variables: { owner }, updateQuery: subscriber(TYPE.onDeleteChatMember)})
  }, [owner, subscribeToMoreMembers])

  useEffect(() => {
    subscribeToMoreMedicals({document: OnCreateMessage, variables: { owner }, updateQuery: subscriber(TYPE.onCreateMessage)})
    subscribeToMoreMedicals({document: OnUpdateMessage, variables: { owner }, updateQuery: subscriber(TYPE.onUpdateMessage)})
    subscribeToMoreMedicals({document: OnDeleteMessage, variables: { owner }, updateQuery: subscriber(TYPE.onDeleteMessage)})
  }, [owner, subscribeToMoreMedicals])

  const chatData = {chats, messages, members, medicals}
  const chatActions = chatActions(owner, chat, { listChats, getChat, getMessages, getMembers, getMedicals, createChat, createMessage, updateMessage, deleteMessage, createChatMember, updateChatMember, deleteChatMember })
  return [chatData, chatActions]
}

export {chatActions, useChat}
