const Gallery = require('../models/Gallery');
const { validationResult } = require('express-validator');

// @desc    Get all gallery items
// @route   GET /api/gallery
// @access  Public
exports.getGalleryItems = async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    
    const galleryItems = await Gallery.find(query).sort({ createdAt: -1 });
    res.json(galleryItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single gallery item
// @route   GET /api/gallery/:id
// @access  Public
exports.getGalleryItem = async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);
    
    if (!galleryItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    
    res.json(galleryItem);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create gallery item
// @route   POST /api/gallery
// @access  Private/Admin
exports.createGalleryItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, category, isFeatured } = req.body;
    const imageUrl = req.file ? req.file.path : '';

    const newGalleryItem = new Gallery({
      title,
      description,
      imageUrl,
      category,
      isFeatured: isFeatured || false
    });

    const galleryItem = await newGalleryItem.save();
    res.status(201).json(galleryItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update gallery item
// @route   PUT /api/gallery/:id
// @access  Private/Admin
exports.updateGalleryItem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, category, isFeatured } = req.body;
    const updateFields = { title, description, category, isFeatured };

    // If there's a new image, update the imageUrl
    if (req.file) {
      updateFields.imageUrl = req.file.path;
    }

    const galleryItem = await Gallery.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );

    if (!galleryItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    res.json(galleryItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete gallery item
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
exports.deleteGalleryItem = async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);

    if (!galleryItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    // Here you would typically delete the image file from storage
    // For example: await deleteImage(galleryItem.imageUrl);

    await galleryItem.remove();
    res.json({ message: 'Gallery item removed' });
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};
