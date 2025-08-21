import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { portfolioAPI } from '../services/api';
import { FaArrowRight, FaTools, FaCarCrash, FaSprayCan, FaSearch } from 'react-icons/fa';
import './PastWorks.css';

const PastWorks = () => {
  const [works, setWorks] = useState([]);
  const [filteredWorks, setFilteredWorks] = useState([]);
  const [categories, setCategories] = useState(['all']);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch portfolio items on component mount
  useEffect(() => {
    const fetchWorks = async () => {
      try {
        setIsLoading(true);
        const data = await portfolioAPI.getAll();
        setWorks(data);
        setFilteredWorks(data);
        
        // Extract unique categories
        const uniqueCategories = ['all', ...new Set(data.map(work => work.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error('Error fetching portfolio items:', err);
        setError('Failed to load portfolio items. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorks();
  }, []);

  // Filter works based on category
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredWorks(works);
    } else {
      setFilteredWorks(works.filter(work => work.category === activeCategory));
    }
  }, [activeCategory, works]);

  // Get icon based on category
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'painting':
        return <FaSprayCan className="category-icon" />;
      case 'repair':
        return <FaTools className="category-icon" />;
      case 'restoration':
        return <FaCarCrash className="category-icon" />;
      default:
        return <FaTools className="category-icon" />;
    }
  };

  if (isLoading) {
    return (
      <section className="past-works">
        <div className="container">
          <div className="loading-spinner"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="past-works">
        <div className="container">
          <div className="error-message">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section id="works" className="past-works">
      <div className="container">
        <div className="section-header">
          <h2>Our Past Works</h2>
          <p>Explore our portfolio of completed projects and transformations</p>
        </div>

        {categories.length > 1 && (
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {getCategoryIcon(category)}
                <span>{category.split('-').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}</span>
              </button>
            ))}
          </div>
        )}

        <div className="works-grid">
          {filteredWorks.length > 0 ? (
            filteredWorks.map(work => (
              <div key={work.id} className="work-card">
                <div className="work-card__image">
                  <img 
                    src={work.imageUrl || '/placeholder-work.jpg'} 
                    alt={work.title} 
                    loading="lazy"
                  />
                  <div className="work-card__overlay">
                    <Link to={`/works/${work.id}`} className="btn btn--outline">
                      View Details <FaArrowRight />
                    </Link>
                  </div>
                </div>
                <div className="work-card__content">
                  <h3>{work.title}</h3>
                  <p className="work-card__category">
                    <span className="category-badge">
                      {work.category.split('-').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </span>
                  </p>
                  {work.description && (
                    <p className="work-card__description">
                      {work.description.length > 100 
                        ? `${work.description.substring(0, 100)}...` 
                        : work.description}
                    </p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="no-works">
              <FaSearch className="no-works__icon" />
              <p>No works found in this category.</p>
            </div>
          )}
        </div>

        <div className="works-cta">
          <p>Want to see more of our work or discuss your project?</p>
          <Link to="/contact" className="btn btn--primary">
            Contact Us Today
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PastWorks;