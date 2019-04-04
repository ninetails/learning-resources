const { prisma } = require('../src/generated/prisma-client')

async function main() {
  await prisma.createLink({
    description: 'Prisma turns your database into a GraphQL API 😎',
    url: 'https://www.prismagraphql.com'
  })
  await prisma.createLink({
    description: 'The best GraphQL client for React',
    url: 'https://www.apollographql.com/docs/react/'
  })
}

main()
