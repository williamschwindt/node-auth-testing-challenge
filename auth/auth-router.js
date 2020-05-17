const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../database/dbConfig')

router.post('/register', (req, res, next) => {
  const credentials = req.body
  const hashedPassword = bcrypt.hashSync(credentials.password, 12)

  credentials.password = hashedPassword

  db('users').insert(credentials)
    .then(() => {
      res.status(201).json({
        message: 'success'
      })
    })
    .catch(err => {
      next(err)
    })

});

router.post('/login', async (req, res, next) => {
  const authErr = {
    message: 'invalid credentials'
  }

  try {
    const user = await db('users').where('username', req.body.username).first()
    if(!user) {
      return res.status(404).json(authErr)
    }

    const passwordValid = await bcrypt.compare(req.body.password, user.password)
    if(!passwordValid) {
      return res.status(404).json(authErr)
    }

    const tokenPayload = {
      userId: user.id
    }

    res.cookie('token', jwt.sign(tokenPayload, 'supersecretsecret'))
    res.json({
      message: `welcome ${user.username}`
    })

  } catch(err) {
    next(err)
  }
});

module.exports = router;
