import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "./rooms-header";
import LoginForm from "./auth/rooms-login-form";
import CoasterServices from "../service/coaster-services";
import { Link } from "react-router-dom";
import logo from "./logo/rooms-white.svg";


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
  setUser = userObj => this.setState({ loggedInUser: userObj });

  handleClick() {
    this.setState({ modalShow: true });
    console.log(this.state.modalShow);
  }

  render() {
    return (
      <div>
        <div className="rooms-index">
          {/* <Header userInSession={this.state.loggedInUser} setUser={this.setUser}/> */}
          <div className="index-info">
            <img src={logo} alt="rooms" />
            <p>
              It’s a social media streaming platform that shares your room with
              the world…
            </p>
          </div>

          <div className="search-container">
            <Link to="/map">
              <FontAwesomeIcon className="search" icon="search" />
            </Link>
          </div>

          <div className="login">
            {console.log(
              "este es el loggedinuser de index " + this.state.loggedInUser
            )}
            {this.props.userInSession ? null : (
              <Link className="button-login" to="/login">
                Log In
              </Link>
            )}
            {/* <LoginForm setUser={this.props.setUser} setUserIndex={()=>this.setState({ loggedInUser:" userObj" })} displayInfo/>} */}
            {/* {this.props.userInSession ? null: <LoginForm setUser={this.props.setUser} displayInfo/>} */}
            {/* <button className='button-login' onClick={this.handleClick}>LOG IN</button> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
