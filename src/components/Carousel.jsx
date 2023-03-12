import React, { useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import './Carousel.css';

const Carousel = ({ subjects }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const responsive = {
    0: { items: 1 },
    600: { items: 2 },
    1024: { items: 3 },
  };

  const handleSlideChanged = (event) => {
    setActiveIndex(event.item);
  };

  return (
    <AliceCarousel
      className="custom-carousel"
      autoPlay
      autoPlayInterval={3000}
      onSlideChanged={handleSlideChanged}
      startIndex={activeIndex}
      responsive={responsive}
      disableDotsControls={true}
      shouldRenderOnSSR={false}
    >
      {subjects.map((subject, index) => (
        <div
          key={subject.id}
          className={`custom-carousel-item carousel-item ${
            activeIndex  === index ? 'active' : ''
          }`}
        >
          <a href={subject.route}>
            <img
              src={subject.imageSrc}
              alt={subject.title}
              className="carousel-subject carousel-subject-image"
            />
          </a>
        </div>
      ))}
    </AliceCarousel>
  );
};

export default Carousel;
