import React, { Component } from 'react';

class Welcome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: 0, button: false
    };
  }

  componentDidMount() {
    let i = 0;
    let timerID = setInterval(
      () => {
        this.loading(i++)
        if (i === 100)
          this.loaded(timerID);
      },
      this.props.timeout
    );
  }

  loading = (i) => this.setState({ loading: i });

  loaded(timer) {
    clearInterval(timer);
    this.setState({
      button: true
    });
  }

  render() {
    return (
      <div style={styles.center}>
        <h1 style={styles.h1}>
          {'Welcome to Genre-O-Matic'}
        </h1>
        <div 
          className="progress"
          style={styles.progress}
        >
          <div
            className="progress-bar"
            role="progressbar"
            style={{width: `${this.state.loading}%`}}
          />
        </div>
        <div>
          <button
            style={styles.btn}
            disabled={!this.state.button}
            onClick={this.props.onDone}>
            {'GO!'}
          </button>
        </div>
      </div>
    );
  }
}

const styles = {
  h1: {
    fontSize: '350%',
    fontFamily: 'Roboto',
    textAlign: 'center',
    marginTop: 150,
    color: 'black'
  },
  btn: {
    fontFamily: 'Roboto',
    // backgroundColor: 'white',
    padding: '10px 15px',
    borderRadius: 25,
    border: 4,
    borderColor: 'black',
    fontSize: 20,
    textAlign: 'center',
    borderStyle: 'ridge',
    color: 'black',
    marginTop: 50
  },
  center: {
    textAlign: 'center'
  },
  progress: {
    margin: 50
  }
};

export default Welcome;
