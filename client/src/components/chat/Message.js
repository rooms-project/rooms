import React from "react";
import styled from "@emotion/styled";

const MessageInner = styled.div`
  background: ${({ server }) => (server ? "gray" : "green")};
  border-radius: 10px;
  padding: 4px 8px;
  margin-top: 10px;
  display: inline-block;
  text-align: ${({ server }) => (server ? "left" : "right")};
  max-height: 571px;
`;

const MessageWrapper = styled.div`
  text-align: ${({ server }) => (server ? "left" : "right")};
 


`;

export const Message = ({ children, server = false }) => (
 
  <MessageWrapper server={server} className="messageWrapper">
    <MessageInner server={server}>{children}</MessageInner>
  </MessageWrapper>

);
