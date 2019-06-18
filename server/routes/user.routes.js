const express = require('express')
const router = express.Router()

const User = require('../models/user-model')
const Room = require('../models/room-model')


router.get('/getAllUsers', (req, res) => {
    User.find()
        .then(data => res.json(data))
        .catch(err => console.log('Error:', err))
})

router.get('/getOneUser/:id', (req, res) => {
    User.findById(req.params.id)
        .then(data => res.json(data))
        .catch(err => console.log('Error:', err))
})

router.put('/updateUser/:id', (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, { $set: { ...req.body } }, { new: true })
    .then(updatedUser => { res.json(updatedUser) })
    .catch(err => console.log(err))
})

router.put("/updateFollowing", (req,res,next) => {
    console.log(req.body)
    const {roomId,userId,action} = req.body
    if(action === "unfollow") {
        User.findById(userId)
            .then(user => {
                console.log("**** El usuario sigue:", user.following, typeof roomId)
                console.log("**** INDEXOF", user.following.indexOf(roomId))
                if (user.following.indexOf(roomId) !== -1) {
                    console.log("***** El usuario está siguiendo esta habitación")
                    User.findByIdAndUpdate(userId, { $pull: { following: roomId } }, { new: true })
                        .then(updatedUser => res.json(updatedUser))
                        .catch(err => console.log(err))
                }
                else {
                    console.log("***** El usuario no sigue esta habitación")
                    return null}
            }
            )
            .catch(err => console.log(err))

        Room.findById(roomId) //Esto para actualizar el room y que pushee
        .then(room => {
            console.log("**** La habitacion tiene estos seguidores:", room.followers)
            if (room.followers.indexOf(userId) !== -1) {
                console.log("***** La habitación es seguida por este usuario")
                Room.findByIdAndUpdate(roomId, { $pull: { followers: userId } }, { new: true })
                    .then(updatedRoom => res.json(updatedRoom))
                    .catch(err => console.log(err))
            }
            else {
                console.log("***** El usuario no sigue esta habitación")

                return null
            }
        }
        )
        .catch(err => console.log(err))
    } else {
        console.log("follow")
        User.findById(userId) //Esto para actualizar el usuario y que pushee
            .then(user => {
                console.log("****", user.following)
                if (user.following.includes(roomId)) return null
                else {
                    User.findByIdAndUpdate(userId, { $push: { following: roomId } }, { new: true })
                        .then(updatedUser => res.json(updatedUser))
                        .catch(err => console.log(err))
                }
            }
            )
            .catch(err => console.log(err))

        Room.findById(roomId) //Esto para actualizar el room y que pushee
            .then(room => {
                console.log("****", room.followers)
                if (room.followers.includes(userId)) return null
                else {
                    Room.findByIdAndUpdate(roomId, { $push: { followers: userId } }, { new: true })
                        .then(updatedRoom => res.json(updatedRoom))
                        .catch(err => console.log(err))
                }
            }
            )
            .catch(err => console.log(err))
    }
})
module.exports = router



