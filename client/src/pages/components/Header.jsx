import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";

const Header = (props) => {
  return (
    <div class="navbar">
    <div class="logo">
      electiveSelection
    </div>
    <h1 class="home-link"><Link to = {props.link}>{props.name}</Link></h1>
    </div>
  );
};


export default Header;
