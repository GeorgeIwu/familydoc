import { useState } from 'react';
import { Auth } from 'aws-amplify';
import getAuthUser from '../utils/getUser';


export const getActions = (actions) => ({
    login: async ({password, ...attributes}) => {
      actions.setLoading(true)
      const username = attributes.email || attributes.phone_number
      const auth = await Auth.signIn(username, password)
      const res = await getAuthUser(auth)

      actions.setResponse(res, () => {
        actions.setUser(res)
        actions.setStatus('active')
      })
    },
    register: async ({password, ...attributes}) => {
      actions.setLoading(true)
      const username = attributes.email || attributes.phone_number
      const res = await Auth.signUp({username, password, attributes})

      actions.setResponse(res, () => actions.setStatus('registered'))
    },
    verify: async ({code, ...attributes}) => {
      actions.setLoading(true)
      const username = attributes.email || attributes.phone_number
      const res = await Auth.confirmSignUp(username, code)

      actions.setResponse(res, () => actions.setStatus('verified'))
    },
    logout: async () => {
      actions.setLoading(true)
      localStorage.clear()
      const res = await Auth.signOut()

      actions.setResponse(res, () => actions.setUser(null))
    }
})


export default (init = {}) => {
  const [auth, setAuth] = useState(init)

  const setUser = (user) => setAuth({...auth, user})
  const setStatus = (status) => setAuth({...auth, status})
  const setLoading = (loading) => setAuth({...auth, loading})
  const setResponse = (res, onSuccess) => {
    // if (!res.data) {
    //   setAuth({ ...auth, error: 'Error' })
    // }
    onSuccess()
    setAuth({...auth, loading: false})
  }

  const authActions =  getActions({ setUser, setStatus, setLoading, setResponse })

  return [auth, authActions]
}
