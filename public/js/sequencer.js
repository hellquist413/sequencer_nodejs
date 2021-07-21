
let rows = 9;
let steps = 16;
let isPlaying = false;
let initialized = false;
let stepsData = [];
let swingValueDef = 8;
let swingSubDiv = '32n';
let bpm = 133;
let songsData = [];
let lastId = "";
let currentKitName = "SubtiltQuist";

// ----------------------------------// 
// User preset settings

let uPreLoaded = false;
let uPreId = "";
let uPreRating = 0;
let uPreAuthor = "";
let uPreDescription = "";
let uPreKit = 1;
let sampleUrl = 'http://localhost:3000/samples/';

let activateHeader = document.querySelector('.presetBox');
let bpmInput = document.getElementById('bpmInput');
bpmInput.value = bpm;
let previousKit = "1";

// Kits //
let vol1 = 0;
let vol2 = 0;
let vol3 = 0;
let vol4 = 0;
let vol5 = 0;
let vol6 = 0;
let vol7 = 0;
let vol8 = 0;
let vol9 = 0;

// Default synth values translated to knobs
let synthKnobVol = -10;
let synthKnob1 = 0;
let synthKnob2 = 100;
let synthKnob3 = 30;
let synthKnob4 = 50;
let synthKnob5 = 10;
let synthKnob6 = 30;
let synthKnob7 = 0;
let synthKnob8 = 1;

stepsData = [
  [0, 0, 1, 0,    0, 0, 1, 0,   0, 0, 1, 0,   0, 0, 1, 0],
  [0, 0, 0, 0,    1, 0, 0, 0,   0, 0, 0, 0,   1, 0, 0, 0],
  [0, 0, 0, 0,    0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0],
  [0, 0, 0, 0,    0, 0, 0, 1,   0, 1, 0, 0,   0, 0, 0, 0],
  [0, 0, 0, 0,    0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0],
  [0, 1, 0, 0,    0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0],
  [0, 0, 0, 1,    0, 1, 0, 1,   0, 0, 0, 0,   0, 0, 0, 0],
  [1, 0, 0, 0,    1, 0, 0, 0,   1, 0, 0, 0,   1, 0, 0, 0],
  [1, 0, 1, 1,    1, 1, 1, 0,   0, 1, 0, 1,   0, 1, 1, 0] 
];


// ----------------------------------------------// 
// ----------------------------------------------// 
// ----------------------------------------------// 
// Create instruments & samples

let mixer = new Tone.Gain({ value: 0, });
let reverb = new Tone.Reverb({
  wet: 0.3,
  decay: 8,
});

let vol = new Tone.Volume({ volume: -10, });

const pingPong = new Tone.PingPongDelay("16n.", 0.2);
pingPong.wet.value = 0.2;

const filter = new Tone.AutoFilter().start();
filter.baseFrequency = 200;
filter.depth.value = 1;
filter.octaves = 3.8;
filter.wet.value = 0;

pingPong.wet.value = 0.2;
reverb.connect(filter);
pingPong.connect(filter);
mixer.connect(vol);
filter.connect(mixer);

vol.toDestination();

let synths = [];
let notes = [];

// ----------------------------------------------// 
// ----------------------------------------------// 
// ----------------------------------------------// 

function createSynths() {
  
  selectKit(uPreKit);

  return synths
}

// ----------------------------------------------// 

function createStepsArray() {
  for (let i = 0; i < rows; i++) {
    const arrayRows = new Array(16).fill(0);
    stepsData.push(arrayRows);
  }
}

// ----------------------------------------------// 

function resetStepsArray() {

  if(uPreId != "") { 
    let rowDiv = document.getElementById('pId_' + uPreId);
    rowDiv.classList.remove('cellActive'); 
  }

  uPreLoaded = false;
  uPreId = "";
  uPreRating = 0;
  uPreAuthor = "";
  uPreDescription = "";
  swingValueDef = 8;
  swingSubDiv = "32n";
  rows = 9;
  steps = 16;


  activateHeader.classList.remove('presetBox-active');
  stepsData = [];
  createStepsArray();
  createTable(rows, steps);
}



