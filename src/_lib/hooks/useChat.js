
import { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'

import {useStore} from '../hooks'
import {getChat} from '../graphql/queries'
import {createMessage, deleteMessage} from '../graphql/mutations'
import {onCreateMessage, onDeleteMessage} from '../graphql/subscriptions'
import {updater, subscriber, createdMessage, deletedMessage, TYPE} from '../utils'

const GetChat = gql(getChat);
const CreateMessage = gql(createMessage)
const DeleteMessage = gql(deleteMessage)
const OnCreateMessage = gql(onCreateMessage);
const OnDeleteMessage = gql(onDeleteMessage);

const chatActions = (chat, owner, createMessage, deleteMessage, updateMessage) => {
  const {id: messageChatId} = chat

  const addMessage = async ({ text, type }) => {
    const input = { text, messageChatId, type, owner, createdAt: new Date(), updatedAt: new Date() }
    createMessage({
      variables: { input },
      context: { serializationKey: 'CREATE_MESSAGE' },
      optimisticResponse: createdMessage(input, chat),
      update: updater(TYPE.createMessage, { query: GetChat, variables: { id: messageChatId } }),
    })
  }

  const removeMessage = async (message) => {
    const input = { id: message.id }
    deleteMessage({
      variables: { input },
      context: { serializationKey: 'DELETE_MESSAGE' },
      optimisticResponse: deletedMessage(message, chat),
      update: updater(TYPE.deleteMessage, { query: GetChat, variables: { id: messageChatId } }),
    })
  }

  return {addMessage, removeMessage}
}

const useChat = (id = '') => {
  const [store] = useStore()
  const [chat, setChat] = useState({})
  const [createMessage] = useMutation(CreateMessage)
  const [deleteMessage] = useMutation(DeleteMessage)
  const { subscribeToMore, data } = useQuery(GetChat, {variables: { id }})

  const owner = store.auth.data.attributes.sub

  useEffect(() => {
    subscribeToMore({document: OnCreateMessage, variables: { owner }, updateQuery: subscriber(TYPE.onCreateMessage)})
    subscribeToMore({document: OnDeleteMessage, variables: { owner }, updateQuery: subscriber(TYPE.onDeleteMessage)})
  }, [owner, subscribeToMore])

  useEffect(() => {
    if (data) {
      setChat(data.getChat)
    }
  }, [data])

  const chatItem = {...chat, messages: chat.messages ? chat.messages.items : [],}
  const actions = chatActions(chat, owner, createMessage, deleteMessage)
  return [chatItem, actions]
}

export {chatActions, useChat}
