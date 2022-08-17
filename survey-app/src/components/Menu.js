import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import "../style/Home.scss"
import "../style/Menu.scss"
import Logo from "../image/logo.png"
import { useNavigate } from "react-router-dom";
function Menu() {
  const [control,setControl]=useState(true);
  const navigate=useNavigate();
  return (
    <div className='Menu' id='#menu'>
      <ul className='navInfo'>
        <li><a href='#create' className='navItem'>Home</a>
        </li>
        <li><a href="#about" className='navItem'>About</a></li>
        <li><a href="#survey" className='navItem'>Survey</a></li>
        <li>
          <img className='logoImg' src={Logo} alt="" />
        </li>
      </ul>

      <ul>
        <li>
          <Link to={"/signup"} className='signUpButton'>
            <p className='buttonTextLayout'>Sign Up</p>
          </Link>
        </li>
        <li>
          <Link to={"/login"} className='loginButton'>
            <p className='buttonTextLayout'>Login</p>
          </Link>
        </li>
        <li>
          <div onClick={() => setControl(!control)} className='UserIcon'>
            <a href=""></a>
            <div style={{display: control ? "none" :"block"}} className='openMenu'>
               <div onClick={()=>navigate("/login")} className='menuItem' style={{borderTopLeftRadius:"10px",borderTopRightRadius:"10px"}}>
                <Link className='menuLink' to={"/login"}>User Info</Link>
               </div>
               <div onClick={()=>navigate("/login")} className='menuItem'>
                <Link className='menuLink' to={"/login"}>My Survey</Link>
               </div>
               <div onClick={()=>navigate("/login")} className='backColor' style={{paddingTop:"10px",paddingBottom:"10px"}}>
                <Link style={{color:"#FFFFFF",marginLeft:"5px"}} className='menuLink' to={"/login"}>Log Out</Link>
               </div>
            </div>
          </div>
        </li>

      </ul>
    </div>

  )
}
export default Menu;
