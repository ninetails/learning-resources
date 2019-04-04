import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo-hooks'
import { setContext } from 'apollo-link-context'
import { split, ApolloLink, Operation } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import './styles/index.css'
import App from './components/App'
import BrowserRouter from './BrowserRouter'
import { getToken } from './auth'

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_SERVER_URL
})

const authLink = setContext((_, { headers }) => {
  const token = getToken()

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const authWsLink = new ApolloLink((operation, forward) => {
  const token = getToken()

  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  })
  ;(operation as Operation & {
    authToken: string | undefined
  }).authToken = token

  return (forward as any)(operation)
})

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_SERVER_WS_URL || '',
  options: {
    reconnect: true,
    connectionParams: {
      authToken: getToken()
    }
  }
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  authWsLink.concat(wsLink),
  authLink.concat(httpLink)
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
