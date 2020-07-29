
import { useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import * as Store from './store'

export const getActions = (actions) => ({
  fetchChat: Store.getFetchChat(actions.getChat),
  searchChat: Store.getSearchChat(actions.searchChats),
})

export default (userID = '', nextToken = '') => {
  const [ getChat] = useLazyQuery(Store.GetChat)
  const [ searchChats, { data: searchData } ] = useLazyQuery(Store.SearchChats)
  const { subscribeToMore, data: chatsData } = useQuery(Store.ListChats, { variables: { userID } } )

  useEffect(() => {
    if (chatsData) {
      subscribeToMore(Store.onAddChat(userID))
      subscribeToMore(Store.onEditChat(userID))
      subscribeToMore(Store.onRemoveChat(userID))
    }
  }, [userID, chatsData, subscribeToMore])

  const chats = {
    search: searchData?.searchChats?.items || [],
    items:  chatsData?.listChats?.items || [] }
  const chatActions = getActions({ getChat, searchChats })
  return [chats, chatActions]
}
