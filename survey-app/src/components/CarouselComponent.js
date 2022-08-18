import React, { useState } from 'react'
import { Carousel } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
import SurveyCard from './SurveyCard';
function CarouselComponent() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel variant='dark' style={{ width: "100%" }} activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item style={{ width: "100%" }}>
        <div className='card-wrapper'>
          <SurveyCard />
          <SurveyCard />
          <SurveyCard />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className='card-wrapper'>
          <SurveyCard />
          <SurveyCard />
          <SurveyCard />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className='card-wrapper'>
          <SurveyCard />
          <SurveyCard />
          <SurveyCard />
        </div>
      </Carousel.Item>
    </Carousel>
  )
}
export default CarouselComponent