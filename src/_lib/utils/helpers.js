export const getUserFilter = (name, type) => ({
  type: { eq: type },
  or: [
    { given_name: { contains: `${name}` } },
    { family_name: { contains: `${name}`} },
    { username: { contains: `${name}`} },
    { email: { contains: `${name}`} },
  ]
})

export const buildSchema = (input, type, action, additionalInput = {} ) => ({
  __typename: "Mutation",
  [action]: {
    ...input,
    __typename: type,
    ...additionalInput
  }
})

export const getSubscriber = (processor) => (store, { subscriptionData }) => {
  const oldData = store

  const data = subscriptionData.data
  const item = data[Object.keys(data)[0]]
  const newData = processor(oldData, item)

  return newData
}

export const updateStoreUser = (store, user) => {
  let newStore = {...store}

  if (!newStore.getUser) {
    newStore = { ...newStore, getUser: user }
  } else {
    newStore.getUser = { ...newStore.getUser, ...user }
  }
  return newStore
}

export const updateStoreChats = (store, chats) => {
  let newStore = {...store}

  if (!newStore.listChats) {
    newStore = { ...newStore, listChats: chats }
  } else {
    newStore.listChats.items = [ ...newStore.listChats.items, ...chats.items ]
    newStore.listChats.nextToken = chats.nextToken
  }
  return newStore
}

export const updateStoreChat = (store, chat) => {
  let newStore = {...store}

  if (!newStore.getChat) {
    newStore = { ...newStore, getChat: chat }
  } else {
    newStore.getChat = { ...newStore.getChat, ...chat }
  }
  return newStore
}

export const getUpdater = (processor, type, docNode) => (store, { data }) => {
  const oldData = store.readQuery(docNode)

  const item = data[type]
  const newData = item && processor(oldData, item)
  // console.log({oldData, item, newData})

  return store.writeQuery({ ...docNode, data: newData})
}

export const updateStoreProp = (store, storeType, data, dataType) => {
  if (!store[storeType]) return store

  let newStore = {...store}
  const itemIndex = newStore[storeType][dataType]?.items.findIndex(item => item.id === data.id)

  if (itemIndex === null) {
    newStore[storeType] = { ...newStore[storeType], [dataType]: { items: [data] } }
  } else if (itemIndex === -1) {
    newStore[storeType][dataType].items = [ data, ...newStore[storeType][dataType].items ]
  } else {
    newStore[storeType][dataType].items[itemIndex] = data
  }
  return newStore
}

export const removeStoreProp = (store, storeType, data, dataType) => {
  if (!store[storeType]) return store

  let newStore = {...store}

  const itemIndex = newStore[storeType][dataType]?.items.findIndex(item => item.id === data.id)
  if (itemIndex !== -1) {
    newStore[storeType][dataType].items.splice(itemIndex, 1)
  }
  return newStore
}

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

// function combineReducers(reducers) {
//   return (state = {}, action) => {
//     const newState = {};
//     for (let key in reducers) {
//       newState[key] = reducers[key](state[key], action);
//     }
//     return newState;
//   }
// }
