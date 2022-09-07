import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import "../style/Home.scss"
import "../style/Menu.scss"
import Logo from "../image/logo.png"
import SignOut from "../image/signOut.png"
import { useNavigate } from "react-router-dom";
function Menu({ isLogin, test = null,to="/" }) {
  const [control, setControl] = useState(true);
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token")
    localStorage.removeItem('auth')
    navigate("/login")
  }

  var indicator = document.querySelector('.nav-indicator');
  var items = document.querySelectorAll('.nav-item');

  function handleIndicator(el) {
    items.forEach(function (item) {
      item.classList.remove('is-active');
      item.removeAttribute('style');
    });
    indicator.style.width = "".concat(el.offsetWidth, "px");
    indicator.style.left = "".concat(el.offsetLeft, "px");
    indicator.style.backgroundColor = el.getAttribute('active-color');
    el.classList.add('is-active');
    el.style.color = el.getAttribute('active-color');
  }

  items.forEach(function (item, index) {
    item.addEventListener('click', function (e) {
      handleIndicator(e.target);
    });
    item.classList.contains('is-active') && handleIndicator(item);
  });



  return (
    <div className='Menu' id='#menu'>
      


        <ul className='navInfo'>
          <li><a href="/#create" className='navItem nav-item' active-color='#E49192'>Home</a>
          </li>
          <li style={{ display: test !== null ? "none" : "block" }}><a href="/#about" className='navItem nav-item' active-color='#E49192'>About</a></li>
          <li style={{ display: test !== null ? "none" : "block" }}><a href="/#survey" className='navItem nav-item' active-color='#E49192' >Surveys</a></li>
          <li style={{ display: to !== "/userPage" ? "none" : "block" }}><Link to={"/userPage"} className='navItem nav-item' active-color='#E49192'>My Survey</Link></li>
          <li style={{ display: to === "/userInfo" ? "block" : "none" }}><Link to={"/userInfo"}  className='navItem nav-item ' active-color='#E49192'>Account Info</Link></li>
          <li>
            <img className='logoImg' src={Logo} alt="" />
          </li>
        </ul>
      

      <ul>
        <li style={{ display: isLogin ? "none" : "block" }}>
          <Link to={"/signup"} className='signUpButton  ' >
            <p className='buttonTextLayout'>Sign Up</p>
          </Link>
        </li>
        <li>
          <Link to={localStorage.getItem("token") ? "/" : "/login"} className='loginButton '>
            <p className='buttonTextLayout'>{isLogin ? JSON.parse(localStorage.getItem("auth")).name : "Login"}</p>
          </Link>
        </li>
        <li>
          <div onClick={() => setControl(!control)} className='UserIcon'>
            <a href=""></a>
            {!isLogin ?
              <div>
              </div> : <div onClick={() => setControl(!control)} className='UserIcon'>
                <a href=""></a>
                <div style={{
                  display: control ? "none" : "flex", top: "45px", zIndex: "100", height: "150px", width: "300px",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#E491924D",
                  marginTop: "10px"
                }} className='openMenuLogIn' >
                  <div className='profileContainer' onClick={() => navigate("/")} style={{
                    width: "80%", height: "30px", backgroundColor: "#F5F5F5CC", marginBottom: "10px", display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "10px"
                  }}>
                    <Link className='menuLinkContain' to={"/"} style={{
                      fontFamily: 'Inter',
                      fontStyle: "normal",
                      fontWeight: "700",
                      fontSize: "13px",
                      lineHeight: "21px",
                      textAlign: "center",
                      color: "#000000",
                    }}>Profile</Link>
                  </div>
                  <div className='profileContainer' onClick={() => navigate("/UserPage")} style={{
                    width: "80%", height: "30px", backgroundColor: "#F5F5F5CC", marginBottom: "10px", display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "10px"
                  }}>
                    <Link className='menuLinkContain' to={"/UserPage"} style={{
                      fontFamily: 'Inter',
                      fontStyle: "normal",
                      fontWeight: "700",
                      fontSize: "13px",
                      lineHeight: "21px",
                      textAlign: "center",
                      color: "#000000",
                    }}>My Surveys</Link>
                  </div>
                  <div className='profileContainer' onClick={() => navigate("/UserInfo")} style={{
                    width: "80%", height: "30px", backgroundColor: "#F5F5F5CC", marginBottom: "10px", display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "10px"
                  }}>
                    <Link className='menuLinkContain' to={"/userInfo"} style={{
                      fontFamily: 'Inter',
                      fontStyle: "normal",
                      fontWeight: "700",
                      fontSize: "13px",
                      lineHeight: "21px",
                      textAlign: "center",
                      color: "#000000",
                    }}>Account Info</Link>
                  </div>
                  <div className='logOutContainer' onClick={logOut} style={{
                    width: "80%", height: "30px", paddingTop: "10px", paddingBottom: "10px", backgroundColor: "#F5F5F5CC",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "10px"
                  }}>
                    <Link className='menuLinkContain' to={"/login"} style={{
                      color: "#FFFFFF", marginLeft: "5px",
                      fontFamily: 'Inter',
                      fontStyle: "normal",
                      fontWeight: "700",
                      fontSize: "13px",
                      lineHeight: "21px",
                      textAlign: "center",
                      color: "#000000",

                    }}>Sign Out</Link>
                    <img style={{ width: "15px", height: "15px", marginLeft: "10px" }} src={SignOut} alt="" />
                  </div>
                </div>
              </div>
            }
          </div>
        </li>

      </ul>
      <span className='nav-indicator'></span>


      <div className="borderMenuBottomLogin"></div>
    </div>

  )
}
export default Menu;