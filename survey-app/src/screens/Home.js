import React, { useEffect, useState } from 'react'
import Menu from '../components/Menu';
import "../style/Home.css"
import SurveyCard from "../components/SurveyCard"
import "../style/surveyCard.css"
import Logo from "../image/logo.png"
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Carousel,CarouselItem} from "react-bootstrap-carousel";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";

function Home() {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className='Home' id='Home'>
      <Menu />
      <div className="borderMenuBottom"></div>
      <div className='create' id='create'>
        <p className='appTitle'>Surveysaurus</p>
        <p className="createSurveysaurus">Create Your Surveysaurus</p>
        <Link to={"/createSurvey"} className='createButton'>Create A Survey</Link>
      </div>
      <div className="about" id='about'>
        <div className='imageAbout'></div>
        <div className='aboutTextContainer'>
          <h3 className='aboutTitle'>About Us</h3>
          <div className='aboutText'></div>
        </div>
      </div>

      <div className="surveySample">
        <div className='surveySampleTitle'>
          <p>Our Sample Surveys</p>
        </div>
        <div className="surveyCardItems" id='survey'>
          
          
          <SurveyCard />
          <SurveyCard />
          <SurveyCard />
          
        </div>

        <div className="createSurvey">
          <p className='createSurveyTitle'>Create A Survey</p>
          <Link  className=' btn btn-primary createSurveyButton'  to={'./createsurvey'}>Click to create</Link>
        </div>

        <div className='footer'>
          <div className='footerBorder'></div>
          <div className='footerItem'>
            <ul>
              <li>
                <a href='#create' className='linkStyle' to={"/"}>Home</a>
              </li>
              <li>
                <a href='#about'>About</a>

              </li>
              <li>
                <a>Contact Us</a>
              </li>
              <li>
                <img className='logoImage' src={Logo} alt="" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home
