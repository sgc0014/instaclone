import React from "react";

import { FaRegEdit } from "react-icons/fa";
import Userlist from "../component/chat/userlist";
import Messagebox from "../component/chat/messagebox";
import Layout from "../component/layout";
function Nomsg() {
  return (
    <div className="noMsg">
      <h1 style={{ fontWeight: "400" }}>Your Messages</h1>
      <p style={{ color: " #979292;" }}>
        Send private photos and messages to a friend or group.
      </p>
      <button className="prmBtn">Send Message</button>
    </div>
  );
}
function Chat() {
  return (
    <Layout>
   
      <div className="chatContainer">
       
        <Userlist />
       
        <Messagebox />
        
       
      </div>
   
    <style jsx>
          {`
          
            .chatContainer {
              width: 935px;
              margin: 40px auto;
              display: flex;
              border: 1px solid #dbdbdb;
              background: #fff;
            }
           
          `}
        </style>
    </Layout>
  );
}

export default Chat;