// ----------------------------------------------// 
// ----------------------------------------------// 
// ----------------------------------------------// 

function createTable(rows, steps) {

  let seq = document.getElementById('seq');

  if (seq.innerHTML !== '') {
    let rem = document.querySelector('.divTable');
    rem.remove();
  }

  let newTable = document.createElement('div');
  newTable.classList.add('divTable');
  seq.appendChild(newTable);

  let newTableBody = document.createElement('div');
  newTableBody.classList.add('divTableBody');

  seq.querySelector('.divTable').appendChild(newTableBody);

  let newTableHead = document.createElement('div');
  newTableHead.setAttribute('id', 'tableHead');

  newTableBody.appendChild(newTableHead);

  let newTableSpace = document.createElement('div');
  newTableSpace.classList.add('tableSpaceHead');
  newTableSpace.innerHTML = '<span id="headSpan"></span>';
  seq.querySelector('#tableHead').appendChild(newTableSpace);


  // Calculate numbers for table head
  let j = 0;
  let f = 0;

  for (let i = 0; i < steps; i++, j++) {
    let timeHeader = document.createElement('div');
    timeHeader.setAttribute('id', 'divTableHead');
    if (i % 4 === 0) { f++; }
    if (j === 4 || j === 0) { j = 0; timeHeader.classList.add('forthN'); }
    timeHeader.innerHTML = f + '.' + (j + 1);
    seq.querySelector('#tableHead').appendChild(timeHeader);
  }


  // Create table rows [instruments]


  for (let i = 0; i < rows; i++) {

    let forC = 0;
    let newTableRow = document.createElement('div');

    newTableRow.classList.add('divTableRow');
    newTableRow.setAttribute('id', 'row_' + i);

    seq.querySelector('.divTableBody').appendChild(newTableRow);

    instrumentId = i;
    let newTableSpace = document.createElement('div');
    newTableSpace.classList.add('tableSpace');
    newTableSpace.setAttribute('id', 'mix' + i);
    newTableSpace.innerHTML = (
      '<img src="../img/inst/mix.svg" id="inst" onclick="triggerMix('
      + instrumentId +
      ')" class="mixElementFilter">'
    );

    seq.querySelector('#row_' + i).appendChild(newTableSpace);


    // Create horizontal steps

    for (let l = 0; l < steps; l++, forC++) {

      let newTableCell = document.createElement('div');
      newTableCell.classList.add('divTableCell');

      newTableCell.classList.add("mix");
      newTableCell.setAttribute('id', 'row_' + i + '_' + l)

      if (l % 4 == 0) {
        newTableCell.classList.add('forth');
      }

      // Keep cells active when zooming
      stepsData.forEach((arrayRows, index) => {
        let active = arrayRows[l];
        if (active === 1 && i == index) {
          newTableCell.classList.add('cellActive');
        }
      });
      newTableRow.appendChild(newTableCell);
    }
  }

  const clickCells = document.querySelectorAll('.divTableCell');

  for (let i = 0; i < clickCells.length; i++) {
    clickCells[i].addEventListener('click', activateSteps);
  }

}

// ----------------------------------------------// 

function minusBar() {
  if (steps <= 4) return;
  steps -= 4;
  Tone.Draw.cancel();
  createTable(rows, steps);
}

// ----------------------------------------------// 

function plusBar() {
  if (steps >= 16) return;
  steps += 4;
  Tone.Draw.cancel();
  createTable(rows, steps);
}

// ----------------------------------------------// 


