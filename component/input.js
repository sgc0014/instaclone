import React from "react";

function Input({ labelName }) {
  return (
    <div className="labelContainer">
      <label>
        <input className="input" required={true} />
        <span className="labelName">{labelName}</span>
      </label>
      <style jsx>
        {`
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
        `}
      </style>
    </div>
  );
}

export default Input;
