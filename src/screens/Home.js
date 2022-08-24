import React, { useEffect, useState } from 'react'
import Menu from '../components/Menu';
import "../style/Home.scss"
import SurveyCard from "../components/SurveyCard"
import "../style/surveyCard.scss"
import Logo from "../image/logo.png"
import Side from "../image/side.png"
import { Link } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.css";


function Home() {
  const [value, setValue] = useState('1');
  const [sampleSurvey, setSampleSurvey] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };
  useEffect(() => {
    axios.get('https://survey-api.orangeground-88d990d8.westeurope.azurecontainerapps.io/api/survey/sample', {
      params: {
        "count": 6
      }
    }).then((result) => {
      const sampleSurveyData = []
      if (result.data.data.surveys && result.data.data.surveys.length > 0) {
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
      <img id="side" src={Side}/>
      <div className="borderMenuBottom"></div>
      <div className='create' id='create'>
        <p className='appTitle' id="appTitle">Surveysaurus</p>
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

      <div className="surveySample" id='survey'>
        <div className='surveySampleTitle'>
          <p>Our Sample Surveys</p>
        </div>
        <div className="surveyCardItems">
          <Slider {...settings} style={{ width: "80%", marginLeft: "50px"}}>
            {sampleSurvey && sampleSurvey.length > 0 &&
              sampleSurvey.map((item) => {
                return (
                  <SurveyCard item={item}/>
                )
              })
            }
          </Slider>
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
                <a href=''>Contact Us</a>
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
