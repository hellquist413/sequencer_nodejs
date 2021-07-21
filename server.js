const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const Tone = require('tone')
const mongoose = require('mongoose')
const indexRouter = require('./routes/index')
const sequencerRouter = require('./routes/sequencer')
require('dotenv').config()
const PORT = 3000;

const dbURI = process.env.DATABASE;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(PORT, () => console.log(`Connected to db!`)))
    .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))


app.use('/', indexRouter)
app.use('/sequencer', sequencerRouter)

// app.listen('port', PORT)

module.exports = { dbURI }