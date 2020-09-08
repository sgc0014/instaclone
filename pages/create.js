import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useRef, useState, useEffect } from "react";
import { useUser } from "../context/userContext";
import { observer, inject } from "mobx-react";
import Link from "next/link";
import { PulseSpinner } from "react-spinners-kit";
import Router from "next/router";
import useWindowSize from '../utils/useWindowSize'
import { ProtectRoute } from "../component/protectRoute";
const Create = inject("store")(
  observer((props) => {
    const inputEl = useRef(null);
    const size = useWindowSize()

    const { user } = useUser();
    const [caption, setcaption] = useState("");
    const [postPic, setpostPic] = useState();
    const [loading, setloading] = useState(false);

    const uploadPost = async (e) => {
      document.getElementById("postImg").src = window.URL.createObjectURL(
        e.target.files[0]
      );
      setpostPic(e.target.files[0]);
    };
    const handleSubmit = async () => {
      if (postPic) {
        setloading(true);
        const finalData = {
          author: user.username,
          authorId: user.id,
          photoUrl: user.photoUrl,
          caption,
          likeCount: 0,
        };
        await props.store.addPost(finalData, postPic);

        setloading(false);
        if (!props.store.error) {
          Router.push("/");
        }
      }
 
    };

    return size.width > 690 ? (
     <Redirect/>
    ) : (
      <div className="create">
       
        <header className="header">
          <div className="icon">
            <Link href="/">
              <a>
                <MdKeyboardArrowLeft size={28} />
              </a>
            </Link>
          </div>
          <h3>New Post</h3>

          <input
            ref={inputEl}
            hidden={true}
            id="id1"
            className="postInput"
            type="file"
            accept="image/jpeg,image/png"
            onChange={uploadPost}
          />

          <button
            className={postPic ? "shareButton" : "shareButton empt"}
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? <PulseSpinner size={20} color="#00b8f9" /> : "Share"}
          </button>
        </header>

        <div className="main">
          <img className="userImg" src="/static/users/user1.jpg" />
          <textarea
            onChange={(e) => {
              setcaption(e.target.value);
            }}
            className="caption"
            placeholder="Write a caption..."
          />
          <div className="upload" onClick={() => inputEl.current.click()}>
            <span className="info">Click me to upload</span>
            <img id="postImg" />
          </div>
        </div>

        <div className="optional">
          Add Location{" "}
          <div className="icon">
            <MdKeyboardArrowRight size={22} />
          </div>
        </div>
        <div className="optional">
          Tag People{" "}
          <div className="icon">
            <MdKeyboardArrowRight size={22} />
          </div>
        </div>
        <style jsx>{`
          .create {
            z-index: 9999;
            position: relative;
            top: 0;
            height: 100vh;
            background: #fafafa;
            margin-top: -63px;
          }
          .header {
            display: flex;
            justify-content: space-between;
            padding: 13px;
            background: #fff;
          }
          .header > h3 {
            margin: 0;
          }
          .main {
            display: flex;
            width: 100%;
            background: #fff;
            justify-content: center;
            padding: 20px 5px;
            position: relative;
            min-height: 90px;
            border-top: 1px solid #dbdbdb;
            border-bottom: 1px solid #dbdbdb;
          }
          .main > textarea {
            width: 100%;
            margin-left: 30px;
            margin-right: 2px;
            resize: none;
            border: none;
            scrollbar-width: none;
            font-family: Segoe UI;
            font-size: 13px;
          }
          .userImg {
            width: 22px;
            border-radius: 50%;
            height: 22px;
            position: absolute;
            left: 3px;
          }

          img {
            height: 100%;
            max-width: 66px;
            max-height: 117px;
            position: relative;
            z-index: 2;
          }
          .upload {
            position: relative;
            min-width: 70px;
            min-height: 70px;
            border: 3px dashed #dbdbdb;
          }
          .info {
            font-size: 7px;
            position: absolute;
            top: 44%;
            left: 2px;
          }
          .shareButton {
            color: #00b8f9;
            font-weight: 500;
            border: none;
            background: transparent;
          }
          .empt {
            color: #abd8e8;
          }

          .optional {
            background: #fff;
            padding: 13px;
            display: flex;
            justify-content: space-between;
            margin: 15px 0;
          }
        `}</style>
      </div>
    );
  })
);

export default ProtectRoute( Create);

//Redirect to home
function Redirect () {
  useEffect(() => {
    Router.push("/");
  })
  return(<></>)
}

