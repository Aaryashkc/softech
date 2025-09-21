import React, { useState, useEffect } from 'react';
import { useBlogStore } from '../../store/useBlogStore';
import { useAuthStore } from '../../store/useAuthStore';


const AddBlogs = () => {
  const { createBlog, loading, error } = useBlogStore();
  
  const [formData, setFormData] = useState({
    title: '',
    subTitle: '',
    content: '',
    titleImage: '',
    secondImage: '',
    tags: '',
    category: 'General',
    author: ''
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    } else if (formData.title.trim().length < 3) {
      errors.title = 'Title must be at least 3 characters';
    }
    
    if (!formData.content.trim()) {
      errors.content = 'Content is required';
    } else if (formData.content.trim().length < 10) {
      errors.content = 'Content must be at least 10 characters';
    }

    if (!formData.author.trim()) {
      errors.author = 'Author is required';
    }
    
    // Validate URLs if provided
    if (formData.titleImage && !isValidUrl(formData.titleImage)) {
      errors.titleImage = 'Please enter a valid URL';
    }
    
    if (formData.secondImage && !isValidUrl(formData.secondImage)) {
      errors.secondImage = 'Please enter a valid URL';
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    const fieldName = e.target.name; // 'titleImage' or 'secondImage'

    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        [fieldName]: reader.result
      }));
    };

    reader.readAsDataURL(file);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Ensure we have an author
    if (!formData.author.trim()) {
      setValidationErrors(prev => ({
        ...prev,
        author: 'Author name is required'
      }));
      return;
    }
    
    const errors = validateForm();
    setValidationErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      return;
    }
    
    try {
      const blogData = {
        ...formData,
        tags: formData.tags
          .split(',')
          .map(tag => tag.trim())
          .filter(tag => tag)
      };
      
      await createBlog(blogData);
      setIsSubmitted(true);
      
      // Reset form but keep the author
      setFormData({
        title: '',
        subTitle: '',
        content: '',
        titleImage: '',
        secondImage: '',
        tags: '',
        category: 'General',
        author: authUser._id
      });
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
      
    } catch (err) {
      console.error('Failed to create blog:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subTitle: '',
      content: '',
      titleImage: '',
      secondImage: '',
      tags: '',
      category: 'General',
      author: ''
    });
    setValidationErrors({});
  };

  return (
    <div className="add-blogs-page">
      <div className="container-fluid p-4">
        {/* Header */}
        <div className="add-blogs-header mb-4">
          <h1 className="add-blogs-title h2 mb-2">Add New Blog</h1>
          <p className="add-blogs-subtitle text-muted">Create and publish a new blog post</p>
        </div>

        {/* Success Message */}
        {isSubmitted && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Success!</strong> Blog post created successfully.
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

        {/* Card Container */}
        <div className="add-blogs-form-card card border">
          <div className="card-header bg-light">
            <h5 className="mb-0">Blog Details</h5>
          </div>
          <div className="card-body">
            <div className="add-blogs-form">
              <div className="row">
                <div className="col-md-8">
                  <div className="mb-3">
                    <label className="form-label add-blogs-label">
                      Title <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${validationErrors.title ? 'is-invalid' : ''}`}
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter blog title"
                    />
                    {validationErrors.title && (
                      <div className="invalid-feedback">{validationErrors.title}</div>
                    )}
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label add-blogs-label">Category</label>
                    <select
                      className="form-select"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      <option value="General">General</option>
                      <option value="Technology">Technology</option>
                      <option value="Lifestyle">Lifestyle</option>
                      <option value="Business">Business</option>
                      <option value="Travel">Travel</option>
                      <option value="Food">Food</option>
                      <option value="Health">Health</option>
                      <option value="Education">Education</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label add-blogs-label">Subtitle</label>
                <input
                  type="text"
                  className="form-control"
                  name="subTitle"
                  value={formData.subTitle}
                  onChange={handleInputChange}
                  placeholder="Enter blog subtitle (optional)"
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label add-blogs-label">
                  Author <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${validationErrors.author ? 'is-invalid' : ''}`}
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  placeholder="Enter author's name"
                />
                {validationErrors.author && (
                  <div className="invalid-feedback">{validationErrors.author}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label add-blogs-label">
                  Content <span className="text-danger">*</span>
                </label>
                <div className="add-blogs-content-editor border rounded">
                  <div className="add-blogs-toolbar border-bottom p-2 bg-light">
                    <div className="d-flex gap-2 flex-wrap">
                      <select 
                        className="form-select form-select-sm" 
                        style={{width: 'auto'}}
                        onChange={(e) => document.execCommand('fontSize', false, e.target.value)}
                      >
                        <option value="3">Font Size</option>
                        <option value="1">Small</option>
                        <option value="3">Normal</option>
                        <option value="5">Large</option>
                        <option value="7">Extra Large</option>
                      </select>
                      <button 
                        type="button" 
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => document.execCommand('bold')}
                        title="Bold"
                      >
                        <strong>B</strong>
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => document.execCommand('italic')}
                        title="Italic"
                      >
                        <em>I</em>
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => document.execCommand('underline')}
                        title="Underline"
                      >
                        <u>U</u>
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => document.execCommand('insertUnorderedList')}
                        title="Bullet List"
                      >
                        •
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => document.execCommand('insertOrderedList')}
                        title="Numbered List"
                      >
                        1.
                      </button>
                    </div>
                  </div>
                  <div
                    contentEditable
                    className={`add-blogs-content-area p-3 ${validationErrors.content ? 'is-invalid' : ''}`}
                    style={{
                      minHeight: '200px',
                      outline: 'none',
                      backgroundColor: '#fff'
                    }}
                    onInput={(e) => {
                      setFormData(prev => ({
                        ...prev,
                        content: e.target.textContent || ''
                      }));
                    }}
                    onBlur={(e) => {
                      setFormData(prev => ({
                        ...prev,
                        content: e.target.textContent || ''
                      }));
                    }}
                    data-placeholder="Write your blog content here..."
                  ></div>
                </div>
                {validationErrors.content && (
                  <div className="invalid-feedback d-block">{validationErrors.content}</div>
                )}
                <div className="form-text">
                  Characters: {formData.content.length}
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label add-blogs-label">Title Image</label>
                    <div className="add-blogs-image-upload border rounded p-3">
                      <input
                        type="file"
                        className="form-control mb-2"
                        accept="image/*"
                        onChange={handleImageUpload}
                        name="titleImage"
                      />
                      {validationErrors.titleImage && (
                        <div className="invalid-feedback">{validationErrors.titleImage}</div>
                      )}
                      {formData.titleImage && (
                        <div className="mt-2">
                          <img 
                            src={formData.titleImage} 
                            alt="Title preview" 
                            className="add-blogs-preview-image img-thumbnail"
                            style={{maxWidth: '200px', maxHeight: '120px'}}
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label add-blogs-label">Second Image</label>
                    <div className="add-blogs-image-upload border rounded p-3">
                      <input
                        type="file"
                        className="form-control mb-2"
                        accept="image/*"
                        onChange={handleImageUpload}
                        name="secondImage"
                      />
                      {validationErrors.secondImage && (
                        <div className="invalid-feedback">{validationErrors.secondImage}</div>
                      )}
                      {formData.secondImage && (
                        <div className="mt-2">
                          <img 
                            src={formData.secondImage} 
                            alt="Second preview" 
                            className="add-blogs-preview-image img-thumbnail"
                            style={{maxWidth: '200px', maxHeight: '120px'}}
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label add-blogs-label">Tags</label>
                <input
                  type="text"
                  className="form-control"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="technology, web development, react"
                />
                <div className="form-text">
                  Separate multiple tags with commas. Preview: {
                    formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag).join(', ')
                  }
                </div>
              </div>

              {/* Actions */}
              <div className="add-blogs-actions d-flex gap-3">
                <button 
                  type="button"
                  className="btn btn-blog"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Creating...
                    </>
                  ) : (
                    'Create Blog'
                  )}
                </button>
                
                <button 
                  type="button" 
                  className="btn btn-outline-secondary"
                  onClick={resetForm}
                  disabled={loading}
                >
                  Reset Form
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .btn-blog{
          background-color: #002e74ff;
          color: white;
          }
        .add-blogs-page {
          background-color: #f8f9fa;
          min-height: 100vh;
        }

        .add-blogs-title {
          color: #333;
          font-weight: 600;
        }

        .add-blogs-subtitle {
          font-size: 1rem;
        }

        .add-blogs-form-card {
          border-radius: 8px;
        }

        .add-blogs-label {
          font-weight: 500;
          color: #495057;
        }

        .add-blogs-form .form-control,
        .add-blogs-form .form-select {
          border: 1px solid #ced4da;
          border-radius: 6px;
        }

        .add-blogs-form .form-control:focus,
        .add-blogs-form .form-select:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
        }

        .add-blogs-actions {
          padding-top: 1rem;
          border-top: 1px solid #dee2e6;
        }

        .add-blogs-content-editor {
          border: 1px solid #ced4da;
        }

        .add-blogs-content-editor:focus-within {
          border-color: #0d6efd;
          box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
        }

        .add-blogs-content-area[data-placeholder]:empty::before {
          content: attr(data-placeholder);
          color: #6c757d;
          font-style: italic;
        }

        .add-blogs-content-area:focus {
          outline: none;
        }

        .add-blogs-image-upload {
          background-color: #f8f9fa;
        }

        .add-blogs-toolbar {
          background-color: #f8f9fa !important;
        }

        .add-blogs-toolbar .btn {
          border: 1px solid #ced4da;
        }

        .text-danger {
          color: #dc3545 !important;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .add-blogs-title {
            font-size: 1.5rem;
          }
          
          .add-blogs-actions {
            flex-direction: column;
          }
          
          .add-blogs-actions .btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default AddBlogs;