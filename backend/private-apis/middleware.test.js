const { isAuthenticated } = require('./middleware')

describe(`middleware`, () => {
  describe(`isAuthenticated()`, () => {
    const args = {
      req: {
        headers: {},
        body: {}
      },
      res: {

      },
      next: jest.fn(),
      jwt: {
        verify: jest.fn(),
      }
    }

    afterEach(() => {
      args.next.mockReset()
      args.jwt.verify.mockReset()
    })
    it(`should skip token verification when no token provided`, () => {
      const { req, res, next, jwt } = args
      isAuthenticated(req, res, next, jwt)
      expect(jwt.verify.mock.calls).toHaveLength(0)
      expect(req.context).toBeFalsy()
      expect(next.mock.calls).toHaveLength(1)      
    })

    // bad/malformed token

    // good token
  })
})
