const db = require('./fakeDB').fakeDB
const getUserByUsernamePassword = require('./fakeDB').getUserByUsernamePassword
const jwt = require('jsonwebtoken')
const { JWT_SECRET_KEY } = require('./constants')

function signToken (payload, jwt = jwt) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '5m' }, (error, token, a) => {
      if (error) {
        throw new Error(`Error creating JWT: ${error}`)
        reject()
      }
      resolve(token)
    })
  }).then(token => token)
}

const resolver = {
  login: ({input: { username, password }}, user, ctx) => {
    const u = getUserByUsernamePassword(username, password)
    if (u.length === 1) {
      const payload = u.pop()
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
  getMyProfile: (_, user, ctx) => {
    if (user && user.username) {
      return {
        username: user.username,
        email: user.email
      }
    } else {
      throw new Error(`Login first`)
    }
  },
  updateUsername: ({input}, user, ctx) => {
    if (user && user.username) {

      // update db
      db['123'].username = input

      // issue new jwt
      return new Promise((resolve, reject) => {
        const payload = db['123']
        jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '5m' }, (error, token, a) => {
          if (error) {
            throw new Error(`Error creating JWT: ${error}`)
            reject()
          }
          resolve(token)
        })
      })
      .then(token => {
        return Object.assign({}, db['123'], { token })
      })
      .catch(e => console.log)
    } else {
      throw new Error(`Login first`)
    }
  }
}

module.exports = resolver
