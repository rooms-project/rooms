import React, { Component } from "react";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: ""
    };
  }

  handlerChange = (e) => {
    this.setState({searchString: e.target.value})
    this.props.filter(e.target.value)
  }

  render() {
    return (
          <input className="search-bar" type="text" value={this.state.searchString} onChange={this.handlerChange} placeholder="Search Room"/>
    
    );
  }
}
