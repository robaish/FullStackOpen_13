const { User } = require('../models/index')
const { Blog } = require('../models/index')
const router = require('express').Router()

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: ['title']
    }
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
})

router.put('/:username', async (req, res) => {
  console.log('PARAMS: ', req.params)
  console.log('BODY: ', req.body)

  const user = await User.findOne({
    where: {
      username: req.params.username
    }
  })
  
  if (user) {
    user.username = req.body.newUsername
    await user.save()
    res.json(user)
  } else {
    res.status(404).send({ error })
  }
})

module.exports = router