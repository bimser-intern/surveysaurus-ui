import { fontSize, fontStyle, fontWeight, lineHeight, textAlign } from '@mui/system';
import axios from 'axios';
import { Button } from 'bootstrap';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import SignOut from "../image/signOut.png"
import PlusIcon from "../image/plusIcon.png"
import ListIcon from "../image/list.png"
import "../style/UserPage.scss"
function UserPage() {
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
        axios.get("https://survey-api.orangeground-88d990d8.westeurope.azurecontainerapps.io/api/user/mysurveys", {
            headers: {
                authorization: localStorage.getItem("token"),
            }
        }).then((result) => {
            
            if (result.data.data.surveys && result.data.data.surveys.length>0) {
                const userSurveyData = []
                result.data.data.surveys.map((item)=>{
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
            <div className='Menu'>
                <ul className='navInfo'>
                    <li><Link to={"/"} className='navItem'>Home</Link>
                    </li>
                    <li><a href="" className='navItem'>My Survey</a></li>
                </ul>

                <ul>
                    <li>
                        <button className='signUpButton'>
                            <p className='buttonTextLayout'>{userInfo.length > 0 ? userInfo[0].name : "nklsa"}</p>
                        </button>
                    </li>
                    <li>
                        <div onClick={() => setControl(!control)} className='UserIcon'>
                            <a href=""></a>
                            <div style={{
                                display: control ? "none" : "flex", top: "45px", zIndex: "100", height: "150px", width: "300px",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#E491924D",
                                marginTop: "10px"
                            }} className='openMenu'>
                                <div onClick={() => navigate("/login")} style={{
                                    width: "80%", height: "30px", backgroundColor: "#F5F5F5CC", marginBottom: "10px", display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "10px"
                                }}>
                                    <Link style={{
                                        fontFamily: 'Inter',
                                        fontStyle: "normal",
                                        fontWeight: "700",
                                        fontSize: "13px",
                                        lineHeight: "21px",
                                        textAlign: "center",
                                        color: "#000000",
                                    }} className='menuLink' to={"/userInfo"}>Profile</Link>
                                </div>
                                <div onClick={logOut} style={{
                                    width: "80%", height: "30px", paddingTop: "10px", paddingBottom: "10px", backgroundColor: "#F5F5F5CC",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: "10px"
                                }}>
                                    <Link style={{
                                        color: "#FFFFFF", marginLeft: "5px",
                                        fontFamily: 'Inter',
                                        fontStyle: "normal",
                                        fontWeight: "700",
                                        fontSize: "13px",
                                        lineHeight: "21px",
                                        textAlign: "center",
                                        color: "#000000",

                                    }} className='menuLink' to={"/login"}>Sign Out</Link>
                                    <img style={{ width: "15px", height: "15px", marginLeft: "10px" }} src={SignOut} alt="" />
                                </div>
                            </div>
                        </div>
                    </li>

                </ul>
                <div className="borderMenuBottomLogin"></div>
            </div>

            <div class="container" style={{ marginTop: "100px" }}>
                <div class="row">
                    {userSurvey && userSurvey.length > 0 &&
                        userSurvey.map((result, index) => {
                            console.log("----------------")
                            console.log(userSurvey)
                            return (
                                <div class="col-sm">
                                    <div className='SurveyCard' style={{marginBottom:"10px"}}>
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
                    <div class="col-sm">
                        <div onClick={()=>navigate("/createSurveyWithLogin",{state:{
                            auth:JSON.parse(localStorage.getItem("auth"))
                        }})} className='SurveyCard'>
                            <img src={PlusIcon} alt="" />
                            <h1>Create Survey</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UserPage
