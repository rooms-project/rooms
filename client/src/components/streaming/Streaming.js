import React, { Component } from "react";
import "../../../node_modules/video-react/dist/video-react.css"
import { Player, BigPlayButton } from 'video-react';
import ReactHLS from 'react-hls'


class Streaming extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      source: 'http://master.faable.com:31789/hls/marc.m3u8',
    }
    this.play = this.play.bind(this);
  }

  // componentDidMount() {
  //   // subscribe state change
  //   this.player.subscribeToStateChange(this.handleStateChange.bind(this));
  // }
  // handleStateChange(state) {
  //   // copy player state to this component's state
  //   this.setState({
  //     player: state
  //   });
  // }
  play() {
    this.player.play();
  }

  // url() {
  //   console.log(this.props.user)
  //   return `http://master.faable.com:31789/hls/${this.props.user}.m3u8`
  // }


  render() {

    console.log(this.props.id)
    return (

        <div className="player">
          {/* <Player
          // playsInline
          // poster="/assets/poster.png"
          src={this.state.source}
          autoplay
          >
          <BigPlayButton position="center" onClick={this.play}/>
          </Player> */}
          {/* <Player ref={(player) => { this.player = player }}>
          <source src="http://master.faable.com:31789/hls/marc.m3u8" />
          </Player> */}
          <ReactHLS url={`http://master.faable.com:31789/hls/${this.props.id}.m3u8`} autoplay={true} muted />


        </div>

    );
  }
}

export default Streaming;