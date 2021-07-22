const express = require('express')
const router = express.Router()
const Preset = require('../models/preset')

// Sequencer route
router.get('/', (req, res) => {

	res.render('sequencer/index')

});

router.get('/get-presets', (req, res) => {
    Preset.find().sort({ createdAt: -1 })
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});


router.put('/vote', async (req, res) => {

    try {
        const id = req.body.uPreId;
        const vote = req.body.vote;

        Preset.findOneAndUpdate({ _id: id },
        { $inc: { rating: vote } })
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
        });
    } catch(error) {
        console.log(error);
    }
});

router.get('/id/:id', (req, res) => {
    const id = req.params.id;
    Preset.findById(id)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
});

// Get
router.get('/presetlist', (req, res) => {

	res.render('sequencer/index')

})

router.post('/publish', async (req, res) => {

    try {
    const { id } = req.body;
    const { formAuthor } = req.body;
    const { formDescription } = req.body;
    const { newRating } = req.body;
    const { kit } = req.body;
    const { bpm } = req.body;
    const { steps } = req.body;
    const { swingValueDef } = req.body;
    const { swingSubDiv } = req.body;
    const { stepsData } = req.body;

    const { synthKnobVol } = req.body;
    const { synthKnob1 } = req.body;
    const { synthKnob2 } = req.body;
    const { synthKnob3 } = req.body;
    const { synthKnob4 } = req.body;
    const { synthKnob5 } = req.body;
    const { synthKnob6 } = req.body;
    const { synthKnob7 } = req.body;
    const { synthKnob8 } = req.body;

    if (!formAuthor) { res.status(418).json({ message: 'No author input!' }) }
    if (!formDescription) { res.status(418).json({ message: 'No description input!' }) }

    const preset = new Preset({
        id: id,
        author: formAuthor,
        description: formDescription,
        rating: newRating,
        kit: kit,
        bpm: bpm,
        steps: steps,
        swing: swingValueDef,
        swingsub: swingSubDiv,
        songdata: stepsData,

        volume: synthKnobVol,
        semitone: synthKnob1,
        filtercutoff: synthKnob2,
        filterenvelope: synthKnob3,
        sustain: synthKnob4,
        pingpong: synthKnob5,
        reverb: synthKnob6,
        lfoamount: synthKnob7,
        lfofreq: synthKnob8
    });

    preset.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        });
    } catch (e) {
        res.end(e.message || e.toString());
    }

});


module.exports = router