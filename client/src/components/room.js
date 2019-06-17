import React, { Component } from "react";
import roomServices from "../service/room-services";
import userServices from "../service/user-services";
import { Link } from "react-router-dom";
import "./box/box.css";
import "./room/room.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chat } from "./chat/Chat";

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = { room: {}, user: {} };
    this.roomServices = new roomServices();
    this.userServices = new userServices();
  }
  componentDidMount() {
    this.roomServices
      .getOneRoom(this.props.match.params.id)

      .then(theRoom => {
        this.setState({ room: theRoom });
        //console.log(this.state.room.owner)
        this.userServices
          .getOneUser(this.state.room.owner)

          .then(theUser => {
            this.setState({ user: theUser });
            console.log(this.state.user);
          });
      })

      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="room">
        <div className="videoplayer">
          <div className="video">
            <video
              controls="controls"
              className="video-stream"
              x-webkit-airplay="allow"
              data-youtube-id="N9oxmRT2YWw"
              src="http://www.youtube.com/watch?v=OmxT8a9RWbE"
            >
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="box">
            <div className="room-card-container">
              <h1 className="roomname">{this.state.room.roomname}</h1>

              <div className="room-header">
                <div className="room-icons">
                  <p>
                    <FontAwesomeIcon icon="user" className="profile-icon" />{" "}
                    {this.state.user.username !== undefined
                      ? this.state.user.username
                      : null}
                  </p>
                  <p>
                    <FontAwesomeIcon icon="heart" className="like-button" />{" "}
                    {this.state.room.likes ? this.state.room.likes : "0"}
                  </p>
                  <p>
                    <FontAwesomeIcon icon="eye" className="like-button" />{" "}
                    {this.state.room.views ? this.state.room.views : "0"}
                  </p>
                </div>

                <div className="room-button-container">
                  <button className="button-follow">Follow</button>
                  <button className="button-like">
                    <FontAwesomeIcon icon="heart" className="like-button" />
                  </button>
                </div>
              </div>
            </div>

            <p>{this.state.room.description}</p>
            <p>{this.state.room.tags}</p>
            <div className="followers-streams">
              <p>
                Followers:{" "}
                {this.state.room.followers === []
                  ? this.state.room.followers
                  : "0"}
              </p>
              <p>
                Streams:{" "}
                {this.state.room.streams ? this.state.room.streams : "0"}
              </p>
            </div>
          </div>
        </div>

        <div className="chat">
          <div className="chat-header" />
          <div className="conversation">
            <Chat />
          </div>
        </div>
      </div>
    );
  }
}
export default Room;
