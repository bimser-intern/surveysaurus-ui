import React, { useEffect } from 'react'
import Menu from '../components/Menu'
import "../style/SignUp.scss"
import TableImg from "../image/table.png"
import CasualLife from "../image/CasualLife.png"
import googleIcon from "../image/google.png"
import eyeIcon from "../image/eye.png"
import Warning from "../image/warning.png"
import Logo from "../image/logo.png"
import "../style/Login.scss"
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Vector from "../image/Vector.png"
import axios from "axios"
import { useNavigate } from "react-router-dom";
function SignUp() {
    const navigate = useNavigate();
    const countryCitylist = [
        {
            countryName: "Turkey",
            id: 0,
            city: [
                { cityName: "İstanbul" },
                { cityName: "Kocaeli" },
                { cityName: "Ankara" },
            ]
        },
        {
            countryName: "Germany",
            id: 1,
            city: [
                { cityName: "Berlin" },
                { cityName: "Hamburg" },
                { cityName: "Munich" },
            ]

        }
    ]
    const [countryId, setCountryId] = useState(0);
    const [countryOption, setcountryOption] = useState(0);
    const [controlVisible, setControlVisible] = useState(true);
    const [controlVisibleConfirm, setControlVisibleConfirm] = useState(true);
    const [control, setControl] = useState(true);
    const [vectorControl, setvectorControl] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [gender, setgender] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [islogin, setIsLogin] = useState(false);
    const [countryList, setCountryList] = useState([]);
    const [cityList, setCityList] = useState([]);

    useEffect(() => {
        axios.get(
            'http://40.113.137.113/api/user/countries',

            {}
        ).then((result) => {
            const countryData = []
            result.data.data.surveys.map((item) => {
                //console.log(item)
                countryData.push(item)
            })

            setCountryList(countryData);
        })
    }, [])

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
        console.log(password)
        if (e.target.value == '') {
            e.target.setCustomValidity('Please fill in the marked fields');
        }
        else if (e.target.validity.patternMismatch) {
            e.target.setCustomValidity('Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters');
        }
        else if(password===confirmPassword){
            e.target.setCustomValidity('');
        }
        return true;
    }
    function InvalidMsgConfirmPassword(e) {
        console.log("password confrim passwrod")
        console.log(password)
        console.log(confirmPassword)
        if (e.target.value == '') {
            e.target.setCustomValidity('Please fill in the marked fields');
        }
        else if(password!=confirmPassword){
            e.target.setCustomValidity('Passwords do not match.');
        }
        else{
            e.target.setCustomValidity('');
        }
        return true;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name);
        console.log(email);
        console.log(password);
        console.log(gender);
        console.log(city);
        console.log(country);
        axios.post('http://40.113.137.113/api/user/register', {
            "userName": name,
            "email": email,
            "password": password,
            "gender": gender,
            "city": city,
            "country": country
        })
            .then((result) => {
                if (result.status) {
                    alert("User successfully registered")
                    navigate("/login");
                }
            })
            .catch((result) => {
                console.log(result);
                setIsLogin(true)
            })

        //console.log(email);
    }
    return (
        <div className='App'>
            <div className='Menu' style={{ height: "75px"}}>
                <ul className='navInfo'>
                    <li><Link to={"/"} className='navItem'>Home</Link>
                    </li>
                    <li>
                        <img className='logoImg3' src={Logo} alt="" />
                    </li>
                </ul>

                <ul style={{position:'relative', left:'60px'}}>
                    <li>
                        <Link to={"/login"} className='loginButton'>
                            <p className='buttonTextLayout'>Login</p>
                        </Link>
                    </li>
                    <li>
                        <div onClick={() => setControl(!control)} className='UserIcon'>
                            <a href=""></a>
                            
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
                    <h3><p className='OrText'>Or</p></h3>
                    <div className='borderOr'></div>
                </div>

                <div className='form'>
                    <form onSubmit={handleSubmit}>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Name</label>
                            <span style={{ color: "red", marginLeft: "3px" }} className='form-required'>*</span>
                            <input onInput={(e) => e.target.setCustomValidity("")} onInvalidCapture={(e) => e.target.setCustomValidity("Please fill in the marked fields")} value={name} onChange={(e) => setName(e.target.value)} required type="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your name" />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <span style={{ color: "red", marginLeft: "3px" }} className='form-required'>*</span>
                            <input onInput={InvalidMsg} onInvalidCapture={InvalidMsg} value={email} onChange={(e) => setEmail(e.target.value)} required type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your e-mail address" />
                        </div>
                        <div class="form-group">
                            <label for="sel1">Choose Gender</label>
                            <span style={{ color: "red", marginLeft: "3px" }} className='form-required'>*</span>
                            <select onInput={(e) => e.target.setCustomValidity("")} onInvalidCapture={(e) => e.target.setCustomValidity("Please Choose Gender")} value={gender} onChange={(e) => setgender(e.target.value)} required class="form-control" id="sel1" name='sellist'>
                                <option></option>
                                <option>Female</option>
                                <option>Male</option>
                                <option>I do not want to specify</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="sel1">Select Country</label>
                            <span style={{ color: "red", marginLeft: "3px" }} className='form-required'>*</span>
                            <select value={country} onInput={(e) => e.target.setCustomValidity("")} onInvalidCapture={(e) => e.target.setCustomValidity("Please Choose Country")} onChange={(event) => {
                                setCountry(event.target.value)
                                axios.post(
                                    'http://40.113.137.113/api/user/cities',
                                    {
                                        "country": event.target.value,
                                    },

                                    {}
                                ).then((result) => {
                                    console.log(result)
                                    const cityData = []
                                    result.data.data.surveys.map((item) => {
                                        //console.log(item)
                                        cityData.push(item)
                                    })

                                    setCityList(cityData);
                                })
                                //alert(countryOption)
                            }} required class="form-control" id="sel1">
                                <option></option>
                                {countryList.map((country, index) => {
                                    return (
                                        <option value={country}>{country}</option>
                                    )
                                })}

                            </select>
                        </div>
                        <div class="form-group">
                            <label for="sel1">Select City</label>
                            <span style={{ color: "red", marginLeft: "3px" }} className='form-required'>*</span>
                            <select onInput={(e) => e.target.setCustomValidity("")} onInvalidCapture={(e) => e.target.setCustomValidity("Please Choose city")} value={city} onChange={(e) => setCity(e.target.value)} required class="form-control" id="sel1">
                                <option></option>
                                {cityList.map((item) => {
                                    return (
                                        <option>{item}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <span style={{ color: "red", marginLeft: "3px" }} className='form-required'>*</span>
                            <input onChange={(e) => setPassword(e.target.value)} onInput={InvalidMsgPassword} onInvalidCapture={InvalidMsgPassword} value={password} required type={controlVisible ? "password" : "text"} class="form-control" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" id="exampleInputPassword1" placeholder="Enter your password" />
                            <div className='eyeIcon' style={{left:"90%", position:'relative', top:"-25px"}} type='button' onClick={() => setControlVisible(!controlVisible)}>
                                <img src={eyeIcon} alt="" />
                            </div>
                        </div>
                        <div class="form-group" style={{position:"relative", top:"-20px"}}>
                            <label for="exampleInputPassword1">Confirm your Password</label>
                            <span style={{ color: "red", marginLeft: "3px" }} className='form-required'>*</span>
                            <input value={confirmPassword} onInput={InvalidMsgConfirmPassword} onInvalidCapture={InvalidMsgConfirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required type={controlVisibleConfirm ? "password" : "text"} class="form-control" id="exampleInputPassword1" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" placeholder="Confirm your password" />
                            <div className='eyeIcon' style={{left:"90%", position:'relative', top:"-25px"}} type='button' onClick={() => setControlVisibleConfirm(!controlVisibleConfirm)}>
                                <img src={eyeIcon} alt="" />
                            </div>
                        </div>
                        <div style={{ display: islogin ? 'flex' : 'none' }} className='wrongSignUp'>
                            <img style={{ height: "20px" }} src={Warning} alt="" />
                            <p style={{ marginLeft: "7px" }}>User name or email existing</p>
                        </div>
                        <div className='buttonLayout'>
                            {/* <button className='submitButton' type="submit">Sign Up</button> */}
                            <button type='submit' className='submitButton'>Sign Up</button>
                        </div>
                    </form>
                    <div className='haveAccount' style={{marginTop:"10px"}}>
                        <p>Have an account?</p>
                        <Link to={"/login"} href="">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp