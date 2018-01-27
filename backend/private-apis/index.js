const express = require('express')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const graphqlHTTP = require('express-graphql')
const resolver = require('./resolver')
const { JWT_SECRET_KEY } = require('./constants')
const schema = require('./schema')()
const { isAuthenticated } = require('./middleware')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

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
app.use('/private/graphql', graphqlHTTP(req => {
  return {
  schema: schema,
  rootValue: resolver,
  graphiql: true,
  context: req.context || null,
}}))

app.listen(4001)
console.log('Running protected GraphQL API server at localhost:4001/graphql')