function activateSteps() {
  this.classList.toggle('cellActive');

  // Get Row & Step ID of clicked step
  let getId = this.id.split("_")
  const rowId = getId[1];
  const stepId = getId[2];
  let newValue = 0;

  const getArrayDataRow = stepsData[rowId];

  if (stepsData[rowId][stepId] === 0) {
    newValue = 1;
  } else {
    newValue = 0;
  }

  getArrayDataRow.splice(stepId, 1, newValue);
}

// ----------------------------------------------// 
// ----------------------------------------------// 
// ----------------------------------------------// 

swingValue = document.getElementById("swingSlider").value = swingValueDef;
const slider = document.getElementById("swingSlider");

slider.oninput = function () {
  swingValue = slider.value;
  var swing = (swingValue / 100);
  Tone.Transport.swing = swing;
}

// ----------------------------------------------// 
// ----------------------------------------------// 
// ----------------------------------------------// 

function swingSub(value) {
  const currentSwingSub = document.getElementById("displaySwing");
  const subDisplaySelected = document.getElementById(value);
  subDisplaySelected.classList.add('green');

  if (value !== currentSwingSub.innerHTML) {
    subDisplayPrev = document.getElementById(currentSwingSub.innerHTML);
    subDisplayPrev.classList.remove('green');
  }

  currentSwingSub.innerHTML = value;
  swingSubDiv = value;

  if (isPlaying === true) {
    Tone.Transport.swingSubdivision = swingSubDiv;
    startNow();
  }
}

// ----------------------------------------------// 
// ----------------------------------------------// 
// ----------------------------------------------// 

function activeKit (value) {
  const grabCurrentKitDOM = document.getElementById('displayKit');
  const grabSelectedKitClick = document.getElementById("kit" + value);
  grabSelectedKitClick.classList.add('green');

  if (value !== previousKit) {
    grabPreviousKitDOM = document.getElementById("kit" + previousKit);
    grabPreviousKitDOM.classList.remove('green');
  }

  grabCurrentKitDOM.innerHTML = ('Kit: ' + currentKitName);;
  
}

// ----------------------------------------------// 
// ----------------------------------------------// 
// ----------------------------------------------// 

function startLoop() {

  let beat = 0;
  // Save synth preset if user change kit
  updateKnobVol(knobVol.value);
  updateKnob1(knob1.value);
  updateKnob2(knob2.value);
  updateKnob3(knob3.value);
  updateKnob4(knob4.value);
  updateKnob5(knob5.value);
  updateKnob6(knob6.value);
  updateKnob7(knob7.value);
  updateKnob8(knob8.value);

  const repeat = (time) => {

    stepsData.forEach((arrayRows, index) => {

      let synth = synths[index];
      let note = arrayRows[beat];
      if (note === 1) {

        if (index == 8) {
          synth3.triggerAttackRelease(notes[index], '16n', time + 0.1);
          // synth.triggerAttackRelease(notes[index], '16n', time + 0.1);
        } else if (index == 7) {
          synth.triggerAttackRelease(notes[index], '1n', time + 0.1);
        } else {
          synth.triggerAttackRelease(notes[index], '1n', time + 0.1);
        }
      }

      Tone.Draw.schedule(function () {
        let getDrawCell = document.querySelector('#row_' + index + '_' + beat);

        if (!getDrawCell) return
        const getId = getDrawCell.id.split("_")
        const rowId = getId[1];
        const stepId = getId[2];

        if (getDrawCell.classList.contains('cellActive')) {
          paintActive(index, beat, true);

        } else {
          paintActive(index, beat, false);
        }

      }, time)

    });

    beat = (beat + 1) % steps;

  };

  Tone.Transport.scheduleRepeat(repeat, '16n', + 0.5);
  startNow();
}

// ----------------------------------------------// 
// ----------------------------------------------// 
// ----------------------------------------------// 

function startNow() {

  Tone.Transport.bpm.value = bpm;
  Tone.Transport.subdivision = swingSubDiv;
  Tone.Transport.start();
}

// ----------------------------------------------// 
// ----------------------------------------------// 
// ----------------------------------------------// 

