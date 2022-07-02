import React from "react";

const Message = (props) => {
  const messageState = props.messageState;
  return (
    <div className="message">
      <h2>{messageState}</h2>
    </div>
  );
};

export default Message;
