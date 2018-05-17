import React, { Component } from 'react';

import PlayerHeader from '../../components/PlayerHeader';
import InstrumentsHeader from '../../components/InstrumentsHeader';
import Row from  '../../components/Row';
// import ProgressBar from '../../components/ProgressBar';

import Player from '../../utils/player';

class Main extends Component {

  constructor(props) {
    super(props); 
    // sample rate is divided by 100 for converting to kHz
    const blockDuration = props.beatsPerMinute*(props.context.sampleRate/100);
    const duration = props.cols*blockDuration;
    this.player = new Player(props.context, duration, props.instruments);
    this.rows = Object.keys(props.instruments).map((val, idx) => {
      return <Row instrument={props.instruments[val]} columns={props.cols} player={this.player} key={val} blockDuration={blockDuration} />;
    });
  }

  toogleIsPlaying = () => this.progressbar.toogleIsPlaying();

  stop = () => this.progressbar.stop();

  render() {
    return (
      <div style={styles.wrapper}>
        <PlayerHeader
          player={this.player}
          // toogleIsPlaying={this.toogleIsPlaying}
          // stop={this.stop}
        />
        <InstrumentsHeader />
        <div style={styles.rowsWrapper}>
          {/* <ProgressBar ref={instance => { this.progressbar = instance; }} /> */}
          <div style={styles.grid}>
            {this.rows}
          </div>
        </div>
      </div>
    )
  }

}

const width = window.innerWidth

const styles = {
  wrapper: {
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '100px 100px auto',
    width: '100%'
  },
  rowsWrapper: {
    position: 'absolute',
    top: 0,
    left: 200,
    overflowY: 'hidden',
    overflowX: 'scroll',
    width: width-200,
    height: 300
  },
  grid: {
    position: 'relative',
    display: 'grid',
    gridTemplateRows: 'repeat(3, 100px)',
  }
};

export default Main;
