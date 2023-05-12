import React, { useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import './Carousel.css';

const Carousel = ({ subjects }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const responsive = {
    0: { items: 1 },
    600: { items: 1 },
    1024: { items: 1 },
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
      {subjects.map((subject) => (
        <div key={subject.id} className="custom-carousel-item">
          <a href={subject.route}>
            <img
              src={subject.imageSrc}
              alt={subject.title}
              className="carousel-subject"
            />
          </a>
        </div>
      ))}
    </AliceCarousel>
  );
};

export default Carousel;
