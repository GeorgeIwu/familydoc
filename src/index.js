import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/react-common'
import { ThemeProvider } from 'styled-components';
import { StylesProvider } from '@material-ui/core/styles';
import { StoreProvider } from './_lib/hooks/useStore';

import getApolloClient from './_lib/utils/apolloClient';
import * as serviceWorker from './serviceWorker';
import Router from './_routes';

export default function App() {
  const [client, setClient] = useState(null)
  const [loading, setLoading] = useState(true)
  const theme = { colors: { primary: '#037Ef3', textLight: '#F3F4F7'}}

  useEffect(() => {
    getApolloClient().then((client) => {
      setClient(client)
      setLoading(false)
    })
  }, [])

  return loading ? null : (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <StylesProvider injectFirst>
          <StoreProvider>
            <Router />
          </StoreProvider>
        </StylesProvider>
      </ThemeProvider>
    </ApolloProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// npm run build && npm run start-sw
serviceWorker.register();
