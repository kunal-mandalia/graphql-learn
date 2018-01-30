const { signToken } = require('./helper')
const jsonwebtoken = require('jsonwebtoken')
const { JWT_SECRET_KEY } = require('./constants')

describe(`helper functions`, () => {
  describe(`signToken()`, () => {
    it(`should generate a JWT valid token given good payload`, async () => {
      const options = {
        payload: {
            _id: '123',
            username: 'Kunal V. Mandalia',
            email: 'kunal.v.mandalia@gmail.com'
        }
      }
      const token = await signToken(options)
      expect(typeof token).toEqual('string')
      expect(token.length).toBeGreaterThan(10)

      // decoded token's object should contain payload
      jsonwebtoken.verify(token, JWT_SECRET_KEY, (error, decoded) => {
        expect(error).toBeFalsy()
        for (key in options.payload) {
          expect(decoded[key]).toEqual(options.payload[key])
        }
      })
    })
  })
})