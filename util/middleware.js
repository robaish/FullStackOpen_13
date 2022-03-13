const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')

const blogFinder = async (req, _res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization')
  console.log(req.headers)
  console.log(auth)
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(auth.substring(7), SECRET)
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' })
    }
  } else {
    return res.status(401).json({ error: 'Missing token' })
  }
  next()
}

const errorHandler = async (error, _req, res, next) => {
  console.log(error.message)
  
  if (error.name === 'SequelizeValidationError') {
    return res.status(400).send({ error: error.message })
  } else if (error.name === 'SequelizeDatabaseError') {
    return res.status(400).send({ error: error.message })
  }
  next(error)
}

module.exports = {
  blogFinder,
  tokenExtractor,
  errorHandler
}