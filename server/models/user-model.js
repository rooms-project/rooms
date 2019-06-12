const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: String,
    password: String,
    imageUrl: String,
    room: [{type: Schema.Types.ObjectId, ref:'Room'}],
    following: Array,
}, {
        timestamps: true
    })

const User = mongoose.model('User', userSchema)
module.exports = User