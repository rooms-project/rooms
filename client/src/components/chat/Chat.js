import React from "react";
import styled from "@emotion/styled";
import { Message } from "./Message";
import { InputBox } from "./InputBox";
import { withState, lifecycle, compose } from "recompose";
import io from "socket.io-client";
const socket = io("localhost:3000");

const ChatWrapper = styled.div`
  //border: 1px solid white;
  padding: 10px;
  width: 500px;
  // height:300px;
`;

const injectStateArray = withState("messages", "setMessages", []);

const injectSocketIo = lifecycle({
  componentDidMount() {
    const { messages, setMessages } = this.props;
    console.log("Chat Ready");
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
  <ChatWrapper>
    {messages.map(({ type, msg }, i) => (
      <Message server={type === "server" ? true : false} key={i}>
        {msg}
      </Message>
    ))}
    <InputBox
      newMessage={msg => {
        socket.emit("mensajeria", msg);
        messages.push({ type: "me", msg });
        setMessages(messages);
      }}
    />
  </ChatWrapper>
));
