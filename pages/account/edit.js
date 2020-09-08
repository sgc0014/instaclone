import { useEffect, useState } from "react";
import { useUser } from "../../context/userContext";
import { inject, observer } from "mobx-react";
import Uploadpp from "../../component/uploadPP";
import { ProtectRoute } from "../../component/protectRoute";
const { default: Layout } = require("../../component/layout");

const Edit = inject("store")(
  observer((props) => {
    const [name, setname] = useState("");
    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [bio, setbio] = useState("");
    const [phoneNo, setphoneNo] = useState("");
    const [gender, setgender] = useState("");
    const [id, setid] = useState("");
    const { loadingUser, user } = useUser();
    const { userInfo,updateUserProfile } = props.store;
    const [open, setopen] = useState(false);
    useEffect(() => {
      if (user) {
        props.store.getPosts();
       
        setname(user.fullName);
        setusername(user.username);
        setemail(user.email);
        setphoneNo(user.phoneNo);
        setgender(user.gender);
        setbio(user.bio);
        setid(user.id)
      }
    }, [loadingUser, user]);

const handleChange = (e) => {
    if(e.target.name == 'name'){
        setname(e.target.value)
    }
    else if(e.target.name == 'username'){
        setusername(e.target.value)
    }
    else if(e.target.name == 'email'){
       
        setemail(e.target.value)
    }
    else if(e.target.name == 'phoneNo'){
        setphoneNo(e.target.value)
    }
    else if(e.target.name == 'gender'){
        setgender(e.target.value)
    }
    else if(e.target.name == 'bio'){
        setbio(e.target.value)
    }
    
    
    
}
const handleSubmit = (e) => {
    e.preventDefault()
const finalInfo = {name,username,email,phoneNo,gender,bio,id}
console.log(finalInfo)
updateUserProfile(name,username,email,phoneNo,gender,bio,id)
console.log("done")
}

    return (
    
      user && (
        <>
        
        <Uploadpp open={open} />
            <div className="editContainer">
              <div className="leftSide">
                <ul className="nav-items">
                  <li className="nav-item">Edit Profile</li>
                  <li className="nav-item">Change Password</li>
                  <li className="nav-item">Apps and Websites</li>
                  <li className="nav-item">Email and SMS</li>
                  <li className="nav-item">Push Notification</li>
                  <li className="nav-item">Manage Contacts</li>
                  <li className="nav-item">Privacy and Security</li>
                  <li className="nav-item">Login Activity</li>
                  <li className="nav-item">Emails from Instagram</li>
                </ul>
              </div>
              <div className="rightSide">
                <form onSubmit={handleSubmit}>
                  <div className='pp' onClick={() => setopen(!open)}>Change Profile Photo</div>
                  <div className="formLabel" style={{marginTop:"48px"}}>
                    <label>
                      <div className="labelHeader" >Name</div>
                      <div className="inputcontainer">
                        <input name='name' onChange={handleChange} type="text" value={name}></input>

                        <div className="extraInfo">
                          Help people discover your account by using the name
                          you're known by: either your full name, nickname, or
                          business name. You can only change your name twice
                          within 14 days.
                        </div>
                      </div>
                    </label>
                  </div>
                  <div className="formLabel">
                    <label>
                      <div className="labelHeader">Username</div>
                      <div className="inputcontainer">
                        <input name='username' type="text" onChange={handleChange}  value={username}></input>

                        <div className="extraInfo">
                          In most cases, you'll be able to change your username
                          back to sgc014 for another 14 days. Learn More
                        </div>
                      </div>{" "}
                    </label>
                  </div>
                  <div className="formLabel">
                    <label>
                      <div className="labelHeader">Website</div>
                      <div className="inputcontainer">
                        <input type="text" ></input>

                        <div className="extraInfo"></div>
                      </div>{" "}
                    </label>
                  </div>
                  <div className="formLabel">
                    <label>
                      <div className="labelHeader">Bio</div>
                      <div className="inputcontainer">
                        <textarea value={bio} name='bio' type="text" onChange={handleChange} ></textarea>
                      </div>
                    </label>
                  </div>
                  <div className="formLabel">
                    <label>
                      <div className="labelHeader"></div>
                      <div className="inputcontainer">
                        <div className="extraInfo">
                          <h3>Personal Information</h3>
                          Provide your personal information, even if the account
                          is used for a business, a pet or something else. This
                          won't be a part of your public profile.
                        </div>
                      </div>
                    </label>
                  </div>
                  <div className="formLabel">
                    <label>
                      <div className="labelHeader">Email</div>
                      <div className="inputcontainer">
                        <input name='email' type="text" value={email} onChange={handleChange} ></input>
                      </div>{" "}
                    </label>
                  </div>
                  <div className="formLabel">
                    <label>
                      <div className="labelHeader">Phone Number</div>
                      <div className="inputcontainer">
                        <input name='phoneNo' type="text" value={phoneNo} onChange={handleChange} ></input>

                        <div className="extraInfo"></div>
                      </div>{" "}
                    </label>
                  </div>
                  <div className="formLabel">
                    <label>
                      <div className="labelHeader">Gender</div>
                      <div className="inputcontainer">
                        <select name='gender' value={gender} onChange={handleChange} >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Prefer Not To Say">
                            Prefer Not To Say
                          </option>
                        </select>

                        <div className="extraInfo"></div>
                      </div>{" "}
                    </label>
                  </div>
                  <div className="formLabel">
                    <label>
                      <div className="labelHeader">
                        Similar Account Suggestions
                      </div>
                      <input className="checkbox" type="checkbox"></input>
                      <div
                        className="checkboxcontainer"
                        style={{ width: "335px", fontWeight: "600" }}
                      >
                        Include your account when recommending similar accounts
                        people might want to follow.
                      </div>
                    </label>
                  </div>

                  <button
                    style={{ margin: "0 auto", width: "66px", height: "38px", marginBottom:'66px' }}
                    className="button"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          
          <style jsx>
            {`
              .editContainer {
                max-width: 935px;
                margin: 0 auto;
                border: 1px solid #dbdbdb;
                display: flex;
              }

              .leftSide {
                width: 236px;
                border-right: 1px solid #dbdbdb;
              }
              .rightSide {
                width: 100%;
              }
              .nav-items {
                padding: 0;
                margin: 0;
              }
              .nav-item {
                list-style: none;
                padding: 16px;
                font-size: 16px;
                font-weight: 600;
                padding-left: 33px;
                cursor: pointer;
              }
              .nav-item:hover {
                border-left: 1px solid #000;
              }
              form {
                margin-bottom: 50px;
                position:relative;
              }
              .labelHeader {
                width: 194px;
                text-align: center;
                font-size: 16px;
                font-weight: 600;
              }
              label {
                display: flex;
                padding: 25px 0px;
              }
              .inputcontainer {
                width: 335px;
                text-align: center;
              }
              .inputcontainer > input,
              textarea,
              select {
                width: 100%;
                border: 1px solid #dbdbdb;
                border-radius: 3px;
                font-size: 16px;
                padding: 10px;
              }
              input {
                height: 32px;
              }
              .extraInfo {
                font-size: 12px;
                color: #acaaaa;
                line-height: 17px;
                margin-top: 10px;
              }
              .checkbox {
                position: relative;
                top: 2px;
              }
              .pp {
                position: absolute;
                top: -18px;
                left: 39%;
                color: #0095f6;
                font-weight: 700;
                cursor:pointer;
              }
              @media screen and (max-width: 870px) {
            .leftSide{
              display:none;
            }
            label {
              flex-direction:column;
            }
            form{
              padding: 0 0 0 11px;
            }
            .labelHeader {
              width:0;
            }
              }
              @media screen and (max-width: 364px) {
                .inputcontainer{
                  width:221px;
                }
                .pp{
                  left: 21%;
                }
              }
            `}
          </style>
        </>
      )
    );
  })
);
export default ProtectRoute( Edit);
