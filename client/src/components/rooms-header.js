import React, { Component } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import AuthServices from '../service/auth-services'
import SearchBar from './searchBar/searchBar'


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

            return (
              <div className="header-absolute">

                <div className="header">
                    <div className="logo-type">
                        <Link to='/map'><FontAwesomeIcon className="logo" icon="person-booth" /></Link>
                        <Link to='/map'><h3>ROOMS</h3></Link>
                    </div>
                    <ul>
                    <li><p>Hi {this.props.userInSession.username}!</p></li>             
                    <li><SearchBar/></li>             
                    <li><Link to='/profile'>Your Profile</Link></li>
                    <li> <Link to='' ><div onClick={this.logout}>Sign Out</div></Link></li>
                    </ul>
                </div>
      
              </div>
            )

        } else {
            return (
              <div className="header-absolute">

                <div className="header">
                    <div className="logo-type">
                        <Link to='/map'><FontAwesomeIcon className="logo" icon="person-booth" /></Link>
                        <Link to='/map'><h3>ROOMS</h3></Link>
                    </div>
                    <ul>
                    <li><SearchBar/></li>       
                    <li><Link to='/profile'>Your Profile</Link></li>
                    <li> <Link to="/login">Log In</Link></li>
                    </ul>
                </div>
    
            </div>

            )
        }
    }
}




export default navigation