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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Vector from "../image/Vector.png"
function SignUp() {
    const countryCitylist = [
        {
            countryName: "Turkey",
            id: "0",
            city: [
                { cityName: "İstanbul" },
                { cityName: "Kocaeli" },
                { cityName: "Ankara" },
            ]
        },
        {
            countryName: "Germany",
            id: "1",
            city: [
                { cityName: "Berlin" },
                { cityName: "Hamburg" },
                { cityName: "Munich" },
            ]

        }
    ]
    const [countryId, setCountryId] = useState(0);
    const [countryOption, setcountryOption] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [controlVisible, setControlVisible] = useState(true);
    const [control, setControl] = useState(true);
    const [vectorControl, setvectorControl] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name);
        console.log(email);
    }
    return (
        <div className='App'>
            <div className='Menu'>
                <ul className='navInfo'>
                    <li><Link to={"/"} className='navItem'>Home</Link>
                    </li>
                    <li><a href="#about" className='navItem'>About</a></li>
                </ul>

                <ul>
                    <li>
                        <Link to={"/login"} className='loginButton'>
                            <p className='buttonTextLayout'>Login</p>
                        </Link>
                    </li>
                    <li>
                        <div onClick={() => setControl(!control)} className='UserIcon'>
                            <a href=""></a>
                            <div style={{ display: control ? "none" : "block", top: "45px", zIndex: "100" }} className='openMenu'>
                                <div className='menuItem' style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
                                    <Link className='menuLink' to={"/login"}>User Info</Link>
                                </div>
                                <div className='menuItem'>
                                    <Link className='menuLink' to={"/login"}>My Survey</Link>
                                </div>
                                <div className='backColor' style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                                    <Link style={{ color: "#FFFFFF", marginLeft: "5px" }} className='menuLink' to={"/login"}>Log Out</Link>
                                </div>
                            </div>
                        </div>
                    </li>

                </ul>
                <div className="borderMenuBottomSign"></div>
            </div>


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
                            <span style={{ color: "red", marginLeft: "3px" }} className='form-required'>*</span>
                            <input required type="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your name" />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <span style={{ color: "red", marginLeft: "3px" }} className='form-required'>*</span>
                            <input required type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your e-mail address" />
                        </div>
                        <div class="form-group">
                            <label for="sel1">Choose Gender</label>
                            <span style={{ color: "red", marginLeft: "3px" }} className='form-required'>*</span>
                            <select required class="form-control" id="sel1" name='sellist'>
                                <option></option>
                                <option>Female</option>
                                <option>Male</option>
                                <option>I do not want to specify</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="sel1">Select Country</label>
                            <span style={{ color: "red", marginLeft: "3px" }} className='form-required'>*</span>
                            <select onChange={(event) => {
                                setcountryOption(event.target.value)
                                //alert(countryOption)
                            }} required class="form-control" id="sel1">
                                <option></option>
                                {countryCitylist.map((country) => {
                                    return (
                                        <option value={country.id}>{country.countryName}</option>
                                    )
                                })}

                            </select>
                        </div>
                        <div class="form-group">
                            <label for="sel1">Select City</label>
                            <span style={{ color: "red", marginLeft: "3px" }} className='form-required'>*</span>
                            <select required class="form-control" id="sel1">
                                <option></option>
                                {countryCitylist[countryOption].city.map((item) => {
                                    return (
                                        <option>{item.cityName}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <span style={{ color: "red", marginLeft: "3px" }} className='form-required'>*</span>
                            <input required type={controlVisible ? "password" : "text"} class="form-control" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" id="exampleInputPassword1" placeholder="Enter your password" />
                            <div className='eyeIcon' type='button' onClick={() => setControlVisible(!controlVisible)}>
                                <img src={eyeIcon} alt="" />
                            </div>
                        </div>
                        <div className='policy'>
                            <div onClick={() => setvectorControl(!vectorControl)} className='checkBox'>
                                <img src={vectorControl ? Vector : null} alt="" />
                            </div>
                            <p className='textPolicy'>I agree to Surveysaurus</p>
                            <a style={{ marginRight: "5px", marginLeft: "5px", textDecoration: "underline" }} href="">Terms of Use</a>
                            <p>and</p>
                            <a style={{ marginLeft: "5px", textDecoration: "underline" }}>Policy</a>
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