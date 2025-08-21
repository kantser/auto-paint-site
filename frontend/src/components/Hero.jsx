import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/hero-image.jpg'; // Make sure to add your hero image to the assets folder

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero__content">
          <h1 className="hero__title">Body repair Let's restore the shape of your car</h1>
          <p className="hero__subtitle">Professional body repair for a flawless appearance</p>
          <p className="hero__description">
            We restore cars after accidents and perform local and full painting.
            We use modern equipment and high-quality materials.
          </p>
          <Link to="/contact" className="btn btn--primary btn--lg hero__cta">
            Get a consultation
          </Link>
        </div>
        <div className="hero__image">
          <img 
            src={heroImage} 
            alt="Professional car painting services" 
            className="hero__img"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;