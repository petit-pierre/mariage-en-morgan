import "./slider.css";
import ArrowLeft from "../../assets/arrowLeft.png";
import ArrowRight from "../../assets/arrowRight.png";
import { useState } from "react";
import { CarouselItem } from "./CarouselItem";
import house from "../../assets/slider.json";

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const previousPicture = () => {
    const index = currentIndex;
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? house.pictures.length - 1 : index - 1;
    setCurrentIndex(newIndex);
  };

  const nextPicture = () => {
    const index = currentIndex;
    const isLastSlide = currentIndex === house.pictures.length - 1;
    const newIndex = isLastSlide ? 0 : index + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="sliderContainer">
      <div
        className="inner"
        style={{ transform: `translate(-${currentIndex * 100}%)` }}
      >
        {house.pictures.map((item) => {
          return <CarouselItem key={`${item}`} item={item} width={"100%"} />;
        })}
      </div>
      {house.pictures.length > 1 ? (
        <div>
          <img
            className="arrowLeft"
            src={ArrowLeft}
            alt="fleche vers la gauche"
            onClick={previousPicture}
          ></img>
          <img
            className="arrowRight"
            src={ArrowRight}
            alt="fleche vers la droite"
            onClick={nextPicture}
          ></img>
          <p className="counter">
            {currentIndex + 1}/{house.pictures.length}
          </p>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default Slider;
