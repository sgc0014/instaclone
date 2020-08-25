import React, { useEffect, useState } from "react";
import Layout from "../../component/layout";
import Userlist from "../../component/chat/userlist";
import { GrEmoji } from "react-icons/gr";
import { AiOutlineInfoCircle } from "react-icons/ai";
import firebase from "../../lib/firebase";
import { inject, observer } from "mobx-react";
import { useUser } from "../../context/userContext";

const Username = inject("store")(
  observer((props) => {
    
    const [outgoingMsg, setoutgoingMsg] = useState("");
    const [error, seterror] = useState("Error");
    const { loadingUser, user, otherUsers, loadingotherUser } = useUser();
    const { replierUsername } = props;
    const { chats } = props.store;

    useEffect(() => {
      if (!loadingUser && !loadingotherUser) {
        console.log(replierUsername);
        props.store.getMsg(user.username, replierUsername);
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
        senderUsername: user.username,
        timeStamp: firebase.firestore.Timestamp.now(),
      };
      let sendMsg = await firebase
        .firestore()
        .collection("chats")
        .doc(`${replierUsername}`)
        .collection(`${user.username}`)
        .add(finalMsg)
        .then((doc) => {
          console.log("done");
          firebase
            .firestore()
            .collection("chats")
            .doc(`${user.username}`)
            .collection(`${replierUsername}`)
            .add(finalMsg);
        })
        .catch((err) => {
         return(
           error
         )
        });

      setoutgoingMsg("");
    };

    return (
      <Layout>
        {console.log(chats && chats)}

        <div className="chatContainer">
          <Userlist />
          <div className="right">
            <div className="rightHeader">
              <div className="username"> {replierUsername}</div>
              <div className="icon">
                <AiOutlineInfoCircle size={"22px"} />
              </div>
            </div>
            <form className="chatField" onSubmit={handleSubmit}>
              <div className="chats">
                {chats &&
                  chats.map((msg, i) =>
                    msg.senderUsername == user.username ? (
                      <div className="outgoing" key={i}>
                        <div className="msg outgoingmsg">{msg.msgContent}</div>
                        {console.log(msg)}
                      </div>
                    ) : (
                      <div className="incoming ">
                        {console.log(msg)}
                        <div className="userImg">
                          <img src={"/static/users/defaultUser.jpg"} />{" "}
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
            width: 935px;
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
          }
          .chats {
            position: relative;
            top: 0px;
            margin-bottom: 63px;
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
          }
          .incoming {
            display: flex;
            justify-content: flex-start;
            margin: 10px 5px;
          }
          .msg {
            padding: 16px;
            border-radius: 30px;
          }
          .userImg>img{
            width: 29px;
            position: relative;
            top: 18px;
            border-radius: 50%;
            height: 29px;
          }
          .outgoingmsg {
            background: #efefef;
          }
          .recievermsg {
            border: 1px solid #efefef;
          }
        `}
        </style>
      </Layout>
    );
  })
);

export default Username;

export async function getServerSideProps({ params }) {
  const replierUsername = params.username;
  return {
    props: {
      replierUsername,
    },
  };
}
