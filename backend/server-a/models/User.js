const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema for the login credentials
const UserSchema = new Schema({
   username: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: false
   },
   password: {
      type: String,
      required: true
   }
})

// export with the name of "users" so other JS files can read it
module.exports = User = mongoose.model('users', UserSchema)
