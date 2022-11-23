import React, { useState, useEffect, createRef } from 'react'
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

// const DrumPadStyled = styled.div`
//   border: 1px solid #000;
// `

const DrumPad = ({ data, play }) => {
  const audioRef = createRef();
  const padActivate = () => {
    play(audioRef);
  }

  const keyHandler = ({ key }) => {
    console.log("key: ", key);
    if (key === data.key) {
      play(audioRef)
    }
  }
  // useEffect( () => {
  //   window.addEventListener("keydown", keyHandler);
  //   return () =>{
  //     window.removeEventListener('keydown', keyHandler);
  //   }
  // }, []);

  return (
    <div className="drum-pad" onClick={padActivate} onKeyPress={keyHandler}>
      <audio id={data.name} src={data.src} className='clip' ref={audioRef} />
      {data.key}
    </div>
  )
}



const DrumPadsBlock = (props) =>
  <div className='machine-pads'>
    {props.data.map(item => <DrumPad key={item.key} data={item} play={(ref) => props.play(ref)} />)}
  </div>;



export default function DrumMachine() {
  const [power, setPower] = useState(true);
  const [volume, setVolume] = useState(50);



  function playSound(ref) {
    if (power) {
      ref.current.volume = volume / 100
      ref.current.play()
    }
    console.log(ref)
  }



  return (
    <div id='drum-machine'>
      <DrumPadsBlock data={buttonAudioSamples} play={(ref) => playSound(ref)} />

      <div className="machine-controls">
        <div>Power Switch
          <input type="checkbox" name="power" checked={power} onChange={e => setPower(!power)} />
        </div>
        <div id='display'>Display</div>
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

