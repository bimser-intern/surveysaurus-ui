import React from 'react'
import TableImg from "../image/table.png"
import CasualLife from "../image/CasualLife.png"
import googleIcon from "../image/google.png"
import eyeIcon from "../image/eye.png"
import Warning from "../image/warning.png"
import Logo from "../image/logo.png"
import "../style/Login.scss"
import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../style/Menu.scss'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom'
function Login() {

  const navigate = useNavigate();
  const location=useLocation();
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
    axios.post('/api/user/login', {
      "email": email,
      "password": password,
    })
      .then((result) => {
        console.log(result)
        if (result.status === 200) {
          localStorage.setItem('token',result.data.accessToken)
          localStorage.setItem('auth',JSON.stringify(result.data.data))
          console.log(result.data.data + "Login 64 Çalıştı.")
          navigate("/")

          if(localStorage.getItem('userSurvey')){
            let object=JSON.parse(localStorage.getItem('userSurvey'))
            axios.post(
              '/api/survey/createSurvey',
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
                 navigate("/userPage")
             })
          }
          if(localStorage.getItem("commentText")){
            if(!(localStorage.getItem("commentID"))){
              axios.post(
                '/api/comment/addcomment',
                {
                  "title": JSON.parse(localStorage.getItem("item")).title,
                  "comment": localStorage.getItem("commentText"),
                },
                {
                  headers: {
                    authorization: localStorage.getItem("token"),
                  },
                }
              )
              .then((result)=>{
                localStorage.removeItem("commentText")
                navigate("/fillSurvey", { state: { "surveyInfo": JSON.parse(localStorage.getItem("item")) } })
              })
            }
            else{
              axios.post(
                '/api/comment/addcomment',
                {
                  "title": JSON.parse(localStorage.getItem("item")).title,
                  "comment": localStorage.getItem("commentText"),
                  "parentID": localStorage.getItem("commentID")
                },
                {
                  headers: {
                    authorization: localStorage.getItem("token"),
                  },
                }
              )
              .then((result)=>{
                localStorage.removeItem("commentText")
                localStorage.removeItem("commentID")
                navigate("/fillSurvey", { state: { "surveyInfo": JSON.parse(localStorage.getItem("item")) } })
              })
            }
          }
          if(localStorage.getItem("selectedOption")){
            axios.post(
              '/api/survey/fillSurvey',
              {
                "title": location.state.title,
                "answer": localStorage.getItem("selectedOption"),
              },
              {
                headers: {
                  authorization: localStorage.getItem("token"),
                },
              }
            ).then((result) => {
              console.log(result)
              localStorage.removeItem("selectedOption")
              navigate("/fillSurvey", { state: { "surveyInfo": location.state.item } })

            }).catch((result) => {
              console.log(result)
            })
          }
        
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
      <div className='Menu' style={{ height: "75px" }}>
        <ul className='navInfo'>
          <li><Link to={"/"} className='navItem'>Home</Link>
          </li>
          <li>
          <img className='logoImg2' src={Logo} alt="" />
          </li>
        </ul>

        <ul style={{position:'relative', left:'60px'}}>
          <li>
            <Link to={"/signup"} className='signUpButton'>
              <p className='buttonTextLayout'>Sign Up</p>
            </Link>
          </li>
          <li>
            <div onClick={() => setControl(!control)} className='UserIcon'>
              <a href=""></a>
              
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
          <h3><p className='OrText'>Or</p></h3>
          <div className='borderOr'></div>
        </div>

        <div className='form'>
          <form onSubmit={handleSubmit}>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <span style={{ color: "red", marginLeft: "3px" }} className='form-required'>*</span>
              <input title="Please fill in the marked fields" onInput={InvalidMsg} onInvalidCapture={InvalidMsg} value={email} onChange={(e) => setEmail(e.target.value)} required type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your e-mail address" />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <span style={{ color: "red", marginLeft: "3px" }} className='form-required'>*</span>
              <input title='Please fill in the marked fields' onInput={InvalidMsgPassword} onInvalidCapture={InvalidMsgPassword} value={password} onChange={(e) => setPassword(e.target.value)} required type={controlVisible ? "password" : "text"} class="form-control" id="exampleInputPassword1" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" placeholder="Enter your password" />
              <div style={{top:islogin? '-25px':null, left:"90%", position:'relative'}} className='eyeIconImg' type='button' onClick={() => setControlVisible(!controlVisible)}>
                <img src={eyeIcon} alt="" />
              </div>
            </div>
            <div style={{display:islogin? 'flex': 'none'}} className='wrongLogIn'>
              <img style={{height:"20px"}} src={Warning} alt="" />
              <p style={{marginLeft:"5px"}}>Incorrect email or password</p>
            </div>
            <div className='buttonLayout'>
              <button className='submitButton' type="submit">Login</button>
            </div>
          </form>
          <div className='forgetUsername'>
          <p>Forget your<Link to={""}>username</Link> or<Link to={""}>password?</Link></p>
          </div>
          <div className='haveAccount'>
            <p>Don't have an account?</p>
            <Link to={"/signup"} href="">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login
