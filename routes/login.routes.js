const express = require('express')
const {users, insert} = require('../controllers/authentification')

const router = express.Router()

/// /////////////////////////////////////

router.get('/users', users)
router.post('/insert', insert)

module.exports = router
