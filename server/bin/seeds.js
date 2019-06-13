require('dotenv').config()

const mongoose = require('mongoose');
const Room = require('../models/room-model');
const User = require('../models/user-model');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema

const hashPass = bcrypt.hashSync('1234', bcrypt.genSaltSync(8), null);


mongoose.connect("mongodb://localhost:27017/Rooms", { useNewUrlParser: true })



let rooms = [
  {
    roomname: "Popino's @wesomE Roomz",
    description: "My room is the best",
    location: {
        latitude: 40.428833, 
        longitude: -4.678207,
    },
    imageUrl: "https://visualpharm.com/assets/277/Room-595b40b85ba036ed117de0e6.svg",
    videoUrl: "https://www.youtube.com/watch?v=pU8-7BX9uxs",
    owner: "5cffc23da5473f12893263b2",
    tags:["room", "ukele", "nintendo", "naked", "madrid"],
    streams: 3,
    followers: ["5cffc23da5473f12893263b2", "5cffc23da5473f12893263b2"],
    likes: 2

}, {
        timestamps: true
    }

]

let users = [
  {
    username: "Tino",
    password: hashPass,
    imageUrl:'',
    room:"5cffc23da5473f12893263b5",
    following: ["5cffc23da5473f12893263b3"],
}, {
        timestamps: true
    },
  {
    username: "Pepe",
    password: hashPass,
    imageUrl:'',
    room:"5cffc23da5473f12893263b6",
    following: ["5cffc23da5473f12893263b3"],
}, {
        timestamps: true
    }
]

User.create(users)
  .then(usersCreated => {
    console.log(usersCreated)
      usersCreated.forEach((user)=>{
        rooms.forEach((room)=>{
            if(user.username==room.owner){
              room.owner=user._id
            }
          })
      })

    Room.create(rooms)
      .then(roomsCreated =>{
        // console.log(artworksCreated)
        console.log(`Creados ${roomsCreated.length} rooms`)

         Promise.all(usersCreated.map(user => {
           console.log(user)
           const roomUser = roomsCreated.filter(room => room.owner == user._id);
           const roomId = roomUser.map(room => room._id);
           return user.updateOne({room:roomId})
         }))
        .then(msg => {
          console.log(msg)
          mongoose.connection.close()
        })
      })
      .catch(err => console.log("Este es el error" + err))
    console.log(`Creados ${usersCreated.length} users`)
  })
  .catch(err => console.log("Este es el error" + err))








