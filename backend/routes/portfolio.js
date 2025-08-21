const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const portfolioController = require('../controllers/portfolioController');

// Configure multer for multiple file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/portfolio/');
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
  limits: { 
    fileSize: 5 * 1024 * 1024, // 5MB limit per file
    files: 10 // Max 10 files per upload
  }
});

// @route   GET /api/portfolio
// @desc    Get all portfolio items
// @access  Public
router.get('/', portfolioController.getPortfolioItems);

// @route   GET /api/portfolio/:id
// @desc    Get single portfolio item
// @access  Public
router.get('/:id', portfolioController.getPortfolioItem);

// @route   POST /api/portfolio
// @desc    Create portfolio item
// @access  Private/Admin
router.post(
  '/',
  [
    auth,
    upload.array('images', 10), // Max 10 files
    [
      check('title', 'Title is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('category', 'Category is required').isIn(['painting', 'repair', 'restoration', 'custom'])
    ]
  ],
  portfolioController.createPortfolioItem
);

// @route   PUT /api/portfolio/:id
// @desc    Update portfolio item
// @access  Private/Admin
router.put(
  '/:id',
  [
    auth,
    upload.array('images', 10), // Max 10 files
    [
      check('title', 'Title is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('category', 'Category is required').isIn(['painting', 'repair', 'restoration', 'custom'])
    ]
  ],
  portfolioController.updatePortfolioItem
);

// @route   DELETE /api/portfolio/:id
// @desc    Delete portfolio item
// @access  Private/Admin
router.delete('/:id', auth, portfolioController.deletePortfolioItem);

module.exports = router;
