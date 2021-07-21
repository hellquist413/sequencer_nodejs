let kitName;

function selectKit(id) {
    if (initialized) {
        disposeKit();
    }

    switch (id) {
        default:
        case "1":
            kitName = "SubtiltQuist";
            sampleUrl = '/samples/SubtiltQuist/';
            kit_id = "1";

            sample1 = "openhat.wav";
            note1 = "C2";
            letvol1 = -2;

            sample2 = "hat_closed.wav";
            note2 = "C2";
            vol2 = -5;

            sample3 = "snare.wav";
            note3 = "C2";
            vol3 = 5;

            sample4 = "fx1.wav";
            note4 = "C2";
            vol4 = -4;

            sample5 = "fx.wav";
            note5 = "C2";
            vol5 = -4;

            sample6 = "percfx.wav";
            note6 = "C2";
            vol6 = -2;

            sample7 = "minibs.wav";
            note7 = "A3";
            vol7 = -5;

            sample8 = "KICK.wav";
            note8 = "C2";
            vol8 = 0;

            note9 = "C2";
            vol9 = -10;

            createKit(kit_id, kitName,
                sampleUrl, sample1, sample2, sample3, sample4,
                sample5, sample6, sample7, sample8,
                note1, note2, note3, note4, note5, note6, note7, note8, note9,
                vol1, vol2, vol3, vol4, vol5, vol6, vol7, vol8, vol9);
            break;
        case "2":
            kitName = "SSM";
            sampleUrl = '/samples/ssm/';
            kit_id = "2";

            sample1 = "ssm_MA_hihats_driver2_136.mp3";
            note1 = "C2";
            vol1 = -10;

            sample2 = "ssm_MA_snare2_136.mp3";
            note2 = "C2";
            vol2 = -3;

            sample3 = "ssm_MA_shake_rim_136.wav";
            note3 = "C2";
            vol3 = -7;

            sample4 = "ssm_MA_perc_136.mp3";
            note4 = "C2";
            vol4 = -4;

            sample5 = "ssm_MA_fx_stab_136.wav";
            note5 = "C2";
            vol5 = -9;

            sample6 = "ssm_MA_bassyFill_136.wav";
            note6 = "C2";
            vol6 = 2;

            sample7 = "ssm_MA_bassy_perc_136.wav";
            note7 = "D2";
            vol7 = 0;

            sample8 = "ssm_MA_KICK_136.mp3";
            note8 = "C2";
            vol8 = 2;

            note9 = "C2";
            vol9 = -10;

            createKit(kit_id, kitName,
                sampleUrl, sample1, sample2, sample3, sample4,
                sample5, sample6, sample7, sample8,
                note1, note2, note3, note4, note5, note6, note7, note8, note9,
                vol1, vol2, vol3, vol4, vol5, vol6, vol7, vol8, vol9);

            break;
        case "3":
            kitName = "KrumQuist";
            sampleUrl = '/samples/krum/';
            kit_id = "3";

            sample1 = "133_hat.wav";
            note1 = "C2";
            letvol1 = -2;

            sample2 = "133_clap.wav";
            note2 = "C2";
            vol2 = 0;

            sample3 = "133_perc.wav";
            note3 = "C2";
            vol3 = 2;

            sample4 = "133_perc2.wav";
            note4 = "C2";
            vol4 = 3;

            sample5 = "133_stab.wav";
            note5 = "C2";
            vol5 = 2;

            sample6 = "133_bass.wav";
            note6 = "C2";
            vol6 = 5;

            sample7 = "133_slurpeh_form.wav";
            note7 = "A3";
            vol7 = -10;

            sample8 = "133_kick.wav";
            note8 = "C2";
            vol8 = 0;

            note9 = "C2";
            vol9 = -10;

            createKit(kit_id, kitName,
                sampleUrl, sample1, sample2, sample3, sample4,
                sample5, sample6, sample7, sample8,
                note1, note2, note3, note4, note5, note6, note7, note8, note9,
                vol1, vol2, vol3, vol4, vol5, vol6, vol7, vol8, vol9);

            break;
        case "1":
            kitName = "KrumQuist";
            sampleUrl = '/samples/krum/';
            kit_id = "1";
            bpm = "133";
            bpmInput.value = bpm;

            sample1 = "133_hat.wav";
            note1 = "C2";
            letvol1 = -2;

            sample2 = "133_clap.wav";
            note2 = "C2";
            vol2 = 0;

            sample3 = "133_perc.wav";
            note3 = "C2";
            vol3 = 2;

            sample4 = "133_perc2.wav";
            note4 = "C2";
            vol4 = 3;

            sample5 = "133_stab.wav";
            note5 = "C2";
            vol5 = 2;

            sample6 = "133_bass.wav";
            note6 = "C2";
            vol6 = 5;

            sample7 = "133_slurpeh_form.wav";
            note7 = "A3";
            vol7 = -10;

            sample8 = "133_kick.wav";
            note8 = "C2";
            vol8 = 0;

            note9 = "C2";
            vol9 = -10;

            createKit(kit_id, kitName,
                sampleUrl, sample1, sample2, sample3, sample4,
                sample5, sample6, sample7, sample8,
                note1, note2, note3, note4, note5, note6, note7, note8, note9,
                vol1, vol2, vol3, vol4, vol5, vol6, vol7, vol8, vol9);

            break;
    }
}

