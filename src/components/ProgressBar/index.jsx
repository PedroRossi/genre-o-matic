import React, { Component } from 'react';

class ProgressBar extends Component {

    constructor(props) {
        super(props);
        this.duration = props.duration;
        this.state = {
            count: 0,
            isPlaying: false
        };
    }
    
    componentDidMount() {
        // TODO review
        this.width = document.getElementById('row').offsetWidth
        this.pixel = this.width / this.duration;
    }

    toogleIsPlaying() {
        if (!this.state.isPlaying)
            this.countID = setInterval(() => this.tick(), 1);
        else
            clearInterval(this.countID);
        this.setState({isPlaying: !this.state.isPlaying});
    }

    stop() {
        clearInterval(this.countID);
        this.setState({
            count: 0,
            isPlaying: false
        });
    }

    tick() {
        this.setState(prevState => {
            let state = {};
            const count = prevState.count + this.pixel;
            if (count >= this.width) {
                state = {
                    count: 0,
                    isPlaying: false
                };
                clearInterval(this.countID);
            } else {
                state = {
                    count
                };
            }
            return state;
        });
    }

    render() {
        return (
            <div style={Object.assign({}, style, {left: this.state.count})}/>
        );
    }

}

const style = {
    width: 2,
    height: 310,
    backgroundColor: 'grey',
    position: 'relative',
    float: 'left'
};

export default ProgressBar;