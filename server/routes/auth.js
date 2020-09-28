const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const requireLogin = require('../middleware/requireLogin')

router.post('/signup', (req,res) => {
  const {name, username, email, password, pic} = req.body
  if(!email || !password || !name || !username) {
    return res.status(422).json({error: "Please add all the fields"})
  }
  User.findOne({email:email})
  .then((savedUser) => {
    if(savedUser) {
      return res.status(422).json({error: "Account with this email already exists"})
    }
    User.findOne({username:username})
    .then((savedUser) => {
      if(savedUser) {
        return res.status(422).json({error: "Username unavailable"})
      }
      bcrypt.hash(password, 12)
      .then(hashedPassword => {
        const user = new User({
          email,
          password:hashedPassword,
          name,
          username,
          pic
        })
        user.save().then(user => {
          res.json({message: "User created successfully"})
        })
        .catch(err => {
          console.log(err)
        })
      })
      .catch(err => {
        console.log(err)
      })
    })
    .catch(err => {
      console.log(err)
    })
  })
  .catch(err => {
    console.log(err)
  })
})

router.post('/signin', (req, res) => {
  const {username, password} = req.body
  if(!username || !password) {
    res.status(422).json({error:"Please add username and password"})
  }
  User.findOne({username:username})
  .then(savedUser => {
    if(!savedUser) {
      return res.status(422).json({error:"Incorrect username or password"})
    }
    bcrypt.compare(password, savedUser.password)
    .then(doMatch => {
      if(doMatch) {
        //res.json({message:"Signed in successfully"})
        const token = jwt.sign({_id:savedUser._id}, JWT_SECRET)
        const {_id, name, username, email, pic} = savedUser
        res.json({token, user:{_id, name, username, email, pic}})

      } else {
        return res.status(422).json({error:"Incorrect username or password"})
      }
    })
    .catch(err => {
      console.log(err)
    })
  })
})

module.exports = router