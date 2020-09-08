import { useEffect, useState } from "react";
import firebase from "../../lib/firebase";
import { useUser } from "../../context/userContext";
import { inject, observer } from "mobx-react";


const User = inject("store")(
  observer((props) => {
    const { user, otherUsers, loadingUser } = useUser();
    const [newMsgState, setNewMsg] = useState(5);
    useEffect(() => {
         props.store.changeunread(user.id,props.id)
    }, [user, loadingUser]);
    return (
      <>
        <div className="user">
          <div className="userPp">
            {console.log(props.store.unreadState)}
            <img src={props.userImg} />
          </div>
          <div className="mainUsername">{props.username}</div>
          <div className={props.store.unreadState ? "dot" : "null"}>!</div>
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
