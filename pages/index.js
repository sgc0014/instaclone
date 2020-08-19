import Post from "../component/post";
import RecommendedUser from "../component/recommendedUser";
import Layout from "../component/layout";
import { observer, inject } from "mobx-react";
import firebase from "../lib/firebase";
import { useEffect, useState } from "react";

const Home = inject("store")(
  observer((props) => {


    const [posts, setposts] = useState([]);
    const [user, setuser] = useState([]);


    useEffect(() => {
      setposts(props.posts);
      const unsubscribe = firebase.auth().onAuthStateChanged(authUser => {
        if(authUser){
          setuser(authUser)
        }
        else{
          setuser(null)
        }
      })
      return () => {
        unsubscribe();
      }
      
    },[user]);
  const  handleLogOut = (e) => {
      firebase.auth().signOut()
      e.preventDefault();
    }
    return (
      <Layout>
      
        <div className="mainBody">
          {console.log(user)}
          <div className="left">
            <ul className="storyContainer">
              <li className="story"  onClick={handleLogOut}>
                <div className="storypp">
                  <img src="/static/users/user1.jpg" />
                </div>
                <span className="username">sgc14</span>
              </li>
              <li className="story">
                <div className="storypp">
                  <img src="/static/users/user2.jpg" />
                </div>
                <span className="username">Rabtorab</span>
              </li>
              <li className="story">
                <div className="storypp">
                  <img src="/static/users/user3.jpg" />
                </div>
                <span className="username">Badgooy</span>
              </li>
              <li className="story">
                <div className="storypp">
                  <img src="/static/users/user4.jpg" />
                </div>
                <span className="username">Szkshr</span>
              </li>
            </ul>

            <div className="postContainer">
              {posts &&
                posts.map((post, i = post.id) => (
                  <Post
                    key={i}
                    caption={post.caption}
                    imgArr={post.imgArr}
                    likes={post.likes}
                    author={post.author}
                  />
                ))}
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
              <div className="suggestion">
                <div className="suggestionHeader">
                  <div style={{ color: "#999" }}>Suggestion for you</div>
                  <div>See all</div>
                </div>
                <div className="recommenderUsers">
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
          @media screen and (max-width: 1300px) {
            .right{
              display:none;
            }
          }
          @media screen and (max-width: 850px) {
            .left{
              width:100%;
              margin:0;
            }
            .search{
              display:none;
            }
            .midPart{
              width:100%;
            }
          }
        `}
        </style>
      </Layout>
    );
  })
);
export default Home;
export async function getServerSideProps() {
  let posts = [];
  const db = firebase.firestore();

  // get download url
  // let urlC;

  // const storage = firebase.storage().ref();
  // let result2 = await  storage.child('posts/post2.jpg').getDownloadURL().then(function(url){
  //   urlC = url
  // })

  let result = await db
    .collection("posts")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        let data = { ...doc.id, ...doc.data() };
        posts.push(data);
      });
    });

  return {
    props: { posts },
  };
}
