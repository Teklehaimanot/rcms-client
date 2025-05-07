import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <ul>
      <Link to="/">
        <li>Home </li>
      </Link>
      <Link to="/about">
        <li>About </li>
      </Link>
      <Link to="/contactUs">
        <li>ContactUs </li>
      </Link>
    </ul>
  );
};

export default Menu;
