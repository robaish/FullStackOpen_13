const Blog = require('./blog')

Blog.sync() // if table blogs doesn't exist, create the table

module.exports = {
  Blog
}