const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const prisma = require('../config/db')

// ── Register ──────────────────────────────────────
const registerUser = async ({ name, email, password }) => {
  // 1. Check email not already taken
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) throw new Error('EMAIL_TAKEN')

  // 2. Hash the password (10 salt rounds)
  const passwordHash = await bcrypt.hash(password, 10)

  // 3. Create user in DB
  const user = await prisma.user.create({
    data: { name, email, passwordHash },
    select: { id: true, name: true, email: true }
  })

  // 4. Sign JWT
  const token = signToken(user.id)

  return { user, token, onboardingDone: false }
}

// ── Login ─────────────────────────────────────────
const loginUser = async ({ email, password }) => {
  // 1. Find user by email
  const user = await prisma.user.findUnique({
    where: { email },
    include: { profile: { select: { onboardingDone: true } } }
  })
  if (!user) throw new Error('INVALID_CREDENTIALS')

  // 2. Compare password with stored hash
  const valid = await bcrypt.compare(password, user.passwordHash)
  if (!valid) throw new Error('INVALID_CREDENTIALS')

  // 3. Sign JWT
  const token = signToken(user.id)

  const onboardingDone = user.profile?.onboardingDone ?? false

  return {
    user: { id: user.id, name: user.name, email: user.email },
    token,
    onboardingDone
  }
}

// ── Helper: create JWT ────────────────────────────
const signToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  )
}

module.exports = { registerUser, loginUser }