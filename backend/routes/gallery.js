const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const galleryController = require('../controllers/galleryController');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/gallery/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Only images are allowed (jpeg, jpg, png, webp)'));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// @route   GET /api/gallery
// @desc    Get all gallery items
// @access  Public
router.get('/', galleryController.getGalleryItems);

// @route   GET /api/gallery/:id
// @desc    Get single gallery item
// @access  Public
router.get('/:id', galleryController.getGalleryItem);

// @route   POST /api/gallery
// @desc    Create gallery item
// @access  Private/Admin
router.post(
  '/',
  [
    auth,
    upload.single('image'),
    [
      check('title', 'Title is required').not().isEmpty(),
      check('category', 'Category is required').isIn(['painting', 'repair', 'restoration', 'other'])
    ]
  ],
  galleryController.createGalleryItem
);

// @route   PUT /api/gallery/:id
// @desc    Update gallery item
// @access  Private/Admin
router.put(
  '/:id',
  [
    auth,
    upload.single('image'),
    [
      check('title', 'Title is required').not().isEmpty(),
      check('category', 'Category is required').isIn(['painting', 'repair', 'restoration', 'other'])
    ]
  ],
  galleryController.updateGalleryItem
);

// @route   DELETE /api/gallery/:id
// @desc    Delete gallery item
// @access  Private/Admin
router.delete('/:id', auth, galleryController.deleteGalleryItem);

module.exports = router;
