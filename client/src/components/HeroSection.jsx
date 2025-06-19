import React, { useState, useEffect } from 'react';
import AuthForm from './AuthForm';
import BG1 from '../assets/BG1.jpg';
// import BG2 from '../assets/BG2.jpg'; // ❌ removing this
import BG3 from '../assets/BG3.jpg';
import BG4 from '../assets/BG4.jpg';
import BG5 from '../assets/BG5.jpg';

const images = [BG1, BG3, BG4, BG5]; // ✅ updated array

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="hero-slideshow"
      style={{
        backgroundImage: `url(${images[currentImage]})`,
      }}
    >
      <div className="hero-overlay">
        <AuthForm />
        <div className="scroll-down-indicator">↓</div>
      </div>
    </div>
  );
};

export default HeroSection;
