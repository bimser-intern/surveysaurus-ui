import React, { useEffect, useState } from 'react'
import proxy from '../../package.json';
import { useNavigate } from 'react-router-dom'
import Menu from '../components/Menu';
import BG1 from '../backgroundpng/Slice1.svg';
import BG2 from '../backgroundpng/Slice2.svg';
import BG3 from '../backgroundpng/Slice3.svg';
import BG4 from '../backgroundpng/Slice4.svg';
import BG5 from '../backgroundpng/Slice5.svg';
import BG6 from '../backgroundpng/Slice6.svg';
import BG8 from '../backgroundpng/Slice8.svg';
import Ic1 from '../iconpng/bird.svg';
import Ic2 from '../iconpng/porky.svg';
import Ic3 from '../iconpng/fox.svg';
import Ic4 from '../iconpng/donkey.svg';
import Ic5 from '../iconpng/dog.svg';
import Ic6 from '../iconpng/owl.svg';
import Ic7 from '../iconpng/polar.svg';
import Ic8 from '../iconpng/bee.svg';
import Ic9 from '../iconpng/koala.svg';
import Ic10 from '../iconpng/jackal.svg';
import Ic11 from '../iconpng/bear.svg';
import Ic12 from '../iconpng/rabbit.svg';
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
import updateicon from "../image/iconUpdate.png";
import updateBg from "../image/iconUpdate.png";



 function Profile() {

  // function Trophies(){
  //   const trop=document.getElementById('listgifticon').children.length;
  //   console.log('çalıştı');
  //   return trop;
  // }
  window.scrollTo(0, 0)
  const navigate = useNavigate()
  const [controlicon, setControlicon] = useState(true);
  const [controlbg, setControlBg] = useState(true);
  const [Trophies, setTrophies] = useState(1);
  const [userInfo, setUserInfo] = useState([])
  const [userSurvey, setUserSurvey] = useState([])
  const [iconUpdate, seticonUpdate] = useState('')
  const [iconUpdate1, seticonUpdate1] = useState(Ic7)

  const [BgUpdate, setBgUpdate] = useState(BG8)
  const [str, setStr]=useState('')
  const logOut = () => {
    localStorage.removeItem("token")
    localStorage.removeItem('auth')
    navigate("/login")
  }
  const geticoninfo= async ()=>{

   await axios.get('/api/profile/getinfo', {
      headers: {
        authorization: localStorage.getItem('token')
      }
    }).then((result)=>{
      console.log(result)
      if (result.status) {

        console.log(result.data.data.icon)
        if(result.data.data.icon==='bear'){
          console.log('çalıştı: 75')
        }else{
          console.log('çalışmadı :77')
        }
        switch (result.data.data.icon) {
          case 'bird':
            seticonUpdate(Ic1)
            break;
          case 'porky':
            seticonUpdate(Ic2)
            break;
          case 'fox':
            seticonUpdate(Ic3)
            break;
          case 'donkey':
            seticonUpdate(Ic4)
            break;
          case 'dog':
            seticonUpdate(Ic5)
            break;
          case 'owl':
            seticonUpdate(Ic6)
            break;
          case 'polar':
           seticonUpdate(Ic7);
            break;
          case 'bee':
            seticonUpdate(Ic8)
            break;
          case 'koala':
            seticonUpdate(Ic9);
            break;
          case 'jackal':
            seticonUpdate(Ic10)
            break;
          case 'bear':
            seticonUpdate(Ic11);
            break;
          case 'rabbit':
            seticonUpdate(Ic12)
            break;
          default:
            seticonUpdate(Ic7)
  
  
        }
  
      }
    })
   return ;
  }

  const changeIcon = async (iconUpdate,str) => {

    

    console.log(iconUpdate);
    
    console.log(str);
    await axios.put('/api/profile/updateicon',
      {
        icon: str,
      }, 
      {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    },
    console.log('geçti')
    ).then((result)=>{
      console.log(result);
      if(result.status){
        switch (iconUpdate) {
          case Ic1:
            setStr('bird')
            break;
          case Ic2:
            setStr('porky')
            break;
          case Ic3:
            setStr('fox');
            break;
          case Ic4:
            setStr('donkey');
            break;
          case Ic5:
            setStr('dog');
            break;
          case Ic6:
            setStr('owl');
            break;
          case Ic7:
            setStr('polar');
            break;
          case Ic8:
            str = 'bee';
            break;
          case Ic9:
            setStr('koala');
            break;
          case Ic10:
            setStr('jackal');
            break;
          case Ic11:
            setStr('bear');
            break;
          case Ic12:
            setStr('rabbit');
            break;
          default:
            setStr( 'polar');
    
        }
      }
    })
        
          
        


      







  }

  useEffect(() => {

      

    if (JSON.parse(localStorage.getItem('auth')).point) {




      if (JSON.parse(localStorage.getItem('auth')).point > 3000) {
        setTrophies(Trophies + 3);

      }
      else if (JSON.parse(localStorage.getItem('auth')).point > 1500) {


        setTrophies(Trophies + 2);


      }

      else if (JSON.parse(localStorage.getItem('auth')).point > 500) {

        setTrophies(Trophies + 1);

      }


    }
    // if(userSurvey.length>9){

    //   setTrophies(Trophies+1)
    // }


    axios.get("/api/user/mysurveys", {
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
        <img className='BG1' src={BgUpdate} alt='' />
        <div className='dataAndicon'>
          <img className='icon1' src={str===''?Ic7 : geticoninfo()} />
          <div>
            <img onClick={() => setControlicon(!controlicon)} id='iconUpd' className='iconupdate' src={updateicon} />
            <div onClick={() => setControlicon(!controlicon)}>
              <a href=""></a>
              <div style={{
                display: controlicon ? "none" : "flex", top: "335px", zIndex: "100", height: "150px", width: "250px",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ffffff",
              }} className='openupdateicon' >
                <div className='profileContainer'>

                  <img id='icu1'
                    onClick={() => {
                      seticonUpdate(document.getElementById('icu1').getAttribute('src'));
                      changeIcon(Ic1);
                    }}
                    className='selecticon' style={{ width: '25%' }} src={Ic1} />
                  <img id='icu2' onClick={() => {
                    seticonUpdate(document.getElementById('icu2').getAttribute('src'));
                    changeIcon(Ic2);
                  }}
                    className='selecticon' style={{ width: '25%' }} src={Ic2} />
                  <img id='icu3' onClick={() => {
                    seticonUpdate(document.getElementById('icu3').getAttribute('src'));
                    changeIcon(Ic3);
                  }}
                    className='selecticon' style={{ width: '25%' }} src={Ic3} />
                  <img id='icu4' onClick={() => {
                    seticonUpdate(document.getElementById('icu4').getAttribute('src'));
                    changeIcon(Ic4);
                  }}
                    className='selecticon' style={{ width: '25%' }} src={Ic4} />
                  <img id='icu5' onClick={() => {
                    seticonUpdate(document.getElementById('icu5').getAttribute('src'));
                    changeIcon(Ic5);
                  }}
                    className='selecticon' style={{ width: '25%' }} src={Ic5} />
                  <img id='icu6' onClick={() => {
                    seticonUpdate(document.getElementById('icu6').getAttribute('src'));
                    changeIcon(Ic6);
                  }}
                    className='selecticon' style={{ width: '25%' }} src={Ic6} />
                  <img id='icu7' onClick={() => {
                    seticonUpdate(document.getElementById('icu7').getAttribute('src'));
                    changeIcon(Ic7);
                  }}
                    className='selecticon' style={{ width: '25%' }} src={Ic7} />
                  <img id='icu8' onClick={() => {
                    seticonUpdate(document.getElementById('icu8').getAttribute('src'));
                    changeIcon(Ic8);
                  }}
                    className='selecticon' style={{ width: '25%' }} src={Ic8} />
                  <img id='icu9' onClick={() => {
                    seticonUpdate(document.getElementById('icu9').getAttribute('src'));
                    changeIcon(Ic9);
                  }}
                    className='selecticon' style={{ width: '25%' }} src={Ic9} />
                  <img id='icu10' onClick={() => {
                    seticonUpdate(document.getElementById('icu10').getAttribute('src'));
                    changeIcon(Ic10);
                  }}
                    className='selecticon' style={{ width: '25%' }} src={Ic10} />
                  <img id='icu11' onClick={() => {
                    seticonUpdate(document.getElementById('icu11').getAttribute('src'));
                    changeIcon(Ic11,'bear');
                  }}
                    className='selecticon' style={{ width: '25%' }} src={Ic11} />
                  <img id='icu12' onClick={() => {
                    seticonUpdate(document.getElementById('icu12').getAttribute('src'));
                    changeIcon(Ic12,'rabbit');
                  }}
                    className='selecticon' style={{ width: '25%' }} src={Ic12} />

                </div>
              </div>
            </div>

          </div>
          <div>
            <img onClick={() => setControlBg(!controlbg)} className='bgupdate' src={updateBg} />
            <div onClick={() => setControlBg(!controlbg)}>
              <a href=""></a>
              <div style={{
                display: controlbg ? "none" : "flex", top: "220px", zIndex: "100", height: "740px", width: "600px",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ffffff",
              }} className='openupdatebg' >
                <div className='profileContainer'>

                  <img id='BG1'
                    onClick={() => { setBgUpdate(document.getElementById('BG1').getAttribute('src')) }}
                    className='selectBg' style={{ width: '24%' }} src={BG1} />
                  <img id='BG2'
                    onClick={() => { setBgUpdate(document.getElementById('BG2').getAttribute('src')) }}
                    className='selectBg' style={{ width: '24%' }} src={BG2} />
                  <img id='BG3'
                    onClick={() => { setBgUpdate(document.getElementById('BG3').getAttribute('src')) }}
                    className='selectBg' style={{ width: '24%' }} src={BG3} />
                  <img id='BG4'
                    onClick={() => { setBgUpdate(document.getElementById('BG4').getAttribute('src')) }}
                    className='selectBg' style={{ width: '24%' }} src={BG4} />
                  <img id='BG5'
                    onClick={() => { setBgUpdate(document.getElementById('BG5').getAttribute('src')) }}
                    className='selectBg' style={{ width: '24%' }} src={BG5} />
                  <img id='BG6'
                    onClick={() => { setBgUpdate(document.getElementById('BG6').getAttribute('src')) }}
                    className='selectBg' style={{ width: '24%' }} src={BG6} />
                  <img id='BG8'
                    onClick={() => { setBgUpdate(document.getElementById('BG8').getAttribute('src')) }}
                    className='selectBg' style={{ width: '24%' }} src={BG8} />

                </div>
              </div>
            </div>

          </div>



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
            }} href='#'>{JSON.parse(localStorage.getItem("auth")).point} Point </a></li>
            <li><a> {userSurvey.length > 9 ? Trophies + 1 : Trophies} Trophies</a></li>
            <li><a> {userSurvey.length} Survey</a></li>
            <li><a> Followers</a></li>
            <li><a> Followers</a></li>
          </ul>

        </div>


      </div>

      <div className='Gifticon'>
        <h1>Trophies</h1>
        <ul id='listgifticon'>
          <li><img src={Gold1} /><p id='p1'>Baby saurus</p></li>
          <li style={{ display: JSON.parse(localStorage.getItem('auth')).point > 500 ? "block" : "none" }}><img src={Bronze} /><p>Bronze</p></li>
          <li style={{ display: JSON.parse(localStorage.getItem('auth')).point > 1500 ? "block" : "none" }}><img src={Silver} /><p style={{ paddingLeft: '10px' }}>Silver</p></li>
          <li style={{ display: JSON.parse(localStorage.getItem('auth')).point > 3000 ? "block" : "none" }}><img src={Gold} /><p style={{ paddingLeft: '10px' }}>Gold</p></li>
          <li style={{ display: userSurvey.length >= 10 ? "block" : "none" }}><img style={{ position: 'relative', marginTop: '-30px', top: '10px' }} src={Signed} /><p>Saurus lover</p></li>
        </ul>
      </div>

      <div className='SurveyCardsMini' id='surveyscardmini'>
        <h1 style={{ marginLeft: '10%', marginTop: '330px' }}>Surveys</h1>
        <div class="container" style={{ marginTop: "100px" }}>
          <div class="row">
            {userSurvey && userSurvey.length > 0 &&
              userSurvey.map((result, index) => {
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
              <a href=''><p style={{ marginTop: '30px' }}>Contact Us</p></a>
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