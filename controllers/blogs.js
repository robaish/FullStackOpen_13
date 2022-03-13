const router = require('express').Router()
const { Op } = require('sequelize')
const { Blog, User } = require('../models/index')
const { blogFinder, tokenExtractor } = require('../util/middleware')

router.get('/', async (req, res) => {
  const where = {}
  if (req.query.search) {
    where.title = {
      [Op.iLike]: `%${req.query.search}%`
    }
  }

  const blogs = await Blog.findAll({
    attributes: {
      exclude: ['userId']
    },
    include: {
      model: User,
      attributes: ['name']
    },
    where
  })
  res.json(blogs)
 })
 
router.post('/', tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({
      ...req.body,
      userId: user.id
    })
    res.json(blog)
  } catch (error) {
    return res.status(400).json({ error })
  }
})
 
router.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes
    await req.blog.save()
    return res.json(req.blog)
  } else {
    return res.status(404).send({ error })
  }
  
})

router.delete('/:id', blogFinder, tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)

  if (!req.blog) {
    res.status(404).send('Blog not found.')
  }
  if (req.blog.userId === user.id) {
    await req.blog.destroy()
    res.status(204).end()
  } else {
    return res.status(401).send('Unauthorized - blog not created by user.')
  }
})

 module.exports = router