const router = require('express').Router()
const { Blog } = require('../models/index')
const { blogFinder } = require('../util/middleware')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
 })
 
router.post('/', async (req, res) => {
  const blog = await Blog.create(req.body)
  return res.json(blog)
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

router.delete('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy()
  }
  res.status(204).end()
})

 module.exports = router