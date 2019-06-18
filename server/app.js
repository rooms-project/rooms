require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const mongoose     = require('mongoose');



require('./configs/passport.config')
require('./configs/mongoose.config')



// mongoose
//   .connect('mongodb://localhost/back', {useNewUrlParser: true})
//   .then(x => {
//     console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
//   })
//   .catch(err => {
//     console.error('Error connecting to mongo', err)
//   });




const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();



app.use(session({
  secret: "sshhhhh",
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'hbs');

// configuracion middleware CORS
const whitelist = ['http://localhost:5000']
const corsOptions = {
  origin: (origin, cb) => {
    const originIsWhitelisted = whitelist.includes(origin);
    cb(null, originIsWhitelisted)
  },
  credentials: true
}
app.use(cors(corsOptions))



app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public'))); //***Deploy: No borrar esta línea


//const coasterRoutes = require('./routes/coaster.routes')
//app.use('/api', coasterRoutes)

const apiRoutes = require('./routes/api.routes')
app.use('/api', apiRoutes)

const roomRoutes = require('./routes/rooms.routes')
app.use('/api/rooms', roomRoutes)

const userRoutes = require('./routes/user.routes')
app.use('/api/users', userRoutes)

// const roomRoutes = require('./routes/rooms.routes')
// app.use('/api', roomRoutes)

const authRoutes = require('./routes/auth.routes');
app.use('/api', authRoutes);

// Middleware subida de archivos Cloudinary
const fileRoutes = require('./routes/file-upload.routes')
app.use('/api', fileRoutes);

//***Deploy: Añadir app.use


module.exports = app;