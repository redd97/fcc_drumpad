import React, { useState, useEffect, useRef } from 'react'
// import styled from 'styled-components';

const buttonAudioSamples = [
  {
    key: 'Q',
    name: 'Heater 1',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    key: 'W',
    name: 'Heater 2',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    key: 'E',
    name: 'Heater 3',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    key: 'A',
    name: 'Heater 4',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    key: 'S',
    name: 'Clap',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },

  {
    key: 'D',
    name: 'Open HH',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    key: 'Z',
    name: 'Kick n\' Hat',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    key: 'X',
    name: 'Kick',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    key: 'C',
    name: 'Closed HH',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
]


const DrumPad = ({ data, play, pressedKey }) => {

  const audioRef = useRef(null)
  let isActive = false;
  if (('Key' + data.key) === pressedKey) {
    isActive = true;
    play(audioRef)
  }

  return (
    <div
      tabIndex="0"
      id={data.key}
      className={`drum-pad ${isActive && 'active'}`}
      onClick={() => play(audioRef)}
    >
      <audio id={data.key} data-name={data.name} src={data.src} className='clip' ref={audioRef} />
      {data.key}
    </div>
  )
}



const DrumPadsBlock = (props) => {
  return (
    <div className='machine-pads'>
      {props.data.map(item =>
        <DrumPad
          key={item.key}
          pressedKey={props.pressedKey}
          data={item}
          play={(ref) => props.play(ref)}
        />)}
    </div>
  )
}


export default function DrumMachine() {
  const [power, setPower] = useState(true);
  const [volume, setVolume] = useState(50);
  const [display, setDisplay] = useState("");

  const [key, setKey] = useState(null);

  const keyHandler = (event) => {
    setKey(event.code)
    setTimeout(() => {
      setKey(null);
    }, 200)

  }

  useEffect(() => {
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener('keydown', keyHandler);
    }
  }, []);



  function playSound(ref) {
    const sound = ref.current;
    if (power) {
      sound.volume = volume / 100;
      sound.play();
      setDisplay(sound.dataset.name)
    }
  }


  return (
    <div id='drum-machine'>
      <DrumPadsBlock data={buttonAudioSamples} pressedKey={key} play={(ref) => playSound(ref)} />
      <div className="machine-controls">
        <div>Power Switch
          <input type="checkbox" name="power" checked={power} onChange={e => setPower(!power)} />
        </div>
        <div clsssName='display-wrapper'>
          Display
          <div id='display'>{display}</div>
        </div>
        <div>
          Volume - {volume}%
          <input type="range" id="volume" name="volume"
            min="1" max="100" step="1" value={volume} onChange={e => setVolume(e.target.value)} />
        </div>
        <div>Bank</div>
      </div>

    </div>
  )
}

