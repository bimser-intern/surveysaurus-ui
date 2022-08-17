import React from 'react'
import "../style/surveyCard.scss"
import cardImg from "../style/surveyCardImg.png";
import Carousel from "react-bootstrap-carousel";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";

function SurveyCard() {
  return (
    
        <div className='surveyCardItem'>
        <div className='imageSurveyCard'>
            <img className='image' src={cardImg} alt="" />
        </div>
        <div className=" cardHeader">
            <p className='cardTextStyle'>In which financial markets do you operate?</p>
        </div>
        <div className="cardOptions">
            <ul>
                <li>Stock market</li>
                <li>Foreign exchange</li>
                <li>Commodity</li>
                <li>Bond market</li>
                <li>Cryptocurrency market</li>
            </ul>
        </div>
    </div>
    
  )
}
export default SurveyCard
