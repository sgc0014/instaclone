import React from "react";

import { FaRegEdit } from "react-icons/fa";
import Userlist from "../component/chat/userlist";
import Messagebox from "../component/chat/messagebox";
import Layout from "../component/layout";

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
