import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Menu from '../components/Menu';
import BG1 from '../backgroundpng/Slice8.svg';
import Ic1 from '../iconpng/Icon1.svg';
import Silver from '../giftpng/Silver.png';
import Gold from '../giftpng/Gold.png';
import Gold1 from '../giftpng/Gold-1.png';
import Signed from '../giftpng/Signed.png';
import Bronze from '../giftpng/Bronze.png';
import ListIcon from "../image/list.png";
import Logo from "../image/logo.png";
import { Link } from 'react-router-dom';
import "../style/Profile.scss";
import axios from 'axios';


function Profile() {
  window.scrollTo(0, 0)
  const navigate = useNavigate()
  const [control, setControl] = useState(true);
  const [userInfo, setUserInfo] = useState([])
  const [userSurvey, setUserSurvey] = useState([])
  const logOut = () => {
      localStorage.removeItem("token")
      localStorage.removeItem('auth')
      navigate("/login")
  }
  useEffect(() => {
      
      axios.get("http://40.113.137.113/api/user/mysurveys", {
          headers: {
              authorization: localStorage.getItem("token"),
          }
      }).then((result) => {

          if (result.data.data.surveys && result.data.data.surveys.length > 0) {
              const userSurveyData = []
              result.data.data.surveys.map((item) => {
                  console.log(item)
                  userSurveyData.push(item)
              })

              setUserSurvey(userSurveyData);
              console.log("eeeeeeeeeeeeeee");
              console.log(userSurvey)

          }

      })
      if (!localStorage.getItem("token")) {
          navigate("/login")
      }
      else {
          const todos = [...userInfo]
          todos.push(JSON.parse(localStorage.getItem("auth")))

          setUserInfo(todos)

      }
  }, [])

  return (

    <div>
      <Menu isLogin={localStorage.getItem("token") ? true : false} to="/Profile" />

      <div className='bgicon'>
        <img className='BG1' src={BG1} alt='' />
        <div className='dataAndicon'>
          <img className='icon1' src={Ic1} />
          <p className='userName'>
            {
              JSON.parse(localStorage.getItem("auth")).name
            }
          </p>
          <ul style={{
            position: 'absolute',
            color: '#ffffff',
            fontSize: '15px',
            left: '25%',
            top: '300px',

          }}>
            <li><a className='btn' id='point' style={{
              background: '#EDD2D2', width: '106px', height: '30', fontSize: '15px',
              borderRadius: '40px'
            }} href='#'>300 Point </a></li>
            <li><a>Tophies</a></li>
            <li><a>Survey</a></li>
            <li><a>Followers</a></li>
            <li><a>Followers</a></li>
          </ul>

        </div>


      </div>

      <div className='Gifticon'>
        <h1>Trophies</h1>
        <ul id='listgifticon'>
          <li><img src={Gold1} /><p>Baby saurus</p> </li>
          <li><img src={Bronze} /><p>Bronze</p></li>
          <li><img src={Silver} /><p style={{ paddingLeft: '10px' }}>Silver</p></li>
          <li><img src={Gold} /><p style={{ paddingLeft: '10px' }}>Gold</p></li>
          <li>< img style={{ position: 'relative', marginTop: '-30px', top: '10px' }} src={Signed} /><p>Saurus lover</p></li>
        </ul>
      </div>

      <div className='SurveyCardsMini' id='surveyscardmini'>
        <h1 style={{ marginLeft: '10%', marginTop: '330px' }}>Surveys</h1>
        <div class="container" style={{ marginTop: "100px" }}>
          <div class="row">
            {userSurvey && userSurvey.length > 0 &&
              userSurvey.map((result, index) => {
                console.log("----------------")
                console.log(userSurvey)
                return (
                  <div class="col-sm-3">
                    <div onClick={() => navigate("/fillSurvey", { state: { "surveyInfo": result } })} className='SurveyCard' style={{ marginBottom: "10px" }}>
                      <h3>{result.title}</h3>
                      <p className='questionHeaderStyle'>{result.question}</p>
                      <ul className='choicesStyle'>
                        {result.choices.map((item) => {
                          return (
                            <div className='ChoicesListStyle'>
                              <img style={{ width: "15px", height: "15px", marginTop: "2px" }} src={ListIcon} alt="" />
                              <li className='ChoicesItem' style={{ paddingLeft: "10px" }}>{item}</li>
                            </div>
                          )
                        })}
                      </ul>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>

      </div>

      <div className='footerProfile'>
                <div className='footerBorder'></div>
                <div className='footerItem'>
                    <ul>
                        <li>
                            <Link to={"/"} className='navItem'>Home</Link>
                        </li>
                        <li>
                            <Link to={"/"} href="" className='navItem'>About</Link>
                        </li>
                        <li>
                            <a href=''><p style={{marginTop:'30px'}}>Contact Us</p></a>
                        </li>
                        <li>
                            <img className='logoImage' src={Logo} alt="" />
                        </li>
                    </ul>
                </div>
            </div>

    </div>
  )
}
export default Profile
//rafc