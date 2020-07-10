import React, { createContext, useContext, useEffect, useReducer } from 'react';
import {combineReducers} from '../utils'
import {formActions, formReducer} from './useForm'
import {useUser} from './useUser'

const localState = JSON.parse(localStorage.getItem('store'))

const StoreContext = createContext();
const useStore = () => useContext(StoreContext);

const rootReducer = combineReducers({form: formReducer})
const initialState = localState || rootReducer(undefined, {type: undefined});

const StoreProvider = ({ children }) => {
  const [user, userActions] = useUser(localState && localState.user)
  const [state, dispatch] = useReducer(rootReducer, initialState);

  const store = { ...state, user }
  const actions = { ...formActions(dispatch), ...userActions }

  useEffect(() => localStorage.setItem("store", JSON.stringify(store)), [store]);

  return (
    <StoreContext.Provider value={[store, actions]}>
      {children}
    </StoreContext.Provider>
  )
}

export {useStore, StoreProvider}
