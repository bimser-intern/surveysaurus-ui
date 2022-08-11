import React, { useState } from 'react'
import Menu from '../components/Menu';
import "../style/Home.css"
import SurveyCard from "../components/surveyCard"
import "../style/surveyCard.css"
import { Link } from 'react-router-dom';
function Home() {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className='Home' id='Home'>
      <Menu />
      <div className='create' id='create'>
        <p className='appTitle'>Surveysaurus</p>
        <button className='createButton'>Create A Survey</button>
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
          <button className='createSurveyButton'>Click to create</button>
        </div>

        <div className='footer'>
          <div className='footerBorder'></div>
          <div className='footerItem'>
            <ul>
              <li>
                <Link className='linkStyle' to={"/"}>Home</Link>
              </li>
              <li>
              <a href='#about'>About</a>

              </li>
              <li>
              <a>Contact Us</a>

              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home
