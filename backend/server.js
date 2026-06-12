require('dotenv').config()

const app = require('./src/app')
const PORT = process.env.PORT || 5001

console.log("Before listen")

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

console.log("After listen")

server.on("close", () => {
  console.log("SERVER CLOSED")
})