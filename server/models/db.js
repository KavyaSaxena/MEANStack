const mongoose = require('mongoose')
const db = require('../config/keys.js').mongoURI
// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true }) // Let us remove that nasty deprecation warrning :)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))
require('./usermodel')