
// /////////////////////////////useUser
// import { useState, useEffect, useReducer } from 'react'
// import gql from 'graphql-tag'
// import { useLazyQuery, useMutation } from '@apollo/react-hooks'

// import {getUser} from '../../graphql/queries'
// import {updateUser} from '../../graphql/mutations'
// import * as Actions from '../../graphql/apollo'
// import {initialAuthState, authActions, authReducer} from '../../hooks'

// const GetUser = gql(getUser);
// const UpdateUser = gql(updateUser)

// const getUserActions = (actions) => ({
//   ...actions.getAuthUser,
//   editUser: Actions.getEditUser(actions.updateUser),
//   disableUser: Actions.getEditUser(actions.updateUser),
//   logoutUser: () => actions.getAuthUser.logout(actions.setUser),
// })

// const useUser = (init = {}, chatPage = '') => {
//   const [user, setUser] = useState(init)
//   const [updateUser] = useMutation(UpdateUser)
//   const [auth, dispatch] = useReducer(authReducer, initialAuthState, authReducer);
//   const [getUser, { loading, data, subscribeToMore }] = useLazyQuery(GetUser)
//   const id = auth?.data?.attributes?.sub

//   useEffect(() => {
//     if (id) {
//       getUser({variables: { id }})
//     }
//   }, [id, getUser])

//   useEffect(() => {
//     if (data?.getUser?.id) {
//       setUser(data.getUser)
//     }
//   }, [data])

//   // useEffect(() => {
//   //   //  subscribeToMore(Actions.updateAddUser())
//   // }, [user, subscribeToMore])

//   useEffect(() => {
//     (async function() {
//       if (id && !loading && data && !data.getUser) {
//         await Actions.initializeUser(auth.data.attributes)
//         getUser({variables: { id }})
//       }
//     })();
//   }, [id, loading, data]);

//   const status = auth?.data?.attributes ? 'active' : auth.data
//   const userData = { ...user, loading, status }
//   const getAuthUser = authActions(dispatch)
//   const userActions =  getUserActions({ updateUser, setUser, getAuthUser })

//   return [userData, userActions]
// }

// export {getUserActions, useUser}


// ///////////////////////useStore
// import React, { createContext, useContext, useEffect, useReducer } from 'react';
// import {combineReducers} from '../utils'
// import {formActions, formReducer} from './useForm'
// import {useUser} from './useBK'

// const localState = JSON.parse(localStorage.getItem('store'))

// const StoreContext = createContext();
// const useStore = () => useContext(StoreContext);
// const rootReducer = combineReducers({form: formReducer})
// const initialState = localState || rootReducer(undefined, {type: undefined});

// const StoreProvider = ({ children }) => {
//   const [user, userActions] = useUser(localState && localState.user)
//   const [state, dispatch] = useReducer(rootReducer, initialState);

//   const store = { ...state, user }
//   const actions = { ...formActions(dispatch), ...userActions }

//   useEffect(() => localStorage.setItem("store", JSON.stringify(store)), [store]);

//   return (
//     <StoreContext.Provider value={[store, actions]}>
//       {children}
//     </StoreContext.Provider>
//   )
// }

// export {useStore, StoreProvider}

// ////////////////////////useAuth
// import { useReducer } from 'react';
// import { Auth } from 'aws-amplify';

// const authActions = dispatch => {
//   const signup = async ({password, ...attributes}) => {
//     const username = attributes.email || attributes.phone_number
//     dispatch({type: "auth/loading", data: true})

//     await Auth.signUp({username, password, attributes})
//     dispatch({type: "auth/update", data: 'registered'})
//   }

//   const verify = async ({code, ...attributes}) => {
//     const username = attributes.email || attributes.phone_number
//     dispatch({type: "auth/loading", data: true})

//     await Auth.confirmSignUp(username, code)
//     dispatch({type: "auth/update", data: 'verified'})
//   }

//   const login = async ({password, ...attributes}) => {
//     const username = attributes.email || attributes.phone_number
//     dispatch({type: "auth/loading", data: true})

//     const data = await Auth.signIn(username, password)
//     dispatch({type: "auth/update", data})
//   }

//   const logout = async (callback) => {
//     dispatch({type: "auth/loading", data: true})

//     const data = await Auth.signOut()
//     dispatch({type: "auth/update", data})
//     localStorage.clear()
//     callback()
//   }

//   return {signup, verify, login, logout}
// }

// const initialAuthState = {error: null, data: null, loading: null};
// const authReducer = (state = initialAuthState, action = {type: undefined, data: null}) => {
//   switch (action.type) {
//     case "auth/loading":
//       return {...state, loading: action.data}
//     case "auth/update":
//       return {...state, data: action.data, loading: false}
//     default:
//       return state;
//   }
// }

// const useAuth = (initialValues = initialAuthState) => {
//   const [state, dispatch] = useReducer(authReducer, initialValues, authReducer)

//   return [state, authActions(dispatch)]
// }

// export {initialAuthState, authActions, authReducer, useAuth}
