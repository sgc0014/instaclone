const { default: Layout } = require("../component/layout");
import { useUser } from "../context/userContext";
import { BsCircle, BsChat } from "react-icons/bs";
import { FiMoreHorizontal, FiHeart } from "react-icons/fi";
import { RiSendPlaneLine } from "react-icons/ri";
function Singlepost() {
  const { user } = useUser();
  return (
    user && (
      <>
        <Layout>
          <div className="singlePostDetailContainer">
            <div className="mainContent">
              <div className="imgContainer">
                <img src="/static/posts/post5.jpg" />
              </div>
            </div>
            <div className="rightSide">
              <div className="topLevel">
                <div className="pp">
                  {" "}
                  <img className="userImg" src={user.photoUrl} />
                </div>

                <div className="subPart">
                  {" "}
                  <span className="username">{user.username}</span>
                  <span>
                    <FiMoreHorizontal />
                  </span>
                </div>
              </div>
              <div className="commentContainer">
                <div className="captionContainer">
                  <div className="pp">
                    {" "}
                    <img className="userImg" src={user.photoUrl} />
                  </div>
                  <div className="caption">
                    {" "}
                    <span className="username">{user.username}</span>
                    <span className="caption">caption</span>
                  </div>
                </div>

                <div className="userComment">
                  <div className="pp">
                    <img className="userImg" src={user.photoUrl} />
                  </div>
                  <div className="comment">
                    <span className="username">{user.username}</span>
                    <span className="commentContent">
                      Rockeing it Rockeing itRockeing itRockeing itRockeing
                      itRockeing itRockeing itRockeing itRockeing it{" "}
                    </span>
                  </div>
                </div>
              </div>
              <div className="lowLevel">
                <div className="interact">
                  <div className="leftIcon">
                    <span className="Lefticon">
                      <FiHeart className="likeIcon" size={26} />
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
                  <span style={{ margin: "5px 0" }}>3 Likes</span>
                </div>
                <form className="userCommentBox">
                  <input
                    style={{ width: "100%" }}
                    placeholder="Add a comment..."
                  />
                  <button type="submit" className="postButton">
                    Post
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Layout>
        <style jsx>{`
          .singlePostDetailContainer {
            max-width: 935px;
            display: flex;
            max-height: 598px;
            overflow: hidden;
            margin: 0 auto;
          }
          .mainContent {
            max-width: 598px;
            min-height: 450px;
          }
          .imgContainer {
            max-width: 598px;
            max-height: 598px;
          }
          .imgContainer > img {
            width: 100%;
            height: 100%;
          }

          .topLevel {
            display: flex;

            padding: 23px 0px;
          }
          .subPart {
            width: 100%;
            display: flex;
            justify-content: space-between;

            margin-bottom: 4px;
          }
          .pp {
            width: 32px;
            height: 32px;
            margin: 0 10px;
          }
          .pp > img {
            width: 32px;
            height: 32px;
            border-radius: 50%;
          }
          .rightSide {
            width: 335px;
            position: relative;
          }
          .captionContainer {
            display: flex;
            margin-bottom: 20px;
          }
          .caption {
            margin-bottom: 4px;
          }
          .username {
            margin-right: 5px;
          }
          .userComment {
            display: flex;
            margin-bottom: 22px;
          }
          .interact {
            display: flex;
            justify-content: space-between;
            padding: 12px;
          }
          .Lefticon {
            margin-right: 14px;
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
        `}</style>
      </>
    )
  );
}

export default Singlepost;
