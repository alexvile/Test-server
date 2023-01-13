const express = require("express");
const logger = require("morgan");
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const {errorHandler} = require('./helpers/apiHelpers')

const app = express();

app.use(logger('short'));
app.use(cors());
app.use(express.json());



app.use('/api/users', userRoutes);

app.use(errorHandler);

// todo - temporary solution to empty pages

app.use((req, res) => {
    res.status(404).json({ message: 'Not found' })
  })
  
  app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message })
  })

module.exports = app
