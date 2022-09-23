import React, { useEffect, useState } from 'react'
import "../style/CreateSurvey.scss"
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import CreateSurveyComponenet from '../components/CreateSurveyComponenet'
import Menu from '../components/Menu';

function CreateSurveyWithLogin() {
  const location=useLocation()
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