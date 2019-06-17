import React, { Component } from "react";
import RoomService from "../../service/room-services";
import userServices from "../../service/user-services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faStickyNote } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faTags } from "@fortawesome/free-solid-svg-icons";

class InfoWindowContent extends Component {
  constructor(props) {
    super(props);
    this.state = props.state;
    this.roomServices = new RoomService();
    this.userServices = new userServices();
  }

  handleSearch = tag => {
    //Está buscando pero hay que mejorar la forma de búsqueda
    this.props.search(tag);
    this.handleWindow();
  };

  handleWindow = () => {
    this.props.onClose();
  };

  getTags = () => {
    if (!this.state.selectedRoom) return null;
    console.log(this.state.selectedRoom.tags);
    if (!this.state.selectedRoom.tags) return "The room has no tags";
    return this.state.selectedRoom.tags.map(tag =>
      tag[0] === "#" ? (
        <button
          key="0"
          className="info-window-tag"
          onClick={() => this.handleSearch(tag)}
        >
          {tag}
        </button>
      ) : (
        <button
          key="1"
          className="info-window-tag"
          onClick={() => this.handleSearch(tag)}
        >{`#${tag} `}</button>
      )
    );
  };

  getFollowers = () => {
    if (!this.state.selectedRoom) return null;
    console.log(this.state.selectedRoom.followers);
    if (!this.state.selectedRoom.followers) return 0;
    return this.state.selectedRoom.followers.length;
  };

  setFollowButton = () => {
    //Lógica follow/unfollow
    if (!this.props.user) return null;
    if (this.props.user.following.includes(this.state.selectedRoom._id)) {
      return (
        <button className="info-window-btn" onClick={() => this.unfollowRoom()}>
          Unfollow
        </button>
      );
    } else {
      return (
        <button
          className="info-window-btn info-window-following"
          onClick={() => this.followRoom()}
        >
          Follow
        </button>
      );
    }
  };

  unfollowRoom = () => {
    this.state.selectedRoom.followers.splice(
      this.state.selectedRoom.followers.indexOf(`${this.props.user._id}`),
      1
    );
    this.props.user.following.splice(
      this.props.user.following.indexOf(`${this.state.selectedRoom._id}`),
      1
    );
    this.setState({
      ...this.state,
      selectedRoom: {
        ...this.state.selectedRoom,
        followers: this.state.selectedRoom.followers
      }
    });

    console.log(this.state.selectedRoom.followers);
    console.log(this.props.user.following);
  };

  followRoom = () => {
    //Falta actualizar en el back y logica para evitar que se pueda seguir pusheando si ya has pusheado
    if (!this.props.user) window.location.href = `/login`;
    this.state.selectedRoom.followers.push(`${this.props.user._id}`);
    this.props.user.following.push(`${this.state.selectedRoom._id}`);

    //Poner aquí actualización del back this.roomservice + this.userservice...
    this.setState({
      ...this.state,
      selectedRoom: {
        ...this.state.selectedRoom,
        followers: this.state.selectedRoom.followers
      }
    });
  };

  enterRoom = () => {
    console.log(this.state.selectedRoom);
    window.location.href = `/room/${this.state.selectedRoom._id}`;
  };

  render() {
    return (
      <div className="info-window">
        <div className="info-window-img">
          <img
            src={this.state.selectedRoom.imageUrl}
            alt={this.state.selectedRoom.roomname}
          />
        </div>
        <div className="info-window-content">
          <ul>
            <li>
              <FontAwesomeIcon className="icon-home" icon={faHome} />
              <span className="roomname">
                {this.state.selectedRoom.roomname}
              </span>
              <FontAwesomeIcon className="icon-user" icon="user" />
              <span className="owner">{this.state.selectedRoomOwner}</span>
            </li>
            <li>
              <FontAwesomeIcon className="icon" icon={faStickyNote} />
              <span>{this.state.selectedRoom.description}</span>
            </li>
            <li>
              <FontAwesomeIcon className="icon" icon={faTags} />
              <span>{this.getTags()} </span>
            </li>
            <li>
              <FontAwesomeIcon className="icon" icon={faUsers} />
              <span>{this.getFollowers()} followers</span>
            </li>
          </ul>
          <button
            type="button"
            className="info-window-btn"
            onClick={this.enterRoom}
          >
            Enter room
          </button>

          {this.setFollowButton()}

          <button
            className="info-window-btn"
            dir={"/room/" + this.state.selectedRoom.id}
          >
            Like
          </button>
        </div>
      </div>
    );
  }
}

export default InfoWindowContent;
