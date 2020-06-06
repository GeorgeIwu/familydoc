
import { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'

import {getChat} from '../graphql/queries'
import {createMessage, updateMessage, deleteMessage} from '../graphql/mutations'
import {onCreateMessage, onUpdateMessage, onDeleteMessage} from '../graphql/subscriptions'
import {updater, subscriber, createdMessage, updatedMessage, deletedMessage, TYPE} from '../utils'

const GetChat = gql(getChat);
const CreateMessage = gql(createMessage)
const UpdateMessage = gql(updateMessage)
const DeleteMessage = gql(deleteMessage)
const OnCreateMessage = gql(onCreateMessage);
const OnUpdateMessage = gql(onUpdateMessage);
const OnDeleteMessage = gql(onDeleteMessage);

const chatActions = (owner, chat, actions) => {
  const {id: messageChatId} = chat
  const { createMessage = () => {}, updateMessage = () => {}, deleteMessage = () => {} } = actions

  const addMessage = async ({ text, type }) => {
    const input = { text, messageChatId, type, owner, createdAt: new Date(), updatedAt: new Date() }
    return createMessage({
      variables: { input },
      context: { serializationKey: 'CREATE_MESSAGE' },
      optimisticResponse: createdMessage(input, chat),
      update: updater(TYPE.createMessage, { query: GetChat, variables: { id: messageChatId } }),
    })
  }

  const editMessage = async ({ __typename, ...rest }) => {
    const input = { ...rest, messageChatId, updatedAt: new Date() }
    return updateMessage({
      variables: { input },
      context: { serializationKey: 'UPDATE_MESSAGE' },
      optimisticResponse: updatedMessage(input, chat),
      update: updater(TYPE.updateMessage, { query: GetChat, variables: { id: messageChatId } }),
    })
  }

  const removeMessage = async (message) => {
    const input = { id: message.id }
    return deleteMessage({
      variables: { input },
      context: { serializationKey: 'DELETE_MESSAGE' },
      optimisticResponse: deletedMessage(message, chat),
      update: updater(TYPE.deleteMessage, { query: GetChat, variables: { id: messageChatId } }),
    })
  }

  return {addMessage, editMessage, removeMessage}
}

const useChat = (id = '', userId = '') => {
  const [chat, setChat] = useState({})
  const [createMessage] = useMutation(CreateMessage)
  const [updateMessage] = useMutation(UpdateMessage)
  const [deleteMessage] = useMutation(DeleteMessage)
  const { subscribeToMore, data } = useQuery(GetChat, {variables: { id }})

  const owner = userId

  useEffect(() => {
    subscribeToMore({document: OnCreateMessage, variables: { owner }, updateQuery: subscriber(TYPE.onCreateMessage)})
    subscribeToMore({document: OnUpdateMessage, variables: { owner }, updateQuery: subscriber(TYPE.onUpdateMessage)})
    subscribeToMore({document: OnDeleteMessage, variables: { owner }, updateQuery: subscriber(TYPE.onDeleteMessage)})
  }, [owner, subscribeToMore])

  useEffect(() => {
    if (data) {
      setChat(data.getChat)
    }
  }, [data])

  const chatItem = {...chat}
  const actions = chatActions(owner, chat, { createMessage, updateMessage, deleteMessage })
  return [chatItem, actions]
}

export {chatActions, useChat}
