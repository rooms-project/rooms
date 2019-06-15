import React, { Component } from 'react'
import AuthServices from '../../service/auth-services'
import './auth.css';


class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = { 
            username: '', 
            password: '',
            usernameCheck: true,
            passwordCheck: true
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
        if (!this.state.username || !this.state.password) {
            if (!this.state.username) this.setState({usernameCheck: false})
            if (!this.state.password) this.setState({passwordCheck: false})
            return null
        }
        this.services.signup(username, password)
            .then(response => {
                this.setState({ username: '', password: '' })
                this.props.setTheUser(response)
            })
            .catch(error => console.log(error.response.data.message))
            window.location.href = `/map`
    }

    validation() {
        if (!this.state.passwordCheck) return "form-control form-control-red"
        if (!this.state.usernameCheck) return "form-control form-control-red"
        return "form-control"
    }

    render() {
        return (
            <div className="login-form">
                    <div>
                        <h1>Sign Up</h1>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input onChange={this.handleChange} value={this.state.username} type="text" className={this.validation()} id="username" name="username" placeholder="User Name"/>
                            </div>
                            <div className="form-group">
                                <input onChange={this.handleChange} value={this.state.password} type="password" className={this.validation()} id="password" name="password" placeholder="Password" />
                            </div>
                            <button type="submit" className="signup-link">Sign Up</button>
                        </form>
                    </div>
            </div>
        )
    }

}

export default Signup

