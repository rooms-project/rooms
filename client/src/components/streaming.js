import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "./rooms-header";
import LoginForm from "./auth/rooms-login-form";
import CoasterServices from "../service/coaster-services";
import { Link } from "react-router-dom";
import logo from "./logo/rooms-white.svg";

import "./glitch/glitch.scss"

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null,
      modalShow: false,
      modal: false,
      displayInfo: true
    };
    this.services = new CoasterServices();
    this.handleClick = this.handleClick.bind(this);
    this.setUser = this.setUser.bind(this);
  }
  video = document.getElementById("videoPlayer");
 

  render() {
    return (
      <div>


    <video id="videoPlayer" controls muted></video>
    <script>
      if (Hls.isSupported()) {
        var hls = new Hls();
        hls.attachMedia(video);
        hls.on(Hls.Events.MEDIA_ATTACHED, function() {
          hls.loadSource("http://master.faable.com:31789/hls/marc.m3u8");
          hls.on(Hls.Events.MANIFEST_PARSED, function(event, data) {
            video.play();
            console.log(
              `Stream is playing, found ${data.levels.length} quality level`
            );
          });
        });
      }
    </script>


  
      </div>
    );
  }
}

export default Index;
