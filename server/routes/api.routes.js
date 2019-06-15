const express = require('express');
const router  = express.Router();
const User = require("../models/user-model")
const Room = require("../models/room-model")


router.get('/', (req, res, next)=>{
  User.find() 
  .then(users => res.json(users))
  .catch(error => console.log(error))

})

// router.get('/artworks', (req, res, next)=>{
//   Artwork.find()
//   .then(artworks => res.json(artworks))
//   .catch(error => console.log(error))
// })

// router.get('/artworks/genre/:genre', (req, res, next) =>{
//   Artwork.find({ genre:req.params.genre })
//   .then((user) => {
//     console.log(req.params.genre)
//     res.json(user)
  
//     })
//   .catch(error => console.log(error))
  
//   })


// router.get('/:id', (req, res, next) =>{
//   console.log('------------------------------------------------------------------------------------------------------------------------------')

// User.findById(req.params.id)
// .then(user => res.json(user))
// .catch(error => console.log(error))

// })

// router.get('/role/:role', (req, res, next) =>{
// User.find({ role:req.params.role })
// .then((user) => {
//   console.log(req.params.role)
//   res.json(user)

//   })
// .catch(error => console.log(error))

// })

// router.get('/genre/:genre', (req, res, next) =>{
// User.find({$and: [{ genre:req.params.genre }, {role:req.query.role}]})
// .then((user) => {
//   console.log(req.params.role)
//   res.json(user)

//   })
// .catch(error => console.log(error))

// })

 
module.exports = router