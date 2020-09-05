import { useEffect, useState } from "react";
import firebase from "../../lib/firebase";
import { useUser } from "../../context/userContext";
import { inject, observer } from "mobx-react";
import { action } from "mobx";

const User = inject("store")(
  observer((props) => {
    const { user, otherUsers, loadingUser } = useUser();
    const [newMsgState, setNewMsg] = useState(0);
    useEffect(() => {
      
      const checkunreadState = firebase
          .firestore()
          .collection("chats")
          .doc(`${user.username}`)
          .collection(`${props.username}`)
          .where("senderUsername", "==", props.username)
          .where("readStatus", "==", false)
          .onSnapshot((querySnap) => {
            let arr = [];
            querySnap.forEach((doc) => {
              console.log(doc.data());
              arr.push(doc.data());
            });
            if (!querySnap.empty) {
              setNewMsg(arr.length);
              console.log("tru");
            props.store.changeunread(true)
            } else {
              setNewMsg(0);
              props.store.changeunread(false)
            }
          });
      
return() =>{ checkunreadState()}
    }, [user, loadingUser]);
    return (
      <>
        <div className="user">
          <div className="userPp">
            {console.log(props.store.unreadState)}
            <img src={props.userImg} />
          </div>
          <div className="mainUsername">{props.username}</div>
          <div className={newMsgState > 0 ? "dot" : "null"}>{newMsgState}</div>
        </div>

        <style jsx>{`
        .user {
          display: flex;
          align-items: center;
          padding: 5px 15px;
        }
        .userPp > img {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          margin-right: 10px;
        }
        .dot {
            background: #ed4956;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            color: #fff;
            margin-left: 15px;
          }
          .null{
            display:none;
          }
        }
      `}</style>
      </>
    );
  })
);

export default User;
