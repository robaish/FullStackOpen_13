const Blog = require('./blog')
const User = require('./user')

// User.hasMany(Blog)
// Blog.belongsTo(User)

Blog.sync() // if table blogs doesn't exist, create the table
User.sync()

module.exports = {
  Blog,
  User
}