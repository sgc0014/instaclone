import React, { useEffect, useState } from "react";
import { BsCircle, BsChat } from "react-icons/bs";
import { FiMoreHorizontal, FiHeart } from "react-icons/fi";
import { RiSendPlaneLine } from "react-icons/ri";
import firebase from "../lib/firebase";
import Link from "next/link";
import { useUser } from "../context/userContext";

const Post = ({ author, imgArr, likeCount, caption, id }) => {
  const { user } = useUser();
  const [likeState, setLikeState] = useState(false);
  const [comment, setcomment] = useState('');

  useEffect(() => {
    const check = async () => {
     
      await firebase
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
    };

    return () => {
      check();
    };
  });
  const handleSubmit = async (e) => {
   e.preventDefault();
   const post = await firebase
   .firestore()
   .collection("comment")
   .add({ postId: id, author: user.username,comment, photoUrl:user.photoUrl })
   setcomment('')
  }
  const unlikePost = async () => {
    let postRef = firebase.firestore().collection("posts").doc(`${id}`);
    const post = await firebase
      .firestore()
      .collection("likes")
      .add({ postId: id, liker: user.username })
      .then((doc) => {
        likeCount++;
        postRef.update({ likeCount: likeCount });
        setLikeState(true);
      });
  };
  const likePost = async () => {
    console.log(likeCount);
    let postRef = firebase.firestore().collection("posts").doc(`${id}`);

    firebase
      .firestore()
      .collection("likes")
      .where("liker", "==", user.username)
      .where("postId", "==", id)
      .limit(1)
      .get()
      .then(async function (data) {
        data.forEach((doc) => {
          doc.ref.delete().then(async (doc) => {
            likeCount--;
            await postRef.update({ likeCount: likeCount });
            setLikeState(false);
          });
        });
      });

   
  };
  return (
    user && (
      <div className="post">
        <div className="topPart">
          <span className="pp">
            <img src={`/static/users/user1.jpg`} />
          </span>
          <div className="subPart">
            <span className="username">{author}</span>
            <span>
              <FiMoreHorizontal />
            </span>
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
                    onClick={likeState ? likePost : unlikePost}
                    size={26}
                  />
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
              <span style={{ margin: "5px 0" }}>{likeCount} Likes</span>
            </div>

            <div style={{ marginBottom: "5px" }} className="caption">
              <span className="username">{author}</span>
              <span>{caption}</span>
            </div>

            <div style={{ marginBottom: "5px" }} className="commentLink">
              View all comment
            </div>
            <span className="day">2 Days Ago</span>
          </div>
          <form className="userCommentBox" onSubmit={handleSubmit}>
            <input value={comment} onChange={(e) => setcomment(e.target.value)} style={{ width: "100%" }} placeholder="Add a comment..." />
            <button type='submit' className="postButton">Post</button>
          </form>
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
              width: 33px;
              height: 33px;
            }
            .pp > img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
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
};

export default Post;
