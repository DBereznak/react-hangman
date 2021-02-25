import React from "react";

const Message = (props) => {
  const messageState = props.messageState;
  return (
    <div className="message">
      <h3>{messageState}</h3>
    </div>
  );
};

export default Message;
