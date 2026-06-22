const prisma = require('../config/db')

const SEED_FOODS = [
  { id: 'f1', name: 'Apple', calories: 52, carbs: 14, protein: 0.3, fat: 0.2, vitamins: { vitaminC: 4.6, calcium: 6, iron: 0.1, vitaminA: 3 }, servingUnit: 'Medium Apple', servingWeight: 180 },
  { id: 'f2', name: 'Banana', calories: 89, carbs: 23, protein: 1.1, fat: 0.3, vitamins: { vitaminC: 8.7, calcium: 5, iron: 0.3, vitaminA: 2 }, servingUnit: 'Medium Banana', servingWeight: 120 },
  { id: 'f3', name: 'Chicken Breast (Cooked)', calories: 165, carbs: 0, protein: 31, fat: 3.6, vitamins: { iron: 1.0, calcium: 15 }, servingUnit: 'Breast / Portion', servingWeight: 150 },
  { id: 'f4', name: 'White Rice (Cooked)', calories: 130, carbs: 28, protein: 2.7, fat: 0.3, vitamins: { iron: 0.2, calcium: 3 }, servingUnit: 'Bowl', servingWeight: 150 },
  { id: 'f5', name: 'Whole Milk', calories: 61, carbs: 4.8, protein: 3.2, fat: 3.2, vitamins: { vitaminD: 1.0, calcium: 113, vitaminA: 46 }, servingUnit: 'Cup / Glass', servingWeight: 244 },
  { id: 'f6', name: 'Egg (Large, Boiled)', calories: 155, carbs: 1.1, protein: 13, fat: 11, vitamins: { vitaminD: 1.2, calcium: 50, iron: 1.2, vitaminA: 160 }, servingUnit: 'Large Egg', servingWeight: 50 },
  { id: 'f7', name: 'Oats (Raw)', calories: 389, carbs: 66, protein: 16.9, fat: 6.9, vitamins: { iron: 4.7, calcium: 54 }, servingUnit: 'Serving', servingWeight: 40 },
  { id: 'f8', name: 'Salmon (Cooked)', calories: 206, carbs: 0, protein: 22, fat: 12, vitamins: { vitaminD: 12, calcium: 15, iron: 0.3, vitaminA: 40 }, servingUnit: 'Fillet', servingWeight: 150 },
  { id: 'f9', name: 'Spinach (Raw)', calories: 23, carbs: 3.6, protein: 2.9, fat: 0.4, vitamins: { vitaminA: 469, vitaminC: 28, calcium: 99, iron: 2.7 }, servingUnit: 'Cup', servingWeight: 30 },
  { id: 'f10', name: 'Broccoli (Cooked)', calories: 35, carbs: 7, protein: 2.4, fat: 0.4, vitamins: { vitaminC: 64, vitaminA: 77, calcium: 40, iron: 0.6 }, servingUnit: 'Cup', servingWeight: 150 },
  { id: 'f11', name: 'Greek Yogurt', calories: 59, carbs: 3.6, protein: 10, fat: 0.4, vitamins: { calcium: 110, vitaminA: 2 }, servingUnit: 'Bowl / Container', servingWeight: 170 },
  { id: 'f12', name: 'Almonds', calories: 579, carbs: 22, protein: 21, fat: 49, vitamins: { calcium: 269, iron: 3.7 }, servingUnit: 'Handful (10 nuts)', servingWeight: 15 },
  
  // New Food Items: Indian, Whey Protein, Fruits & Nuts
  { id: 'f13', name: 'Chapati (Roti)', calories: 297, carbs: 60, protein: 10, fat: 1.5, vitamins: { calcium: 40, iron: 3.6 }, servingUnit: 'Chapati', servingWeight: 40 },
  { id: 'f14', name: 'Whey Protein (with Water)', calories: 364, carbs: 9.1, protein: 72.7, fat: 4.5, vitamins: { calcium: 360 }, servingUnit: 'Scoop', servingWeight: 33 },
  { id: 'f15', name: 'Whey Protein (with Whole Milk)', calories: 97, carbs: 5.4, protein: 11.5, fat: 3.4, vitamins: { calcium: 115, vitaminD: 0.8 }, servingUnit: 'Scoop + 1 Cup Milk', servingWeight: 277 },
  { id: 'f16', name: 'Mango', calories: 60, carbs: 15, protein: 0.8, fat: 0.38, vitamins: { vitaminA: 54, vitaminC: 36.4, calcium: 11, iron: 0.16 }, servingUnit: 'Medium Mango', servingWeight: 200 },
  { id: 'f17', name: 'Orange', calories: 47, carbs: 11.8, protein: 0.9, fat: 0.1, vitamins: { vitaminC: 53.2, calcium: 40, iron: 0.1 }, servingUnit: 'Medium Orange', servingWeight: 130 },
  { id: 'f18', name: 'Walnuts', calories: 654, carbs: 13.7, protein: 15.2, fat: 65.2, vitamins: { calcium: 98, iron: 2.9 }, servingUnit: 'Handful (7 halves)', servingWeight: 15 },
  { id: 'f19', name: 'Cashew Nuts', calories: 553, carbs: 30, protein: 18, fat: 44, vitamins: { calcium: 37, iron: 6.7 }, servingUnit: 'Handful (10 nuts)', servingWeight: 15 },
  { id: 'f20', name: 'Fish Curry', calories: 128, carbs: 2.4, protein: 11.2, fat: 8, vitamins: { calcium: 20, iron: 0.5 }, servingUnit: 'Bowl', servingWeight: 250 }
]

