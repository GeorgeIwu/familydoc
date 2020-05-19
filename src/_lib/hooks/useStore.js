import React, { createContext, useContext, useEffect, useReducer } from 'react';
import {combineReducers} from '../utils'
import {authActions, authReducer} from './useAuth'

const StoreContext = createContext();
const useStore = () => useContext(StoreContext);

const localState = JSON.parse(localStorage.getItem('store'))
const rootReducer = combineReducers({auth: authReducer})
const initialState = localState || rootReducer(undefined, {type: undefined});

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  useEffect(() => localStorage.setItem("store", JSON.stringify(state)), [state]);

  const store = {auth: state.auth}
  const actions = {
    ...authActions(dispatch),
  }

  return (
    <StoreContext.Provider value={[store, actions]}>
      {children}
    </StoreContext.Provider>
  )
}

export {useStore, StoreProvider}
