// BUILD YOUR SERVER HERE
const express = require('express')
const User = require('./users/model')

const server = express()

server.use(express.json())


// get by id
server.get('/api/users/:id', (req,res) => {

  const id = req.params.id

  User.findById(id)
    .then(user => {
      if(!user){
        res.status(404).json({message: `user with ${id} not found smh`})
      }else{
        res.json(user)
      }

    })
    .catch(err => res.status(500).json({message: err.message}))

})

// [GET REQUEST]
server.get('/api/users', (req,res) => {
  User.find()
    .then(users => {
      console.log(users)
      res.status(200).json(users)
    })
    .catch(err => {res.status(500).json({message: err.message})})
})

// [get] everything
server.use('*', (req,res) => {
  res.status(404).json({message: 'what islife life'})
})


// post
server.post('/api/users', (req, res) => {
  const newUser = req.body
  if (!newUser.name || !newUser.bio){
      res.status(400).json({ message: '/provide Name and Bio/' })
  } else {
      User.insert(newUser)
      .then(user => {
          res.status(201).json(user)
      })
      .catch(err => {res.status(500).json({ message: err.message })})
  }
})

// put = updates
server.put('/api/users/:id', async (req, res) => {
  const { id } = req.params
  const changes = req.body
  try{
      if(!changes.name || !changes.bio){
          res.status(400).json({ message: '/provide Name and Bio/' })
      } else {
          const updatedUser = await User.update(id, changes)
          if(!updatedUser){
              res.status(404).json({ message: 'User does not exist in db' })
          } else {
              res.json(updatedUser)
          }
      }
  } catch(err) {res.status(500).json({ message: err.message })}
})

// delete
server.delete('/api/users/:id', async (req, res) => {
  try{
      const deleted = await User.remove(req.params.id)
      if(!deleted){
          res.status(404).json({ message: '/user does not exist/'})
      } else {
          res.json(deleted)
      }
  } catch(err){res.status(500).json({ message: err.message })}
})



module.exports = server; // EXPORT YOUR SERVER instead of {}

