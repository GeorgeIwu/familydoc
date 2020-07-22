import { useState } from 'react';
import { Auth } from 'aws-amplify';
import getAuthUser from '../utils/getUser';


export const getActions = (actions) => {

  const validateResponse = (res, onSuccess) => {
    // if (!res.data) {
    //   actions.setError(res)
    // }
    onSuccess()
    actions.setLoading(false)
  }

  return {
    login: async ({password, ...attributes}) => {
      actions.setLoading(true)
      const username = attributes.email || attributes.phone_number
      const auth = await Auth.signIn(username, password)
      const res = await getAuthUser(auth)

      validateResponse(res, () => {
        actions.setUser(res)
        actions.setStatus('active')
      })
    },
    register: async ({password, ...attributes}) => {
      actions.setLoading(true)
      const username = attributes.email || attributes.phone_number
      const res = await Auth.signUp({username, password, attributes})

      validateResponse(res, () => actions.setStatus('registered'))
    },
    verify: async ({code, ...attributes}) => {
      actions.setLoading(true)
      const username = attributes.email || attributes.phone_number
      const res = await Auth.confirmSignUp(username, code)

      validateResponse(res, () => actions.setStatus('verified'))
    },
    logout: async () => {
      actions.setLoading(true)
      localStorage.clear()
      const res = await Auth.signOut()

      validateResponse(res, () => actions.setUser(null))
    }
  }
}


export default (init = {}) => {
  const [auth, setAuth] = useState(init)

  const setUser = (user) => setAuth({...auth, user})
  const setError = (error) => setAuth({...auth, error})
  const setStatus = (status) => setAuth({...auth, status})
  const setLoading = (loading) => setAuth({...auth, loading})

  const authActions =  getActions({ setUser, setError, setStatus, setLoading })

  return [auth, authActions]
}
