import React, { isValidElement } from 'react'
import MapChart from "../components/MapChart";
import Menu from '../components/Menu';
import { Link } from 'react-router-dom';
import Logo from "../image/logo.png";
import "../style/Map.scss";


function Map(isLogin) {
 
    return (
        <div className='map'>
            <Menu isLogin={localStorage.getItem("token") ? true : false} />
            <MapChart/>
            <div className='notLogin' style={{display : localStorage.getItem("token") ? "none": "block"}}>
                <Link className='answerSee' to={"/login"}> Login to see answers </Link>
            </div>
            <div className="footerMap">
        <div className="footerBorder"></div>
        <div className="footerItem">
          <ul>
            <li>
              <a href="#create" className="linkStyle" to={"/"}>
                Home
              </a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href=""><p style={{marginTop:'30px'}}>Contact Us</p></a>
            </li>
            <li>
              <img className="logoImage" src={Logo} alt="" />
            </li>
          </ul>
        </div>
      </div>
        </div>
    )
}
export default Map
