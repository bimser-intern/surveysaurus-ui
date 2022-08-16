import React from 'react'
import MySurveyCard from "../components/mysurveyCard"
import Vektor from "../image/Vector2.png"
import cardImg from "../style/surveyCardImg.png";
import Logo from "../image/logo.png"
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Grid, Item } from 'react-grid-system';


function UserPage() {
  const navigate = useNavigate();
  const [control, setControl] = useState(true);
  const [controlVisible, setControlVisible] = useState(true);

  return (
    <div>
      <div className="mysurveyCardItems" id='survey'>

        <Container>
          <Row>
            <Col sm={4}>
              <MySurveyCard
                img={cardImg}
                title="What resources have you used or are you using for your training?"
                description="Books and articles"
                description2="YouTube tutorial videos"
                description3="Online or face to face courses "
                description4="Experience with little investment"
                description5="Udemy"
              />
            </Col>
            <Col sm={4}>
              <MySurveyCard
                img={cardImg}
                title="What resources have you used or are you using for your training?"
                description="Books and articles"
                description2="YouTube tutorial videos"
                description3="Online or face to face courses "
                description4="Experience with little investment"
                description5="Udemy"
              />
            </Col>
            <Col sm={4}>
              <MySurveyCard
                img={cardImg}
                title="What resources have you used or are you using for your training?"
                description="Books and articles"
                description2="YouTube tutorial videos"
                description3="Online or face to face courses "
                description4="Experience with little investment"
                description5="Udemy"
              />
            </Col>
            <Col sm={4}>
              <div className='mycard'>
                <div className='mycardbody'>
                  <a href='/createsurvey'><img className='myimg' src={Vektor} /></a>
                  <div className='myabout'>
                    <a href="/createsurvey" className='cardTitle2'><h4>Create a new survey</h4></a>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        <div className='footer'>
          <div className='footerBorder'></div>
          <div className='footerItem'>
            <ul>
              <li>
                <Link to={"/"}>Home
                </Link>
              </li>
              <li>
                <Link to={"/"}>About
                </Link>
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
export default UserPage