async function ensureSeedFoods() {
  const count = await prisma.foodItem.count({
    where: { source: 'seed' }
  })
  
  if (count < SEED_FOODS.length) {
    try {
      // Clean existing seed entries first
      await prisma.foodItem.deleteMany({
        where: { source: 'seed' }
      })
      
      for (const food of SEED_FOODS) {
        await prisma.foodItem.create({
          data: {
            id: food.id,
            name: food.name,
            calories: food.calories,
            carbs: food.carbs,
            protein: food.protein,
            fat: food.fat,
            vitamins: food.vitamins,
            servingUnit: food.servingUnit,
            servingWeight: food.servingWeight,
            source: 'seed'
          }
        })
      }
      console.log('Food items seeded successfully!')
    } catch (err) {
      console.error('Failed to seed foods:', err)
    }
  }
}

exports.searchFood = async (req, res) => {
  try {
    await ensureSeedFoods()
    const { q } = req.query
    const foods = await prisma.foodItem.findMany({
      where: q ? {
        name: {
          contains: q,
          mode: 'insensitive'
        }
      } : undefined,
      take: 20
    })
    res.json(foods)
  } catch (error) {
    console.error('Error searching foods:', error)
    res.status(500).json({ error: 'Failed to search foods' })
  }
}

exports.createCustomFood = async (req, res) => {
  try {
    const { name, calories, carbs, protein, fat, vitamins, servingUnit, servingWeight } = req.body
    if (!name || calories === undefined || carbs === undefined || protein === undefined || fat === undefined) {
      return res.status(400).json({ error: 'Missing required food fields' })
    }

    const newFood = await prisma.foodItem.create({
      data: {
        id: `custom_${Date.now()}`,
        name,
        calories: parseFloat(calories),
        carbs: parseFloat(carbs),
        protein: parseFloat(protein),
        fat: parseFloat(fat),
        vitamins: vitamins || {},
        servingUnit: servingUnit || 'serving',
        servingWeight: parseFloat(servingWeight) || 100,
        source: 'user'
      }
    })
    res.status(201).json(newFood)
  } catch (error) {
    console.error('Error creating food:', error)
    res.status(500).json({ error: 'Failed to create food item' })
  }
}
