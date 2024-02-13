import React, {Component} from 'react';

import sound1 from '../assets/audio/Drumsticks.wav'
import sound2 from '../assets/audio/High_Woodblock.wav'
import sound3 from '../assets/audio/Low_Woodblock.wav'
import sound4 from '../assets/audio/High_Bongo.wav'

import Timer from '../libs/timer';

class Metronome extends Component {
  constructor(props) {
    super(props);

    this.sound1 = new Audio(sound1);
    this.sound2 = new Audio(sound2);
    this.sound3 = new Audio(sound3);
    this.sound4 = new Audio(sound4);

    this.state = {
      playing: false,
      bpm: 90,
      count: 0,
      beatsPerMeasure: 4,
      sound: sound2
    };
        
  }
  
  startMetronome = () => {
    // clearInterval(this.timer);  
    this.timer = new Timer(this.playClick, 60000 / this.state.bpm, { immediate: true });  
    this.timer.start();
    // this.timer = setInterval(
    //   this.playClick,
    //   (60 / this.state.bpm) * 1000
    // );
  };

  handleBpmChange = event => {
    const bpm = event.target.value;

    if (this.state.playing) {
      // this.startMetronome();
      this.timer.start();
      this.setState({
        count: 0,
        bpm
      });
    } else {
      this.setState({ bpm });
    }
  };

  handleBeatsPerMeasureChange = event => {
    const beatsPerMeasure = event.target.value;

    if (this.state.playing) {
      this.startMetronome();
      // this.timer.start();
      this.setState({
        count: 0,
        beatsPerMeasure
      });
    } else {
      this.setState({ beatsPerMeasure });
    } 
  };

  handleSoundChange = event => {
    const sound = event.target.value;

    if (this.state.playing) {
      this.startMetronome();
      // this.timer.start();
      this.setState({
        count: 0,
        sound
      });
    } else {
      this.setState({ sound });
    }    
  };

  handleStartStop = () => {
    if (this.state.playing) {
      // clearInterval(this.timer);
      this.timer.stop();
      this.setState({
        playing: false
      });
    } else {
      this.startMetronome();
      // this.timer.start();
      this.setState(
        {
          playing: true,
          count: 0
        },
        this.playClick
      );
    }
  };

  playClick = () => {
    const { count, beatsPerMeasure, sound} = this.state;

    const audio = new Audio();
    audio.src = sound;

    if ((count % beatsPerMeasure === 0)) {
      this.sound1.play();
    } else {
      audio.play();
    }

    this.setState(state => ({
      count: (state.count + 1) % state.beatsPerMeasure
    }));
  };

  render() {
    const { playing, bpm, beatsPerMeasure, sound } = this.state;
    
    return (
      <div className="container">
        <div className="metronome">
          <div className= 'bpm-slider'>
            <h3>{bpm} BPM </h3>
            <input
              type="range"
              min="20"
              max="180"
              value={bpm}
              onChange={this.handleBpmChange}
              className="form-control-range"
            />
          </div>
            <div className="form-group">
              <h3 htmlFor="beats-per-measure">beats per measure</h3>
              <input
                type="number"
                min="2"
                max="12"
                value={beatsPerMeasure}
                className="beats-per-measure-input"
                onChange={this.handleBeatsPerMeasureChange}
              />
            </div>
            <div className='form-group'>
              <h3 htmlFor='choose-sound'>choose sound</h3>
              <select 
                  value={sound}
                  onChange={this.handleSoundChange}
                  className = "selector"
              >
                  <option value= {sound2} >drumsticks</option>
                  <option value= {sound3}>low woodblock</option>
                  <option value= {sound4}>high bongo</option>
              </select>
            </div>
          
          <button
            onClick={this.handleStartStop}
          >
            {playing ? 'Stop' : 'Start'}
          </button>
        </div>
      </div>
    );
  }
}

export default Metronome