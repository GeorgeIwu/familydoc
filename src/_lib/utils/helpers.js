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
  const oldData = store.readQuery(docNode)

  const newData = processor(oldData, data)
  // console.log({oldData, item, newData})

  return store.writeQuery({ ...docNode, data: newData})
}

export const getSubscriber = (processor) => (store, { subscriptionData }) => {
  console.log(`subscribing`, processor, subscriptionData)
  // const oldData = store

  // const data = subscriptionData.data
  // // const item = data[Object.keys(data)[0]]
  // const newData = processor(oldData, data)

  // return newData
}

export const getUserFilter = (name, type) => ({
  type: { eq: type },
  or: [
    { given_name: { contains: `${name}` } },
    { family_name: { contains: `${name}`} },
    { username: { contains: `${name}`} },
    { email: { contains: `${name}`} },
  ]
})

export const updateStoreUsers = (store, data) => {
  let newStore = { ...store }

  if (data.createUser) {
    newStore.getUser = data.createUser
  }
  if (data.getUser) {
    const itemIndex = newStore.listUsers.items.findIndex(item => item.id === data.getUser.id)
    newStore.getUser = data || newStore.listUsers.items[itemIndex]
  }
  if (data.listUsers) {
    const items = newStore.listUsers || []
    newStore.listUsers = { ...data, items: data.listUsers.items.concat(items) }
  }
  if (data.upateUser) {
    newStore.getUser = data.upateUser
  }
  if (data.deleteUser) {
    const itemIndex = newStore.listUsers.items.findIndex(item => item.id === data.deleteUser.id)
    newStore.listUsers.items.splice(itemIndex, 1)
  }

  return newStore
}

export const updateStoreChats = (store, data) => {
  let newStore = { ...store }

  if (data.createChat) {
    newStore.listChats.items = [ ...newStore.listChats.items, data.createChat ]
  }
  if (data.getChat) {
    const itemIndex = newStore.listChats.items.findIndex(item => item.id === data.getChat.id)
    newStore.getChat = data.getChat || newStore.listChats.items[itemIndex]
  }
  if (data.listChats) {
    const items = newStore.listChats || []
    newStore.listChats = { ...data, items: data.listChats.items.concat(items) }
  }
  if (data.upateChat) {
    const itemIndex = newStore.listChats.items.findIndex(item => item.id === data.upateChat.id)
    newStore.listChats.items[itemIndex] = data.upateChat
  }
  if (data.deleteChat) {
    const itemIndex = newStore.listChats.items.findIndex(item => item.id === data.deleteChat.id)
    newStore.listChats.items.splice(itemIndex, 1)
  }

  return newStore
}

export const updateStoreMessages = (store, data) => {
  let newStore = { ...store }

  if (data.createMessage) {
    newStore.listMessages.items = [ ...newStore.listMessages.items, data.createMessage ]
  }
  if (data.listMessages) {
    const items = newStore.listMessages || []
    newStore.listMessages = { ...data, items: data.listMessages.items.concat(items) }
  }
  if (data.upateMessage) {
    const itemIndex = newStore.listMessages.items.findIndex(item => item.id === data.upateMessage.id)
    newStore.listMessages.items[itemIndex] = data.upateMessage
  }
  if (data.deleteMessage) {
    const itemIndex = newStore.listMessages.items.findIndex(item => item.id === data.deleteMessage.id)
    newStore.listMessages.items.splice(itemIndex, 1)
  }

  return newStore
}

export const updateStoreMembers = (store, data) => {
  let newStore = { ...store }

  if (data.createMember) {
    newStore.listMembers.items = [ ...newStore.listMembers.items, data.createMember ]
  }
  if (data.listMembers) {
    const items = newStore.listMembers || []
    newStore.listMembers = { ...data, items: data.listMembers.items.concat(items) }
  }
  if (data.updateMember) {
    const itemIndex = newStore.listMembers.items.findIndex(item => item.id === data.updateMember.id)
    newStore.listMembers.items[itemIndex] = data.updateMember
  }
  if (data.deleteMember) {
    const itemIndex = newStore.listMembers.items.findIndex(item => item.id === data.deleteMember.id)
    newStore.listMembers.items.splice(itemIndex, 1)
  }

  return newStore
}
