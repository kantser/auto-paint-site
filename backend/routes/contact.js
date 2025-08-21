const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const contactController = require('../controllers/contactController');

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('subject', 'Subject is required').not().isEmpty(),
    check('message', 'Message is required').not().isEmpty()
  ],
  contactController.submitContactForm
);

// @route   GET /api/contact
// @desc    Get all contact submissions (admin only)
// @access  Private/Admin
router.get('/', auth, contactController.getContactSubmissions);

// @route   PUT /api/contact/:id/status
// @desc    Update contact submission status (admin only)
// @access  Private/Admin
router.put(
  '/:id/status',
  [
    auth,
    check('status', 'Status is required').isIn(['new', 'in_progress', 'resolved', 'spam'])
  ],
  contactController.updateContactStatus
);

module.exports = router;
