import React, { useEffect, useState } from "react";
import { BsChat } from "react-icons/bs";
import { FiMoreHorizontal, FiHeart } from "react-icons/fi";
import { RiSendPlaneLine } from "react-icons/ri";
import firebase from "../lib/firebase";
import Link from "next/link";
import { useUser } from "../context/userContext";
import { inject, observer } from "mobx-react";
import useOuterClick from "../utils/useOuterClick";

const Post = inject("store")(
  observer((props) => {
    const { user } = useUser();
    const [likeState, setLikeState] = useState(false);
    const [comment, setcomment] = useState("");
    const [optionToggler, setoptionToggler] = useState(false);
    const { author, imgArr, likeCount, caption, id, date,photoUrl } = props;

    useEffect(() => {
      
      const check = firebase
        .firestore()
        .collection("likes")
        .where("liker", "==", user.username)
        .where("postId", "==", id)
        .limit(1)
        .get()
        .then((doc) => {
          if (!doc.empty) {
            setLikeState(true);
          } else {
            setLikeState(false);
          }
        });

      return () => {
        check;
      };
    }, []);
    const handleSubmit = async (e) => {
      e.preventDefault();
      const commentData = {
        postId: id,
        author: user.username,
        comment,
        photoUrl: user.photoUrl,
      };
      props.store.postComment(commentData);

      setcomment("");
    };
    const likePost = async () => {
      props.store.likePost(user.username, id, likeCount);
      setLikeState(true);
    };
    const unlikePost = async () => {

      props.store.unlikePost(user.username, id, likeCount);
      setLikeState(false);
    };
    const optionRef = useOuterClick(ev => {if(optionToggler){setoptionToggler(false) }});
    return (
      user && (
        <div className="post">
        
          <div className="topPart">
            <span className="pp">
              <img src={`${photoUrl}`} />
            </span>
            <div className="subPart">
              <span className="username">
                <Link href={`/singleProfile/${author}`}>
                  <a>{author}</a>
                </Link>
              </span>
              <div className='post-option'>
                <FiMoreHorizontal onClick={(e) =>{setoptionToggler(!optionToggler)}} />
                <div className={optionToggler?"delete-option visible":"delete-option"} ref={optionRef}>
                  <p onClick={() => { props.store.deletePost(id)}}>Delete</p>
                </div>
              </div>
            </div>
          </div>
          <div className="midPart">
            <img src={`${imgArr[0]}`} />
          </div>
          <div className="bottomPart">
            <div style={{ padding: "12px" }}>
              <div className="interact">
                <div className="leftIcon">
                  <span className="Lefticon">
                    <FiHeart
                      className="likeIcon"
                      fill={likeState ? "#db2121" : "#fff"}
                      color={likeState ? "#db2121" : "#000"}
                      onClick={likeState ? unlikePost : likePost}
                      size={26}
                    />
                  </span>
                  <Link href={`/singlePost/${id}`}>
                    <a>
                      <span className="Lefticon">
                        <BsChat size={26} />
                      </span>
                    </a>
                  </Link>
                  <span className="Lefticon">
                    <RiSendPlaneLine size={26} />
                  </span>
                </div>
                <span>
                  <RiSendPlaneLine size={26} />
                </span>
              </div>
              <div>
                <span style={{ margin: "5px 0" }}>{likeCount} Likes</span>
              </div>

              <div style={{ marginBottom: "5px" }} className="caption">
                <span className="username">{author}</span>
                <span>{caption}</span>
              </div>
              <Link href={`/singlePost/${id}`}>
                <a>
                  <div
                    style={{
                      marginBottom: "5px",
                      color: "#a8a8a8",
                      fontSize: "11px",
                    }}
                    className="commentLink"
                  >
                    View all comment
                  </div>
                </a>
              </Link>
              <span className="day">2 Days Ago</span>
            </div>
            <form className="userCommentBox" onSubmit={handleSubmit}>
              <input
                value={comment}
                onChange={(e) => setcomment(e.target.value)}
                style={{ width: "100%" }}
                placeholder="Add a comment..."
              />
              <button type="submit" className="postButton">
                Post
              </button>
            </form>
          </div>
          <style jsx>
            {`
              .post {
                background: #ffffff;
                border: 1px solid #dbdbdb;
                width: 100%;
                margin-bottom: 60px;
                position:relative;
              }

              .pp > img {
                width: 33px;
                height: 33px;
                border-radius: 50%;
              }
              .topPart {
                display: flex;
                padding: 15px;
                align-items: center;
              }
              .post-option{
                cursor:pointer;
              }
              .delete-option {
                background: #fff;
                width: 100px;
                border-radius: 6px;
                box-shadow: 0px 0px 5px #bbb;
                opacity: 0;
                z-index:-100;
                transition: opacity 75ms linear,transform 38ms ease-out;
                display: none;
                padding-left: 11px;
                position:absolute;
                top:44px;
                right:2px;
              }
              .visible{
                opacity:1;
                z-index: 2;
                display:flex;
               }
              .delete-option>p{
                cursor:pointer;
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
              .Lefticon {
                margin-right: 14px;
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
              @media screen and (max-width: 850px) {
                .midPart {
                  width: 100%;
                }
              }
            `}
          </style>
        </div>
      )
    );
  })
);

export default Post;
