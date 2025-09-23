import React, { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import useCourseStore from '../store/useCourseStore';

function Courses() {
  const { courses, loading, error, fetchCourses } = useCourseStore();
  
  const memoizedFetchCourses = useCallback(() => {
    fetchCourses();
  }, [fetchCourses]);

  useEffect(() => {
    memoizedFetchCourses();
  }, [memoizedFetchCourses]);

  const handleImageError = (e) => {
    e.target.src = 'https://placehold.co/300x200/e9ecef/495057?text=No+Image';
  };

  if (loading) {
    return (
      <div className="courses-page">
        <div className="centered-message">
          <div style={{ textAlign: "center" }}>
          <div
            style={{
              marginBottom: "1rem",
              fontSize: "2rem",
              display: "inline-block",
              animation: "spin 1s linear infinite"
            }}
          >
            ⏳
          </div>
          Loading courses...
          <style>
            {`
              @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>

        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="courses-page">
        <div className="error-message">
          <div style={{ marginBottom: '1rem', fontSize: '2rem' }}>⚠️</div>
          <strong>Error loading courses:</strong><br />
          {error}
          <div style={{ marginTop: '1rem' }}>
            <button 
              onClick={memoizedFetchCourses}
              className="btn-learn-more"
              style={{ backgroundColor: '#d9534f', color: 'white' }}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="courses-page">
        <div className="courses-header">
          <h1 className="courses-title">Explore Our Courses</h1>
          <p className="courses-subtitle">
            Upskill in tech with hands-on, industry-relevant programs designed by experts.
          </p>
        </div>
        <div className="empty-state">
          <div className="empty-state-icon">📚</div>
          <h3 style={{ marginBottom: '1rem', color: '#333' }}>No Courses Available</h3>
          <p>We're working on adding new courses. Please check back soon!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="courses-page">
      {/* Header */}
      <div className="courses-header">
        <h1 className="courses-title">Explore Our Courses</h1>
        <p className="courses-subtitle">
          Upskill in tech with hands-on, industry-relevant programs designed by experts.
        </p>
      </div>

      {/* Courses Grid */}
      <div className="courses-grid">
        {courses.map((course) => (
          <div 
            key={course._id}
            className="course-card-alt"
            role="article"
            aria-labelledby={`course-title-${course._id}`}
          >
            <img 
              src={course.image || 'https://placehold.co/300x200/e9ecef/495057?text=No+Image'} 
              alt={course.courseName ? `Course: ${course.courseName}` : 'Course image'}
              className="course-image-alt"
              onError={handleImageError}
              loading="lazy"
            />
            <div className="course-content-alt">
              <h3 
                id={`course-title-${course._id}`}
                className="course-title-alt"
              >
                {course.courseName || 'Untitled Course'}
              </h3>
              
              {course.timetable && (
                <div className="course-duration-badge">
                  🕒 {course.timetable}
                </div>
              )}
              
              <br />
              
              <Link 
                to={`/coursedetails/${course._id}`}
                className="btn-learn-more"
                aria-label={`Learn more about ${course.courseName || 'this course'}`}
              >
                Learn More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;