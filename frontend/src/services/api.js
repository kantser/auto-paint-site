// API service for handling admin operations
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Helper function to handle API requests
const apiRequest = async (endpoint, method = 'GET', data = null) => {
  const token = localStorage.getItem('adminToken');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };

  const config = {
    method,
    headers,
    credentials: 'include'
  };

  if (data) {
    if (data instanceof FormData) {
      // Remove the Content-Type header to let the browser set it with the correct boundary
      delete headers['Content-Type'];
      config.body = data;
    } else {
      config.body = JSON.stringify(data);
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong');
    }

    // Handle 204 No Content responses
    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  login: async (credentials) => {
    return apiRequest('/auth/login', 'POST', credentials);
  },
  logout: async () => {
    return apiRequest('/auth/logout', 'POST');
  },
  checkAuth: async () => {
    return apiRequest('/auth/check');
  }
};

// Portfolio API
export const portfolioAPI = {
  getAll: async () => {
    return apiRequest('/portfolio');
  },
  getById: async (id) => {
    return apiRequest(`/portfolio/${id}`);
  },
  create: async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (key === 'image' && data[key]) {
        formData.append('image', data[key]);
      } else if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });
    return apiRequest('/portfolio', 'POST', formData);
  },
  update: async (id, data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (key === 'image' && data[key]) {
        formData.append('image', data[key]);
      } else if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });
    return apiRequest(`/portfolio/${id}`, 'PUT', formData);
  },
  delete: async (id) => {
    return apiRequest(`/portfolio/${id}`, 'DELETE');
  }
};

// Gallery API
export const galleryAPI = {
  getAll: async () => {
    return apiRequest('/gallery');
  },
  getById: async (id) => {
    return apiRequest(`/gallery/${id}`);
  },
  create: async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (key === 'image' && data[key]) {
        formData.append('image', data[key]);
      } else if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });
    return apiRequest('/gallery', 'POST', formData);
  },
  update: async (id, data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (key === 'image' && data[key]) {
        formData.append('image', data[key]);
      } else if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });
    return apiRequest(`/gallery/${id}`, 'PUT', formData);
  },
  delete: async (id) => {
    return apiRequest(`/gallery/${id}`, 'DELETE');
  }
};

// Export all APIs
export default {
  auth: authAPI,
  portfolio: portfolioAPI,
  gallery: galleryAPI
};
