import React, { Component } from "react";
import styled from "@emotion/styled";

const Input = styled.input`
  width: 78%;
  padding: 5px;
  font-size: 20px;
  background: transparent;
  box-sizing: border-box;
  border: 0;
  color: white;
  margin-bottom: 10px;
  border-bottom:1px solid white;
  margin-left: 28px;
  @media (max-width: 400px) {  
    width: 207px;
    }
  @media (min-width:460) and (max-width: 568px){  
    width: 278px;
    }
  // @media (min-width: 400px) and (max-width: 451px) {  
  //   width: 51%;
  //   }
`;

const Button = styled.a`
height: 2;
color: inherit;
margin-left: 1.2em;
border-radius:13px;
justify-content: center;
text-decoration: none;
width: 30px;
font-size: 0.7em;
font-weight: normal;
padding: 10px;
cursor: pointer
background-color: transparent;
text-transform: uppercase;
letter-spacing: 2px;
color: white;
`;

export class InputBox extends Component {
  constructor() {
    super();
    this.state = {
      text: ""
    };
  }

  send() {
    const { text } = this.state;
    const { newMessage } = this.props;
    if (newMessage) {
      console.log(`Sending message: ${text}`);
      newMessage(text);
    } else {
      console.log("Missing callback");
    }
    this.setState({ text: "" });
  }

  render() {
    const { text } = this.state;
    return (
      <div className="input-chat">
        <Input
          value={text}
          onKeyPress={e => {
            if (e.key === "Enter") {
              this.send();
            }
          }}
          onChange={e => {
            this.setState({ text: e.target.value });
          }}
        />
        <Button onClick={() => this.send()}>Send</Button>
      </div>
    );
  }
}