function paintActive(index, beat, active) {
  const getDrawCell = document.querySelector('#row_' + index + '_' + beat);

  if (!active) {
    getDrawCell.classList.add('activeStep');
    setTimeout(function () { getDrawCell.classList.remove('activeStep'); }, 150);
  } else {
    getDrawCell.classList.add('invertStep');
    setTimeout(function () { getDrawCell.classList.remove('invertStep'); }, 150);
  }
}

// ----------------------------------------------// 
// ----------------------------------------------// 
// ----------------------------------------------// 
// Play from instrument rows

function triggerMix(index) {
  if (initialized === true) {
    synths[index].triggerAttackRelease(notes[index], '4n');
  } else {
    initialize();
    startLoop();
    stopPlaying()
    triggerMix(index);
  }
}

// ----------------------------------// 

function initialize() {
  Tone.start();
  startLoop();
  initialized = true;
}

// ----------------------------------// 

function stopPlaying() {
  Tone.Transport.stop();
  Tone.Draw.cancel();
  isPlaying = false;
}

// ----------------------------------// 

function startPlaying() {
  startNow();
  isPlaying = true;
}

// ----------------------------------------------// 
// ----------------------------------------------// 
// ----------------------------------------------// 
// Play button

function handlePlay() {
  const button = document.getElementById('playBtn');
  button.addEventListener('click', () => {
    if (!initialized) {
      initialize();
    }
    if (isPlaying) {
      stopPlaying();
      button.innerHTML = 'Play';
      button.classList.remove('green');
    } else {
      startPlaying();
      button.innerHTML = 'Stop';
      button.classList.add('green');
    }

  });
}





// ----------------------------------------------// 
// ----------------------------------------------// 
// ----------------------------------------------// 
// Play with spacebar

document.addEventListener('keydown', function (e) {
  if (e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();

    const button = document.getElementById('playBtn');

    if (!initialized) {
      initialize();
    }
    if (isPlaying) {
      stopPlaying();
      button.innerHTML = 'Play';
      button.classList.remove('green');
    } else {
      startPlaying();
      button.innerHTML = 'Stop';
      button.classList.add('green');
    }
  }
});

// ----------------------------------------------// 
// ----------------------------------------------// 
// ----------------------------------------------// 
// Inputs for BPM value

const minusBpmBtn = document.querySelector('.minus');
minusBpmBtn.addEventListener("click", function () {
  bpm = bpmInput.value;
  Tone.Transport.bpm.value = bpm;
});

const plusBpmBtn = document.querySelector('.plus');
plusBpmBtn.addEventListener("click", function () {
  bpm = bpmInput.value;
  Tone.Transport.bpm.value = bpm;
});

// ----------------------------------// 

function isNumberKey(evt) {
  var charCode = (evt.which) ? evt.which : evt.keyCode
  if (charCode > 31 && (charCode < 48 || charCode > 57))
    return false;
  return true;
}

// ----------------------------------// 

bpmInput.addEventListener("change", function () {
  let v = parseInt(this.value);
  if (v <= 20) {
    this.value = 20;
    bpm = 20;
    Tone.Transport.bpm.value = bpm;
  } else if (v >= 300) {
    this.value = 300;
    bpm = 300;
    Tone.Transport.bpm.value = bpm;
  } else {
    bpm = this.value;
    Tone.Transport.bpm.value = bpm;
  }
});

// ----------------------------------// 
// Longpress

let timer;
let wait;
const tempo = 60;

function mouseDown(id) {
  if (bpm <= 20 || bpm >= 300) { return }
  wait = setTimeout(function () {
    timer = setInterval(function () {
      if (id === 'min') {
        bpm = --bpmInput.value;
      } else {
        bpm = ++bpmInput.value;
      }
      if (bpm === 20 || bpm === 300) mouseUp();
      bpmInput.value = bpm;
      Tone.Transport.bpm.value = bpm;
    }, tempo);
  }, 300);
}

