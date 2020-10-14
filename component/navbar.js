import React, { useState, useRef } from "react";
import { FiSearch, FiUser, FiPlusSquare } from "react-icons/fi";
import { IoIosCloseCircle } from "react-icons/io";
import { BsHouseDoorFill } from "react-icons/bs";
import { RiSendPlaneLine } from "react-icons/ri";
import { TiCompass } from "react-icons/ti";
import { FiHeart } from "react-icons/fi";
import { AiOutlineSetting, AiOutlineCamera } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { GrSave } from "react-icons/gr";
import Link from "next/link";
import { useUser } from "../context/userContext";
import firebase from "../lib/firebase";
import { inject, observer } from "mobx-react";
import Router  from 'next/router'
import useOuterClick from "../utils/useOuterClick";


const Navbar = inject("store")(
  observer((props) => {
    const [userToggler, setuserToggler] = useState(false);
    const [usernotificationToggler, setusernotificationToggler] = useState(
      false
    );
    const { loadingUser, user } = useUser();
  
    function dropdownToggler(e) {
      e.preventDefault();

      if (e.target.id == "userToggler") {
        setuserToggler(!userToggler);
        return;
      }
      setusernotificationToggler(!usernotificationToggler);
    }
    const handleLogOut = (e) => {
      firebase.auth().signOut();
      e.preventDefault();
    };
  
const innerRef = useOuterClick(ev => {if(userToggler){setuserToggler(false) }});

    return (
      user && (
        <>
        
          <div className="mobile-navbar ">
            <div className="mobile-center">
              <ul className="nav-items mobile-ul">
                <li className="nav-item ">
                  <Link href="/">
                    <a>
                      <BsHouseDoorFill size={26} />
                    </a>
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link href="/">
                    <a>
                      <FiSearch size={26} />
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                 
                      <FiPlusSquare size={26}  onClick={() => Router.push('/create')} />
                     
                   
                </li>

                <li className="nav-item ">
                  <FiHeart size={26} />
                </li>

                <li className="nav-item ">
                  <Link href={`/singleProfile/${user.username}`}>
                    <a>
                      <div className="user">
                        <FiUser size={26} />
                      </div>
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="navbar">
            <div className="center">
              <Link href="/chat">
                <a className="visualStory">
                  <AiOutlineCamera size={26} />
                </a>
              </Link>
              <h1 className="instaHeader">
                <Link href="/">
                  <img
                    className="instagram"
                    src="/static/instagram.png"
                    alt=""
                  />
                </Link>
              </h1>
              <div className="search">
                <input className="input" placeholder="Search" />
                <span className="searchLogo">
                  <FiSearch />
                </span>
                <span className="circleLogo">
                  <IoIosCloseCircle />
                </span>
              </div>

              <ul className="nav-items">
                <li className="nav-item invisible">
                  <Link href="/">
                    <a>
                      <BsHouseDoorFill size={26} />
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/chat">
                    <a>
                      <RiSendPlaneLine size={26} />
                      <div
                        className={props.store.unreadState ? "dot" : "null"}
                      ></div>
                    </a>
                  </Link>
                </li>
                <li className="nav-item invisible">
                  <TiCompass size={26} />
                </li>
                <li className="nav-item invisible">
                  <FiHeart size={26} />
                </li>
                <li className="nav-item invisible">
                  <div className="user">
                    <img
                      id="userToggler"
                      onClick={dropdownToggler}
                      src={user && user.photoUrl}
                    />
                  </div>

                  <div
                    className={
                      userToggler
                        ? `userdropDownMenu visible`
                        : `userdropDownMenu`
                    }
                  >
                    <ul ref={ innerRef} className="menuItems" style={{ width: "100%" }}>
                      <Link href={`/singleProfile/${user.username}`}>
                        <a>
                          <li className="menuItem">
                            <span className="menuIcon">
                              <FaRegUserCircle size={"16px"} />{" "}
                            </span>{" "}
                            <div>Profile</div>
                          </li>
                        </a>
                      </Link>
                      <li className="menuItem">
                        <span className="menuIcon">
                          <GrSave size={"16px"} />{" "}
                        </span>
                        <div>Saved</div>
                      </li>
                      <li className="menuItem">
                        <span className="menuIcon">
                          <AiOutlineSetting size={"16px"} />{" "}
                        </span>
                        <div> Setting</div>
                      </li>
                      <Link href="/signIn">
                        <a>
                          {" "}
                          <li onClick={handleLogOut} className="menuItem">
                            Log Out
                          </li>
                        </a>
                      </Link>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <style jsx>
            {`
          .navbar {
            background: #fff;
            border-bottom: 1px solid #dbdbdb;
            position: fixed;
            width: 100%;
            top: 0;
            z-index:10;
        }
          }
          .center {
            display: flex;
            justify-content: space-evenly;
            height: 60px;
            padding: 0 10px;
          }
          .visualStory{
            display:none;
          }
          .instaHeader {
            cursor:pointer;
          }
          .searchText {
            position: relative;
            right: 135px;
            bottom: 1px;
            color: #a5a7aa;
          }
          .searchLogo {
            position: relative;
            right: 215px;
            color: #a5a7aa;
          }
          .circleLogo {
            position: relative;
            right: 34px;
            color: #a5a7aa;
            opacity: 1;
          }
          .search {
            display: flex;
            align-items: center;
          }
          .search > input {
            border: 1px solid #dbdbdb;
            background: #fafafa;
            padding: 3px 10px 3px 26px;
            border-radius: 3px;
            width: 220px;
            height: 30px;
          }

          .nav-items {
            display: flex;
            list-style: none;
            align-items: center;
          }
          .nav-item {
            padding-left: 14px;
            cursor:pointer;
            position:relative;
          }
        
          .instagram {
            width: 103px;
          }
          .user > img {
            width: 26px;
            height: 26px;
            border-radius: 50%;
          }
       
          .userdropDownMenu {
            background: #fff;
            position: absolute;
            width: 235px;
            right: -3px;
            top: 45px;
            border-radius: 6px;
            box-shadow: 0px 0px 5px #bbb;
            opacity:0;
            transition: opacity 75ms linear,transform 38ms ease-out;
            z-index: -10;
            transform: translateY(-50px);
            display:none;
          }
          .visible{
           opacity:1;
           z-index: 2;
           transform: translateY(0px);
           display:flex;
          }
          .menuItems {
            list-style: none;
            padding: 0px;
          }
          .menuItem {
            display: flex;
            padding: 7px 16px;
            cursor: pointer;
          }
          .menuItem:hover{
            background: #eae8e8;
          }
          .menuItem:last-child {
            border-top: 1px solid #dbdbdb;
          }
          .menuIcon {
            padding-right: 16px;
          }
          
          .dot{
            background: #ed4956;
            border-radius: 50%;
            width: 9px;
            height: 9px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            color: #600707;
            position: absolute;
            top: 2px;
            left: 30px;
          }
          .null{
            display:none;
          }
          @media screen and (max-width: 850px) {
            .center{
              justify-content:space-between;
            }
          
            .search{
              display:none;
            }
            @media screen and (max-width: 700px) {
              .invisible{
                display:none;
              }
              .center{
                padding: 0 10px;
              }
              ul{
                padding-left:0;
              }
              .visualStory{
                display:flex;
                align-items:center;
              }
          }
          @media screen and (min-width: 700px) {
            .mobile-navbar{
              display:none;
            }
           
          }


          .mobile-navbar{
           
              background: #fff;
              border-top: 1px solid #dbdbdb;
              position: fixed;
              width: 100%;
              bottom: 0;
              z-index: 10;
           
          }
          .mobile-ul{
            width:100%;
            justify-content: space-between;
            padding: 0px 13px;
          }
        `}
          </style>
        </>
      )
    );
  })
);

export default Navbar;



