import { useState, useRef, useEffect } from "react";
import firebase from "../lib/firebase";
import { inject, observer } from "mobx-react";
import { useUser } from "../context/userContext";
import { GooSpinner } from "react-spinners-kit";
const Uploadpp = inject("store")(
  observer((props) => {
    const inputEl = useRef(null);

    const [open, setOpen] = useState(false);
    const [loading, setloading] = useState(false);
    const { loadingUser, user } = useUser();
    useEffect(() => {
      console.log("props.open", props.open);
      setOpen(props.open);
    }, [props.open]);

    const upload = async (e) => {
      let profilePic = e.target.files[0];
      if (profilePic) {
        setloading(true);
        const upload = await props.store.changePP({
          pp: profilePic,
          id: user.id,
        });
        setloading(true);
        setOpen(false);
        console.log("done");
      }
    };
    return (
      <div className={open ? `profilePicChange open` : "profilePicChange"}>
        <div className="mainPart">
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "600",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {loading ? <GooSpinner color={"#000"} /> : "Change Profile Photo"}
          </h2>
          <form className="ppChangeForm">
            <input
              ref={inputEl}
              hidden={true}
              type="file"
              accept="image/jpeg,image/png"
              onChange={upload}
              disabled={loading}
            ></input>
          </form>
          <button
            className="uploadButton"
            style={{ color: "#0095f9", textAlign: "center" }}
            onClick={() => console.log(inputEl.current.click())}
            disabled={loading}
          >
            Upload Photo
          </button>
          <button
            className="uploadButton"
            style={{ color: "#f04956" }}
            disabled={loading}
          >
            Remove Current Photo
          </button>
          <button
            className="uploadButton"
            style={{ fontWeight: "500 !important" }}
            onClick={() => setOpen(!open)}
          >
            Cancel
          </button>
        </div>
        <style jsx>
          {`
            .profilePicChange {
              position: fixed;
              width: 100%;
              height: 100%;
              z-index: 9999;
              background: rgba(0, 0, 0, 0.7);
              display: none;
              justify-content: center;
              margin-top: -70px;
              overflow: hidden;
            }
            .open {
              display: flex;
            }
            .mainPart {
              display: flex;
              flex-direction: column;
              width: 400px;
              position: relative;
              top: 28%;
              background: #fff;
              border-radius: 6px;
              height: 208px;
            }
            .uploadButton {
              background: #fff;
              border-top: 1px solid #dbdbdb !important;
              border: none;
              min-height: 48px;
              font-weight: 700;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          `}
        </style>
      </div>
    );
  })
);

export default Uploadpp;
