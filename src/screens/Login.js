import React from 'react'
import Menu from "../components/Menu"
import TableImg from "../image/table.png"
import CasualLife from "../image/CasualLife.png"
import googleIcon from "../image/google.png"
import eyeIcon from "../image/eye.png"
import Warning from "../image/warning.png"
import "../style/Login.scss"
import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../style/Menu.scss'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react'
function Login() {

  const navigate = useNavigate();
  const [control, setControl] = useState(true);
  const [controlVisible, setControlVisible] = useState(true);
  const [islogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function InvalidMsg(e) {
    if (e.target.value == '') {
      e.target.setCustomValidity('Please fill in the marked fields');
    }
    else if (e.target.validity.typeMismatch) {
      e.target.setCustomValidity('Please write a valid e-mail address in the marked field.');
    }
    else {
      e.target.setCustomValidity('');
    }
    return true;
  }
  function InvalidMsgPassword(e) {
    if (e.target.value == '') {
      e.target.setCustomValidity('Please fill in the marked fields');
    }
    else if (e.target.validity.patternMismatch) {
      e.target.setCustomValidity('Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters');
    }
    else {
      e.target.setCustomValidity('');
    }
    return true;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email)
    console.log(password)
    axios.post('https://survey-api.orangeground-88d990d8.westeurope.azurecontainerapps.io/api/user/login', {
      "email": email,
      "password": password,
    })
      .then((result) => {
        console.log(result)
        if (result.status === 200) {
          localStorage.setItem('token',result.data.accessToken)
          localStorage.setItem('auth',JSON.stringify(result.data.data))
          console.log(result.data.data)

          if(localStorage.getItem('userSurvey')){
            let object=JSON.parse(localStorage.getItem('userSurvey'))
            axios.post(
              'https://survey-api.orangeground-88d990d8.westeurope.azurecontainerapps.io/api/survey/createSurvey',
              {
                  "title":object.title,
                  "question":object.question,
                  "choice":object.choice,
              },
              {
                  headers: {
                      authorization: localStorage.getItem("token"),
                  },
              }
             ).then((result)=>{
                 localStorage.removeItem("userSurvey")
             })
          }
          setTimeout(() => {
            console.log("lşmşlmşlmşlmşlm")
            navigate("/userPage");
          }, 200);
        }
        else {
          alert("username or password is wrong");
        }
      }).catch((result) => {
        setIsLogin(true)
      })
  }

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
            <div onClick={() => setControl(!control)} className='UserIcon'>
              <a href=""></a>
              <div style={{ display: control ? "none" : "block", top: "45px", zIndex: "100" }} className='openMenu'>
                <div onClick={() => navigate("/login")} className='menuItem' style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
                  <Link className='menuLink' to={"/login"}>User Info</Link>
                </div>
                <div onClick={() => navigate("/login")} className='menuItem'>
                  <Link className='menuLink' to={"/login"}>My Survey</Link>
                </div>
                <div onClick={() => navigate("/login")} className='backColor' style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                  <Link style={{ color: "#FFFFFF", marginLeft: "5px" }} className='menuLink' to={"/login"}>Log Out</Link>
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
        <div style={{width:islogin? "200px":null,paddingTop:islogin? "4px":null,paddingBottom:islogin? "4px":null}} className='withGoogle'>
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
          <form onSubmit={handleSubmit}>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <span style={{ color: "red", marginLeft: "3px" }} className='form-required'>*</span>
              <input title="Please fill in the marked fields" onInput={InvalidMsg} onInvalidCapture={InvalidMsg} value={email} onChange={(e) => setEmail(e.target.value)} required type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your email" />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <span style={{ color: "red", marginLeft: "3px" }} className='form-required'>*</span>
              <input title='Please fill in the marked fields' onInput={InvalidMsgPassword} onInvalidCapture={InvalidMsgPassword} value={password} onChange={(e) => setPassword(e.target.value)} required type={controlVisible ? "password" : "text"} class="form-control" id="exampleInputPassword1" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" placeholder="Enter your password" />
              <div style={{top:islogin? '225px':null}} className='eyeIconImg' type='button' onClick={() => setControlVisible(!controlVisible)}>
                <img src={eyeIcon} alt="" />
              </div>
            </div>
            <div style={{display:islogin? 'flex': 'none'}} className='wrongLogIn'>
              <img style={{height:"20px"}} src={Warning} alt="" />
              <p style={{marginLeft:"5px"}}>Incorrect email or password</p>
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