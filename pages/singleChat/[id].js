import React, { useEffect, useState } from "react";
import Layout from "../../component/layout";
import Userlist from "../../component/chat/userlist";
import { GrEmoji } from "react-icons/gr";
import { AiOutlineInfoCircle } from "react-icons/ai";
import firebase from "../../lib/firebase";
import { inject, observer } from "mobx-react";
import { useUser } from "../../context/userContext";
import { RiChatNewLine } from "react-icons/ri";
import { ProtectRoute } from "../../component/protectRoute";
import  Router  from "next/router";

const Username = inject("store")(
  observer((props) => {
    const [outgoingMsg, setoutgoingMsg] = useState("");
    const [error, seterror] = useState("Error");
    const { loadingUser, user, otherUsers, loadingotherUser } = useUser();
    const { replier } = props;
    const { chats } = props.store;

    useEffect(() => {
      if(!loadingUser && !user){
        Router.push("/signIn", "/");
      }
      if (!loadingUser && !loadingotherUser) {
      
        props.store.getMsg(user.id, replier.id);
      
       
      }
    }, [loadingotherUser, user, otherUsers, loadingUser]);

    const handleChange = (e) => {
      e.preventDefault();

      setoutgoingMsg(e.target.value);
    };
    const handleSubmit = async (e) => {
      e.preventDefault();

      const finalMsg = {
        msgContent: outgoingMsg,
        senderId: user.id,
        timeStamp: firebase.firestore.Timestamp.now(),
        readStatus:false,
        photoUrl:user.photoUrl
      };
      let sendMsg = await firebase
        .firestore()
        .collection("chats")
        .doc(`${replier.id}`)
        .collection(`${user.id}`)
        .add(finalMsg)
        .then((doc) => {
          console.log("done");
          firebase
            .firestore()
            .collection("chats")
            .doc(`${user.id}`)
            .collection(`${replier.id}`)
            .add(finalMsg);
        })
        .catch((err) => {
          return error;
        });

      setoutgoingMsg("");
      
        var elem = document.getElementById('chatFieldId');
        elem.scrollTop = elem.scrollHeight;
     
    
    };

  
    return (
      <>
        <div className="chatContainer">
          <div className="userListContainer">
            <Userlist />
          </div>
          <div id="rightId" className="right">
            <div className="rightHeader">
              <div className="username"> {replier && replier.username}</div>
              <div className="icon">
                <AiOutlineInfoCircle size={"22px"} />
              </div>
            </div>
            <form
              id="chatFieldId"
              className="chatField"
              onSubmit={handleSubmit}
            >
              <div id="chatScreen" className="chats">
                {chats &&
                  chats.map((msg, i) =>
                    msg.senderId == user.id ? (
                      <div className="outgoing" key={i}>
                        <div className="msg outgoingmsg">{msg.msgContent}</div>
                      </div>
                    ) : (
                      <div className="incoming ">
                       
                        <div className="userImg">
                          <img src={msg.photoUrl} />{" "}
                        </div>
                        <div className="msg recievermsg">{msg.msgContent}</div>
                      </div>
                    )
                  )}
              </div>
              <div className="inputContainer">
                <div className="input">
                  <div>
                    <GrEmoji size={"28px"} />
                  </div>{" "}
                  <input
                    value={outgoingMsg}
                    onChange={(e) => handleChange(e)}
                  />
                  <button type="submit" className="sendButton">
                    Send
                  </button>
                </div>
              </div>
            </form>
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
          .chatField {
            height: 100%;
            position: relative;
            overflow-y: auto;
            scrollbar-width:thin; 
          }
          .chats {
            position: relative;
            top: 0px;
            margin-bottom: 99px;
            min-height: 268px;
            display: flex;
            flex-direction: column-reverse;
        }
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
          .input > input {
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
          .outgoing {
            display: flex;
            justify-content: flex-end;
            margin: 10px 5px;
            word-break: break-all;
          }
          .incoming {
            display: flex;
            justify-content: flex-start;
            margin: 10px 5px;
            word-break: break-all;
          }
          .msg {
            padding: 16px;
            border-radius: 30px;
            max-width:208px;
          }
          .userImg>img{
            width: 29px;
            position: relative;
            top: 18px;
            border-radius: 50%;
            height: 29px;
            margin-right:10px;
          }
          .outgoingmsg {
            background: #efefef;
          }
          .recievermsg {
            border: 1px solid #efefef;
          }
          @media screen and (max-width: 700px) {
            .right{
             height:91vh;
             width: 100%;
            }
            .chatContainer{
              margin-top: -70px;
              z-index: 99999;
              position: relative;
            }
            .chats{
              bottom:0;
              margin-bottom;104px;
              min-height:100%;
            }
            .inputContainer {
               padding:6px;
               position:fixed;
            }
            .userListContainer{
              display:none;
            }
                      }
        `}
        </style>
      </>
    );
  })
);

export default Username;

export async function getServerSideProps({ params }) {
  const replierId = params.id;
  let replier;
  await firebase.firestore().collection("users").doc(`${replierId}`).get().then(doc => {
  replier={username:doc.data().username,id:replierId}
  })
  return {
    props: {
      replier,
    },
  };
}
