import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useCourseStore from '../store/useCourseStore';
import { format } from 'date-fns';

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { course, loading, error, fetchCourseById } = useCourseStore();

  useEffect(() => {
    if (id) {
      fetchCourseById(id);
    } else {
      navigate('/courses');
    }
  }, [id, fetchCourseById, navigate]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-4" role="alert">
        Error loading course: {error}
        <button 
          className="btn btn-sm btn-outline-danger ms-3"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="alert alert-warning m-4" role="alert">
        Course not found. <Link to="/courses" className="alert-link">Browse all courses</Link>
      </div>
    );
  }

  const startDate = course.startDate ? new Date(course.startDate) : null;
  const formattedDate = startDate ? format(startDate, 'MMMM d, yyyy') : 'TBD';
  const timeSlot = course.timeSlot || '10:00 AM - 12:00 PM';
  
  return (
    <div className="course-details">
      <div className='d-flex justify-content-center contact py-5 bg-light'>
        <div className='text-center'>
          <h1>{course.title || 'Course Details'}</h1>
          <p className='lead'>{course.shortDescription || 'Detailed information about the course'}</p>
        </div>
      </div>
      
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8 mb-4">
            <img 
              src={course.image || 'https://placehold.co/800x450/e9ecef/495057?text=Course+Image'} 
              alt={course.title} 
              className="img-fluid rounded-3 shadow-sm"
              style={{width: '700px', height: '400px', objectFit: 'cover', objectPosition: 'center'}}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/800x450/e9ecef/495057?text=No+Image';
              }}
            />
          </div>
          
          <div className="col-lg-4">
            <div className='border p-4 rounded-3 shadow-sm' style={{background: '#DAE7FF'}}>
              <div className='text-center mb-4'>
                <h4 className='mb-3'>{course.title}</h4>
                <button 
                  type="button" 
                  className='btn btn-primary w-100 py-2 fw-bold'
                  style={{ background: '#014B88', border: 'none' }}
                >
                  ENROLL NOW
                </button>
              </div>
              
              <div className='course-meta'>
                <div className='d-flex justify-content-between py-2 border-bottom'>
                  <span><i className="bi bi-clock me-2"></i>Time</span>
                  <span>{timeSlot}</span>
                </div>
                <div className='d-flex justify-content-between py-2 border-bottom'>
                  <span><i className="bi bi-calendar3 me-2"></i>Start Date</span>
                  <span>{formattedDate}</span>
                </div>
                <div className='d-flex justify-content-between py-2 border-bottom'>
                  <span><i className="bi bi-bar-chart me-2"></i>Level</span>
                  <span>{course.level || 'All Levels'}</span>
                </div>
                <div className='d-flex justify-content-between py-2 border-bottom'>
                  <span><i className="bi bi-book me-2"></i>Lessons</span>
                  <span>{course.lessonsCount || 10} lessons</span>
                </div>
                <div className='d-flex justify-content-between py-2'>
                  <span><i className="bi bi-tags me-2"></i>Category</span>
                  <span>{course.category || 'Web Development'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className='row mt-5'>
          <div className='col-lg-8'>
            <div className='course-content'>
              <h4 className='fw-bold mb-4'>{course.title}</h4>
              
              <div className='d-flex mb-4'>
                <p className='me-4'><i className="bi bi-file-earmark-bar-graph-fill text-primary me-2"></i>
                  {course.lessonsCount || 10} Lessons
                </p>
                <p><i className="bi bi-clock-fill text-primary me-2"></i>
                  {course.duration || '12 weeks'}
                </p>
              </div>
              
              <div className='course-description mb-5'>
                <h5 className='fw-bold mb-3'>COURSE DESCRIPTION</h5>
                <p className='text-muted' style={{ whiteSpace: 'pre-line' }}>
                  {course.description || 'No description available for this course.'}
                </p>
              </div>
              
              <div className='learning-outcomes'>
                <h5 className='fw-bold mb-3'>What Will I Learn From This Course?</h5>
                <ul className='list-unstyled'>
                  {course.learningOutcomes?.length > 0 ? (
                    course.learningOutcomes.map((outcome, index) => (
                      <li key={index} className='mb-2'>
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        {outcome}
                      </li>
                    ))
                  ) : (
                    <li className='text-muted'>No learning outcomes specified.</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          
          <div className='col-lg-4'>
            <div className='card shadow-sm border-0'>
              <div className='card-body'>
                <h5 className='card-title fw-bold mb-4'>Course Features</h5>
                <ul className='list-unstyled'>
                  <li className='mb-3 d-flex align-items-center'>
                    <i className="bi bi-people-fill text-primary me-3 fs-5"></i>
                    <div>
                      <h6 className='mb-0'>Instructor</h6>
                      <small className='text-muted'>{course.instructor || 'Expert Instructor'}</small>
                    </div>
                  </li>
                  <li className='mb-3 d-flex align-items-center'>
                    <i className="bi bi-trophy-fill text-warning me-3 fs-5"></i>
                    <div>
                      <h6 className='mb-0'>Certificate</h6>
                      <small className='text-muted'>{course.certificate ? 'Included' : 'Not included'}</small>
                    </div>
                  </li>
                  <li className='mb-3 d-flex align-items-center'>
                    <i className="bi bi-chat-square-text-fill text-info me-3 fs-5"></i>
                    <div>
                      <h6 className='mb-0'>Language</h6>
                      <small className='text-muted'>{course.language || 'English'}</small>
                    </div>
                  </li>
                  {course.prerequisites?.length > 0 && (
                    <li className='mt-4'>
                      <h6 className='fw-bold'>Prerequisites</h6>
                      <ul className='list-unstyled text-muted'>
                        {course.prerequisites.map((prereq, index) => (
                          <li key={index} className='mb-1'>• {prereq}</li>
                        ))}
                      </ul>
                    </li>
                  )}
                </ul>
                
                <div className='mt-4'>
                  <button className='btn btn-primary w-100 py-2 fw-bold'>
                    Enroll Now - ${course.price || 'Free'}
                  </button>
                  <p className='text-center text-muted small mt-2'>
                    30-Day Money-Back Guarantee
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
