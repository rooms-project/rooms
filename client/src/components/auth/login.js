import React, { Component } from "react";
import AuthServices from "../../service/auth-services";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", error: false};
    this.services = new AuthServices();
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    this.services
      .login(username, password)
      .then(response => {
        this.setState({ username: "", password: "" });
        this.props.setTheUser(response);
        window.location.href = `/map`;
      })
      .catch(error => {
        this.setState({error: error.response.data.message})
        console.log("**** Error de login", error.response.data.message)
      });
  };

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
          <div>
            <h1>Log In</h1>
            <form onSubmit={this.handleSubmit} action="/map">
              <input
                onChange={this.handleChange}
                value={this.state.username}
                type="text"
                className="form-control"
                id="username"
                name="username"
                placeholder="User Name"
              />
              <input
                onChange={this.handleChange}
                value={this.state.password}
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
              />
              <button type="submit">Log In</button>
              {this.validation()}
              <div className="login-link">
                <p>Don't have an account yet ?</p>
                <Link className="signup-link" to="/signup">
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
