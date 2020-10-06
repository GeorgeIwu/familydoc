import cloneDeep from 'lodash/cloneDeep'
// function combineReducers(reducers) {
//   return (state = {}, action) => {
//     const newState = {};
//     for (let key in reducers) {
//       newState[key] = reducers[key](state[key], action);
//     }
//     return newState;
//   }
// }

export const getInitialState = (reducerDict) => {
  return Object.keys(reducerDict).reduce((acc, curr) => {
    const slice = reducerDict[curr](undefined, { type: undefined });
    return { ...acc, [curr]: slice };
  }, {});
}

export const combineReducers = (reducerDict) => {
  const _initialState = getInitialState(reducerDict);
  return function(state = _initialState, action) {
    return Object.keys(reducerDict).reduce((acc, curr) => {
      let slice = reducerDict[curr](state[curr], action);
      return { ...acc, [curr]: slice };
    }, state);
  };
}

export const buildSchema = (input, type, action, additionalInput = {} ) => ({
  __typename: "Mutation",
  [action]: {
    ...input,
    __typename: type,
    ...additionalInput
  }
})

export const getUpdater = (processor, docNode) => (store, { data }) => {
  const oldStore = cloneDeep(store.readQuery(docNode))

  const newStore = processor(oldStore, data)

  console.log(`updater`, newStore)
  return store.writeQuery({ ...docNode, data: newStore})
}

export const getSubscriber = (processor) => (store, { subscriptionData }) => {
  const oldStore = cloneDeep(store)

  const newStore = processor(oldStore, subscriptionData.data)

  console.log(`subscriber`, newStore)
  return newStore
}

export const updateStoreUsers = (store, data) => {
  if (data.getUser) {
    const itemIndex = store.listUsers.items.findIndex(item => item.id === data.getUser.id)
    store.getUser = data || store.listUsers.items[itemIndex]
  }
  if (data.listUsers) {
    const items = store.listUsers || []
    store.listUsers = { ...data, items: data.listUsers.items.concat(items) }
  }
  if (data.createUser) {
    store.getUser = data.createUser
  }
  if (data.upateUser) {
    store.getUser = data.upateUser
  }
  if (data.deleteUser) {
    const itemIndex = store.listUsers.items.findIndex(item => item.id === data.deleteUser.id)
    if (itemIndex !== -1) store.listUsers.items.splice(itemIndex, 1)
  }

  return store
}

export const updateStoreChats = (store, data) => {
  if (data.getChat) {
    const itemIndex = store.listChats.items.findIndex(item => item.id === data.getChat.id)
    store.getChat = data.getChat || store.listChats.items[itemIndex]
  }
  if (data.listChats) {
    const items = store.listChats || []
    store.listChats = { ...data, items: data.listChats.items.concat(items) }
  }
  if (data.createChat) {
    store.listChats.items = [ ...store.listChats.items, data.createChat ]
  }
  if (data.upateChat || data.onUpdateChat || data.onCreateChat) {
    const newData = data.upateChat || data?.onUpdateChat?.chat || data?.onCreateChat?.chat
    let itemIndex = store.listChats.items.findIndex(item => item.id === newData.id)
    console.log({newData, itemIndex})

    itemIndex = itemIndex !== -1 ? itemIndex : store.listChats.items.length
    store.listChats.items[itemIndex] = newData
  }
  if (data.deleteChat || data.onDeleteChat) {
    const newData = data.deleteChat || data?.onDeleteChat.chat
    const itemIndex = store.listChats.items.findIndex(item => item.id === newData.id)

    if (itemIndex !== -1) store.listChats.items.splice(itemIndex, 1)
  }

  return store
}

export const updateStoreMembers = (store, data) => {
  if (data.listMembers) {
    const items = store.listMembers || []
    store.listMembers = { ...data, items: data.listMembers.items.concat(items) }
  }
  if (data.createMember) {
    store.listMembers.items = [ ...store.listMembers.items, data.createMember ]
  }
  if (data.updateMember || data.onUpdateMember || data.onCreateMember) {
    const newData = data.updateMember || data.onUpdateMember || data.onCreateMember
    let itemIndex = store.listMembers.items.findIndex(item => item.id === newData.id)

    itemIndex = itemIndex !== -1 ? itemIndex : store.listMembers.items.length
    store.listMembers.items[itemIndex] = newData
  }
  if (data.deleteMember || data.onDeleteMember) {
    const newData = data.deleteMember || data.onDeleteMember
    const itemIndex = store.listMembers.items.findIndex(item => item.id === newData.id)

    if (itemIndex !== -1) store.listMembers.items.splice(itemIndex, 1)
  }

  return store
}

export const updateStoreMessages = (store, data) => {
  if (data.listMessages) {
    const items = store.listMessages || []
    store.listMessages = { ...data, items: data.listMessages.items.concat(items) }
  }
  if (data.createMessage) {
    store.listMessages.items = [ ...store.listMessages.items, data.createMessage ]
  }
  if (data.updateMessage || data.onUpdateMessage || data.onCreateMessage) {
    const newData = data.updateMessage || data.onUpdateMessage || data.onCreateMessage
    let itemIndex = store.listMessages.items.findIndex(item => item.id === newData.id)

    itemIndex = itemIndex !== -1 ? itemIndex : store.listMessages.items.length
    store.listMessages.items[itemIndex] = newData
  }
  if (data.deleteMessage || data.onDeleteMessage) {
    const newData = data.deleteMessage || data.onDeleteMessage
    const itemIndex = store.listMessages.items.findIndex(item => item.id === newData.id)

    if (itemIndex !== -1) store.listMessages.items.splice(itemIndex, 1)
  }

  return store
}

