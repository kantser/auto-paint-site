import React, { useState, useEffect, useContext } from 'react';
import { FaSignOutAlt, FaEdit, FaTrash, FaImage, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import { portfolioAPI, galleryAPI } from '../services/api';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('portfolio');
  const { onLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [portfolioItems, setPortfolioItems] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    id: null,
    title: '',
    category: '',
    description: '',
    image: null,
    preview: ''
  });

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: file,
          preview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Fetch data on component mount and when activeTab changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        if (activeTab === 'portfolio') {
          const data = await portfolioAPI.getAll();
          setPortfolioItems(data);
        } else {
          const data = await galleryAPI.getAll();
          setGalleryItems(data);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      
      if (activeTab === 'portfolio') {
        if (formData.id) {
          // Update existing portfolio item
          const updatedItem = await portfolioAPI.update(formData.id, formData);
          setPortfolioItems(portfolioItems.map(item => 
            item.id === formData.id ? updatedItem : item
          ));
        } else {
          // Create new portfolio item
          const newItem = await portfolioAPI.create(formData);
          setPortfolioItems([...portfolioItems, newItem]);
        }
      } else {
        if (formData.id) {
          // Update existing gallery item
          const updatedItem = await galleryAPI.update(formData.id, formData);
          setGalleryItems(galleryItems.map(item => 
            item.id === formData.id ? updatedItem : item
          ));
        } else {
          // Create new gallery item
          const newItem = await galleryAPI.create(formData);
          setGalleryItems([...galleryItems, newItem]);
        }
      }
      
      resetForm();
    } catch (err) {
      console.error('Error saving data:', err);
      setError('Failed to save. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const editItem = (item) => {
    setFormData({ ...item, preview: item.image });
  };

  const deleteItem = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        setIsLoading(true);
        
        if (activeTab === 'portfolio') {
          await portfolioAPI.delete(id);
          setPortfolioItems(portfolioItems.filter(item => item.id !== id));
        } else {
          await galleryAPI.delete(id);
          setGalleryItems(galleryItems.filter(item => item.id !== id));
        }
      } catch (err) {
        console.error('Error deleting item:', err);
        setError('Failed to delete item. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      title: '',
      category: '',
      description: '',
      image: null,
      preview: ''
    });
  };


  return (
    <div className="admin-panel">
      <header className="admin-header">
        <div className="container">
          <h2>Admin Dashboard</h2>
          <button onClick={handleLogout} className="btn btn--outline" disabled={isLoading}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </header>
      
      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)} className="btn btn--text">×</button>
        </div>
      )}
      
      {isLoading && !error && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}

      <div className="admin-content">
        <div className="container">
          <div className="admin-tabs">
            <button
              className={`admin-tab ${activeTab === 'portfolio' ? 'active' : ''}`}
              onClick={() => setActiveTab('portfolio')}
            >
              Portfolio
            </button>
            <button
              className={`admin-tab ${activeTab === 'gallery' ? 'active' : ''}`}
              onClick={() => setActiveTab('gallery')}
            >
              Gallery
            </button>
          </div>

          <div className="admin-form">
            <h3>{formData.id ? 'Edit Item' : 'Add New Item'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Title"
                  required
                />
              </div>
              
              <div className="form-group">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Category</option>
                  {activeTab === 'portfolio' ? (
                    <>
                      <option value="painting">Painting</option>
                      <option value="repair">Repair</option>
                      <option value="restoration">Restoration</option>
                    </>
                  ) : (
                    <>
                      <option value="before-after">Before & After</option>
                      <option value="workshop">Workshop</option>
                      <option value="process">Process</option>
                    </>
                  )}
                </select>
              </div>

              {activeTab === 'portfolio' && (
                <div className="form-group">
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                    rows="3"
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label className="file-upload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required={!formData.preview}
                  />
                  <span className="file-upload__label">
                    <FaImage /> {formData.preview ? 'Change Image' : 'Upload Image'}
                  </span>
                </label>
                {formData.preview && (
                  <div className="image-preview">
                    <img src={formData.preview} alt="Preview" />
                    <button
                      type="button"
                      className="btn btn--text"
                      onClick={() => setFormData(prev => ({ ...prev, preview: '', image: null }))}
                    >
                      <FaTimes /> Remove
                    </button>
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn--primary">
                  <FaSave /> {formData.id ? 'Update' : 'Save'}
                </button>
                {formData.id && (
                  <button
                    type="button"
                    className="btn btn--text"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="admin-list">
            <h3>Manage {activeTab === 'portfolio' ? 'Portfolio' : 'Gallery'}</h3>
            <div className="admin-items">
              {activeTab === 'portfolio' ? (
                portfolioItems.map(item => (
                  <div key={item.id} className="admin-item">
                    <div className="admin-item__info">
                      <h4>{item.title}</h4>
                      <span className="badge">{item.category}</span>
                    </div>
                    <div className="admin-item__actions">
                      <button
                        className="btn btn--icon"
                        onClick={() => editItem(item)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn btn--icon btn--danger"
                        onClick={() => deleteItem(item.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                galleryItems.map(item => (
                  <div key={item.id} className="admin-item">
                    <div className="admin-item__info">
                      <h4>{item.title}</h4>
                      <span className="badge">{item.category}</span>
                    </div>
                    <div className="admin-item__actions">
                      <button
                        className="btn btn--icon"
                        onClick={() => editItem(item)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn btn--icon btn--danger"
                        onClick={() => deleteItem(item.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;