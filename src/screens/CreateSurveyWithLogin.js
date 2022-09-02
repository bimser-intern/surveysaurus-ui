import React, { useEffect, useState } from 'react'
import "../style/CreateSurvey.scss"
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import SignOut from "../image/signOut.png"
import { useLocation } from 'react-router-dom'
import CreateSurveyComponenet from '../components/CreateSurveyComponenet'
import Menu from '../components/Menu';

function CreateSurveyWithLogin() {
  const location=useLocation()
  const [control, setControl] = useState(true);
  const logOut = () => {
    localStorage.removeItem("token")
    localStorage.removeItem('auth')
    navigate("/login")
}
useEffect(()=>{
  console.log(location.state.auth.name)
})

  const navigate = useNavigate();
  return (
    <div>
      <Menu isLogin={true} test="true"/>
      <CreateSurveyComponenet/>
    </div>
  )
}
export default CreateSurveyWithLogin