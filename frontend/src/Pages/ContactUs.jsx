import React, { useState } from 'react';
import { useContactStore } from '../store/useContactStore'; // Adjust path as needed

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: '',
    message: ''
  });

  const { createContact, loading, error } = useContactStore();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await createContact(formData);
      
      // Reset form after successful submission
      setFormData({
        name: '',
        phone: '',
        email: '',
        course: '',
        message: ''
      });
      
      alert('Thank you! Your message has been sent successfully. We will get back to you soon.');
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Sorry, there was an error sending your message. Please try again.');
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '2rem 1rem'
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '1rem'
    },
    subtitle: {
      color: '#666',
      maxWidth: '600px',
      margin: '0 auto',
      lineHeight: '1.5'
    },
    formContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '2rem'
    },
    mainContent: {
      display: 'grid',
      gridTemplateColumns: '1fr 2fr',
      gap: '3rem',
      alignItems: 'start'
    },
    contactInfo: {
      padding: '1rem'
    },
    infoSection: {
      marginBottom: '2rem'
    },
    infoTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#333',
      marginBottom: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    infoText: {
      color: '#666',
      lineHeight: '1.6',
      margin: '0'
    },
    icon: {
      fontSize: '1.2rem',
      color: '#3b82f6'
    },
    formSection: {
      padding: '1rem'
    },
    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#333',
      marginBottom: '1rem'
    },
    sectionSubtitle: {
      color: '#666',
      marginBottom: '2rem',
      lineHeight: '1.5'
    },
    formGroup: {
      marginBottom: '1.5rem'
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '0.5rem'
    },
    required: {
      color: '#dc2626'
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '1rem',
      transition: 'border-color 0.2s, box-shadow 0.2s',
      boxSizing: 'border-box'
    },
    inputFocus: {
      outline: 'none',
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
    },
    textarea: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '1rem',
      minHeight: '120px',
      resize: 'vertical',
      fontFamily: 'inherit',
      boxSizing: 'border-box'
    },
    button: {
      backgroundColor: '#014B88',
      color: 'white',
      fontWeight: '500',
      padding: '0.75rem 2rem',
      border: 'none',
      borderRadius: '6px',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      opacity: loading ? 0.7 : 1
    },
    buttonHover: {
      backgroundColor: '#003b76ff'
    },
    submitContainer: {
      textAlign: 'left'
    },
    errorMessage: {
      color: '#dc2626',
      fontSize: '0.875rem',
      marginTop: '0.5rem',
      padding: '0.5rem',
      backgroundColor: '#fef2f2',
      border: '1px solid #fecaca',
      borderRadius: '4px'
    },
    loadingSpinner: {
      display: 'inline-block',
      marginRight: '0.5rem',
      width: '16px',
      height: '16px',
      border: '2px solid #ffffff',
      borderRadius: '50%',
      borderTopColor: 'transparent',
      animation: 'spin 1s linear infinite'
    },
    responsiveGrid: {
      '@media (max-width: 768px)': {
        gridTemplateColumns: '1fr',
        gap: '2rem'
      }
    }
  };

  // Responsive handling
  const isMobile = window.innerWidth <= 768;
  const mainContentStyle = isMobile 
    ? { ...styles.mainContent, gridTemplateColumns: '1fr', gap: '2rem' }
    : styles.mainContent;

  return (
    <div style={styles.container}>
      {/* CSS Animation for Loading Spinner */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>CONTACT US</h1>
        <p style={styles.subtitle}>
          We're Here to Help You Learn. Get in touch with us for more information 
          about our courses and services.
        </p>
      </div>

      {/* Main Content */}
      <div style={styles.formContainer}>
        <div style={mainContentStyle}>
          
          {/* Contact Information */}
          <div style={styles.contactInfo}>
            <div style={styles.infoSection}>
              <h4 style={styles.infoTitle}>
                <span style={styles.icon}>📍</span>
                Address
              </h4>
              <p style={styles.infoText}>
                Mid Baneshwor Kathmandu<br />
                Nepal
              </p>
            </div>

            <div style={styles.infoSection}>
              <h4 style={styles.infoTitle}>
                <span style={styles.icon}>📞</span>
                Phone
              </h4>
              <p style={styles.infoText}>
                Mobile: +(977) 546-6789<br />
                Hotline: +(977) 456-6789
              </p>
            </div>

            <div style={styles.infoSection}>
              <h4 style={styles.infoTitle}>
                <span style={styles.icon}>🕐</span>
                Working Time
              </h4>
              <p style={styles.infoText}>
                Monday-Friday: 9:00 - 22:00<br />
                Saturday-Sunday: 9:00 - 21:00
              </p>
            </div>

            <div style={styles.infoSection}>
              <h4 style={styles.infoTitle}>
                <span style={styles.icon}>✉️</span>
                Email
              </h4>
              <p style={styles.infoText}>
                info@yoursite.com<br />
                support@yoursite.com
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div style={styles.formSection}>
            <h2 style={styles.sectionTitle}>Get In Touch With Us</h2>
            <p style={styles.sectionSubtitle}>
              For more information about our products & services, please feel free to drop us 
              a message. Our staff will always be there to help you out.
            </p>

            {/* Error Message */}
            {error && (
              <div style={styles.errorMessage}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Your Name <span style={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter Your Name"
                  style={styles.input}
                  onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                  onBlur={(e) => Object.assign(e.target.style, styles.input)}
                  disabled={loading}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Phone Number <span style={styles.required}>*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Your Phone Number"
                  style={styles.input}
                  onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                  onBlur={(e) => Object.assign(e.target.style, styles.input)}
                  disabled={loading}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Email Address <span style={styles.required}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Abc@def.com"
                  style={styles.input}
                  onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                  onBlur={(e) => Object.assign(e.target.style, styles.input)}
                  disabled={loading}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Course <span style={styles.required}>*</span>
                </label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  style={styles.input}
                  onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                  onBlur={(e) => Object.assign(e.target.style, styles.input)}
                  disabled={loading}
                  required
                >
                  <option value="">Select a Course</option>
                  <option value="mern-stack">MERN Stack Development</option>
                  <option value="web-development">Web Development</option>
                  <option value="php-laravel">PHP/Laravel</option>
                  <option value="dotnet">.NET Development</option>
                  <option value="javascript">JavaScript Fundamentals</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Message <span style={styles.required}>*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Hi! I would like to ask about..."
                  style={styles.textarea}
                  onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                  onBlur={(e) => Object.assign(e.target.style, styles.textarea)}
                  disabled={loading}
                  required
                />
              </div>

              <div style={styles.submitContainer}>
                <button
                  type="submit"
                  style={styles.button}
                  onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                  onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = styles.button.backgroundColor)}
                  disabled={loading}
                >
                  {loading && <span style={styles.loadingSpinner}></span>}
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;