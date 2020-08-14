import Head from "next/head";
import styles from "../styles/Home.module.css";
import { FiSearch } from "react-icons/fi";
import { IoIosCloseCircle } from "react-icons/io";
import { BsHouseDoorFill, BsCircle } from "react-icons/bs";
import { RiSendPlaneLine } from "react-icons/ri";
import { TiCompass } from "react-icons/ti";
import { FiHeart } from "react-icons/fi";
import Post from "../component/post";
import RecommendedUser from "../component/recommendedUser";
import Navbar from "../component/navbar";
export default function Home() {
  return (
    <div>
    
      <div className="mainBody">
        <div className="left">
          <ul className="storyContainer">
            <li className="story">
              <div className="storypp">
                <img src="/static/users/user1.jpg" />
              </div>
              <span className="username">sgc14</span>
            </li>
            <li className="story">
              <div className="storypp">
                <img src="/static/users/user2.jpg" />
              </div>
              <span className="username">amrMe</span>
            </li>
            <li className="story">
              <div className="storypp">
                <img src="/static/users/user3.jpg" />
              </div>
              <span className="username">Badguy</span>
            </li>
            <li className="story">
              <div className="storypp">
                <img src="/static/users/user4.jpg" />
              </div>
              <span className="username">Szkshr</span>
            </li>
          </ul>

          <div className="postContainer">
            <Post />
            <Post />
            <Post />
          </div>
        </div>

        <div className="right">
          <div className="rightContainer">
            <div className="mainUser">
              <div className="mainUserPp">
                <img src="/static/users/user1.jpg" />
              </div>
              <div className="mainUsername">
                sgc0014 <span>Sagar Giri</span>
              </div>
            </div>
            <div className='suggestion'>
              <div className='suggestionHeader'>
                <div style={{color:'#999'}}>Suggestion for you</div><div>See all</div>
              </div>
              <div className='recommenderUsers'>
             <RecommendedUser />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>
        {`
        
          .mainBody {
            max-width: 935px;
           margin: 0 auto;
           display:flex;
           justify-content: space-around;
          }
          .left{
            width:635px;
            margin-right: 20px;
          }
          .storyContainer {
            border: 1px solid #dbdbdb;
            display:flex;
            padding: 19px 21px 30px;
          
            background: #ffffff
          }
          .story {
            list-style: none;
            margin: 0 10px;
            text-align:center;
          }
          .storypp{
            width: 66px;
            height: 66px;
          }
          .username{
            font-size:12px;
          }
          .storypp>img{
            width:100%;
            height:100%;
            border-radius: 50%;
          }
         
          .rightContainer{
            position: fixed;
            margin-top: 32px;
            width:293px;
            right: 115px;
          }
          .mainUser{
            display:flex;
          }
          .mainUsername{
            display:flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 12px;
            font-weight:600;
        }
        .mainUsername>span{
          font-size:13px !important;
          font-weight400 !important;
          color:#9d9d9d;
        }
          }
          .mainUserPp{
            width:66px;
            height:66px;
            
          }
          .mainUserPp >img{
            width:100%;
            height:100%;
            border-radius: 50%;
          }
          .suggestion{
            margin-top: 20px;
          }
          .suggestionHeader{
            display:flex;
            justify-content: space-between;
            margin-bottom: 20px;
          }
        
        `}
      </style>
    </div>
  );
}
