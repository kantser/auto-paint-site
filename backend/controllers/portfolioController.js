const Portfolio = require('../models/Portfolio');
const { validationResult } = require('express-validator');

// @desc    Get all portfolio items
// @route   GET /api/portfolio
// @access  Public
exports.getPortfolioItems = async (req, res) => {
  try {
    const { category, featured } = req.query;
    const query = {};
    
    if (category) query.category = category;
    if (featured) query.featured = featured === 'true';
    
    const portfolioItems = await Portfolio.find(query).sort({ createdAt: -1 });
    res.json(portfolioItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single portfolio item
// @route   GET /api/portfolio/:id
// @access  Public
exports.getPortfolioItem = async (req, res) => {
  try {
    const portfolioItem = await Portfolio.findById(req.params.id);
    
    if (!portfolioItem) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }
    
    res.json(portfolioItem);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create portfolio item
// @route   POST /api/portfolio
// @access  Private/Admin
exports.createPortfolioItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, category, client, completionDate, featured, tags } = req.body;
    
    // Process uploaded files
    const images = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach((file, index) => {
        images.push({
          url: file.path,
          isMain: index === 0 // First image is main by default
        });
      });
    }

    const newPortfolioItem = new Portfolio({
      title,
      description,
      images,
      category,
      client,
      completionDate: completionDate || Date.now(),
      featured: featured || false,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : []
    });

    const portfolioItem = await newPortfolioItem.save();
    res.status(201).json(portfolioItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update portfolio item
// @route   PUT /api/portfolio/:id
// @access  Private/Admin
exports.updatePortfolioItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, category, client, completionDate, featured, tags } = req.body;
    
    // Process uploaded files if any
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map(file => ({
        url: file.path,
        isMain: false // New images are not main by default
      }));
    }

    const updateFields = {
      title,
      description,
      category,
      client,
      completionDate,
      featured,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : []
    };

    const portfolioItem = await Portfolio.findById(req.params.id);
    
    if (!portfolioItem) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }

    // If no new main image is specified, keep the existing one
    if (req.body.mainImageIndex === undefined) {
      const existingMainImage = portfolioItem.images.find(img => img.isMain);
      if (existingMainImage) {
        images.unshift(existingMainImage);
      } else if (images.length > 0) {
        images[0].isMain = true;
      }
    } else if (req.body.mainImageIndex >= 0 && req.body.mainImageIndex < images.length) {
      // Set the specified image as main
      images[req.body.mainImageIndex].isMain = true;
    }

    // Combine existing images with new ones if needed
    if (req.body.keepExistingImages === 'true') {
      updateFields.images = [...portfolioItem.images, ...images];
    } else {
      updateFields.images = images;
    }

    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );

    res.json(updatedPortfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete portfolio item
// @route   DELETE /api/portfolio/:id
// @access  Private/Admin
exports.deletePortfolioItem = async (req, res) => {
  try {
    const portfolioItem = await Portfolio.findById(req.params.id);

    if (!portfolioItem) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }

    // Here you would typically delete the associated image files
    // For example: await deleteImages(portfolioItem.images);

    await portfolioItem.remove();
    res.json({ message: 'Portfolio item removed' });
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};
