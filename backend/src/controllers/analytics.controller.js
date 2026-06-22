const prisma = require('../config/db')
const { calculateMacros } = require('../services/bmi.service')

// Get daily totals and target status for calendar highlighting (last 35 days)
exports.getDailyStatus = async (req, res) => {
  try {
    const profile = await prisma.userProfile.findUnique({
      where: { userId: req.userId }
    })
    const calorieGoal = profile?.dailyCalorieGoal || 2000
    const macros = calculateMacros(calorieGoal)
    const proteinGoal = macros.protein

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 35) // cover calendar month context
    startDate.setHours(0, 0, 0, 0)

    const logs = await prisma.mealLog.findMany({
      where: {
        userId: req.userId,
        loggedAt: { gte: startDate }
      },
      include: { food: true }
    })

    // Group logs by YYYY-MM-DD
    const dailyData = {}
    
    logs.forEach(log => {
      const date = new Date(log.loggedAt)
      const y = date.getFullYear()
      const m = String(date.getMonth() + 1).padStart(2, '0')
      const d = String(date.getDate()).padStart(2, '0')
      const dateKey = `${y}-${m}-${d}`

      if (!dailyData[dateKey]) {
        dailyData[dateKey] = { calories: 0, protein: 0 }
      }

      const factor = log.grams / 100.0
      dailyData[dateKey].calories += log.food.calories * factor
      dailyData[dateKey].protein += log.food.protein * factor
    })

    // Prepare map of daily statuses
    const statusMap = {}
    Object.keys(dailyData).forEach(dateKey => {
      const day = dailyData[dateKey]
      const caloriesCompleted = day.calories >= (calorieGoal * 0.9)
      const proteinCompleted = day.protein >= (proteinGoal * 0.95)
      statusMap[dateKey] = {
        calories: Math.round(day.calories),
        protein: Math.round(day.protein),
        caloriesCompleted,
        proteinCompleted,
        completed: caloriesCompleted && proteinCompleted
      }
    })

    res.json(statusMap)
  } catch (error) {
    console.error('Error fetching daily status:', error)
    res.status(500).json({ error: 'Failed to fetch daily status' })
  }
}

// Get weekly history (last 7 days of calorie/protein logs)
exports.getWeeklyHistory = async (req, res) => {
  try {
    const profile = await prisma.userProfile.findUnique({
      where: { userId: req.userId }
    })
    const calorieGoal = profile?.dailyCalorieGoal || 2000
    const macros = calculateMacros(calorieGoal)
    const proteinGoal = macros.protein

    // Generate last 7 days keys
    const daysList = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const year = d.getFullYear()
      const month = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      const label = d.toLocaleDateString('en-US', { weekday: 'short' })
      daysList.push({
        dateKey: `${year}-${month}-${day}`,
        label,
        calories: 0,
        protein: 0
      })
    }

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 6)
    startDate.setHours(0, 0, 0, 0)

    const logs = await prisma.mealLog.findMany({
      where: {
        userId: req.userId,
        loggedAt: { gte: startDate }
      },
      include: { food: true }
    })

    logs.forEach(log => {
      const date = new Date(log.loggedAt)
      const y = date.getFullYear()
      const m = String(date.getMonth() + 1).padStart(2, '0')
      const d = String(date.getDate()).padStart(2, '0')
      const dateKey = `${y}-${m}-${d}`

      const dayObj = daysList.find(item => item.dateKey === dateKey)
      if (dayObj) {
        const factor = log.grams / 100.0
        dayObj.calories += log.food.calories * factor
        dayObj.protein += log.food.protein * factor
      }
    })

    // Round values
    daysList.forEach(item => {
      item.calories = Math.round(item.calories)
      item.protein = Math.round(item.protein * 10) / 10
    })

    res.json({
      history: daysList,
      calorieGoal,
      proteinGoal
    })
  } catch (error) {
    console.error('Error fetching weekly history:', error)
    res.status(500).json({ error: 'Failed to fetch weekly history' })
  }
}
