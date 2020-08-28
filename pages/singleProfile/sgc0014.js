import Layout from "../../component/layout";
import { useUser } from "../../context/userContext";
import { useEffect, useRef, useState } from "react";
import { MdGridOn } from "react-icons/md";
import {
  AiOutlineFundProjectionScreen,
  AiFillSave,
  AiFillHeart,
} from "react-icons/ai";
import { RiFolderUserLine } from "react-icons/ri";
import { GiCog } from "react-icons/gi";
import { FaComment } from "react-icons/fa";
import { inject, observer } from "mobx-react";
import Link from "next/link";
import Uploadpp from "../../component/uploadPP";

const Sgc = inject("store")(
  observer((props) => {
    const { loadingUser, user } = useUser();
    useEffect(() => {
      if (user) {
        props.store.getPosts();
      }
    }, [loadingUser, user]);

  
    const [open, setopen] = useState(false);
   

    return (
      user && (
        <>
         <Uploadpp open={open}/>
          <Layout>
            {console.log(open)}
            <div className="mainProfile">
              <div className="profileContainer">
                <div className="userPP">
                  <img src={user.photoUrl} onClick={() => setopen(!open)} />
                 
                </div>
                <div className="userInfo">
                  <div className="topLevel">
                    <h2 className="profileUsername">{user.username}</h2>
                    <div className="btnContainer">
                      <button className="editButton">Edit Profile</button>{" "}
                    </div>
                    <div className="btnContainer">
                      <div className="extraSetting">
                        <GiCog size={20} />
                      </div>
                    </div>
                  </div>
                  <div className="midLevel">
                    <div className="postNo">
                      <span className="bold">4 </span> posts
                    </div>
                    <div className="followers">
                      <span className="bold">4 </span> followers
                    </div>
                    <div className="following">
                      <span className="bold">4 </span> following
                    </div>
                  </div>
                  <div className="lowLevel">
                    <div className="fullName bold">{user.fullName}</div>
                    <div className="bio">Hello</div>
                  </div>
                </div>
              </div>
              <div className="newLowLevel">
                <div className="postNo">
                  <span className="bold">4 </span> posts
                </div>
                <div className="followers">
                  <span className="bold">4 </span> followers
                </div>
                <div className="following">
                  <span className="bold">4 </span> following
                </div>
              </div>
              <div className="userPosts">
                <nav className="navbar">
                  <ul className="nav-items">
                    <li className="nav-item">
                      <Link href="/singleProfile/sgc0014/">
                        <a>
                          <span className="icon">
                            <MdGridOn size={20} color={"#b0afaf"} />{" "}
                          </span>{" "}
                          POSTS
                        </a>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <span className="icon">
                        <AiOutlineFundProjectionScreen
                          size={20}
                          color={"#b0afaf"}
                        />{" "}
                      </span>
                      IGTV
                    </li>
                    <li className="nav-item">
                      <span className="icon">
                        <AiFillSave size={20} color={"#b0afaf"} />
                      </span>
                      SAVED
                    </li>
                    <li className="nav-item">
                      <span className="icon">
                        <RiFolderUserLine size={20} color={"#b0afaf"} />{" "}
                      </span>
                      TAGGED{" "}
                    </li>
                  </ul>
                </nav>

                <div className="userImgCollage">
                  {props.store.posts.map((post) => (
                    <div className="imgContainer">
                      <div className="hoverEffect">
                        <div className="quick-info">
                          <span>10</span>
                          <AiFillHeart size={25} />
                        </div>
                        <div className="quick-info">
                          <span>10</span>
                          <FaComment size={25} />
                        </div>
                      </div>
                      <img src={post.imgArr[0]} className="postImg" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Layout>
          <style jsx>
            {`
              .mainProfile {
                max-width: 935px;
                margin: 0 auto;
              }
            
              .profileContainer {
                display: flex;
                width: 100%;
              }
              .userPP {
                padding: 35px 54px 41px;
                margin-right: 30px;
              }
              .userPP > img {
                width: 150px;
                height: 150px;
                border-radius: 50%;
              }
              .userInfo {
                width: 100%;
              }
              .profileUsername {
                font-size: 32px;
                font-weight: 300;
              }
              .topLevel {
                display: flex;
                align-items: center;
                margin: 15px 0px;
              }
              .btnContainer {
                margin-left: 25px;
              }
              .extraSetting {
                border: none;
              }
              .editButton {
                background: #fafafa;
                border: 1px solid #d9d9d9;
                padding: 8px;
                border-radius: 4px;
              }
              .midLevel {
                display: flex;
                margin: 15px 0px;
                font-size: 18px;
              }
              .midLevel > div {
                margin-right: 55px;
              }
              .newLowLevel {
                display: none;
              }

              .lowLevel {
                margin: 15px 0px;
                font-size: 15px;
              }
              .bold {
                font-weight: 600;
              }
              .userPosts {
                border-top: 1px solid #d7d5d5;
                margin: 0 10px;
              }
              .nav-items {
                display: flex;
                justify-content: center;
              }

              .nav-item {
                padding: 0;
                list-style: none;
                margin: 0 41px;
                height: 28px;
                display: flex;
                align-items: center;
              }
              .nav-item > a:visited {
                border-top: 1px solid black;
              }
              .icon {
                padding-right: 10px;
              }
              .userImgCollage {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                grid-gap: 10px;
              }
              .hoverEffect {
                width: 100%;
                height: 100%;
                position: absolute;
                background: black;
                opacity: 0;
                color: #fff;
                display: flex;
                justify-content: center;
              }
              .quick-info {
                position: relative;
                top: 50%;
              }
              .quick-info > span {
                position: relative;
                bottom: 8px;
                font-size: 17px;
                margin: 0 5px;
              }
              .imgContainer {
                width: 293px;
                height: 293px;
                position: relative;
              }
              .imgContainer:hover .hoverEffect {
                opacity: 0.6;
              }
              .postImg {
                width: 100%;
                height: 100%;
              }
              @media screen and (max-width: 950px) {
                .imgContainer {
                  width: 250px;
                  height: 250px;
                }
              }
              @media screen and (max-width: 800px) {
                .imgContainer {
                  width: 220px;
                  height: 220px;
                }
                .newLowLevel {
                  display: flex;
                  justify-content: space-evenly;
                  border-top: 1px solid #d7d5d5;
                  padding: 15px 0;
                }
                .midLevel {
                  display: none;
                }
              }
              @media screen and (max-width: 700px) {
                .imgContainer {
                  width: 180px;
                  height: 180px;
                }
                .userPP {
                  padding: 35px 36px 41px;
                }
                .userPP > img {
                  width: 100px;
                  height: 100px;
                }
              }
              @media screen and (max-width: 660px) {
                .imgContainer {
                  width: 150px;
                  height: 150px;
                }
                .userImgCollage {
                  margin-left: 22px;
                }
              }
              @media screen and (max-width: 640px) {
                .userImgCollage {
                  margin-left: 48px;
                }

                .imgContainer {
                  width: 120px;
                  height: 120px;
                }
                .nav-item {
                  margin: 0 auto;
                  font-size: 0;
                }
              }
              @media screen and (max-width: 500px) {
                .userImgCollage {
                  margin-left: 48px;
                }
                .nav-items {
                  padding: 0;
                }
                .nav-item {
                  margin: 0 20px;
                  font-size: 12px;
                }
              }
              @media screen and (max-width: 430px) {
                .profileUsername {
                  font-size: 20px;
                }
                .userImgCollage {
                  margin-left: 12px;
                }
                .userPP {
                  padding: 26px 0px 33px;
                }
                .nav-item {
                  font-size: 0;
                }
                .imgContainer {
                  width: 83px;
                  height: 83px;
                }
              }
            `}
          </style>
        </>
      )
    );
  })
);

export default Sgc;
