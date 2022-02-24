const Blog = require('../models/blog')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

const errorHandler = async (error, req, res, next) => {
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
  errorHandler
}