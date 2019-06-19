import React, { Component } from 'react'
import AuthServices from '../../service/auth-services'
import './auth.css';


class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = { 
            username: '', 
            password: '',
            error: false
        }
        this.services = new AuthServices()
    }

    handleChange = e => {
        const { name, value } = e.target;
        if (!this.state.username) this.setState({usernameCheck: true})
        if (!this.state.password) this.setState({passwordCheck: true})
        this.setState({ [name]: value })
    }

    handleSubmit = e => {

        e.preventDefault()
        const { username, password } = this.state
        this.services.signup(username, password)
            .then(response => {
                this.setState({ username: '', password: '' })
                this.props.setTheUser(response)
                window.location.href = `/map`;

            })
            .catch(error => {
                console.log("**** Error de signup", error.response.data.message)
                this.setState({error: error.response.data.message})
            })
    }

    validation() {
        console.log(this.state.error)
        if (this.state.error !== false) return (
            
            <div className="alert alert-warning">
                <p>{this.state.error}</p>
            </div>
        )
    }

    render() {
        return (
            <div className="login-form">
                    <div>
                        <h1>Sign Up</h1>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input onChange={this.handleChange} value={this.state.username} type="text" id="username" name="username" placeholder="User Name"/>
                            </div>
                            <div className="form-group">
                                <input onChange={this.handleChange} value={this.state.password} type="password" id="password" name="password" placeholder="Password" />
                            </div>
                            <button type="submit" className="signup-link">Sign Up</button>
                            {this.validation()}
                        </form>
                    </div>
            </div>
        )
    }

}

export default Signup

