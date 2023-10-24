const express = require('express')
const {users, insert, login} = require('../controllers/authentification')

const router = express.Router()

/// /////////////////////////////////////

router.get('/api/users', users)
router.post('/api/insert', insert)
router.post('/api/login', login)

module.exports = router
