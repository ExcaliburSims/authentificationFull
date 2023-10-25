/* eslint-disable camelcase */
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken')
require('dotenv').config()
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
      const user = {
        id: result[0].id,
        username: nom,
      }
      const token = jwt.sign(user, process.env.SECRET_KEY, {expiresIn: '1h'})
      res.status(200).json({token})
      // res.status(200).send(result[0])
    } else {
      res.status(400).send("L'utilisateur n'existe pas")
    }
    // connect.end()
  })
}

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(403).json({message: 'Token non fourni'})
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({message: 'Token invalide'})
    }

    // Le JWT est valide, vous pouvez autoriser la demande
    req.user = decoded
    next()
  })
}
