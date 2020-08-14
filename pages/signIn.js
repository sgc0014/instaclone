import styles from "../styles/signIn.module.css";
import { useEffect, useState } from "react";
import { AiFillFacebook } from "react-icons/ai";
import Input from "../component/input";

export default function SignIn() {
  useEffect(() => {
    let index = 0;
    let imageElem = document.getElementsByClassName("image");
    imageElem[index].classList.add("visibility");
    setInterval(() => {
      imageElem[index].classList.remove("visibility");

      index++;
      if (index > 4) {
        index = 0;
      }
      imageElem[index].classList.add("visibility");
    }, 3000);
  }, []);
  return (
    <div className='container'>
      <div className="phone">
        <div className={styles.imgCollection}>
          <img className={`image`} src="/static/phoneImg1.jpg" />
          <img className={`image`} src="/static/phoneImg2.jpg" />
          <img className={`image`} src="/static/phoneImg3.jpg" />
          <img className={`image`} src="/static/phoneImg4.jpg" />
          <img className={`image`} src="/static/phoneImg5.jpg" />
        </div>
      </div>
      <div className='box'>
        <div className='formContainer'>
          <h1 className='instaHeader'>
            {" "}
            <img
              className='instagram'
              src="/static/instagram.png"
              alt=""
            />
          </h1>

          <Input labelName="Phone number,email or username" />
          <Input labelName="Password" />

          <button className='button'>Log In</button>

          <div className='border'>
            <div className='hr'></div>
            <div className='middle'>OR</div>
            <div className='hr'></div>
          </div>
          <button className={styles.facebook}>
            <span className={styles.fbLogo}>
              <AiFillFacebook size="1.5em" />
            </span>
            <span className={styles.fbLink}>Log in with Facebook</span>
          </button>
          <a href="#" className={styles.forgotPassword}>
            Forgot Password?
          </a>
        </div>
        <div className='smallBox'>
          <p>
          Don't have an account?
            <a href="/signUp" className='signUpLink'>
              Sign up
            </a>
          </p>
        </div>
        <div className='appLink'>
          <p>Get the app.</p>
          <a href="#">
            <img className='store' src="/static/appleStore.png" />
          </a>

          <a href="#">
            <img className='store' src="/static/androidStore.png" />
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
}