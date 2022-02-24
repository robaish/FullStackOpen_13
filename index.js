const express = require('express')
const app = express()
require('express-async-errors')

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const blogRouter = require('./controllers/blogs')
const { errorHandler } = require('./util/middleware')

app.use(express.json())

app.use('/api/blogs/', blogRouter)

app.use(errorHandler)

const launchApp = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

launchApp()