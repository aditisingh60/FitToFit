const express = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const { getWater, logWater, resetWater } = require('../controllers/water.controller')

const router = express.Router()

router.use(authMiddleware)
router.get('/', getWater)
router.post('/', logWater)
router.delete('/', resetWater)

module.exports = router
