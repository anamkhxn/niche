const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type:String,
    required: true
  },
  email: {
    type:String,
    required: true
  },
  password: {
    type:String,
    required:true
  },
  pic: {
    type:String,
    default: "https://res.cloudinary.com/nch/image/upload/v1598123453/default-user-icon-4_sfvojj.jpg"
  }
})

mongoose.model("User", userSchema)