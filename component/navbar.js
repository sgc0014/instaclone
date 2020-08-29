import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoIosCloseCircle } from "react-icons/io";
import { BsHouseDoorFill, BsCircle } from "react-icons/bs";
import { RiSendPlaneLine } from "react-icons/ri";
import { TiCompass } from "react-icons/ti";
import { FiHeart } from "react-icons/fi";
import { AiOutlineSetting } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { GrSave } from "react-icons/gr";
import Link from "next/link";
import { useUser } from "../context/userContext";

export default function Navbar() {
  const [userToggler, setuserToggler] = useState(false);
  const [usernotificationToggler, setusernotificationToggler] = useState(false);
  const { loadingUser, user } = useUser();
  function dropdownToggler(e) {
    e.preventDefault();

    if (e.target.id == "userToggler") {
      setuserToggler(!userToggler);
      return;
    }
    setusernotificationToggler(!usernotificationToggler);
  }

  return (
    <div className="navbar">
      <div className="center">
        <h1 className="instaHeader">
          <Link href="/">
            <img className="instagram" src="/static/instagram.png" alt="" />
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
          <li className="nav-item">
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
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <TiCompass size={26} />
          </li>
          <li className="nav-item">
            <FiHeart size={26} />
          </li>
          <li className="nav-item">
            <div className="user">
              <img
                id="userToggler"
                onClick={dropdownToggler}
                src={user && user.photoUrl}
              />
            </div>

            <div
              className={
                userToggler ? `userdropDownMenu visible` : `userdropDownMenu`
              }
            >
              <ul className="menuItems">
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
                    <li className="menuItem">Log Out</li>
                  </a>
                </Link>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <style jsx>
        {`
          .navbar {
            background: #ffff;
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
            right: 144px;
            top: 60px;
            border-radius: 6px;
            box-shadow: 0px 0px 5px #bbb;
            opacity:0;
            transition: opacity 75ms linear,transform 38ms ease-out,-webkit-transform 38ms ease-out;
            z-index: -10;
            transform: translateY(-50px);
          }
          .visible{
           opacity:1;
           z-index: 2;
           transform: translateY(0px);
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
          @media screen and (max-width: 850px) {
            .search{
              display:none;
            }
          }
        `}
      </style>
    </div>
  );
}
