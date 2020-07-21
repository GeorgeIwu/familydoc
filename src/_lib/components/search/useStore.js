
import debounce from 'lodash/debounce'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import * as Store from './store'

const getActions = (actions, userID) => ({
  addProvider: Store.getCreateUser(actions),
  addReceiver: Store.getCreateUser(actions, userID),
  searchUser: debounce(async (name, type = 'RECEIVER') => Store.getSearch(actions.listUsers)(name, type), 100),
})

export default (searchType, userID, nextToken = '') => {
  const query = searchType = 'Chats' ? Store.ListChats : Store.ListUsers
  const [createUser] = useMutation(Store.CreateUser)
  const [createChat] = useMutation(Store.CreateChat)
  const [createMessage] = useMutation(Store.CreateMessage)
  const [createChatMember] = useMutation(Store.CreateChatMember)
  const [listResults, { data: results }] = useLazyQuery(query)

  const searchData = results?.listUsers
  const searchActions =  getActions({ listResults, createUser, createChat, createMessage, createChatMember }, userID)

  return [searchData, searchActions]
}
