import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import "../style/FillSurvey.scss"
import EmtyCircle from "../image/emptyCircle.png"
import axios from 'axios'
import Menu from '../components/Menu'
import CircleCheck from "../image/circleCheck.svg"
import World from "../image/world.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function FillSurvey() {
  const location = useLocation()
  const [control, setControl] = useState(false)
  const [selected, setSelected] = useState(null)
  useEffect(() => {
    console.log("-------------------------")
    console.log(location.state.surveyInfo);
  })
  const handleDone = () => {
    axios.post(
      'https://survey-api.orangeground-88d990d8.westeurope.azurecontainerapps.io/api/survey/fillSurvey',
      {
        "title": location.state.surveyInfo.title,
        "answer": selected,
      },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    ).then((result) => {
      alert("başarılı")
      console.log(result)
    }).catch((result) => {
      console.log(result)
    })
  }
  return (
    <div className='containerFill'>
      <Menu isLogin={localStorage.getItem("auth") ? true : false} />
      <div className='fillSurvey'>
        <div className='questionPart'>
          <label style={{ marginLeft: "5px" }} htmlFor="">Question</label>
          <div className='optionsStyle'>
            <p className="optionText">{location.state.surveyInfo.question}</p>
          </div>
        </div>
        <div className='optionsPart'>
          <label style={{ marginLeft: "5px" }} htmlFor="">Options</label>
          {location.state.surveyInfo.choices && location.state.surveyInfo.choices.map((item, index) => {
            return (
              <div onClick={() =>setSelected(index)} className='optionsStyle'>
                <img key={index} style={{ marginLeft: "5px", marginBottom: "3px" }} width="15px" height="15px" src={selected === index ? CircleCheck:EmtyCircle} alt="" />
                <p className='optionText'>{item}</p>
              </div>
            )
          })}
        </div>
        <div className='fillSurveyFooter'>
          <button className='mapButton'>
            <img width="60px" height="80px" src={World} alt="" />
            <p className='worldText'>See what the world said</p>
          </button>
          <button onClick={handleDone} className='doneButton'>Done</button>
        </div>

      </div>
    </div>
  )
}
export default FillSurvey
