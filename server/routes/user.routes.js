const express = require('express')
const router = express.Router()

const User = require('../models/user-model')

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
module.exports = router



