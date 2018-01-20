const fetch = require('node-fetch')
const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const crypto = require('crypto')

const fakeDatabase = {}

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`

input MessageInput {
  content: String
  author: String
}

type Message {
  id: ID!
  content: String
  author: String
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

type Query {
  "The good old hello world"
  hello: String
  
  "Github follower count by username"
  network(username: String = "kunal-mandalia"): GithubNetwork

  "Github short profile"
  shortProfile(username: String = "kunal-mandalia"): GithubSnapshot

  getMessage(id: String): Message
}

type Mutation {
  createMessage(input: MessageInput): Message
}
`)

class Message {
  constructor (id, {content, author}) {
    this.id = id
    this.content = content
    this.author = author
  }
}

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return 'Hello world!';
  },
  network: ({username}) => fetch(`https://api.github.com/users/${username}`)
    .then(res => res.json())
    .then(profile => {
      return profile
    })
    .catch(error => ({ error })),
  shortProfile: ({username}) => fetch(`https://api.github.com/users2/${username}`)
    .then(res => res.json())
    .then(profile => {
      return profile
    })
    .catch(error => ({ error })),
  getMessage: ({id}) => {
    if (!fakeDatabase[id]) {
      throw new Error(`Message not found (id: ${id})`)
    }
    return new Message(id, fakeDatabase[id])
  },
  createMessage: ({input}) => {
    const id = crypto.randomBytes(10).toString('hex')
    fakeDatabase[id] = input
    return new Message(id, input)
  }

}

const app = express()
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}))
app.listen(4000)
console.log('Running a GraphQL API server at localhost:4000/graphql')