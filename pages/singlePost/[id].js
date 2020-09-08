const { default: Layout } = require("../../component/layout");
import { useUser } from "../../context/userContext";
import { BsChat } from "react-icons/bs";
import { FiMoreHorizontal, FiHeart } from "react-icons/fi";
import { RiSendPlaneLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { ProtectRoute } from "../../component/protectRoute";

const Singlepost = inject("store")(
  observer((props) => {
    const { user } = useUser();
    const { postId } = props;
    const [comment, setComment] = useState("");
    useEffect(() => {
      props.store.getComments(postId);
    }, []);
    const handleSubmit = (e) => {
      e.preventDefault();
      const commentData = {
        postId,
        author: user.username,
        comment,
        photoUrl: user.photoUrl,
      };
      props.store.postComment(commentData);
      setComment("");
    };
    return (
      user && (
        <>
          {console.log("props.store.comments", props.store.comments)}
        
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
                  {props.store.comments &&
                    props.store.comments.map((comment, i = comment.id) => (
                      <div className="userComment" key={i}>
                        <div className="pp">
                          <img className="userImg" src={comment.photoUrl} />
                        </div>
                        <div className="comment">
                          <span className="username">{comment.author}</span>
                          <span className="commentContent">
                            {comment.comment}
                          </span>
                          <span className="likeComment">
                            <FiHeart size={12} />
                          </span>
                        </div>
                      </div>
                    ))}
                 
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

                  <div className="like">
                    <span style={{ margin: "5px 0", padding: "12px" }}>
                      3 Likes
                    </span>
                  </div>
                  <form className="userCommentBox" onSubmit={handleSubmit}>
                    <input
                      style={{ width: "100%" }}
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                    />
                    <button type="submit" className="postButton">
                      Post
                    </button>
                  </form>
                </div>
              </div>
            </div>
          
          <style jsx>{`
            .singlePostDetailContainer {
              max-width: 935px;
              display: flex;
              max-height: 598px;
              overflow: hidden;
              margin: 0 auto;
              background: #fff;
              border: 1px solid #dbdbdb;
              margin-bottom: 70px;
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
              height: 598px;
            }

            .topLevel {
              display: flex;

              padding: 23px 4px;
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
              width: 376px;
              height: 598px;
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
              margin-top: 23px;
              padding-right: 26px;
              position: relative;
            }
            .likeComment {
              position: absolute;
              top: 6%;
              right: 12px;
            }
            .commentContainer {
              height: 350px;
              overflow-y: scroll;
              scrollbar-width: none;
              padding: 4px;
              padding-top: 23px;
              border: 1px solid #dbdbdb;
              border-right: none;
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
              margin-top: 12px;
            }
            .userCommentBox > input {
              width: 100%;
              height: 56px;
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
            @media screen and (max-width: 930px) {
              .singlePostDetailContainer {
                max-width: 835px;
                max-height: 498px;
              }
              .commentContainer {
                height: 250px;
              }
            }
            @media screen and (max-width: 800px) {
              .singlePostDetailContainer {
                max-width: 735px;
                max-height: 498px;
              }
              .commentContainer {
                height: 250px;
              }
            }
            @media screen and (max-width: 735px) {
              .singlePostDetailContainer {
                margin-bottom: 0px;
                max-height: 100%;
                margin-top: 115px;
              }
              .mainContent {
                display: none;
              }
              .topLevel {
                display: none;
              }
              .interact {
                display: none;
              }
              .like {
                display: none;
              }
              .rightSide {
                width: 100%;
              }
              .commentContainer {
                height: 100%;
              }
              .lowLevel {
                position: fixed;
                z-index: 99999;
                top: 47px;
                width: 100%;
              }
            }
          `}</style>
        </>
      )
    );
  })
);

export default ProtectRoute( Singlepost);

export async function getServerSideProps({ params }) {
  const postId = params.id;
  return {
    props: {
      postId,
    },
  };
}
