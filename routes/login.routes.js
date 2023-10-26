const express = require('express')
const {
  users,
  insert,
  login,
  medicaments,
  produit,
} = require('../controllers/authentification')

const router = express.Router()

/// /////////////////////////////////////

router.get('/api/users', users)
router.post('/api/insert', insert)
router.post('/api/login', login)

router.get('/api/medicaments', medicaments)
router.get('/api/produit', produit)

module.exports = router
