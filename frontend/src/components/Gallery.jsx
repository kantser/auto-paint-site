import React, { useState, useEffect } from 'react';
import { galleryAPI } from '../services/api';
import { FaSearch, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Gallery.css'; // We'll create this next

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [categories, setCategories] = useState(['all']);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const data = await galleryAPI.getAll();
        setImages(data);
        
        // Extract unique categories
        const uniqueCategories = ['all', ...new Set(data.map(img => img.category))];
        setCategories(uniqueCategories);
        
      } catch (err) {
        console.error('Error fetching gallery images:', err);
        setError('Failed to load gallery. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Filter images based on category and search query
  useEffect(() => {
    let result = [...images];
    
    if (activeCategory !== 'all') {
      result = result.filter(img => img.category === activeCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(img => 
        img.title.toLowerCase().includes(query) || 
        (img.description && img.description.toLowerCase().includes(query))
      );
    }
    
    setFilteredImages(result);
  }, [images, activeCategory, searchQuery]);

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(images.findIndex(img => img.id === image.id));
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % images.length 
      : (currentIndex - 1 + images.length) % images.length;
    
    setSelectedImage(images[newIndex]);
    setCurrentIndex(newIndex);
  };

  if (isLoading) {
    return (
      <section className="gallery-section">
        <div className="container">
          <div className="loading-spinner"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="gallery-section">
        <div className="container">
          <div className="error-message">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="gallery-section">
      <div className="container">
        <div className="section-header">
          <h2>Our Work Gallery</h2>
          <p>Explore our collection of completed projects and transformations</p>
        </div>

        <div className="gallery-controls">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search images..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search" onClick={() => setSearchQuery('')}>
                <FaTimes />
              </button>
            )}
          </div>

          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </button>
            ))}
          </div>
        </div>

        {filteredImages.length > 0 ? (
          <div className="gallery-grid">
            {filteredImages.map((image, index) => (
              <div 
                key={image.id} 
                className="gallery-item"
                onClick={() => openLightbox(image, index)}
              >
                <div className="image-wrapper">
                  <img 
                    src={image.imageUrl || '/placeholder-image.jpg'} 
                    alt={image.title} 
                    loading="lazy"
                  />
                  <div className="image-overlay">
                    <h4>{image.title}</h4>
                    {image.category && (
                      <span className="category-badge">
                        {image.category.split('-').map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>No images found matching your criteria.</p>
          </div>
        )}

        {selectedImage && (
          <div className="lightbox-overlay" onClick={closeLightbox}>
            <div className="lightbox-content" onClick={e => e.stopPropagation()}>
              <button className="close-lightbox" onClick={closeLightbox}>
                <FaTimes />
              </button>
              
              <div className="lightbox-image-container">
                <img 
                  src={selectedImage.imageUrl} 
                  alt={selectedImage.title} 
                  className="lightbox-image"
                />
                
                <button 
                  className="nav-btn prev-btn" 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('prev');
                  }}
                >
                  <FaChevronLeft />
                </button>
                
                <button 
                  className="nav-btn next-btn" 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('next');
                  }}
                >
                  <FaChevronRight />
                </button>
              </div>
              
              <div className="lightbox-caption">
                <h3>{selectedImage.title}</h3>
                {selectedImage.description && (
                  <p>{selectedImage.description}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;