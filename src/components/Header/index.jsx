/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import Dropdown from "../Dropdown"
import List from "../List"
import SearchBar from "../SearchBar";
import "./header.css"

const Header = ({ token, handleToken }) => {
  return (
    <div className="center">
      <header className="container-header">
        <div className="header-logo">
          <Link to="/">
            <img src="logo.png" alt="logo-marvel" />
          </Link>
        </div>
        <SearchBar/>
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
                <li>
                <Link to="/characters">View Characters</Link>
                </li>
                <li>
                <Link to="/comics">View Comics</Link>
              </li>
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
                <div className="container-chars-comics">
                  <li>
                  <Link className="link-chars" to="/characters">View Characters</Link>
                  </li>
                  <li>
                  <Link className="link-comics" to="/comics">View Comics</Link>
                  </li>
                </div>
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
