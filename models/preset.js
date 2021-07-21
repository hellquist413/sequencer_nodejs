const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const presetSchema = new Schema({

    id: { type: Number, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number },
    kit: { type: String, required: true },
    bpm: { type: String, required: true },
    steps: { type: String, required: true },
    swing: { type: Number, required: true },
    swingsub: { type: String, required: true },
    songdata: { type: Array, required: true },

    volume: { type: Number, required: true },
    semitone: { type: Number, required: true },
    filtercutoff: { type: Number, required: true },
    filterenvelope: { type: Number, required: true },
    sustain: { type: Number, required: true },
    pingpong: { type: Number, required: true },
    reverb: { type: Number, required: true },
    lfoamount: { type: Number, required: true },
    lfofreq: { type: Number, required: true }
 
}, { timestamps: true });

const Preset = mongoose.model('presets', presetSchema);

module.exports = Preset;