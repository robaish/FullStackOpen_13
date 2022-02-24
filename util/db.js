const Sequelize = require('sequelize')
const { DATABASE_URL } = require('./config')

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
})

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('%c Connected to database!', 'color: green;')
  } catch (error) {
    console.log('%c Failed to connect to database', 'color: red;')
    return process.exit(1)
  }
  return null
}

module.exports = {
  sequelize,
  connectToDatabase
}