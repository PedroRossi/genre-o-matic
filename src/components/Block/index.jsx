import React, { Component } from 'react'
import '../../styles/block.css';

export default class Block extends Component {

  _onClick = () => {
    if(this.props.onClick)
      this.props.onClick();
  }  

  render() {
    const hasTrack = (this.props.track !== undefined);
    const track = hasTrack ? this.props.track.substring(0, this.props.track.length - 4) : '-';

    return (
      <div
        style={Object.assign({}, styles.box, {backgroundColor: (this.props.color ? 'rgb(238, 195, 204)' : '#FFF')})}
        onClick={this._onClick}
      >
        <span style={hasTrack ? styles.spanDefined : styles.spanUndefined}>
          {track}
        </span>
      </div>
    )
  }

}

const styles = {
  box: {
    textAlign: 'center',
    cursor: 'pointer',
    display: 'inherit',
    border: '2px solid black'
  },
  spanUndefined: {
    fontSize: 30,
    marginTop: 30
  },
  spanDefined: {
    fontSize: 20,
    marginTop: 40
  }
}
