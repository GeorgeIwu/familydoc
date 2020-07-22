import React, { createContext, useContext, useEffect, useReducer } from 'react';
import {combineReducers} from '../utils'
import {formActions, formReducer} from './useForm'
import useAuth from './useAuth'

const localState = JSON.parse(localStorage.getItem('store')) || {}

const StoreContext = createContext();
const useStore = () => useContext(StoreContext);
const rootReducer = combineReducers({ form: formReducer, })
const initialState = localState || rootReducer(undefined, {type: undefined});

const StoreProvider = ({ children }) => {
  const [auth, authActions] = useAuth(localState.auth)
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const store = { ...state, auth }
  
  useEffect(() => localStorage.setItem("store", JSON.stringify(store)), [store]);

  const actions = { ...formActions(dispatch), ...authActions }

  return (
    <StoreContext.Provider value={[store, actions]}>
      {children}
    </StoreContext.Provider>
  )
}

export {useStore, StoreProvider}
