import React from 'react'
import Menu from "../components/Menu"
import TableImg from "../image/table.png"
import CasualLife from "../image/CasualLife.png"
import googleIcon from "../image/google.png"
import eyeIcon from "../image/eye.png"
import "../style/Login.css"
import { useState } from 'react'
import { Link } from 'react-router-dom'
function Login() {

  const [control,setControl]=useState(true);

  return (
    <div>
      <Menu />

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
              <input required type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input  required type={control ? "password" : "text" } class="form-control" id="exampleInputPassword1" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" placeholder="Password"/>
              <div className='eyeIconImg' type='button' onClick={()=>setControl(!control)}>
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
