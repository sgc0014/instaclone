import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import Link from "next/link";
import { useUser } from "../../context/userContext";
import User from './user'
function Userlist() {
  const [username, setusername] = useState([]);
  const { user, otherUsers } = useUser();

  useEffect(() => {
  
  })

  return user &&
  otherUsers && (
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
            .map((user, i = user.id) => (
              <Link href={`/singleChat/${user.id}`}>
                <a>
                 < User userImg={user.photoUrl} username={user.username} id={user.id} key={i} />
                
                </a>
              </Link>
            ))}

      
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
          @media screen and (max-width: 700px) {
            
            .left{
              width: 100%;
            }
                      }
        `}
      </style>
    </div>
  );
}

export default Userlist;
