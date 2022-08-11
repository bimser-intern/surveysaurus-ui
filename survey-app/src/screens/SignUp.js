import React from 'react'
import Menu from '../components/Menu'
import "../style/SignUp.css"
import TableImg from "../image/table.png"
import CasualLife from "../image/CasualLife.png"
import googleIcon from "../image/google.png"
import eyeIcon from "../image/eye.png"
import "../style/Login.css"
import { useState } from 'react';
import { Link } from 'react-router-dom'
function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [control, setControl] = useState(true);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name);
        console.log(email);
    }
    return (
        <div className='App'>
            <Menu />
            <div className='tableImg'>
                <img src={TableImg} alt="" />
            </div>
            <div className='casualImg'>
                <img src={CasualLife} alt="" />
            </div>
            <div className='SignUp'>
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
                            <label for="exampleInputEmail1">Name</label>
                            <input required type="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name" />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input required type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <div class="form-group">
                            <label for="sel1">Choose Gender</label>
                            <select required class="form-control" id="sel1" name='sellist'>
                                <option></option>
                                <option>Female</option>
                                <option>Male</option>
                                <option>I do not want to specify</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="sel1">Select Country</label>
                            <select required value="" class="form-control" id="sel1">
                                <option></option>
                                
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="sel1">Select City</label>
                            <select required value="" class="form-control" id="sel1">
                                <option></option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input required type={control ? "password" : "text"} class="form-control" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" id="exampleInputPassword1" placeholder="Enter Password" />
                            <div className='eyeIcon' type='button' onClick={() => setControl(!control)}>
                                <img src={eyeIcon} alt="" />
                            </div>
                        </div>
                        <div className='buttonLayout'>
                            <button className='submitButton' type="submit">Sign Up</button>
                        </div>
                    </form>
                    <div className='haveAccount'>
                        <p>Dont't have an account?</p>
                        <Link to={"/login"} href="">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp