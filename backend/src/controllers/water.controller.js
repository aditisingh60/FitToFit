const prisma = require('../config/db')

exports.getWater = async (req, res) => {
  try {
    const { date } = req.query
    if (!date) {
      return res.status(400).json({ error: 'Date query parameter is required' })
    }

    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)
    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)

    const logs = await prisma.waterLog.findMany({
      where: {
        userId: req.userId,
        loggedAt: {
          gte: startOfDay,
          lte: endOfDay
        }
      }
    })

    const totalAmount = logs.reduce((sum, item) => sum + item.amountMl, 0)
    res.json({ totalMl: totalAmount, logs })
  } catch (error) {
    console.error('Error fetching water:', error)
    res.status(500).json({ error: 'Failed to fetch water data' })
  }
}

exports.logWater = async (req, res) => {
  try {
    const { amountMl, date } = req.body
    if (amountMl === undefined || !date) {
      return res.status(400).json({ error: 'Missing required parameters: amountMl, date' })
    }

    const logDate = new Date(date)
    const now = new Date()
    logDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds())

    const log = await prisma.waterLog.create({
      data: {
        userId: req.userId,
        amountMl: parseInt(amountMl),
        loggedAt: logDate
      }
    })

    res.status(201).json(log)
  } catch (error) {
    console.error('Error logging water:', error)
    res.status(500).json({ error: 'Failed to log water' })
  }
}

exports.resetWater = async (req, res) => {
  try {
    const { date } = req.query
    if (!date) {
      return res.status(400).json({ error: 'Date query parameter is required' })
    }

    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)
    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)

    await prisma.waterLog.deleteMany({
      where: {
        userId: req.userId,
        loggedAt: {
          gte: startOfDay,
          lte: endOfDay
        }
      }
    })

    res.json({ message: 'Water logs reset successfully' })
  } catch (error) {
    console.error('Error resetting water:', error)
    res.status(500).json({ error: 'Failed to reset water logs' })
  }
}
