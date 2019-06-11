import React, { Component } from 'react';
import './App.css';
import CoastersList from './components/coasters-list'
import CoasterDetails from './components/coaster-details'
import Navigation from './components/navigation'
import Home from './components/home'
import Profile from './components/profile'
import ProtectedRoute from './components/auth/protected-route'
import Signup from './components/auth/signup'
import Login from './components/auth/login'
import AuthServices from './service/auth-services'
// import Map from './components/map'
import Map from './components/map/map-container'


/// Ben Components 

/// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPersonBooth } from '@fortawesome/free-solid-svg-icons'


import RoomIndex from './components/rooms-index'



import { Switch, Route } from 'react-router-dom'

class App extends Component {


  constructor(props) {
    super(props)
    this.state = { loggedInUser: null }
    this.services = new AuthServices()
  }

  setUser = userObj => this.setState({ loggedInUser: userObj })

  fetchUser = () => {
    if (this.state.loggedInUser === null) {
      this.services.loggedin()
        .then(response => this.setState({ loggedInUser: response }))
        .catch(x => this.setState({ loggedInUser: false }))
    }
  }

  render() {

    this.fetchUser()

    if (this.state.loggedInUser) {
      return (
        <div>
          <Navigation userInSession={this.state.loggedInUser} setTheUser={this.setUser} />
       
          <Switch>
            <Route path="/" exact render={()=> <RoomIndex userInSession={this.state.loggedInUser} setUser={this.setUser} />} />
            <ProtectedRoute path='/profile' user={this.state.loggedInUser} component={Profile} />
            <Route path="/coasters" exact render={() => <CoastersList userInSession={this.state.loggedInUser} />} />
            <Route path="/coasters/:id" component={CoasterDetails} />
            <Route path="/map" component={Map} />
          </Switch>
        </div>
      )
    } else {
      return (
        <div>
         <Navigation userInSession={this.state.loggedInUser} /> 
          
          <Switch>
          <Route path="/" exact render={()=> <RoomIndex userInSession={this.state.loggedInUser} setUser={this.setUser} />} />
            <ProtectedRoute user={this.state.loggedInUser} path='/profile' component={Profile} />
            <Route path="/coasters" exact render={() => <CoastersList userInSession={this.state.loggedInUser} />} />
            <Route path="/coasters/:id" component={CoasterDetails} />
            <Route path="/map" component={Map} />
            <Route path="/signup" render={() => <Signup setTheUser={this.setUser} />} />
            <Route path="/login" render={() => <RoomIndex setTheUser={this.setUser} />} /> 
            {/* <Route path="/login" render={() => <Login setTheUser={this.setUser} />} /> */}
          </Switch>
        </div>
      )
    }
  }
}

export default App;


library.add(faSearch, faPersonBooth);

