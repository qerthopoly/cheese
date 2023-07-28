import React, { useContext, useState } from "react";
import "../styles/Home.css";

export default function Home() {
  return (
  <div className="WrapperHome">
	<nav className="NavigationBar">
		<div>LOGO</div>
		<button className="LoginButton" onClick={console.log('CLICK')}>LOGIN</button>
	</nav>
  </div>
  );
}
