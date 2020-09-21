import React from "react";
import { Link } from "react-router-dom";
import GroupIcon from "@material-ui/icons/Group";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import "./styles/Nav.scss";

const Nav = () => {
  return (
    <nav className="Nav">
      <ul className="Nav__menu">
        <li className="Nav__item">
          <Link to="/users" className="Nav__link">
            <GroupIcon className="Nav__icon" />
            Users
          </Link>
        </li>
        <li className="Nav__item">
          <Link to="/posts" className="Nav__link">
            <MenuBookIcon className="Nav__icon" /> Posts
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
