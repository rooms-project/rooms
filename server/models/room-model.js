const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roomSchema = new Schema({
    roomname: String,
    location: String,
    imageUrl: String,
    videoUrl: String,
    owner: String,
    streams: Number,
    followers: Array,

}, {
        timestamps: true
    })

const Room = mongoose.model('Room', roomSchema)
module.exports = Room