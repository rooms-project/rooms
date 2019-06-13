import React, { Component } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import AuthServices from '../service/auth-services'

class Header extends Component{
  constructor(props){
    super(props)
    this.state = {
    }
    this.service = new AuthServices()
  }
  logout = () => {
    this.service.logout()
        .then(x => this.props.setUser(null))
  }
  render(){
    return(


      <div className="header-absolute">

        <div className="header">
            <div className="logo-type">
                <Link to=''><FontAwesomeIcon className="logo" icon="person-booth" /></Link>
                <Link to=''><h3>ROOMS</h3></Link>
            </div>
            <ul>
            <li><Link to=''>Your Profile</Link></li>
            <li> <Link to='' ><div onClick={this.logout}>Sign Out</div></Link></li>
            </ul>
        </div>
      
      </div>
      
    )
  }

}

export default Header