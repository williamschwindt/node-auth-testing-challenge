const jwt = require('jsonwebtoken')

function authenticate(id) {
  return async (req, res, next) => {
    const authErr = {
      message: 'invalid credentials'
    }

    try {
      const token = req.cookie.token
      if(!token) {
        return res.status(401).json(authErr)
      }

      jwt.verify(token, 'supersecretsecret', (err, decodedPayload) => {
        if(err || decodedPayload.userId !== id) {
          return res.status(401).json(authErr)
        }

        req.token = decodedPayload
        next()
      })

    } catch(err) {
      next(err)
    }
  }
}

module.exports = authenticate
