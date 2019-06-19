import React, { Component } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import AuthServices from '../service/auth-services'
import SearchBar from './searchBar/searchBar'
import logoShort from "./logo/rooms-r-white.svg";

class navigation extends Component {

    constructor(props) {
        super(props)
        this.service = new AuthServices()
    }


    logout = () => {
        this.service.logout()
            .then(x => this.props.setTheUser(null))
    }

    render() {
        if (this.props.userInSession) {
            console.log(this.props.userInSession)

            return (
              <div className="header-absolute">

                <div className="header">
                
                <Link className="logo" to="/map"><img src={logoShort} alt="rooms"/></Link>
         
                    <ul>
                    <li id="user-name">Hi {this.props.userInSession.username}!</li>             
                    {/* <li><SearchBar/></li>              */}
                    <li><Link to={`/profile/${this.props.userInSession._id}`}>Your Profile</Link></li>
                    <li> <Link to='' ><span onClick={this.logout}>Sign Out</span></Link></li>
                    </ul>
                </div>
      
              </div>
            )

        } else {
            return (
              <div className="header-absolute">

                <div className="header">
             
                        <Link to="/map"><img src={logoShort} alt="rooms"/></Link>
           
                    <ul>
                    {/* <li><SearchBar search=""/></li>        */}
                    <li><Link to='/signup'>Sign Up</Link></li>
                    <li> <Link to="/login">Log In</Link></li>
                    </ul>
                </div>
    
            </div>

            )
        }
    }
}




export default navigation