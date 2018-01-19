const fetch = require('node-fetch')
const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    "The good old hello world"
    hello: String
    
    "Github follower count by username"
    network(username: String = "kunal-mandalia"): GithubNetwork

    "Github short profile"
    shortProfile(username: String = "kunal-mandalia"): GithubSnapshot
  }

  type GithubNetwork {
    followers: Int
    following: Int
  }

  interface Person {
    name: String
    company: String
  }

  type GithubSnapshot implements Person {
    name: String
    company: String
    followers: Int
    bio: String
  }
`)

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return 'Hello world!';
  },
  network: ({username}) => fetch(`https://api.github.com/users/${username}`)
    .then(res => res.json())
    .then(profile => {
      return profile
    }),
  shortProfile: ({username}) => fetch(`https://api.github.com/users/${username}`)
    .then(res => res.json())
    .then(profile => {
      return profile
    })
}

const app = express()
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}))
app.listen(4000)
console.log('Running a GraphQL API server at localhost:4000/graphql')