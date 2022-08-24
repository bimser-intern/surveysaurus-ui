import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import "../style/Home.scss"
import "../style/Menu.scss"
import Logo from "../image/logo.png"
import SignOut from "../image/signOut.png"
import { useNavigate } from "react-router-dom";
function Menu({ isLogin ,test=null}) {
  const [control, setControl] = useState(true);
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token")
    localStorage.removeItem('auth')
    navigate("/login")
}
  return (
    <div className='Menu' id='#menu'>
      <ul className='navInfo'>
        <li><Link to={"/"} className='navItem'>Home</Link>
        </li>
        <li style={{display:test !== null ? "none":"block"}}><a href="#about" className='navItem'>About</a></li>
        <li style={{display:test !== null ? "none":"block"}}><a href="#survey" className='navItem'>Survey</a></li>
        <li to={"/userPage"} style={{display:test === null ? "none":"block"}}><Link to={"/userPage"} className='navItem'>My Survey</Link></li>
        <li>
          <img className='logoImg' src={Logo} alt="" />
        </li>
      </ul>

      <ul>
        <li style={{ display: isLogin ? "none" : "block" }}>
          <Link to={"/signup"} className='signUpButton'>
            <p className='buttonTextLayout'>Sign Up</p>
          </Link>
        </li>
        <li>
          <Link to={"/login"} className='loginButton'>
            <p className='buttonTextLayout'>{isLogin ? JSON.parse(localStorage.getItem("auth")).name : "Login"}</p>
          </Link>
        </li>
        <li>
          <div onClick={() => setControl(!control)} className='UserIcon'>
            <a href=""></a>
            {!isLogin ?
              <div style={{ display: control ? "none" : "block" }} className='openMenu'>
                <div onClick={() => navigate("/login")} className='menuItem'>
                  <Link className='menuLink' to={"/login"}>User Info</Link>
                </div>
                <div onClick={() => navigate("/login")} className='menuItem'>
                  <Link className='menuLink' to={"/login"}>My Survey</Link>
                </div>
                <div onClick={() => navigate("/login")} className='backColor'>
                  <Link style={{ color: "#FFFFFF", marginLeft: "5px" }} className='menuLink' to={"/login"}>Log Out</Link>
                </div>
              </div> : <div onClick={() => setControl(!control)} className='UserIcon'>
                <a href=""></a>
                <div style={{
                  display: control ? "none" : "flex"
                }} className='openMenuLogIn'>
                  <div className='profileContainer' onClick={() => navigate("/login")}>
                    <Link className='menuLinkContain' to={"/userInfo"}>Profile</Link>
                  </div>
                  <div className='logOutContainer' onClick={logOut}>
                    <Link className='menuLinkContain' to={"/login"}>Sign Out</Link>
                    <img style={{ width: "15px", height: "15px", marginLeft: "10px" }} src={SignOut} alt="" />
                  </div>
                </div>
              </div>
            }
          </div>
        </li>

      </ul>
      <div style={{marginTop:"15px"}} className="borderMenuBottomLogin"></div>
    </div>

  )
}
export default Menu;
