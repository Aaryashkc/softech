import React, { useState } from 'react';
import useCourseStore from '../../store/useCourseStore';


const AddCourses = () => {
  const { createCourse, loading, error } = useCourseStore();
  
  const [formData, setFormData] = useState({
    courseName: '',
    timetable: '',
    classDays: [],
    skillLevel: 'Beginner',
    languageOrProgram: '',
    description: '',
    whatWillILearn: '',
    lessons: '',
    image: ''
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const skillLevels = ['Beginner', 'Intermediate', 'Advanced'];
  const availableDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('Image size should be less than 5MB');
      return;
    }
    
    setUploadingImage(true);
    
    try {
      const base64 = await convertToBase64(file);
      
      setFormData(prev => ({
        ...prev,
        image: base64
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.courseName.trim()) {
      errors.courseName = 'Course name is required';
    }
    
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }

    if (!formData.languageOrProgram.trim()) {
      errors.languageOrProgram = 'Language/Program is required';
    }
    
    // Validate URL if provided
    if (formData.image && !formData.image.startsWith('data:') && !isValidUrl(formData.image)) {
      errors.image = 'Please enter a valid URL or upload an image';
    }
    
    return errors;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleDayChange = (day) => {
    setFormData(prev => ({
      ...prev,
      classDays: prev.classDays.includes(day)
        ? prev.classDays.filter(d => d !== day)
        : [...prev.classDays, day]
    }));
    
    if (validationErrors.classDays) {
      setValidationErrors(prev => ({
        ...prev,
        classDays: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    setValidationErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      return;
    }
    
    try {
      const courseData = {
        ...formData,
        lessons: formData.lessons ? parseInt(formData.lessons) : 0
      };
      
      await createCourse(courseData);
      setIsSubmitted(true);
      
      // Reset form
      setFormData({
        courseName: '',
        timetable: '',
        classDays: [],
        skillLevel: 'Beginner',
        languageOrProgram: '',
        description: '',
        whatWillILearn: '',
        lessons: '',
        image: ''
      });
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
      
    } catch (err) {
      console.error('Failed to create course:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      courseName: '',
      timetable: '',
      classDays: [],
      skillLevel: 'Beginner',
      languageOrProgram: '',
      description: '',
      whatWillILearn: '',
      lessons: '',
      image: ''
    });
    setValidationErrors({});
  };

  return (
    <div className="add-courses-page">
      <div className="container-fluid p-4">
        {/* Header */}
        <div className="add-courses-header mb-4">
          <h1 className="add-courses-title h2 mb-2">Add New Course</h1>
          <p className="add-courses-subtitle text-muted">Create and publish a new course</p>
        </div>

        {/* Success Message */}
        {isSubmitted && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Success!</strong> Course created successfully.
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setIsSubmitted(false)}
            ></button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error!</strong> {error}
            <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
          </div>
        )}

        {/* Form */}
        <div className="add-courses-form-card card border">
          <div className="card-header bg-light">
            <h5 className="mb-0">Course Details</h5>
          </div>
          <div className="card-body">
            <div className="add-courses-form">
              <div className="row">
                <div className="col-md-8">
                  <div className="mb-3">
                    <label className="form-label add-courses-label">
                      Course Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${validationErrors.courseName ? 'is-invalid' : ''}`}
                      name="courseName"
                      value={formData.courseName}
                      onChange={handleInputChange}
                      placeholder="Enter course name"
                    />
                    {validationErrors.courseName && (
                      <div className="invalid-feedback">{validationErrors.courseName}</div>
                    )}
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label add-courses-label">Skill Level</label>
                    <select
                      className="form-select"
                      name="skillLevel"
                      value={formData.skillLevel}
                      onChange={handleInputChange}
                    >
                      {skillLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label add-courses-label">
                  Language/Program <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${validationErrors.languageOrProgram ? 'is-invalid' : ''}`}
                  name="languageOrProgram"
                  value={formData.languageOrProgram}
                  onChange={handleInputChange}
                  placeholder="e.g., JavaScript, Python, React"
                />
                {validationErrors.languageOrProgram && (
                  <div className="invalid-feedback">{validationErrors.languageOrProgram}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label add-courses-label">Timetable</label>
                <input
                  type="text"
                  className="form-control"
                  name="timetable"
                  value={formData.timetable}
                  onChange={handleInputChange}
                  placeholder="e.g., 9:00 AM - 11:00 AM"
                />
              </div>

              <div className="mb-3">
                <label className="form-label add-courses-label">Class Days</label>
                <input
                  type="text"
                  className="form-control"
                  name="classDays"
                  value={formData.classDays}
                  onChange={handleInputChange}
                  placeholder="e.g., Monday, Wednesday, Friday"
                />
                <div className="form-text">
                  Enter the days when classes are held
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label add-courses-label">Number of Lessons</label>
                <input
                  type="number"
                  className="form-control"
                  name="lessons"
                  value={formData.lessons}
                  onChange={handleInputChange}
                  placeholder="e.g., 12"
                  min="0"
                />
              </div>

              <div className="mb-3">
                <label className="form-label add-courses-label">
                  Description <span className="text-danger">*</span>
                </label>
                <textarea
                  className={`form-control ${validationErrors.description ? 'is-invalid' : ''}`}
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the course content and objectives..."
                ></textarea>
                {validationErrors.description && (
                  <div className="invalid-feedback">{validationErrors.description}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label add-courses-label">What Will Students Learn?</label>
                <textarea
                  className="form-control"
                  name="whatWillILearn"
                  rows="4"
                  value={formData.whatWillILearn}
                  onChange={handleInputChange}
                  placeholder="List the key skills and knowledge students will gain..."
                ></textarea>
              </div>

              {/* Course Image */}
              <div className="mb-3">
                <label className="form-label add-courses-label">Course Image</label>
                <div className="add-courses-image-upload border rounded p-3">
                  <input
                    type="file"
                    className="form-control mb-2"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                  />
                  {uploadingImage && (
                    <div className="text-center">
                      <div className="spinner-border spinner-border-sm text-primary me-2"></div>
                      Uploading image...
                    </div>
                  )}
                  {validationErrors.image && (
                    <div className="invalid-feedback">{validationErrors.image}</div>
                  )}
                  {formData.image && (
                    <div className="mt-2">
                      <img 
                        src={formData.image} 
                        alt="Course preview" 
                        className="add-courses-preview-image img-thumbnail"
                        style={{maxWidth: '200px', maxHeight: '120px'}}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Form Actions */}
              <div className="add-courses-actions d-flex gap-3">
                <button 
                  type="button"
                  className="btn btn-course"
                  onClick={handleSubmit}
                  disabled={loading || uploadingImage}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Creating...
                    </>
                  ) : (
                    'Create Course'
                  )}
                </button>
                
                <button 
                  type="button" 
                  className="btn btn-outline-secondary"
                  onClick={resetForm}
                  disabled={loading || uploadingImage}
                >
                  Reset Form
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .btn-course{
          background-color: #002e74ff;
          color: white;
          }
        .add-courses-page {
          background-color: #f8f9fa;
          min-height: 100vh;
        }

        .add-courses-title {
          color: #333;
          font-weight: 600;
        }

        .add-courses-subtitle {
          font-size: 1rem;
        }

        .add-courses-form-card {
          border-radius: 8px;
        }

        .add-courses-label {
          font-weight: 500;
          color: #495057;
        }

        .add-courses-form .form-control,
        .add-courses-form .form-select {
          border: 1px solid #ced4da;
          border-radius: 6px;
        }

        .add-courses-form .form-control:focus,
        .add-courses-form .form-select:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
        }

        .add-courses-days-selection {
          padding: 10px;
          background-color: #f8f9fa;
          border-radius: 6px;
          border: 1px solid #ced4da;
        }

        .add-courses-days-selection .form-check {
          margin-right: 15px;
          margin-bottom: 5px;
        }

        .add-courses-image-upload {
          background-color: #f8f9fa;
        }

        .add-courses-preview-image {
          border: 1px solid #dee2e6;
          border-radius: 6px;
          padding: 0.25rem;
        }

        .add-courses-actions {
          padding-top: 1rem;
          border-top: 1px solid #dee2e6;
        }

        .text-danger {
          color: #dc3545 !important;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .add-courses-title {
            font-size: 1.5rem;
          }
          
          .add-courses-actions {
            flex-direction: column;
          }
          
          .add-courses-actions .btn {
            width: 100%;
          }

          .add-courses-days-selection .form-check {
            margin-right: 10px;
            display: block;
            margin-bottom: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default AddCourses;