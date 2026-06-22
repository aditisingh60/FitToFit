const express = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const { searchFood, createCustomFood } = require('../controllers/food.controller')

const router = express.Router()

router.use(authMiddleware)
router.get('/search', searchFood)
router.post('/custom', createCustomFood)

module.exports = router
