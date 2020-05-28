
import { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'

import {useStore} from '.'
import {listChats} from '../graphql/queries'
import {createChat, updateChat} from '../graphql/mutations'
import {onCreateChat, onUpdateChat} from '../graphql/subscriptions'
import {updater, subscriber, createdChat, updatedChat, TYPE} from '../utils'

const ListChats = gql(listChats);
const CreateChat = gql(createChat)
const UpdateChat = gql(updateChat)
const OnCreateChat = gql(onCreateChat);
const OnUpdateChat = gql(onUpdateChat);

const chatsActions = (owner, createChat, updateChat) => {
  // const {id: chatChatId} = chat

  const addChat = async ({ name }) => {
    const input = { name, createdAt: new Date() }
    createChat({
      variables: { input },
      context: { serializationKey: 'CREATE_CHAT' },
      optimisticResponse: createdChat(input, owner),
      update: updater(TYPE.createChat, { query: ListChats }),
    })
  }

  const editChat = async (chat) => {
    const input = { id: chat.id }
    updateChat({
      variables: { input },
      context: { serializationKey: 'UPDATE_CHAT' },
      optimisticResponse: updatedChat(chat, chat),
      update: updater(TYPE.updateChat, { query: ListChats }),
    })
  }

  return {addChat, editChat}
}

const useChats = () => {
  const [store] = useStore()
  const [chats, setChats] = useState({items: []})
  const [createChat] = useMutation(CreateChat)
  const [updateChat] = useMutation(UpdateChat)
  const { subscribeToMore, data } = useQuery(ListChats)

  const owner = store.auth.data.attributes.sub

  useEffect(() => {
    subscribeToMore({document: OnCreateChat, variables: { owner }, updateQuery: subscriber(TYPE.onCreateChat)})
    subscribeToMore({document: OnUpdateChat, variables: { owner }, updateQuery: subscriber(TYPE.onUpdateChat)})
  }, [owner, subscribeToMore])

  useEffect(() => {
    if (data) {
      // data.listChats.items.length < 1 && createChat()
      setChats(data.listChats)
    }
  }, [data])

  const actions = chatsActions(owner, createChat, updateChat)
  return [chats, actions]
}

export {chatsActions, useChats}
