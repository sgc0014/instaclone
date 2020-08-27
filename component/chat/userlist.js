import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import Link from "next/link";
import { useUser } from "../../context/userContext";

function Userlist() {
  const [username, setusername] = useState([]);
  const { loadingUser, user, otherUsers, loadingotherUser } = useUser();

  return (
    <div className="left">
      <div className="leftHeader" style={{ fontWeight: "600" }}>
        Direct
        <div className="customMsg">
          <span>
            <FaRegEdit size={"22px"} />
          </span>
        </div>
      </div>
      <div className="chatList">
        {user &&
          otherUsers &&
          otherUsers
            .filter((userDoc) => userDoc.username !== user.username)
            .map((user, i = user.username) => (
              <Link href={`/singleChat/${user.username}`}>
                <a>
                  <div className="user" key={i}>
                    <div className="userPp">
                      <img src={`${user.photoUrl}`} />
                    </div>
                    <div className="mainUsername">{user.username}</div>
                  </div>
                </a>
              </Link>
            ))}

        <div className="user">
          <div className="userPp">
            <img src="/static/users/user2.jpg" />
          </div>
          <div className="mainUsername">Rabtorab</div>
        </div>

        <div className="user">
          <div className="userPp">
            <img src="/static/users/user3.jpg" />
          </div>
          <div className="mainUsername">Badgooy</div>
        </div>

        <div className="user">
          <div className="userPp">
            <img src="/static/users/user4.jpg" />
          </div>
          <div className="mainUsername">sznShr</div>
        </div>
      </div>
      <style jsx>
        {`
          .left {
            width: 350px;
            height: 100%;
            overflow: hidden;
          }
          .leftHeader {
            text-align: center;
            padding: 20px;
            border: 1px solid #dbdbdb;
            border-top: 0;
            border-left: 0;
            border-right: 0;
          }
          .customMsg {
            float: right;
          }
          .chatList {
            padding-top: 10px;
            overflow-y: auto;
            height: 400px;
          }
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
        `}
      </style>
    </div>
  );
}

export default Userlist;
