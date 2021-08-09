const express = require('express')
const router = express.Router()
const cors = require('cors')
const CORSHOST = process.env.CORSHOST;

const corsOptions = {
    origin: CORSHOST,
    optionsSuccessStatus: 200
}

router.get('/', cors(corsOptions), (req, res) => {


	res.render('index')


})

module.exports = router