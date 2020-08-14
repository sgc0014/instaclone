import React from "react";
import { FiSearch } from "react-icons/fi";
import { IoIosCloseCircle } from "react-icons/io";
import { BsHouseDoorFill, BsCircle } from "react-icons/bs";
import { RiSendPlaneLine } from "react-icons/ri";
import { TiCompass } from "react-icons/ti";
import { FiHeart } from "react-icons/fi";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="center">
        <h1 className="instaHeader">
          {" "}
          <img className="instagram" src="/static/instagram.png" alt="" />
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
            <BsHouseDoorFill size={26} />
          </li>
          <li className="nav-item">
            <a href="/chat">
              <RiSendPlaneLine size={26} />
            </a>
          </li>
          <li className="nav-item">
            <TiCompass size={26} />
          </li>
          <li className="nav-item">
            <FiHeart size={26} />
          </li>
          <li className="nav-item">
            <BsCircle size={26} />
          </li>
        </ul>
      </div>
      <style jsx>
        {`
          .navbar {
            background: #ffff;
            border-bottom: 1px solid #dbdbdb;
          }
          .center {
            display: flex;
            justify-content: space-evenly;
            height: 60px;
          }
          .instaHeader {
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
          }
          .instagram {
            width: 103px;
          }
        `}
      </style>
    </div>
  );
}


