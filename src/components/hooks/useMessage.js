
import { useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'

import {getChat} from '../graphql/queries'
import {createMessage, updateMessage, deleteMessage} from '../graphql/mutations'
import * as Actions from '../graphql/apollo'

const GetChat = gql(getChat);
const CreateMessage = gql(createMessage)
const UpdateMessage = gql(updateMessage)
const DeleteMessage = gql(deleteMessage)

const getMessageActions = (actions, chat, owner) => ({
  addMessage: Actions.getAddMessage(actions.createMessage, chat, owner),
  editMessage: Actions.getEditMessage(actions.updateMessage, chat, owner),
  removeMessage: Actions.getRemoveMessage(actions.removeMessage, chat, owner),
})

const useMessage = (chatId = '', userId = '', nextToken = '') => {
  const [createMessage] = useMutation(CreateMessage)
  const [updateMessage] = useMutation(UpdateMessage)
  const [deleteMessage] = useMutation(DeleteMessage)
  const { subscribeToMore, data: chat } = useQuery(GetChat, {variables: { id: chatId }} )

  useEffect(() => {
    subscribeToMore(Actions.updateAddMessage(userId))
    subscribeToMore(Actions.updateEditMessage(userId))
    subscribeToMore(Actions.updateRemoveMessage(userId))
  }, [userId, subscribeToMore])

  const messageData = chat && chat.getChat && chat.getChat.messages
  const messageActions = getMessageActions({ createMessage, updateMessage, deleteMessage }, chat, userId)
  return [messageData, messageActions]
}

export {getMessageActions, useMessage}
