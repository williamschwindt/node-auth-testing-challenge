const bcrypt = require('bcryptjs')

const pass = bcrypt.hashSync('123', 12)

exports.seed = async function(knex) {
  await knex('users').truncate()
  await knex('users').insert([
    { username: 'william', password: pass },
    { username: 'james', password: pass },
    { username: 'matt', password: pass }
  ])
};
