const express = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const { getMeals, logMeal, deleteMeal, resetMeals } = require('../controllers/meal.controller')

const router = express.Router()

router.use(authMiddleware)
router.get('/', getMeals)
router.post('/', logMeal)
router.delete('/', resetMeals)
router.delete('/:id', deleteMeal)

module.exports = router
