import React from "react";
import Navbar from "./navbar";

function Layout(props) {
  return (
    <div>
      <Navbar />
      <div style={{ marginTop: "40px" }}>{props.children}</div>
    </div>
  );
}

export default Layout;
