import React, { Component } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import AuthServices from '../../service/auth-services'


class Hamburguer extends Component {

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
                <div className="pepe">
                    <div className="logo-type-hamb">
                        <Link to='/map'><FontAwesomeIcon className="logo" icon="person-booth" /></Link>
                        <Link to='/map'><h3>ROOMS</h3></Link>
                    </div>
                      <nav role='navigation'>
                      
                        <div id="menuToggle">
                          {/* <!--
                          A fake / hidden checkbox is used as click reciever,
                          so you can use the :checked selector on it.
                          --> */}
                          <input type="checkbox" />
                          
                          {/* <!--
                          Some spans to act as a hamburger.
                          
                          They are acting like a real hamburger,
                          not that McDonalds stuff.
                          --> */}
                          <span></span>
                          <span></span>
                          <span></span>
                          
                          {/* <!--
                          Too bad the menu has to be inside of the button
                          but hey, it's pure CSS magic.
                          --> */}
                          <ul id="menu">
                          {/* <li><p>¡Hola {this.props.userInSession.username}!</p></li> */}
                          <li><Link to='/profile'>Your Profile</Link></li>
                          <li> <Link to='/map' ><div onClick={this.logout}>Sign Out</div></Link></li>
                          </ul>
                        </div>
                      </nav>
                </div>
              )

        } else {
            return (
              <div className="pepe">
                   <div className="logo-type-hamb">
                        <Link to='/map'><FontAwesomeIcon className="logo" icon="person-booth" /></Link>
                        <Link to='/map'><h3>ROOMS</h3></Link>
                    </div>
                  <nav role='navigation'>
                    <div id="menuToggle">
                      {/* <!--
                      A fake / hidden checkbox is used as click reciever,
                      so you can use the :checked selector on it.
                      --> */}
                      <input type="checkbox" />
                      
                      {/* <!--
                      Some spans to act as a hamburger.
                      
                      They are acting like a real hamburger,
                      not that McDonalds stuff.
                      --> */}
                      <span></span>
                      <span></span>
                      <span></span>
                      
                      {/* <!--
                      Too bad the menu has to be inside of the button
                      but hey, it's pure CSS magic.
                      --> */}
                      <ul id="menu">
                          {/* <li><p>¡Hola {this.props.userInSession.username}!</p></li> */}
                          <li><Link to='/profile'>Your Profile</Link></li>
                          <li> <Link to="/login">Log In</Link></li>
                      </ul>
                    </div>
                  </nav>
              </div>
            )
        }
    }
}




export default Hamburguer



