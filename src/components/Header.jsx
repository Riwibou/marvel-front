/* eslint-disable react/prop-types */
// contiendra des liens vers characters, comics et bookmark et un sign in et login
import { Link } from "react-router-dom"
import Dropdown from "./Dropdown"
import List from "./List"


function Header({token, handleToken}) {
  return (
    <div>
      <div className="logo-div">
        <img src="logo.png" alt="logo marvel" />
      </div>

        <nav>
          <ul>
            <li>
              <Link to="/characters">Characters</Link>
            </li>
            <li>
              <Link to="/comics">Comics</Link>
            </li>
          </ul>
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
        </nav>
    </div>
  )
}

export default Header
