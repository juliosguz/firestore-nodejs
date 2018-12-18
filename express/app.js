require('dotenv').config()
const express = require('express')
const app = express()

const usersService = require('./users')

app.get('/users', async (req, res) => {
  const users = await usersService.getAll()
  res.json(users)
})

app.get('/users/:id', async (req, res) => {
  const { id } = req.params
  const user = await usersService.getUser(id)
  res.json(user.data())
})

app.post('/users', async (req, res) => {
  const newUser = await usersService.createUser()
  res.json({
    message: 'User created',
    id: newUser.id
  })
})

app.listen(3008, () => console.log('Server started!'))
