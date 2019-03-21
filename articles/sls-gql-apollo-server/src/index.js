import { ApolloServer } from 'apollo-server-lambda'
import resolvers from './graphql/resolvers'
import typeDefs from './graphql/types'
import characterSource from './graphql/sources/character'
import movieSource from './graphql/sources/movie'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({}),
  dataSources: () => ({
    characterSource,
    movieSource
  })
})

export default (event, context, callback) => {
  const handler = server.createHandler()

  context.callbackWaitsForEmptyEventLoop = false

  return handler(event, context, callback)
}
