/* eslint-disable camelcase */
const {connect} = require('../model/index')

exports.insert = (req, res) => {
  const {nom, prenom, email, telephone, sexe, password} = req.body
  const sqlInsert =
    'INSERT INTO users(nom, prenom, email, telephone, sexe, password) VALUES (?,?,?,?,?,?)'

  connect.getConnection(err => {
    if (err) {
      console.error(`Une erreur detectée : ${err}`)
    } else {
      console.log('Connecté à la base de données MySQL!')
    }
  })

  connect.query(
    sqlInsert,
    [nom, prenom, email, telephone, sexe, password],
    (err, result) => {
      if (err) throw err
      console.log('--------> Created new User')
      res.send(result)
    },
  )
}

exports.users = (req, res) => {
  connect.getConnection(err => {
    if (err) {
      console.error(`Une erreur detectée : ${err}`)
    } else {
      console.log('Connecté à la base de données MySQL')
    }
  })
  connect.query('SELECT * FROM users', (err, result) => {
    res.send(result)
  })
}

exports.login = (req, res) => {
  const {nom, password} = req.body
  const sqllogin = 'select * from users where nom=? AND password=?'

  connect.getConnection(err => {
    if (err) {
      console.error(`Une erreur detectée : ${err}`)
    } else {
      console.log('Connecté à la base de données MySQL!')
    }
  })
  connect.query(sqllogin, [nom, password], (err, result) => {
    if (err) {
      res.status(500).send(err)
    } else if (result.length > 0) {
      res.status(200).send(result[0])
    } else {
      res.status(400).send("L'utilisateur n'existe pas")
    }
    // connect.end()
  })
}
