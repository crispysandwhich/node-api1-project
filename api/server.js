// BUILD YOUR SERVER HERE
const express = require('express')
const User = require('./users/model')

const server = express()

server.use(express.json())


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




module.exports = server; // EXPORT YOUR SERVER instead of {}

