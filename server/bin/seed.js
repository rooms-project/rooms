require('dotenv').config()

const mongoose = require('mongoose');
const Rooms = require('../models/room-model');
const User = require('../models/user-model');
const bcrypt = require('bcrypt');

const hashPass = bcrypt.hashSync('1234', bcrypt.genSaltSync(8), null);

//const dbName = 'MAD-ART'
mongoose.connect(process.env.DBlocal)



const users = [
  {
    username: "pepito",
    password: hashPass,
    imageUrl: "",
    room: "Pepito's room",
    following: [],   
  },
]

const rooms = [
  {
    roomname: "Pepito's room",
    location: [],
    imageUrl: String,
    videoUrl: String,
    owner: String,
    streams: Number,
    followers: Array,
  }
]