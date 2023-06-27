import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chord_1 from "./audio/Chord_1.mp3";
import Chord_2 from "./audio/Chord_2.mp3";
import Chord_3 from "./audio/Chord_3.mp3";
import Heater_1 from "./audio/Heater-1.mp3";
import Heater_2 from "./audio/Heater-2.mp3";
import Heater_4 from "./audio/Heater-4_1.mp3";
import Heater_6 from "./audio/Heater-6.mp3";
import Kick_n_hat from "./audio/Kick_n_Hat.mp3";
import RP4_kick from "./audio/RP4_KICK_1.mp3";

function App() {
  const toastRef = useRef(null);
  const buttonRef = useRef(null);
  const [volume, setVolume] = useState(0.5);
  const [alive, setAlive] = useState(false);
  const [currentSound, setCurrenSound] = useState("");

  const buttons = [
    {
      letter:"Q",
      audio: Chord_1,
      title: "Chord 1"
    },
    {
      letter:"W",
      audio: Chord_2,
      title: "Chord 2"
    },
    {
      letter:"E",
      audio: Chord_3,
      title: "Chord 3"
    },
    {
      letter:"A",
      audio: Heater_1,
      title: "Heater 1"
    },
    {
      letter:"S",
      audio: Heater_2,
      title: "Heater 2"
    },
    {
      letter:"D",
      audio: Heater_4,
      title: "Heater 4"
    },
    {
      letter:"Z",
      audio: Heater_6,
      title: "Heater 6"
    },
    {
      letter:"X",
      audio: Kick_n_hat,
      title: "Kick and hat"
    },
    {
      letter:"C",
      audio: RP4_kick,
      title: "RP4 kick"
    }
  ]

  useEffect(() => {
    if (alive) { 
      toastRef.current.classList.remove('show');
    }
  }, [alive]);

  useEffect(() => {
    document.body.addEventListener('click', reassignFocus);
    return () => {
      document.body.removeEventListener('click', reassignFocus);
    };
  }, []);

  const handleClick = (event) => {
    if (!alive) {
      toastRef.current.classList.add('show');
      return
    } 
    const letter = event.target.children[0].id;
    const button = buttons.find(item => item.letter === letter);
    if (typeof button === 'undefined') {
      setCurrenSound("Wrong key")
      return
    }
    const audio = new Audio(button.audio);
    audio.volume = volume;
    audio.play();
    setCurrenSound(button.title);
  }

  const handleVolume = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
  }

  const reassignFocus = () => {
    const buttonElement = buttonRef.current;
    buttonElement.focus();
  }

  const handlePower = () => {
    setAlive(!alive);
  }

  const handleKeyDown = (event) => {
    const { key } = event;
    const letter = (key[key.length - 1]).toUpperCase();
    handleClick({
      target: {
        children: [
          { id: letter }
        ]
      }
    })
  }

  const DrumPads = (props) => {
    return props.buttons.map((button, index) => (
        <button key={index} ref={index === 4 ? buttonRef : null} className="drum-pad" onKeyDown={handleKeyDown} onClick={handleClick} autoFocus={true}>
          <audio id={button.letter} className="clip" src={button.audio}></audio>
          {button.letter}
        </button>
    ))
  }

  return (
      <div id="drum-machine" className="simulator">
        <div className="button-container"><DrumPads buttons={buttons}/></div>
        <div className="setting-container">
          <p>by Jules Chevallet</p>
          <div className="setters">
            <div class="form-check form-switch mt10">
              <input id="switchPower" class="form-check-input" type="checkbox" role="switch" value={alive} onChange={handlePower}></input>
              <label class="form-check-label bold" for="flexSwitchCheckChecked">Power</label>
            </div>
            <div id="display" className="instrument-display">{currentSound}</div>
            <div className="range-container mt10">
              <label for="customRange2" class="form-label bold mb-0">Volume</label>
              <input id="customRange2" type="range" class="form-range" min="0" max="1" step="0.01" value={volume}
              onChange={handleVolume}></input>
            </div>
            <div class="form-check form-switch mt10">
              <input class="form-check-input" type="checkbox" role="switch" id="switchBank" disabled></input>
              <label class="form-check-label bold" for="flexSwitchCheckChecked">Disabled bank</label>
            </div>
            <div id="warning-toast" ref={toastRef} class="toast align-items-center text-white bg-primary border-0 custom-toast" role="alert" aria-live="assertive" aria-atomic="true">
              <div class="d-flex">
                <div class="toast-body">
                  Turn ON the drum machine to play music !
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;
