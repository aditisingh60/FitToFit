const { registerUser, loginUser } = require('../services/auth.service')

// POST /api/auth/register
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required' })
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' })
    }

    const result = await registerUser({ name, email, password })

    res.status(201).json({
      message: 'Account created successfully',
      token: result.token,
      user: result.user,
      onboardingDone: result.onboardingDone
    })
  } catch (err) {
    if (err.message === 'EMAIL_TAKEN') {
      return res.status(409).json({ error: 'An account with this email already exists' })
    }
    console.error('Register error:', err)
    res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
}

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const result = await loginUser({ email, password })

    res.status(200).json({
      message: 'Login successful',
      token: result.token,
      user: result.user,
      onboardingDone: result.onboardingDone
    })
  } catch (err) {
    if (err.message === 'INVALID_CREDENTIALS') {
      return res.status(401).json({ error: 'Invalid email or password' })
    }
    console.error('Login error:', err)
    res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
}

module.exports = { register, login }