import React from 'react'
import "../style/surveyCard.scss"
import cardImg from "../style/surveyCardImg.png";
import { useNavigate } from 'react-router-dom';
function SurveyCard({item}) {
    const navigate=useNavigate()
  return (
    
        <div onClick={()=>navigate("/fillSurvey",{state:{"surveyInfo":item}})} className='surveyCardItem'>
        <div className='imageSurveyCard'>
            <img className='image' src={cardImg} alt="" />
        </div>
        <div className=" cardHeader">
            <p className='cardTextStyle'>{item.question}</p>
        </div>
        <div className="cardOptions">
            <ul>
                {item.choices.map((surveyItem)=>{
                    return(
                        <li>{surveyItem}</li>
                    )
                })}
            </ul>
        </div>
    </div>
    
  )
}
export default SurveyCard
