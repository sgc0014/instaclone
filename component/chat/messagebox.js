import React from "react";
import { GrEmoji } from "react-icons/gr";
import { AiOutlineInfoCircle } from "react-icons/ai";

function EmptyMsgBox() {
  return (
    <div className="right emptyMsgBox">
      <h1 style={{ fontWeight: "400" }}>Your Messages</h1>
      <p style={{ color: " #979292;" }}>
        Send private photos and messages to a friend or group.
      </p>
      <button className="prmBtn">Send Message</button>
    </div>
  );
}

function Messagebox() {
 

  return (
    <div className="right">
      <div className="rightHeader">
        <div className="username"> Leo Messi</div>
        <div className="icon">
          <AiOutlineInfoCircle size={"22px"} />
        </div>
      </div>
      <div className="chatField">
        <div className="chats">
          <div className="sender">
            <div className="msg sendermsg">Lorem ipsum dolor sit amet</div>
          </div>
          <div className="sender">
            <div className="msg sendermsg">Lorem ipsum dolor sit amet</div>
          </div>
          <div className="sender">
            <div className="msg sendermsg">H</div>
          </div>
          <div className="receiver ">
            <div className="msg recievermsg">Lorem ipsum dolor sit amet</div>
          </div>
          <div className="receiver ">
            <div className="msg recievermsg">Lorem ipsum dolor sit amet</div>
          </div>
          <div className="receiver ">
            <div className="msg recievermsg">Lorem ipsum dolor sit amet</div>
          </div>
          <div className="receiver ">
            <div className="msg recievermsg">Lorem ipsum dolor sit amet</div>
          </div>
          <div className="sender">
            <div className="msg sendermsg">Lorem ipsum dolor sit amet</div>
          </div>
          <div className="sender">
            <div className="msg sendermsg">H</div>
          </div>
          <div className="receiver ">
            <div className="msg recievermsg">Lorem ipsum dolor sit amet</div>
          </div>
          <div className="sender">
            <div className="msg sendermsg">Lorem ipsum dolor sit amet</div>
          </div>
          <div className="sender">
            <div className="msg sendermsg">H</div>
          </div>
          <div className="receiver ">
            <div className="msg recievermsg">Lorem ipsum dolor sit amet</div>
          </div>
          <div className="sender">
            <div className="msg sendermsg">Lorem ipsum dolor sit amet</div>
          </div>
          <div className="sender">
            <div className="msg sendermsg">H</div>
          </div>
          <div className="receiver ">
            <div className="msg recievermsg">
              Lorem ipsum dolor sit ametlatest
            </div>
          </div>
        </div>
        <div className="inputContainer">
          <div className="input">
            <div>
              <GrEmoji size={"28px"} />
            </div>{" "}
            <textarea />
            <div className="sendButton">Send</div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .emptyMsgBox {
            display: flex;
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
          .chatField {
            height: 100%;
            position: relative;
            overflow-y: auto;
          }
          .chats {
            position: relative;
            top: 0px;
            margin-bottom: 63px;
          }
          .inputContainer {
            background: #fff;
            z-index: 2;
            width: 100%;
            position: sticky;
            bottom: 60px;
            padding: 17px;
          }
          .input {
            width: 100%;
            border: 1px solid #dbdbdb;
            border-radius: 50px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 10px;
          }
          .input > textarea {
            background-color: transparent;
            border: 0;
            overflow: auto;
            padding: 8px 9px;
            resize: none;
            height: 35px;
            outline: 0;
            width: 100%;
          }
          .sendButton {
            border: none;
            background: transparent;
            color: #0095f9;
            font-size: 14px;
            padding-right: 12px;
            cursor: pointer;
          }
          .sender {
            display: flex;
            justify-content: flex-end;
            margin: 10px 5px;
          }
          .receiver {
            display: flex;
            justify-content: flex-start;
            margin: 10px 5px;
          }
          .msg {
            padding: 16px;
            border-radius: 30px;
          }
          .sendermsg {
            background: #efefef;
          }
          .recievermsg {
            border: 1px solid #efefef;
          }
        `}
      </style>
    </div>
  );
}

export default Messagebox;
