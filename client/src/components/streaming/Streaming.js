import React, { Component } from "react";
import "../../../node_modules/video-react/dist/video-react.css"

import { Player, BigPlayButton } from 'video-react';


class Streaming extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      source: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',      
    }
  }

  render() {

    return (

        <div className="player">
          <Player
          playsInline
          poster="/assets/poster.png"
          src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
          >
          <BigPlayButton position="center"/>
          </Player>
        </div> 

    );
  }
}

export default Streaming;