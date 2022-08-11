import React from 'react'
import Menu from "../components/Menu"
import TableImg from "../image/table.png"
import CasualLife from "../image/CasualLife.png"
import googleIcon from "../image/google.png"
import eyeIcon from "../image/eye.png"
import "../style/Login.css"
import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../style/Menu.css'
function Login() {

  const [control,setControl]=useState(true);
  const [controlVisible,setControlVisible]=useState(true);


  return (
    <div>
      <div className='Menu'>
      <ul className='navInfo'>
        <li><Link to={"/"} className='navItem'>Home</Link>
        </li>
        <li><a href="#about" className='navItem'>About</a></li>
      </ul>

      <ul>
        <li>
          <Link to={"/signup"} className='signUpButton'>
            <p className='buttonTextLayout'>Sign Up</p>
          </Link>
        </li>
        <li>
          <div onClick={()=>setControl(!control)} className='UserIcon'>
            <a href=""></a>
            <div style={{display: control ? "none" :"block",top:"45px",zIndex:"100"}} className='openMenu'>
               <div className='menuItem' style={{borderTopLeftRadius:"10px",borderTopRightRadius:"10px"}}>
                <Link className='menuLink' to={"/login"}>User Info</Link>
               </div>
               <div className='menuItem'>
                <Link className='menuLink' to={"/login"}>My Survey</Link>
               </div>
               <div className='backColor' style={{paddingTop:"10px",paddingBottom:"10px"}}>
                <Link style={{color:"#FFFFFF",marginLeft:"5px"}} className='menuLink' to={"/login"}>Log Out</Link>
               </div>
            </div>
          </div>
        </li>

      </ul>
      <div className="borderMenuBottomLogin"></div>
    </div>

      <div className='tableImg'>
        <img src={TableImg} alt="" />
      </div>
      <div className='casualImg'>
        <img src={CasualLife} alt="" />
      </div>

      <div className='login'>
        <div className='withGoogle'>
          <div className='googleIcon'>
            <img src={googleIcon} alt="" />
          </div>
          <p className='continue'>Continue with Google</p>
        </div>

        <div className='Or'>
          <div className='borderOr'></div>
          <p className='OrText'>Or</p>
          <div className='borderOr'></div>
        </div>

        <div className='form'>
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <span style={{color:"red",marginLeft:"3px"}} className='form-required'>*</span>
              <input required type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your email" />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <span style={{color:"red",marginLeft:"3px"}} className='form-required'>*</span>
              <input  required type={controlVisible ? "password" : "text" } class="form-control" id="exampleInputPassword1" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" placeholder="Enter your password"/>
              <div className='eyeIconImg' type='button' onClick={()=>setControlVisible(!controlVisible)}>
                  <img src={eyeIcon} alt="" />
              </div>
            </div>
            <div className='buttonLayout'>
              <button className='submitButton' type="submit">Log in</button>
            </div>
          </form>
          <div className='haveAccount'>
            <p>Dont't have an account?</p>
            <Link to={"/signup"} href="">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login