const mouseUp = () => {
  clearInterval(wait);
  clearInterval(timer);
};

// ----------------------------------------------// 
// ----------------------------------------------// 
// ----------------------------------------------// 
// JSON LOAD PRESET LIST




let requestTrack = new Request('/sequencer/get-presets');

function loadPresetList() {

  fetch(requestTrack)
    .then(function (response) {
      return response.json();
    })
    .then(function (songsData) {

      // Create Rows
      let i = 1;

      songsData.forEach(songsData => {
        let pId = songsData.id;
        let pAuthor = songsData.author;
        let pDescription = songsData.description;
        let pRating = songsData.rating;

        let presetContainer = document.getElementById('up');
        let presetRow = document.createElement('div');
        presetRow.classList.add('user-presets-content');
        presetRow.setAttribute('id', 'pId_' + songsData._id);
 
        if(i % 2 === 0) { presetRow.classList.add('lightgray'); }
        i++;

        // Create cells
        let presetCell = document.createElement('div');
        let presetCell2 = document.createElement('div');
        let presetCell3 = document.createElement('div');
        presetCell.classList.add('user-presets-content-cell', 'pCell1');
        presetCell2.classList.add('user-presets-content-cell', 'pCell2');
        presetCell3.classList.add('user-presets-content-cell', 'pCell3');

        let htmlAuthor = pAuthor.substring(0, 9);
        let htmlDescription = pDescription.substring(0, 40);
        let endline = "";
        let endline1 = "";
        if (pDescription.length > 40) { endline = ".." }
        if (pAuthor.length > 9) { endline1 = ".." }

        presetCell.innerHTML = pRating;
        presetCell2.innerHTML = htmlAuthor + endline1;
        presetCell3.innerHTML = htmlDescription + endline;
        presetRow.appendChild(presetCell);
        presetRow.appendChild(presetCell2);
        presetRow.appendChild(presetCell3);
        presetContainer.appendChild(presetRow);

        presetRow.addEventListener('click', listenToSong);

        lastId = songsData._id;
      });
    })    .then(function () {

      const presetRows = document.querySelectorAll('.user-presets-content');
      for (let i = 0; i < presetRows.length; i++) {
        presetRows[i].addEventListener('click', listenToSong);
      }
      return songsData
    });
}


// ----------------------------------------------// 
// ----------------------------------------------// 
// ----------------------------------------------// 
// LISTEN TO SONG










