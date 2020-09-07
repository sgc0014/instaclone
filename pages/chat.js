import React from "react";
import Userlist from "../component/chat/userlist";
import { ProtectRoute } from "../component/protectRoute";
import { useUser } from "../context/userContext";
import Loading from "../component/loading";

const Chat = () => {
  const { loadingUser, user } = useUser();
  return !loadingUser ? (
    <>
    
        <div className="chatContainer">
          <Userlist />

          <div className="right emptyMsgBox">
            <h1 style={{ fontWeight: "400" }}>Your Messages</h1>
            <p style={{ color: " #979292" }}>
              Send private photos and messages to a friend or group.
            </p>
            <button className="prmBtn">Send Message</button>
          </div>
        </div>

        <style jsx>
          {`
            .chatContainer {
              max-width: 935px;
              margin: 40px auto;
              display: flex;
              border: 1px solid #dbdbdb;
              background: #fff;
            }
            .emptyMsgBox {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
            .right {
              width: 585px;
              border-left: 1px solid #dbdbdb;
              position: relative;
              height: 460px;
              overflow: hidden;
            }
            .rightHeader {
              padding: 20px;
              display: flex;
              justify-content: space-between;
              border-bottom: 1px solid #dbdbdb;
              height: 60px;
            }
            .noMsg {
              text-align: center;
            }
            .prmBtn {
              padding: 5px;
              background: #0095f6;
              color: #ffffff;
              border: none;
              border-radius: 4px;
              margin-top: 10px;
            }
            @media screen and (max-width: 700px) {
              .right {
                display: none;
                
              }
              .left {
                width: 100%;
              }
            }
            @media screen and (max-width: 700px) {
.navbar{
  display:none;
}
            }
          `}
        </style>
      
    </>
  ) : (
    <Loading />
  );
};
export default ProtectRoute(Chat);
