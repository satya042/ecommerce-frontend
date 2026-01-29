import React, { useState, useEffect } from "react";
import styles from "../styles/HeroCarousel.module.css";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const HeroCarousel = ({ slides, autoPlay = true, autoPlayInterval = 5000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (!slides || slides.length === 0) {
    return <div className={styles.carousel_empty}>No slides available</div>;
  }

  return (
    <div className={styles.carousel_container}>
      {/* Slides Wrapper */}
      <div className={styles.carousel_slides}>
        {slides.map((Slide, index) => (
          <div
            key={index}
            className={`${styles.carousel_slide} ${
              index === currentSlide ? styles.active : ""
            }`}
          >
            <Slide />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            className={`${styles.carousel_arrow} ${styles.carousel_arrow_left}`}
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <HiChevronLeft size={24} />
          </button>
          <button
            className={`${styles.carousel_arrow} ${styles.carousel_arrow_right}`}
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <HiChevronRight size={24} />
          </button>
        </>
      )}

      {/* Pagination Dots */}
      {slides.length > 1 && (
        <div className={styles.carousel_dots}>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${
                index === currentSlide ? styles.dot_active : ""
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroCarousel;
