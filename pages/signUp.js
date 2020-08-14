import React from "react";
import styles from "../styles/signUp.module.css";
import Input from "../component/input";
import { AiFillFacebook } from "react-icons/ai";
function SignUp() {
  return (
    <div className="container">
      <div className="box">
        <div className="formContainer">
          <h1 className="instaHeader">
            {" "}
            <img className="instagram" src="/static/instagram.png" alt="" />
          </h1>
          <h2 className={styles.secondHeader}>
            Sign up to see photos and videos from your friends.
          </h2>
          <button className="button ">
            <span className="fbLogo">
              <AiFillFacebook size="1.7em" />
            </span>
            <span className="fbLink">Log in with Facebook</span>
          </button>
          <div className='border'>
            <div className='hr'></div>
            <div className='middle'>OR</div>
            <div className='hr'></div>
          </div>
          <Input labelName="Mobile Number or Email" />
          <Input labelName="Full Name" />
          <Input labelName="Username" />
          <Input labelName="Password" />
          <button className="button">Sign Up</button>
          <p className={styles.signUpTerm}>
            By signing up, you agree to our Terms , Data Policy and Cookies
            Policy .
          </p>
        </div>
        <div className="smallBox">
          <p>
            Have an account?
            <a href="/signIn" className="signUpLink">
              Log In
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
        .instaHeader {
          margin-bottom: 0px !important;
        }
        .fbLogo {
          top: 3px;
        }
        .fbLink {
          font-weight: 600;
          position: relative;
          bottom: 2px;
        }

        .border{
            margin: 10px 0px
        }
      `}</style>
    </div>
  );
}

export default SignUp;
