import React, { useState } from 'react';
import { useInquiryStore } from '../store/useInquiryStore';

function EnquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    institution: '',
    academicStatus: '',
    interestedCourse: '',
    preferredSchedule: '',
    learningMode: '',
    message: ''
  });

  const { createInquiry, loading, error } = useInquiryStore();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await createInquiry(formData);
      setFormData({
        name: '',
        phone: '',
        email: '',
        institution: '',
        academicStatus: '',
        interestedCourse: '',
        preferredSchedule: '',
        learningMode: '',
        message: ''
      });
      
      alert('Thank you! Your enquiry has been submitted successfully. We will reach out to you shortly.');
    } catch (error) {
      console.error('Error submitting enquiry form:', error);
      alert('Sorry, there was an error submitting your enquiry. Please try again.');
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
      maxWidth: '900px',
      margin: '0 auto',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '2rem',
      position: 'relative'
    },
    section: {
      marginBottom: '2rem'
    },
    sectionTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#333',
      marginBottom: '1rem'
    },
    grid: {
      display: 'grid',
      gap: '1rem'
    },
    grid3: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
    },
    grid2: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
    },
    formGroup: {
      marginBottom: '1rem'
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
      minHeight: '100px',
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
      textAlign: 'center'
    },
    errorMessage: {
      color: '#dc2626',
      fontSize: '0.875rem',
      marginBottom: '1.5rem',
      padding: '0.75rem',
      backgroundColor: '#fef2f2',
      border: '1px solid #fecaca',
      borderRadius: '6px',
      textAlign: 'center'
    },
    loadingOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '8px',
      zIndex: 10
    },
    loadingSpinner: {
      display: 'inline-block',
      marginRight: '0.5rem',
      width: '20px',
      height: '20px',
      border: '3px solid #014B88',
      borderRadius: '50%',
      borderTopColor: 'transparent',
      animation: 'spin 1s linear infinite'
    },
    loadingText: {
      color: '#014B88',
      fontWeight: '500',
      fontSize: '1.1rem'
    }
  };

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
        <h1 style={styles.title}>ENQUIRY FORM</h1>
        <p style={styles.subtitle}>
          We're here to help you take the next step in your IT journey. Fill in your details below and our 
          team will reach out to you shortly with more information.
        </p>
      </div>

      {/* Form */}
      <div style={styles.formContainer}>
        
        {/* Loading Overlay */}
        {loading && (
          <div style={styles.loadingOverlay}>
            <div>
              <div style={styles.loadingSpinner}></div>
              <span style={styles.loadingText}>Submitting your enquiry...</span>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div style={styles.errorMessage}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Personal Information</h3>
            <div style={{...styles.grid, ...styles.grid3}}>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Your Name <span style={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
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
                  placeholder="Your phone number"
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
                  placeholder="your.email@example.com"
                  style={styles.input}
                  onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                  onBlur={(e) => Object.assign(e.target.style, styles.input)}
                  disabled={loading}
                  required
                />
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Academic Information</h3>
            <div style={{...styles.grid, ...styles.grid2}}>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  College/Institution Name <span style={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleInputChange}
                  placeholder="Your college/institution name"
                  style={styles.input}
                  onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                  onBlur={(e) => Object.assign(e.target.style, styles.input)}
                  disabled={loading}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Academic Status <span style={styles.required}>*</span>
                </label>
                <select
                  name="academicStatus"
                  value={formData.academicStatus}
                  onChange={handleInputChange}
                  style={styles.input}
                  onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                  onBlur={(e) => Object.assign(e.target.style, styles.input)}
                  disabled={loading}
                  required
                >
                  <option value="">Select Academic Qualification</option>
                  <option value="see">SEE</option>
                  <option value="plus2">+2</option>
                  <option value="bachelor">Bachelor</option>
                  <option value="masters">Masters</option>
                </select>
              </div>
            </div>
          </div>

          {/* Course Details */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Course Details</h3>
            <div style={{...styles.grid, ...styles.grid3}}>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Interested Course <span style={styles.required}>*</span>
                </label>
                <select
                  name="interestedCourse"
                  value={formData.interestedCourse}
                  onChange={handleInputChange}
                  style={styles.input}
                  onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                  onBlur={(e) => Object.assign(e.target.style, styles.input)}
                  disabled={loading}
                  required
                >
                  <option value="">Select a course</option>
                  <option value="mern-stack">MERN Stack</option>
                  <option value="web-development">Web Development</option>
                  <option value="php-laravel">PHP/Laravel</option>
                  <option value="dotnet">.NET</option>
                  <option value="javascript">JavaScript</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Preferred Schedule <span style={styles.required}>*</span>
                </label>
                <select
                  name="preferredSchedule"
                  value={formData.preferredSchedule}
                  onChange={handleInputChange}
                  style={styles.input}
                  onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                  onBlur={(e) => Object.assign(e.target.style, styles.input)}
                  disabled={loading}
                  required
                >
                  <option value="">Select schedule</option>
                  <option value="morning-6-9">Morning (6:00 - 9:00)</option>
                  <option value="morning-10-1">Morning (10:00 - 1:00)</option>
                  <option value="afternoon-1-4">Afternoon (1:00 - 4:00)</option>
                  <option value="evening-4-7">Evening (4:00 - 7:00)</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Learning Mode <span style={styles.required}>*</span>
                </label>
                <select
                  name="learningMode"
                  value={formData.learningMode}
                  onChange={handleInputChange}
                  style={styles.input}
                  onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                  onBlur={(e) => Object.assign(e.target.style, styles.input)}
                  disabled={loading}
                  required
                >
                  <option value="">Select mode</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
            </div>
          </div>

          {/* Additional Comments */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Additional Comments</h3>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Any Queries?
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Open field where users can ask specific questions or add comments."
                style={styles.textarea}
                onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                onBlur={(e) => Object.assign(e.target.style, styles.textarea)}
                disabled={loading}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div style={styles.submitContainer}>
            <button
              type="submit"
              style={styles.button}
              onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
              onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = styles.button.backgroundColor)}
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Enquiry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EnquiryForm;