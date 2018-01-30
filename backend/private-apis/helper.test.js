const { signToken } = require('./helper')

describe(`helper functions`, () => {
  describe(`signToken()`, () => {
    it(`should create a JWT token given good payload`, async () => {
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
    })
  })
})