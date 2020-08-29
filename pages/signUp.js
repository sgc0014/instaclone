import React, { useState, useEffect } from "react";
import styles from "../styles/signUp.module.css";
import { AiFillFacebook } from "react-icons/ai";
import { observer, inject } from "mobx-react";
import { PulseSpinner } from "react-spinners-kit";
import { useUser } from "../context/userContext";
import Router from "next/router";

const SignUp = inject("store")(
  observer((props) => {
    const [email, setemail] = useState();
    const [username, setusername] = useState();
    const [fullName, setfullName] = useState();
    const [password, setpassword] = useState();
    let [loading, setloading] = useState(false);
    const { loadingUser, user } = useUser();

    useEffect(() => {
      if (!loadingUser) {
        if (user) {
          Router.push("/");
        }
        console.log(user);
      }
    }, [loadingUser, user]);
    const handleChange = (e) => {
      let inputName = e.target.name;
      let setValue = e.target.value;

      if (inputName == "email") {
        setemail(setValue);
      } else if (inputName == "username") {
        setusername(setValue);
      } else if (inputName == "fullName") {
        setfullName(setValue);
      } else if (inputName == "password") {
        setpassword(setValue);
      }
    };
    const handleSubmit = async () => {
      setloading(true);
      let createAc = props.store.createUserWithEmailAndPassword({
        email,
        username,
        fullName,
        password,
      });
      setloading(false);
    };

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
            <div className="border">
              <div className="hr"></div>
              <div className="middle">OR</div>
              <div className="hr"></div>
            </div>

            <div className="labelContainer">
              {props.store.error && (
                <div className="error">{props.store.error}</div>
              )}
              <label>
                <input
                  name="email"
                  className="input"
                  required={true}
                  onChange={(e) => handleChange(e)}
                />
                <span className="labelName">Mobile Number or Email</span>
              </label>
            </div>
            <div className="labelContainer">
              <label>
                <input
                  name="fullName"
                  className="input"
                  required={true}
                  onChange={(e) => handleChange(e)}
                />
                <span className="labelName">Full Name</span>
              </label>
            </div>
            <div className="labelContainer">
              <label>
                <input
                  name="username"
                  className="input"
                  required={true}
                  onChange={(e) => handleChange(e)}
                />
                <span className="labelName">Username</span>
              </label>
            </div>
            <div className="labelContainer">
              <label>
                <input
                  name="password"
                  className="input"
                  required={true}
                  onChange={(e) => handleChange(e)}
                />
                <span className="labelName">Password</span>
              </label>
            </div>
            <button
              type="submit"
              className="button"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <PulseSpinner size={20} color="#fff" /> : "Sign Up"}
            </button>
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

          .border {
            margin: 10px 0px;
          }
          .labelContainer > label {
            display: flex;
            flex-direction: column;
            padding: 4px 0;
            position: relative;
          }

          .labelName {
            font-size: 12px;
            position: absolute;
            line-height: 35px;
            pointer-events: none;
            left: 4px;
            color: #b2b2d5;
            transition: transform ease-out 0.1s;
          }
          .input {
            height: 35px;
            padding: 17px 6px 1px;
            font-size: 12px;
            border: 1px solid #dbdbdb;
          }
          .input:focus {
            border: 1px solid #8e8e8e;
          }

          .input:focus + .labelName,
          .input:valid + .labelName {
            transform: scale(0.8333) translateY(-10px);
          }
        `}</style>
      </div>
    );
  })
);
export default SignUp;
