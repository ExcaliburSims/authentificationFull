/* eslint-disable camelcase */
const {connect} = require('../model/index')

exports.insert = (req, res) => {
  // const { name, lastname, phone, mail, password } = req.body
  // eslint-disable-next-line prettier/prettier
  const {role_id, nom, prenom, pseudo, email, telephone, sexe, password}= req.body
  // const sqlInsert =
  //   'INSERT INTO user (nom_user,prenom_user,tel_user,password) VALUES (?,?,?,?)'
  const sqlInsert =
    'INSERT INTO users(role_id, nom, prenom, pseudo, email, telephone, sexe, password) VALUES (?,?,?,?,?,?,?,?)'

  connect.getConnection(err => {
    if (err) {
      console.error(`Une erreur detectée : ${err}`)
    } else {
      console.log('Connecté à la base de données MySQL!')
    }
  })

  connect.query(
    sqlInsert,
    [role_id, nom, prenom, pseudo, email, telephone, sexe, password],
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
