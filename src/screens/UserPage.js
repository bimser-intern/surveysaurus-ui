import { fontSize, fontStyle, fontWeight, lineHeight, textAlign } from '@mui/system';
import axios from 'axios';
import { Button } from 'bootstrap';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import SignOut from "../image/signOut.png"
import PlusIcon from "../image/plusIcon.png"
import Logo from "../image/logo.png"
import ListIcon from "../image/list.png"
import "../style/UserPage.scss"
import Menu from '../components/Menu';
function UserPage() {
    window.scrollTo(0, 0)
    const navigate = useNavigate()
    const [control, setControl] = useState(true);
    const [userInfo, setUserInfo] = useState([])
    const [userSurvey, setUserSurvey] = useState([])
    const logOut = () => {
        localStorage.removeItem("token")
        localStorage.removeItem('auth')
        navigate("/login")
    }
    useEffect(() => {
        
        axios.get("http://40.113.137.113/api/user/mysurveys", {
            headers: {
                authorization: localStorage.getItem("token"),
            }
        }).then((result) => {

            if (result.data.data.surveys && result.data.data.surveys.length > 0) {
                const userSurveyData = []
                result.data.data.surveys.map((item) => {
                    console.log(item)
                    userSurveyData.push(item)
                })

                setUserSurvey(userSurveyData);
                console.log("eeeeeeeeeeeeeee");
                console.log(userSurvey)

            }

        })
        if (!localStorage.getItem("token")) {
            navigate("/login")
        }
        else {
            const todos = [...userInfo]
            todos.push(JSON.parse(localStorage.getItem("auth")))

            setUserInfo(todos)

        }
    }, [])
    return (
        <div>
            <Menu isLogin={true} test="true" />

            <div class="container" style={{ marginTop: "100px" }}>
                <div class="row">
                    {userSurvey && userSurvey.length > 0 &&
                        userSurvey.map((result, index) => {
                            console.log("----------------")
                            console.log(userSurvey)
                            return (
                                <div class="col-sm-3">
                                    <div onClick={() => navigate("/fillSurvey", { state: { "surveyInfo": result } })} className='SurveyCard' style={{ marginBottom: "10px" }}>
                                        <h3>{result.title}</h3>
                                        <p className='questionHeaderStyle'>{result.question}</p>
                                        <ul className='choicesStyle'>
                                            {result.choices.map((item) => {
                                                return (
                                                    <div className='ChoicesListStyle'>
                                                        <img style={{ width: "15px", height: "15px", marginTop: "2px" }} src={ListIcon} alt="" />
                                                        <li className='ChoicesItem' style={{ paddingLeft: "10px" }}>{item}</li>
                                                    </div>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div class="col-sm-3">
                        <div onClick={() => navigate("/createSurveyWithLogin", {
                            state: {
                                auth: JSON.parse(localStorage.getItem("auth"))
                            }
                        })} className='SurveyCard' id="pluscreatesurvey">
                            <img src={PlusIcon} alt="" />
                            <h1>Create Survey</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className='footer'>
                <div className='footerBorder'></div>
                <div className='footerItem'>
                    <ul>
                        <li>
                            <Link to={"/"} className='navItem'>Home</Link>
                        </li>
                        <li>
                            <Link to={"/"} href="" className='navItem'>About</Link>
                        </li>
                        <li>
                            <a href=''>Contact Us</a>
                        </li>
                        <li>
                            <img className='logoImage' src={Logo} alt="" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default UserPage
