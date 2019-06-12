const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: String,
    password: String,
    imageUrl: {
        type: String, 
        default: "https://publicphilosophyjournal.org/wp-content/themes/Zukra2/images/profile/default.svg"
    },
    room: [{type: Schema.Types.ObjectId, ref:'Room'}],
    following: [{type: Schema.Types.ObjectId, ref:'Room'}],
}, {
        timestamps: true
    })

const User = mongoose.model('User', userSchema)
module.exports = User