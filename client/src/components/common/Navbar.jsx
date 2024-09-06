import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import NavLogo from "../../assets/Main_Logo.png";
import noavater from "../../assets/noavatar.jpg";
import { AuthContext } from "../../contexts/AuthContext";
import "../../style/navbar.scss";

function Navbar() {
  const [open, setOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src={NavLogo} alt="Navbar Logo" />
          <span>PropTalk</span>
        </a>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img src={currentUser.avatar || noavater} alt="profile photo" />
            <span>{currentUser.username}</span>
            <a href="/profile" className="profile">
              <div className="notification">3</div>
              <span>Profile</span>
            </a>
          </div>
        ) : (
          <>
            <Link to="/login">Sign in</Link>
            <Link to="/signup" className="register">
              Sign up
            </Link>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          <a href="/">Sign in</a>
          <a href="/">Sign up</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
