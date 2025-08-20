const Contact = require('../models/Contact');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
exports.submitContactForm = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, phone, subject, message } = req.body;

    // Create new contact
    const newContact = new Contact({
      name,
      email,
      phone: phone || '',
      subject,
      message
    });

    await newContact.save();

    // Send email notification (configure your email service)
    await sendContactEmail({
      name,
      email,
      phone: phone || 'Not provided',
      subject,
      message
    });

    res.status(201).json({ 
      success: true,
      message: 'Your message has been sent successfully!' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error submitting contact form. Please try again later.' 
    });
  }
};

// @desc    Get all contact submissions (admin only)
// @route   GET /api/contact
// @access  Private/Admin
exports.getContactSubmissions = async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};
    
    const submissions = await Contact.find(query).sort({ createdAt: -1 });
    res.json(submissions);
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update contact submission status
// @route   PUT /api/contact/:id/status
// @access  Private/Admin
exports.updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['new', 'in_progress', 'resolved', 'spam'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const submission = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!submission) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }

    res.json(submission);
  } catch (error) {
    console.error('Error updating contact status:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Helper function to send email
async function sendContactEmail({ name, email, phone, subject, message }) {
  // Configure your email service here (e.g., Gmail, SendGrid, etc.)
  const transporter = nodemailer.createTransport({
    // Example for Gmail
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.ADMIN_EMAIL || 'admin@example.com',
    subject: `New Contact Form: ${subject}`,
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      
      Message:
      ${message}
    `,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <h3>Message:</h3>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    // Don't fail the request if email fails
  }
}
