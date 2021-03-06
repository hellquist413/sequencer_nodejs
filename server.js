const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const indexRouter = require('./routes/index')
const sequencerRouter = require('./routes/sequencer')
require('dotenv').config()
const PORT = 3000;
mongoose.set('useFindAndModify', false);
const cors = require('cors')
const useDB = false;


const dbURI = process.env.DATABASE;
const CORSHOST = process.env.CORSHOST;

const corsOptions = {
    origin: CORSHOST,
    optionsSuccessStatus: 200
}

if(useDB === true) {
    mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(PORT, () => console.log(`Connected to db!`)))
    .catch((err) => console.log(err));
} else {
    app.listen(PORT, () =>
    console.log(`!-- useDB set to false! No database connected! --!\n!-- local server running at http://localhost:` + PORT + ` --!`)
    )
}

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))


app.use('/', indexRouter)
app.use('/sequencer', sequencerRouter)

module.exports = { dbURI }
module.exports = { CORSHOST }