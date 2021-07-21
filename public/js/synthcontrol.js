
const knobVol = document.getElementById("knobVol");
knobVol.addEventListener("input", (event) => {
    synthKnobVol = event.target.value;
    synth3.volume.value = synthKnobVol;
    // console.log(synth3.volume.value);
});

function updateKnobVol (value) {
    knobVol.value = value;
    synth3.volume.value = value;
}

// ---------------------------------------------------// 

const knob1 = document.getElementById("knob1");
knob1.addEventListener("input", (event) => {
    synthKnob1 = event.target.value;
    synth3.detune.value = synthKnob1;
});


function updateKnob1 (value) {
    knob1.value = value;
    synth3.detune.value = value;
}

// ---------------------------------------------------// 

const knob2 = document.getElementById("knob2");
knob2.addEventListener("input", (event) => {
    synthKnob2 = event.target.value;
    synth3.filterEnvelope.baseFrequency = synthKnob2;
});

function updateKnob2 (value) {
    knob2.value = value;
    synth3.filterEnvelope.baseFrequency = value;
}

// ---------------------------------------------------// 

const knob3 = document.getElementById("knob3");
knob3.addEventListener("input", (event) => {
    synthKnob3 = event.target.value;
    synth3.filterEnvelope.sustain = synthKnob3 * 0.01;
    synth3.filterEnvelope.decay = synthKnob3 * 0.01;
    synth3.filterEnvelope.release = synthKnob3 * 0.1 ;
});

function updateKnob3 (value) {
    knob3.value = value;
    value *= 0.01;
    synth3.filterEnvelope.sustain = value;
    synth3.filterEnvelope.decay = value;
    synth3.filterEnvelope.release = value * 10;
}

// ---------------------------------------------------// 

const knob4 = document.getElementById("knob4");
knob4.addEventListener("input", (event) => {
    synthKnob4 = event.target.value;
    synth3.envelope.sustain = synthKnob4 * 0.01;
    synth3.envelope.decay = synthKnob4 * 0.01;
});

function updateKnob4 (value) {
    knob4.value = value;
    value *= 0.01;
    synth3.envelope.sustain = value;
    synth3.envelope.decay = value;
}

// ---------------------------------------------------// 

const knob5 = document.getElementById("knob5");
knob5.addEventListener("input", (event) => {
    synthKnob5 = event.target.value;
    pingPong.wet.value = synthKnob5 * 0.01;
});

function updateKnob5 (value) {
    knob5.value = value;
    value *= 0.01;
    pingPong.wet.value = value;
}

// ---------------------------------------------------// 

const knob6 = document.getElementById("knob6");
knob6.addEventListener("input", (event) => {
    synthKnob6 = event.target.value;
    reverb.wet.value = synthKnob6 * 0.01;
});

function updateKnob6 (value) {
    knob6.value = value;
    value *= 0.01;
    pingPong.wet.value = value;
}

// ---------------------------------------------------// 

const knob7 = document.getElementById("knob7");
knob7.addEventListener("input", (event) => {
    synthKnob7 = event.target.value;
    filter.wet.value = synthKnob7 * 0.01;
});

function updateKnob7 (value) {
    knob7.value = value;
    value *= 0.01;
    filter.wet.value = value;
}
// ---------------------------------------------------// 

const knob8 = document.getElementById("knob8");
knob8.addEventListener("input", (event) => {
    synthKnob8 = event.target.value;
    filter.frequency.value = synthKnob8;
});

function updateKnob8 (value) {
    knob8.value = value;
    filter.frequency.value = value;
}

// ---------------------------------------------------// 
