'use strict';
const express = require('express');
const cors = require('cors');
const config = require('./config')
const classroom = require('./routes/index');

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api', classroom.routes)

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`)
})