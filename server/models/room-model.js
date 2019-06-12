const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roomSchema = new Schema({
    roomname: String,
    description: String,
    location: {
        latitude: Number,
        longitude: Number,
    },
    imageUrl: String, 
    videoUrl: String,
    owner: [{type: Schema.Types.ObjectId, ref:'User'}],
    tags:Array,
    streams: Number,
    followers: [{type: Schema.Types.ObjectId, ref:'User'}],
    likes: Number

}, {
        timestamps: true
    })

const Room = mongoose.model('Room', roomSchema)
module.exports = Room