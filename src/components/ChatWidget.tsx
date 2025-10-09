import React from "react";
import { IoChatbubbles } from "react-icons/io5";

const ChatWidget = () => {
  return (
    <div className="w-12 h-12 cursor-pointer fixed rounded-full  border-2 border-secondary bg-primary bottom-0 right-10 flex items-center justify-center">
      <IoChatbubbles size="32" className="text-accent" />
    </div>
  );
};

export default ChatWidget;
