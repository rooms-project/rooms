import React from "react";
import styled from "@emotion/styled";
import { Message } from "./Message";
import { InputBox } from "./InputBox";
import { withState, lifecycle, compose } from "recompose";
import io from "socket.io-client";
// const socket = io("localhost:3000");
const socket = io(process.env.REACT_APP_URL_IO);

const ChatWrapper = styled.div`
  //border: 1px solid white;
  padding: 0px 0px 0px 0px;
  width: 500px;
  max-height:500px;
  overflow-y: scroll;

`;



const injectStateArray = withState("messages", "setMessages", []);

const injectSocketIo = lifecycle({
  componentDidMount() {
    const { messages, setMessages } = this.props;
    console.log("Chat Ready");


    socket.emit('create', 'room1', msg =>{
      console.log(`Mensaje del servidor: ${msg}`);
      messages.push({ type: "server", msg });
      setMessages(messages);
    })

    socket.on("front", msg => {
      console.log(`Mensaje del servidor: ${msg}`);
      messages.push({ type: "server", msg });
      setMessages(messages);
    });
  }
});

const chatInjector = compose(
  injectStateArray,
  injectSocketIo
);

export const Chat = chatInjector(({ messages, setMessages }) => (
  <div className="chat-container">
        <div className="message-container">
          <ChatWrapper >
            {messages.map(({ type, msg }, i) => (
              <Message server={type === "server" ? true : false} key={i}>
                {msg}
              </Message>
            ))}
          
          </ChatWrapper>
        </div>

      <InputBox
      newMessage={msg => {
        socket.emit("mensajeria", msg);
        messages.push({ type: "me", msg });
        setMessages(messages);
      }}/>
      </div>

));
