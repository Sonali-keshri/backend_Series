const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/basicCrudProjejs")

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    imageURL: String
})

module.exports = mongoose.model('user', userSchema)