const express = require('express')
const router = express.Router()
const controller = require('../controllers/accounts')
router.post('/add', controller.add)
module.exports = router
