import styles from "../styles/signIn.module.css";
import { useEffect, useState } from "react";
import { AiFillFacebook } from "react-icons/ai";
import { inject, observer } from "mobx-react";
import { useUser } from "../context/userContext";
import { ProtectRoute } from "../component/protectRoute";
import useInterval from "../utils/useInterval";
import { PulseSpinner } from "react-spinners-kit";
import Router from "next/router";


const SignIn = inject("store")(
  observer((props) => {
    const { loadingUser, user } = useUser();
    let [index, setindex] = useState(0);
    let [delay, setDelay] = useState(3000);
    let [loading, setloading] = useState(false);

    //prevent running document server side rendering
    const isBrowser = () => typeof window !== "undefined";

    let imageElem = isBrowser() && document.getElementsByClassName("image");

    useEffect(() => {
      if (!loadingUser) {
        if (user) {
          Router.push("/");
        }
        console.log(user);
      }
    });
    useEffect(() => {
      imageElem[index].classList.add("visibility");
    }, []);
    //clear interval on route change
    useInterval(() => {
      imageElem[index].classList.remove("visibility");

      setindex(index++);
      if (index > 4) {
        setindex((index = 0));
      }

      imageElem[index].classList.add("visibility");
    }, delay);
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const loginWithFacebook = (e) => {
      e.preventDefault();
    props.store.loginWithFacebook()
    };

    const handleChange = (e) => {
      if (e.target.name == "email") {
        setEmail(e.target.value);
      }

      setPassword(e.target.value);
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      setloading(true);
      console.log(loading);
      let signIn = await props.store.signInUserWithEmailAndPassword({
        email: Email,
        password: Password,
      });
      setloading(false);
    };
    return (
      <div className="container">
        <div className="phone">
          <div className={styles.imgCollection}>
            <img className={`image`} src="/static/phoneImg1.jpg" />
            <img className={`image`} src="/static/phoneImg2.jpg" />
            <img className={`image`} src="/static/phoneImg3.jpg" />
            <img className={`image`} src="/static/phoneImg4.jpg" />
            <img className={`image`} src="/static/phoneImg5.jpg" />
          </div>
        </div>
        <div className="box">
          <form className="formContainer" onSubmit={handleSubmit}>
            <h1 className="instaHeader">
              {" "}
              <img className="instagram" src="/static/instagram.png" alt="" />
            </h1>
            <div className="labelContainer">
              {props.store.error && (
                <div className="error">{props.store.error}</div>
              )}

              <label>
                <input
                  name="email"
                  className="input"
                  required={true}
                  onChange={handleChange}
                />
                <span className="labelName">
                  Phone number,email or username
                </span>
              </label>
            </div>
            <div className="labelContainer">
              <label>
                <input
                  name="password"
                  type='hidden'
                  className="input"
                  required={true}
                  onChange={handleChange}
                  min="6"
                />
                <span className="labelName">Password</span>
              </label>
            </div>

            <button type="submit" className="button" disabled={loading}>
              {loading ? <PulseSpinner size={20} color="#fff" /> : "Log In"}
            </button>

            <div className="border">
              <div className="hr"></div>
              <div className="middle">OR</div>
              <div className="hr"></div>
            </div>
            <button className={styles.facebook} onClick={loginWithFacebook}>
              <span className={styles.fbLogo}>
                <AiFillFacebook size="1.5em" />
              </span>
              <span className={styles.fbLink}>Log in with Facebook</span>
            </button>
            <a href="#" className={styles.forgotPassword}>
              Forgot Password?
            </a>
          </form>
          <div className="smallBox">
            <p>
              Don't have an account?
              <a href="/signUp" className="signUpLink">
                Sign up
              </a>
            </p>
          </div>
          <div className="appLink">
            <p>Get the app.</p>
            <a href="#">
              <img className="store" src="/static/appleStore.png" />
            </a>

            <a href="#">
              <img className="store" src="/static/androidStore.png" />
            </a>
          </div>
        </div>
        <style jsx>{`
          .phone {
            background-image: url("./static/emptyPhone.png");
            width: 454px;
            height: 618px;
          }
          @media screen and (max-width: 875px) {
            .phone {
              display: none;
            }
          }
          .image {
            height: 427px;
            left: 0;
            position: absolute;
            top: 0;
            width: 240px;
            opacity: 0;
            transition: 1.5s ease-in;
          }
          .visibility {
            opacity: 1 !important;
          }
        `}</style>
      </div>
    );
  })
);
export default ProtectRoute(SignIn);
