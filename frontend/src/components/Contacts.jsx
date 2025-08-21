import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaPaperPlane } from 'react-icons/fa';

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    });
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <section className="contacts" id="contact">
      <div className="container">
        <h2 className="section-title">Contact Us</h2>
        <div className="contacts__grid">
          <div className="contacts__info">
            <h3>Get in Touch</h3>
            <p>Have questions or want to book an appointment? Reach out to us using the information below or fill out the contact form.</p>
            
            <div className="contact-method">
              <div className="contact-icon">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h4>Address</h4>
                <p>2, Corporation Cottages, Carshalton Rd,<br />Croydon, Mitcham CR4 4HJ</p>
              </div>
            </div>

            <div className="contact-method">
              <div className="contact-icon">
                <FaPhone />
              </div>
              <div>
                <h4>Phone</h4>
                <p>+44 7889 670579</p>
              </div>
            </div>

            <div className="contact-method">
              <div className="contact-icon">
                <FaEnvelope />
              </div>
              <div>
                <h4>Email</h4>
                <p>info@popovslegacy.com</p>
              </div>
            </div>

            <div className="contact-method">
              <div className="contact-icon">
                <FaClock />
              </div>
              <div>
                <h4>Working Hours</h4>
                <p>Monday - Friday: 9:00 AM - 7:00 PM<br />
                Saturday: 10:00 AM - 4:00 PM<br />
                Sunday: Closed</p>
              </div>
            </div>
          </div>

          <div className="contacts__form-wrapper">
            <form onSubmit={handleSubmit} className="contact-form">
              <h3>Send Us a Message</h3>
              
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your Phone"
                  required
                />
              </div>

              <div className="form-group">
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Service</option>
                  <option value="full-painting">Full Car Painting</option>
                  <option value="local-repair">Localized Repair</option>
                  <option value="body-work">Body Work</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows="5"
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn--primary">
                <FaPaperPlane /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;