createKit = function (kit_id, kitName,
    sampleUrl, sample1, sample2, sample3, sample4, sample5, sample6, sample7, sample8,
    note1, note2, note3, note4, note5, note6, note7, note8, note9,
    vol1, vol2, vol3, vol4, vol5, vol6, vol7, vol8, vol9) {

    currentKitName = kitName;
    synths = [];
    notes = [];

    sampler = new Tone.Sampler({
        urls: { C2: sample1 },
        baseUrl: sampleUrl,
    }).connect(mixer);
    synths.push(sampler);
    notes.push(note1);
    sampler.volume.value = vol1;

    sampler2 = new Tone.Sampler({
        urls: { D2: sample2 },
        baseUrl: sampleUrl,
    }).connect(mixer);
    synths.push(sampler2);
    notes.push(note2);
    sampler2.volume.value = vol2;

    sampler3 = new Tone.Sampler({
        urls: { E2: sample3 },
        baseUrl: sampleUrl,
    }).connect(mixer);
    synths.push(sampler3);
    notes.push(note3);
    sampler3.volume.value = vol3;

    sampler4 = new Tone.Sampler({
        urls: { G2: sample4 },
        baseUrl: sampleUrl,
    }).connect(mixer);
    notes.push(note4);
    synths.push(sampler4);
    sampler4.volume.value = vol4;

    sampler5 = new Tone.Sampler({
        urls: { G2: sample5 },
        baseUrl: sampleUrl,
    }).connect(mixer);
    synths.push(sampler5);
    notes.push(note5);
    sampler5.volume.value = vol5;

    sampler6 = new Tone.Sampler({
        urls: { G2: sample6 },
        baseUrl: sampleUrl,
    }).connect(mixer);
    synths.push(sampler6);
    notes.push(note6);
    sampler6.volume.value = vol6;

    sampler7 = new Tone.Sampler({
        urls: { G2: sample7 },
        baseUrl: sampleUrl,
    }).connect(mixer);
    synths.push(sampler7);
    notes.push(note7);
    sampler7.volume.value = vol7;

    sampler8 = new Tone.Sampler({
        urls: { F2: sample8 },
        baseUrl: sampleUrl,
    }).connect(mixer);
    sampler8.volume.value = vol8;
    synths.push(sampler8);
    notes.push(note8);

    synth3 = new Tone.MonoSynth({
        envelope: {
            attack: 0.005,
            decay: 0.1,
            release: 0.1,
            sustain: 0.5,
        },
        filter: {
            Q: 1,
            rolloff: -12,
            type: "lowpass",
        },
        filterEnvelope: {
            attack: 0.3,
            baseFrequency: 100,
            decay: 0.6,
            exponent: 2,
            octaves: 3,
            release: 2,
            sustain: 0.1,
        }
    });

    synth3.volume.value = vol9;
    synth3.chain(pingPong, filter).connect(reverb);
    synths.push(synth3);
    notes.push(note9);

    previousKit = uPreKit;
    uPreKit = kit_id;

    if (initialized) {
        stopPlaying();
        initialize();
        isPlaying = true;
    }
}

function disposeKit() {
    if (initialized) {
        stopPlaying();
        Tone.Transport.cancel();
        isPlaying = false;

        sampler.disconnect().dispose();
        sampler2.disconnect().dispose();
        sampler3.disconnect().dispose();
        sampler4.disconnect().dispose();
        sampler5.disconnect().dispose();
        sampler6.disconnect().dispose();
        sampler7.disconnect().dispose();
        sampler8.disconnect().dispose();
        synth3.disconnect().dispose();
    }
}

function kitNames(id) {
    switch (id) {
        case "1":
            kitName = "SubtiltQuist";
            break;
        case "2":
            kitName = "SSM";
            break;
        case "3":
            kitName = "KrumQuist";
            break;
        case "4":
            kitName = "Kit 4";
            break;
        case "5":
            kitName = "Kit 5";
            break;
        case "6":
            kitName = "Kit 6";
            break;
        case "7":
            kitName = "Kit 7";
            break;
        case "8":
            kitName = "Kit 8";
            break;
        default:
            kitName = "Kit #";
    }
    return kitName;
}