import React, { useState } from 'react'
import Menu from '../components/Menu'
import "../style/CreateSurvey.scss"
import CreateSurveyComponenet from '../components/CreateSurveyComponenet'
function CreateSurvey() {

  return (
    <div>
      <Menu isLogin={localStorage.getItem("token")? true:false} test={localStorage.getItem("token")? true:null} />
      <CreateSurveyComponenet/>
    </div>
  )
}
export default CreateSurvey