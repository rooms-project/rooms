const express = require('express')
const router = express.Router()

const Room = require('../models/room-model')
const User = require("../models/user-model")

router.get('/getAllRooms', (req, res) => {
    Room.find()
        .then(data => res.json(data))
        .catch(err => console.log('Error:', err))
})

router.get('/getOneRoom/:id', (req, res) => {
    Room.findById(req.params.id)
        .then(data => res.json(data))
        .catch(err => console.log('Error:', err))
})

router.post('/newRoom', (req, res) => {
 //   const {CURRAUNPOCO} = req.body
    Room.create(req.body)
        .then(room => {
            User.findByIdAndUpdate(room.owner,  { $push: { room: room._id }}, { new: true })
            .then(() => res.json(room))
            .catch(err => console.log("Error:", err))
        })
        .catch(err => console.log('Error:', err))
})

module.exports = router