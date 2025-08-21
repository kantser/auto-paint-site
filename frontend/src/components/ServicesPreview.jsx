import React from 'react';
import { Link } from 'react-router-dom';

const ServicesPreview = () => {
  const services = [
    {
      id: 1,
      title: 'Full Car Painting',
      description: 'Complete exterior painting with premium materials',
      icon: '🎨',
    },
    {
      id: 2,
      title: 'Localized Repair',
      description: 'Precise spot repairs and paint matching',
      icon: '🔧',
    },
    {
      id: 3,
      title: 'Body Work',
      description: 'Dent removal and panel straightening',
      icon: '🚗',
    },
  ];

  return (
    <section className="services-preview">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center" style={{ marginTop: '2rem' }}>
          <Link to="/services" className="btn btn--outline">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
