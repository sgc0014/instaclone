import React from "react";
import { BsCircle, BsChat } from "react-icons/bs";
import { FiMoreHorizontal, FiHeart } from "react-icons/fi";
import { RiSendPlaneLine } from "react-icons/ri";

function Post() {
  return (
    <div className="post">
      <div className="topPart">
        <span className="pp">
          {" "}
          <img src='/static/users/user1.jpg' />
        </span>
        <div className="subPart">
          <span className="username">sgc14</span>
          <span>
            <FiMoreHorizontal />
          </span>
        </div>
      </div>
      <div className="midPart">
        <img src="./static/posts/post1.jpg" />
      </div>
      <div className="bottomPart">
        <div style={{padding:"12px"}}>
          <div className="interact">
            <div className="leftIcon">
              <span className="Lefticon">
                <FiHeart size={26} />
              </span>
              <span className="Lefticon">
                <BsChat size={26} />
              </span>
              <span className="Lefticon">
                <RiSendPlaneLine size={26} />
              </span>
            </div>
            <span>
              <RiSendPlaneLine size={26} />
            </span>
          </div>
          <div>
            <span style={{ margin:'5px 0' }}>
              0 Likes
            </span>
          </div>

          <div style={{ marginBottom: "5px" }} className="caption">
            <span className="username">Sagar Giri</span>
            <span>Drop everything and win.</span>
          </div>

          <div style={{ marginBottom: "5px" }} className="commentLink">
            View all comment
          </div>
          <span className="day">2 Days Ago</span>
        </div>
        <div className="userCommentBox">
          <input style={{ width: "100%" }} placeholder="Add a comment..." />
          <button className="postButton">Post</button>
        </div>
      </div>
      <style jsx>
        {`
          .post {
            background: #ffffff;
            border: 1px solid #dbdbdb;
            width: 100%;
            margin-bottom: 60px;
          }
          .pp {
            width:33px;
            height:33px;
          }
          .pp>img{
            width:100%;
            height:100%;
            border-radius:50%;
          }
          .topPart {
            display: flex;
            padding: 15px;
            align-items: center;
          }
          .subPart {
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-left: 10px;
          }
         
          .midPart {
            width: 633px;
          }
          .midPart > img {
            width: 100%;
          }

          .interact {
            display: flex;
            justify-content: space-between;
          }
          .Lefticon{
            margin-right:14px;
          }
          .username {
            margin-right: 5px;
            font-weight: 600;
          }
          .day {
            font-size: 10px;
            letter-spacing: 0.2px;
            color: #b4a1c5;
          }
         
          .userCommentBox {
            position: relative;
            border-top: 1px solid #efefef;
          }
          .userCommentBox > input {
            width: 100%;
            height: 50px;
            border: none;
            padding-left: 12px;
            font-size: 14px !important;
          }
          .postButton {
            position: absolute;
            top: 17px;
            right: 1px;
            border: none;
            background: transparent;
            color: #0095f9;
            font-size: 14px;
            padding-right: 12px;
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
}

export default Post;
