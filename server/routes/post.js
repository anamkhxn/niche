const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model("Post")

//all posts
router.get('/feed', requireLogin, (req, res) => {
  Post.find()
  .populate("postedBy", "_id username")
  .then(posts => {
    res.json({posts})
  })
  .catch(err => {
    console.log(err)
  })
})

router.post('/createPost', requireLogin, (req, res) => {
  const {title,body,pic} = req.body
  if(!title || !body || !pic) {
    res.status(422).json({error:"Please add all the fields"})
  }
  req.user.password = undefined
  const post = new Post({
    title,
    body,
    photo:pic,
    postedBy:req.user
  })
  post.save().then(result => {
    res.json({post:result})
  })
  .catch(err => {
    console.log(err)
  })
})

//my posts
router.get('/profile', requireLogin, (req, res) => {
  Post.find({postedBy:req.user._id})
  .populate("postedBy", "_id username")
  .then(myPost => {
    res.json({myPost:myPost})
  })
  .catch(err => {
    console.log(err)
  })
})

module.exports = router