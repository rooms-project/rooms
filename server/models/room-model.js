const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roomSchema = new Schema({
    roomname: String,
    description: String,
    location: {
        latitude: Number,
        longitude: Number,
    },
    imageUrl: {
        type: String, 
        default: "https://visualpharm.com/assets/277/Room-595b40b85ba036ed117de0e6.svg"
    },
    videoUrl: String,
    owner: String,
    tags: Array,
    streams: Number,
    followers: [{type: Schema.Types.ObjectId, ref:'User'}],
    likes: Number

}, {
        timestamps: true
    })

const Room = mongoose.model('Room', roomSchema)
module.exports = Room