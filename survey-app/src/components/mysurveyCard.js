import React from 'react'
import "../style/mysurveyCard.css"

export default function mysurveyCard(props){
  return (
    <div className='mycard'>
        <div className='mycardbody'>
            <img className="myimg" src={props.img} />
            <a href='/createsurvey'><img className='myimg2' src={props.img2} /></a>
            <div className='myabout'>
                <h4 className='mycardTitle'>{props.title}</h4>
                <h4><a href="/createsurvey" className='cardTitle2'>{props.title2}</a></h4>
                <ul>               
                  <li>
                  <p className='cardDescription'>{props.description}</p>
                  </li>
                  <li>
                  <p className='cardDescription2'>{props.description2}</p>
                  </li>
                  <li>
                  <p className='cardDescription3'>{props.description3}</p>
                  </li>
                  <li>
                  <p className='cardDescription4'>{props.description4}</p>
                  </li>
                  <li>
                  <p className='cardDescription5'>{props.description5}</p>
                  </li>                   
                </ul>
            </div>
        </div>
    </div>

    
  )
}
