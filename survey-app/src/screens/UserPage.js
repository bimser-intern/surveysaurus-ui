import { fontSize, fontStyle, fontWeight, lineHeight, textAlign } from '@mui/system';
import { Button } from 'bootstrap';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import SignOut from "../image/signOut.png"
function UserPage() {
    const navigate = useNavigate()
    const [control, setControl] = useState(true);
    const [userInfo, setUserInfo] = useState([])
    const logOut = () => {
        localStorage.removeItem("token")
        localStorage.removeItem('auth')
        navigate("/login")
    }
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login")
        }
        else {
            const todos = [...userInfo]
            todos.push(JSON.parse(localStorage.getItem("auth")))
            //object.push(JSON.parse(localStorage.getItem("auth")))
            //console.log(object)
            setUserInfo(todos)
            //setUserInfo(...userInfo,JSON.parse(localStorage.getItem("auth")))
            //console.log(todos)
            console.log(userInfo)
            //console.log(JSON.parse(localStorage.getItem("auth")))
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
                                    borderRadius:"10px"
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
                                    <img style={{width:"15px",height:"15px",marginLeft:"10px"}} src={SignOut} alt="" />
                                </div>
                            </div>
                        </div>
                    </li>

                </ul>
                <div className="borderMenuBottomLogin"></div>
            </div>
        </div>
    )
}
export default UserPage
