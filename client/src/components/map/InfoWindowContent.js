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
    console.log("Patata")
    super(props);
    this.state = {
      selectedRoom: this.props.state.selectedRoom
    }
    this.roomServices = new RoomService();
    this.userServices = new userServices();
  }

  // componentDidMount() {
  //   console.log("PROPS", this.props.state.selectedRoom.followers)
  //   console.log("MOOOOUNT ANTES", this.state.selectedRoom.followers)
  //   this.setState({selectedRoom: {
  //     ...this.state.selectedRoom,
  //     followers: this.props.state.selectedRoom.followers
  //     }
  //   })
  // }


  handleSearch = tag => {
    //Está buscando pero hay que mejorar la forma de búsqueda
    this.props.search(tag);
    this.handleWindow();
  };

  handleWindow = () => {
    this.props.onClose();
  };

  getTags = () => {
    if (!this.props.state.selectedRoom) return null;
    if (!this.props.state.selectedRoom.tags) return "The room has no tags";
    return this.props.state.selectedRoom.tags.map(tag =>
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
    
    let newFollowers = []

    if(this.props.state.selectedRoom.followers) {
      newFollowers = [...this.state.selectedRoom.followers]
      newFollowers.splice(
        this.state.selectedRoom.followers.indexOf(this.props.user._id),
        1
      );
    }
   
    this.props.user.following.splice(
      this.props.user.following.indexOf(this.props.state.selectedRoom._id),
      1
    );
    // this.setState({
    //     selectedRoom: {
    //       ...this.state.selectedRoom,
    //       followers: newFollowers
    //     }
    // },console.log(this.state.selectedRoom));
    this.props.state.selectedRoom.followers.pop()

    this.userServices.updateFollowing(this.state.selectedRoom._id, this.props.user._id, "unfollow")
    .then(()=> console.log("------------------------------------unfollow------------------------------"))
    this.props.update()
  };

  followRoom = () => {
    //Falta actualizar en el back y logica para evitar que se pueda seguir pusheando si ya has pusheado
    // if (!this.props.user) window.location.href = `/login`;

    let newFollowers = []
    if(this.props.state.selectedRoom.followers && this.props.state.selectedRoom.followers.length) {

      newFollowers = [...this.state.selectedRoom.followers]
      newFollowers.push(this.props.user._id)
      console.log("NEWWWW", newFollowers)


    } else {
      newFollowers.push(this.props.user._id)
    }
    console.log("NEWWWW", newFollowers)

    console.log(this.state.selectedRoom.followers)
  //   this.setState({
  //     selectedRoom: {
  //       ...this.state.selectedRoom,
  //       followers: newFollowers
  //     }
  // }, )
  console.log(this.state.selectedRoom)
    
    this.props.user.following.push(this.state.selectedRoom._id)
    this.props.state.selectedRoom.followers.push("engaño")
    //Poner aquí actualización del back this.roomservice + this.userservice...
    this.userServices.updateFollowing(this.state.selectedRoom._id,this.props.user._id, "follow")
    .then(()=> console.log("------------------------------------follow------------------------------"))
    .catch(()=> console.log("-------------------------------------------CATCH----------------------------"))
    this.props.update()

  };

  enterRoom = () => {
    window.location.href = `/room/${this.state.selectedRoom._id}`;
  };

  render() {
    return (
      <div className="info-window">
        <div className="info-window-img">
          <img
            src={this.props.state.selectedRoom.imageUrl}
            alt={this.props.state.selectedRoom.roomname}
          />
        </div>
        <div className="info-window-content">
          <ul>
            <li>
              <FontAwesomeIcon className="icon-home" icon={faHome} />
              <span className="roomname">
                {this.props.state.selectedRoom.roomname}
              </span>
              <FontAwesomeIcon className="icon-user" icon="user" />
              <span className="owner">{this.props.state.selectedRoomOwner}</span>
            </li>
            <li>
              <FontAwesomeIcon className="icon" icon={faStickyNote} />
              <span>{this.props.state.selectedRoom.description}</span>
            </li>
            <li>
              <FontAwesomeIcon className="icon" icon={faTags} />
              <span>{this.getTags()} </span>
            </li>
            <li>
              <FontAwesomeIcon className="icon" icon={faUsers} />
              {console.log(this.state.selectedRoom.followers)}
              <span>{this.props.state.selectedRoom.followers ? this.props.state.selectedRoom.followers.length : "0"} followers</span>
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
            dir={"/room/" + this.props.state.selectedRoom.id}
          >
            Like
          </button>
        </div>
      </div>
    );
  }
}

export default InfoWindowContent;
