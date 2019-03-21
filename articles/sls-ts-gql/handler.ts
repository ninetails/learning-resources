import { APIGatewayProxyHandler } from 'aws-lambda'
import 'source-map-support/register'
import { ApolloServer, gql } from 'apollo-server-lambda'
import { CommentService } from './comment.service'

const typeDefs = gql`
  type Comment {
    msgId: Int
    userInt: String
    content: String
    createdAt: String
    deleted: Boolean
  }

  type Query {
    get(itemId: String): [Comment]
  }

  type Mutation {
    add(itemId: String, userId: String, content: String): [Comment]
    edit(itemId: String, msgId: Int, userId: String, content: String): [Comment]
    delete(itemId: String, msgId: Int, userId: String): [Comment]
  }
`

const resolvers = {
  Query: {
    // @ts-ignore
    get: (root, args) => {
      const service = new CommentService()
      return service.getComments(args.itemId)
    }
  },
  Mutation: {
    // @ts-ignore
    add: (roots, args) => {
      const service = new CommentService()
      return service.addComments(args.itemId, args.userId, args.content)
    },
    // @ts-ignore
    edit: (roots, args) => {
      const service = new CommentService()
      return service.editComments(
        args.itemId,
        args.msgId,
        args.userId,
        args.content
      )
    },
    // @ts-ignore
    delete: (roots, args) => {
      const service = new CommentService()
      return service.deleteComments(args.itemId, args.msgId, args.userId)
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

export const graphql: APIGatewayProxyHandler = server.createHandler()
