import React, { useEffect, useState } from 'react'
import Menu from '../components/Menu';
import "../style/Home.scss"
import SurveyCard from "../components/SurveyCard"
import "../style/surveyCard.scss"
import Logo from "../image/logo.png"
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';

import "bootstrap/dist/css/bootstrap.css";


function Home() {
  const [value, setValue] = useState('1');
  const [sampleSurvey, setSampleSurvey] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    axios.get('https://survey-api.orangeground-88d990d8.westeurope.azurecontainerapps.io/api/survey/sample', {
      params: {
        "count": 6
      }
    }).then((result) => {
      const sampleSurveyData = []
      if (result.data.data.surveys && result.data.data.surveys.length>0) {
        result.data.data.surveys.map((item) => {
          sampleSurveyData.push(item)
        })
      }
      setSampleSurvey(sampleSurveyData)
      console.log(sampleSurvey)
    })
  }, [])

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
          <Carousel variant='dark' style={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center", marginLeft: "40px" }}>
            <Carousel.Item style={{ display: "flex", flexDirection: "row", marginLeft: "30px" }}>
              {sampleSurvey && sampleSurvey.length > 0 &&
                sampleSurvey.map((item) => {
                  return (
                    <SurveyCard item={item} />
                  )
                })
              }
            </Carousel.Item>
            <Carousel.Item style={{ display: "flex", flexDirection: "row" }}>

            </Carousel.Item>
          </Carousel>
        </div>

        <div className="createSurvey">
          <p className='createSurveyTitle'>Create A Survey</p>
          <Link className=' btn btn-primary createSurveyButton' to={'./createsurvey'}>Click to create</Link>
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
