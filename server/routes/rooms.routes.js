const express = require('express')
const router = express.Router()

const Room = require('../models/room-model')

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
    Room.create(req.body)
        .then(data => res.json(data))
        .catch(err => console.log('Error:', err))
})

module.exports = router