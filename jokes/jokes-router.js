const axios = require('axios');

const router = require('express').Router();
const authenticate = require('../auth/authenticate-middleware')

router.get('/', authenticate(1), (req, res) => {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
});

module.exports = router;
