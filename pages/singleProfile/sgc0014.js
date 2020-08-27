import Layout from "../../component/layout";
import { useUser } from "../../context/userContext";
import { useEffect } from "react";
import { MdGridOn } from "react-icons/md";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { GrSave } from "react-icons/gr";
import { RiFolderUserLine } from "react-icons/ri";
import { GiCog } from "react-icons/gi";
import { inject, observer } from "mobx-react";

const Sgc = inject("store")(
    observer((props) => {
  const { loadingUser, user } = useUser();
  useEffect(() => {
     
      
    if (user) {
    props.store.getPosts()
    
    }
  }, [loadingUser, user]);

  return (
    user && (
      <>
        <Layout>
          <div className="mainProfile">
            <div className="profileContainer">
              <div className="userPP">
                <img src={user.photoUrl} />
              </div>
              <div className="userInfo">
                <div className="topLevel">
                  <h2 className="profileUsername">{user.username}</h2>
                  <div className="btnContainer">
                    <button className='editButton'>Edit Profile</button>{" "}
                  </div>
                  <div className="btnContainer">
                    <div className='extraSetting'><GiCog size={20}/></div>
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
            <div className="userPosts">
              <nav className="navbar">
                <ul className="nav-items">
                  <li className="nav-item">
                    <span className="icon">
                      <MdGridOn size={14} />
                      {" "}
                    </span>{" "}POSTS
                  </li>
                  <li className="nav-item">
                    <span className="icon">
                      <AiOutlineFundProjectionScreen size={14} />
                      {" "}
                    </span>IGTV
                  </li>
                  <li className="nav-item">
                    <span className="icon">
                      <GrSave size={14} /> 
                    </span>SAVED
                  </li>
                  <li className="nav-item">
                    <span className="icon">
                      <RiFolderUserLine size={14} />
                      {" "}
                    </span>
                    TAGGED </li>
                </ul>
              </nav>
              {console.log(props.store.posts)}
              <div className='userImgCollage'>
                  {props.store.posts.map(post => <img src={post.imgArr[0]} className='postImg' />)}
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
            .extraSetting{
                
                    background: #fff;
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
            .lowLevel {
              margin: 15px 0px;
              font-size: 15px;
            }
            .bold {
              font-weight: 600;
            }
            .userPosts{
              border-top:  1px solid #d7d5d5;
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
            .icon{
                padding-right: 10px;
            }
            .userImgCollage{
                display: grid;
grid-template-columns: repeat(3,1fr);
grid-gap: 20px;
            }
            .postImg{
                width:293px;
                height:293px;
            }
          `}
        </style>
      </>
    )
  );
}))

export default Sgc;
