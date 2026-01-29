import HeroSlideOne from "../components/HeroSlideOne";
import HeroSlideTwo from "../components/HeroSlideTwo";

/**
 * Hero Carousel Slides Configuration
 * Add new slides by:
 * 1. Creating a new HeroSlide component
 * 2. Importing it here
 * 3. Adding it to the slides array
 * 
 * No changes needed to carousel logic - open/closed principle
 */

export const heroSlides = [
  HeroSlideOne,
  HeroSlideTwo,
  // Future slides:
  // HeroSlideThree,
  // HeroSlideFour,
];
