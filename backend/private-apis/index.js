const express = require('express')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')

const app = express()

const JWT_SECRET_KEY = 'shhhh'

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

function isAuthenticated (req, res, next) {
  const token = req.body.token || req.headers.authorization
  // check jwt signature
  // get user information from jwt
  if (token) {
    jwt.verify(token, JWT_SECRET_KEY, (error, decoded) => {
      if (error) {
        return res.status(400).json({ error })
      }
      console.log('decoded', decoded)
      req.context = decoded
      next()
    })
  } else {
    next()
  }
}

app.use('/private/graphql', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  if (req.method === 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
})

app.all('/private/graphql', isAuthenticated)

//
const schema = buildSchema(`
  type User {
    username: String!
    email: String!
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
    whoAmI: User
  }
`)

const fakeUser = {
  username: 'Kunal',
  password: 'Password',
  email: 'kunal.v.mandalia@gmail.com'
}

const root = {
  login: ({input}, user, ctx) => {
    const { username, password } = input
    if (fakeUser.username === username && fakeUser.password === password) {
      let authToken
      const payload = {
        username,
        email: fakeUser.email
      }
      return new Promise((resolve, reject) => {
        jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '5m' }, (error, token, a) => {
          if (error) {
            throw new Error(`Error creating JWT: ${error}`)
            reject()
          }
          resolve(token)
        })
      }).then(token => token)
    } else {
      throw new Error(`Incorrect username / password`)
    }
  },
  whoAmI: (_, user, ctx) => {
    if (user && user.username) {
      return {
        username: user.username,
        email: user.email
      }
    } else {
      throw new Error(`Login first`)
    }
  }
}
//

app.use('/private/graphql', graphqlHTTP(req => {
  return {
  schema: schema,
  rootValue: root,
  graphiql: true,
  context: req.context || null,
}}))

app.listen(4001)
console.log('Running protected GraphQL API server at localhost:4001/graphql')