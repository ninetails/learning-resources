# React + Apollo Tutorial - Introduction

> https://www.howtographql.com/react-apollo/0-introduction/

## To run

### Server

```bash
$ cd server
$ docker-compose up
```

that will run Prisma with Playground on `http://localhost:4466/` and admin on `http://localhost:4466/_admin`.

And on another terminal, run:

```bash
$ cd server
$ yarn start
```

it will run server on `http://localhost:4000/`.

### Client

It's a CRA setup with Typescript.

## Manual Seed

```graphql
mutation CreatePrismaLink {
  post(
    description: "Prisma turns your database into a GraphQL API 😎"
    url: "https://www.prismagraphql.com"
  ) {
    id
  }
}

mutation CreateApolloLink {
  post(
    description: "The best GraphQL client for React"
    url: "https://www.apollographql.com/docs/react/"
  ) {
    id
  }
}
```

### CreateLink

- **Description:** The best learning resource for GraphQL
- **URL:** www.howtographql.com
