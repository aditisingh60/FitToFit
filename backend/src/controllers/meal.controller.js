const prisma = require('../config/db')

exports.getMeals = async (req, res) => {
  try {
    const { date } = req.query // expected format: YYYY-MM-DD
    if (!date) {
      return res.status(400).json({ error: 'Date query parameter is required' })
    }

    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)
    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)

    const meals = await prisma.mealLog.findMany({
      where: {
        userId: req.userId,
        loggedAt: {
          gte: startOfDay,
          lte: endOfDay
        }
      },
      include: {
        food: true
      },
      orderBy: {
        loggedAt: 'asc'
      }
    })

    res.json(meals)
  } catch (error) {
    console.error('Error fetching meals:', error)
    res.status(500).json({ error: 'Failed to fetch meals' })
  }
}

exports.logMeal = async (req, res) => {
  try {
    const { foodId, grams, mealType, date } = req.body
    if (!foodId || !grams || !mealType || !date) {
      return res.status(400).json({ error: 'Missing required meal log parameters' })
    }

    const food = await prisma.foodItem.findUnique({
      where: { id: foodId }
    })

    if (!food) {
      return res.status(404).json({ error: 'Food item not found' })
    }

    const multiplier = parseFloat(grams) / 100.0
    const caloriesConsumed = food.calories * multiplier

    // Set loggedAt to match the specific date and current time
    const logDate = new Date(date)
    const now = new Date()
    logDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds())

    const mealLog = await prisma.mealLog.create({
      data: {
        userId: req.userId,
        foodId,
        grams: parseFloat(grams),
        mealType,
        caloriesConsumed,
        loggedAt: logDate
      },
      include: {
        food: true
      }
    })

    res.status(201).json(mealLog)
  } catch (error) {
    console.error('Error logging meal:', error)
    res.status(500).json({ error: 'Failed to log meal' })
  }
}

exports.deleteMeal = async (req, res) => {
  try {
    const { id } = req.params
    const mealLog = await prisma.mealLog.findUnique({
      where: { id }
    })

    if (!mealLog) {
      return res.status(404).json({ error: 'Meal log entry not found' })
    }

    if (mealLog.userId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized to delete this entry' })
    }

    await prisma.mealLog.delete({
      where: { id }
    })

    res.json({ message: 'Meal log deleted successfully' })
  } catch (error) {
    console.error('Error deleting meal:', error)
    res.status(500).json({ error: 'Failed to delete meal log' })
  }
}

exports.resetMeals = async (req, res) => {
  try {
    const { date } = req.query
    if (!date) {
      return res.status(400).json({ error: 'Date query parameter is required' })
    }

    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)
    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)

    await prisma.mealLog.deleteMany({
      where: {
        userId: req.userId,
        loggedAt: {
          gte: startOfDay,
          lte: endOfDay
        }
      }
    })

    res.json({ message: 'Daily meals reset successfully' })
  } catch (error) {
    console.error('Error resetting meals:', error)
    res.status(500).json({ error: 'Failed to reset meals' })
  }
}
