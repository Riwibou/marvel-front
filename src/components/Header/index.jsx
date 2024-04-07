/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import Dropdown from "../Dropdown"
import List from "../List"
import "./header.css"

const Header = ({ token, search, handleToken, setSearch }) => {
  return (
    <div className="center">
      <header className="container-header">
        <div className="header-logo">
          <Link to="/">
            <img src="logo.png" alt="logo-marvel" />
          </Link>
        </div>

        <div className="header-middle">
          <div className="search-bar">
            <input
            name="search"
            type="text"
            placeholder="Search a Hero or Comic"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
            }}
            />
          </div>
        </div>

        <div>
          <nav className="nav">
            <ul>
              {token ? (
                <>
                <button onClick={() => {handleToken(null)}}> Deconnexion </button>
                <div>
                  <List/>
                </div>
                <div className="dropdown" style={{ display: 'none' }}>
                  <Dropdown/>
                </div>
              </>
              ) : (
                <>
                <li>
                  <Link className="login-btn" to="/login">
                    <p>Se connecter</p>
                  </Link>
                </li>
                <li>
                  <Link className="signup-btn" to="/signup">
                    <p>S&apos;inscrire</p>
                  </Link>
                </li>
              </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
