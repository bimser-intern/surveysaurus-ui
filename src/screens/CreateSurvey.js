import React, { useState } from 'react'
import Menu from '../components/Menu'
import "../style/CreateSurvey.scss"
import CreateSurveyComponent from '../components/CreateSurveyComponenet'
function CreateSurvey() {

  return (
    <div>
      <Menu isLogin={false}/>
      <CreateSurveyComponent/>
    </div>
  )
}
export default CreateSurvey