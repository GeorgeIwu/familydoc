import { useState } from 'react';
import { Auth } from 'aws-amplify';
import getUser from '../utils/getUser';


export const getActions = (actions) => ({
    login: async ({password, ...attributes}) => {
      actions.setLoading(true)
      const username = attributes.email || attributes.phone_number
      const auth = await Auth.signIn(username, password)
      const res = await getUser(auth)

      actions.setResponse(res, () => actions.setUser(res))
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

const initState = { user: {}, status: '', loading: false }
export default (init = initState) => {
  const [user, setUser] = useState(init.user)
  const [status, setStatus] = useState(init.status)
  const [loading, setLoading] = useState(init.loading)

  const setResponse = (res, onSuccess) => {
    // if (!res.data) {
    //   setAuth({ ...auth, error: 'Error' })
    // }

    onSuccess()
    setLoading(false)
  }

  const auth =  { user, status, loading }
  const authActions =  getActions({ setUser, setStatus, setLoading, setResponse })

  return [auth, authActions]
}
