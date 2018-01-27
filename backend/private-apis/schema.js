const { buildSchema } = require('graphql')

const schema = (buildSchemaGQL = buildSchema) => buildSchemaGQL(`
  type User {
    username: String!
    email: String!
  }

  type UserWithToken {
    username: String!
    email: String!
    token: String!
  }

  input UserCredentials {
    username: String!
    password: String!
  }

  input AuthToken {
    token: String
  }

  type Query {
    login(input: UserCredentials): String
    getMyProfile: User
  }

  type Mutation {
    updateUsername(input: String): UserWithToken
  }
`)

module.exports = schema