function listenToSong() {

  let id;
  let rowDiv;
  let getId
  let idN
  let requestTrackId

  if(lastId == "" && !initialized) {
    requestTrackId = new Request('/sequencer/id/' + getUserPresetFromUrl);
    id = 'pId_' + getUserPresetFromUrl;
    idN = getUserPresetFromUrl;
    rowDiv = document.getElementById(id);
  } else {
    id = this.id; 
    getId = this.id.split("_");
    idN = getId[1];
    requestTrackId = new Request('/sequencer/id/' + idN);
  }

  fetch(requestTrackId)
    .then(function (response) {
      return response.json();
    })
    .then(function (songsData) {

      window.history.replaceState("", "", '/sequencer/?id=' + idN);
      lastId = idN;

      previousKit = uPreKit;

      if (uPreId != "" && uPreId !== idN) {
        rowDiv = document.getElementById('pId_' + uPreId);
        rowDiv.classList.remove('cellActive');
      }

      // NEW VALUES

      uPreLoaded = true;
      uPreId = songsData._id;
      uPreRating = songsData.rating;
      uPreAuthor = songsData.author;
      uPreDescription = songsData.description;
      uPreKit = songsData.kit;
      stepsData = songsData.songdata;
      rows = 9;
      steps = songsData.steps;
      rowDivId = idN;
      bpm = parseInt(songsData.bpm);
      
      Tone.Draw.cancel();
      swingSub(swingSubDiv);
      createTable(rows, steps);
      selectKit(uPreKit);

      swingValueDef = songsData.swing;
      swingSubDiv = songsData.swingsub;      

      bpmInput.value = bpm;
      swingValue = document.getElementById("swingSlider").value = swingValueDef;

      setPresetBoxAuthor = document.getElementById('pAuthor');
      setPresetBoxAuthor.innerHTML = uPreAuthor;

      setPresetBoxDescr = document.getElementById('pDescription');
      setPresetBoxDescr.innerHTML = uPreDescription;

      removeLastActiveKit = document.getElementById('kit' + previousKit)
      removeLastActiveKit.classList.remove('green');

      newActiveKit = document.getElementById('kit' + uPreKit);
      newActiveKit.classList.add('green');

      let getKitName = kitNames(uPreKit)
      setPresetKit = document.getElementById('displayKit');
      setPresetKit.innerHTML = 'Kit: ' + getKitName;

      activateHeader.classList.add("presetBox-active");

      updateKnobVol(songsData.volume);
      updateKnob1(songsData.semitone);
      updateKnob2(songsData.filtercutoff);
      updateKnob3(songsData.filterenvelope);
      updateKnob4(songsData.sustain);
      updateKnob5(songsData.pingpong);
      updateKnob6(songsData.reverb);
      updateKnob7(songsData.lfoamount);
      updateKnob8(songsData.lfofreq);
    });

    rowDiv = document.getElementById(id);
    if(rowDiv) { rowDiv.classList.add('cellActive'); }
}

function sanitizeString(str) {
  str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
  return str.trim();
}

const submitForm = document.getElementById('submitForm');
submitForm.addEventListener('submit', (event) => {

  event.preventDefault();
  const formAuthor = document.getElementById('formAuthor').value;
  const formDescription = document.getElementById('formDescription').value;

  // Check all inputs and so track is not empty
  if (formAuthor !== "" && formDescription !== "") {
    
    submitData(sanitizeString(formAuthor), sanitizeString(formDescription));

  } else if (!formAuthor) {
    console.log('author missing');
    return false
  } else if (!formDescription) {
    console.log('description missing');
    return false
  }

});

async function submitData(formAuthor, formDescription) {

  const url = "/sequencer/publish";
  let newRating = 0;
  lastId = 0;
  let id = lastId + 1;
  let kit = uPreKit;
  
  const data = { 
    id,
    formAuthor, 
    formDescription,
    newRating,
    kit,
    bpm,
    steps,
    swingValueDef,
    swingSubDiv,
    stepsData,
    synthKnobVol,
    synthKnob1,
    synthKnob2,
    synthKnob3,
    synthKnob4,
    synthKnob5,
    synthKnob6,
    synthKnob7,
    synthKnob8
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  const res = await fetch(url, options);
  const json = await res.json();
  console.log(json);
  window.location.assign('/sequencer');

  let presetContainer = document.getElementById('up');
  presetContainer.innerHTML = '';
  loadPresetList();
  
  return json;
}

function requireValue(input, message) {
  return input.value.trim() === '' ?
    error(input, message) :
    success(input);
}

// ----------------------------------------------// 
// Fix this vote 

async function vote(vote) {

  if (vote === 1) {
    console.log('vote up');
  } else {
    console.log('vote down');
  }
    console.log(uPreId);

// const requestVote = new Request('/vote' );
const voteData = { uPreId, vote };

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(voteData)
};
console.log(JSON.stringify(voteData));

const res = await fetch('/vote', options);
const json = await res.json();
console.log(json);

// return json;
}

// ----------------------------------------------// 

window.addEventListener('load', function () {
  createSynths();
  createTable(rows, steps);
  handlePlay();
  loadPresetList();
});


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const getUserPresetFromUrl = urlParams.get('id');

if(lastId == "" && !initialized) {
  listenToSong();
}

// ----------------------------------------------// 
