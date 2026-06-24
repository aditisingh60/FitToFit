const express = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const { getProfile, saveOnboarding, updateProfile } = require('../controllers/user.controller')

const router = express.Router()

router.use(authMiddleware)

router.get('/profile', getProfile)
router.post('/onboarding', saveOnboarding)
router.put('/profile', updateProfile)

module.exports = router
