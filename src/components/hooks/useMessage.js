
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

const getMessageActions = (actions, chat) => ({
  addMessage: Actions.getAddMessage(actions.createMessage, chat),
  editMessage: Actions.getEditMessage(actions.updateMessage, chat),
  removeMessage: Actions.getRemoveMessage(actions.deleteMessage, chat),
})

const useMessage = (chatId = '', nextToken = '') => {
  const [createMessage] = useMutation(CreateMessage)
  const [updateMessage] = useMutation(UpdateMessage)
  const [deleteMessage] = useMutation(DeleteMessage)
  const { subscribeToMore, data: chat } = useQuery(GetChat, {variables: { id: chatId }} )
  console.log({chatId, chat})

  useEffect(() => {
    subscribeToMore(Actions.updateAddMessage(chat?.owner))
    subscribeToMore(Actions.updateEditMessage(chat?.owner))
    subscribeToMore(Actions.updateRemoveMessage(chat?.owner))
  }, [chat, subscribeToMore])

  const messageData = chat?.getChat?.messages
  const messageActions = getMessageActions({ createMessage, updateMessage, deleteMessage }, chat?.getChat)
  return [messageData, messageActions]
}

export {getMessageActions, useMessage}
