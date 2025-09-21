import React, { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useBlogStore } from '../store/useBlogStore';

function Blogs() {
  const { blogs, loading, error, fetchBlogs } = useBlogStore();
  
  const memoizedFetchBlogs = useCallback(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  useEffect(() => {
    memoizedFetchBlogs();
  }, [memoizedFetchBlogs]);

  const handleImageError = (e) => {
    e.target.src = 'https://placehold.co/300x200/e9ecef/495057?text=No+Image';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="blogs-page">
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
            Loading blogs...
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
      <div className="blogs-page">
        <div className="error-message">
          <div style={{ marginBottom: '1rem', fontSize: '2rem' }}>⚠️</div>
          <strong>Error loading blogs:</strong><br />
          {error}
          <div style={{ marginTop: '1rem' }}>
            <button 
              onClick={memoizedFetchBlogs}
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

  if (!blogs || blogs.length === 0) {
    return (
      <div className="blogs-page">
        <div className="blogs-header">
          <h1 className=" blogs-title">Our Blog</h1>
          <p className="blogs-subtitle">
            Explore expert tips, learning strategies, and the latest updates from our educators.
          </p>
        </div>
        <div className="empty-state">
          <div className="empty-state-icon">📝</div>
          <h3 style={{ marginBottom: '1rem', color: '#333' }}>No Blogs Available</h3>
          <p>We're working on adding new blog posts. Please check back soon!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blogs-page">
      {/* Header */}
      <div className="blogs-header">
        <h1 className="blogs-title">Our Blog</h1>
        <p className="blogs-subtitle">
          Explore expert tips, learning strategies, and the latest updates from our educators.
        </p>
      </div>

      {/* Blogs Grid */}
      <div className="blogs-grid">
        {blogs.map((blog) => (
          <div 
            key={blog._id}
            className="blog-card-alt"
            role="article"
            aria-labelledby={`blog-title-${blog._id}`}
          >
            <img 
              src={blog.titleImage || 'https://placehold.co/300x200/e9ecef/495057?text=No+Image'} 
              alt={blog.title ? `Blog: ${blog.title}` : 'Blog image'}
              className="blog-image-alt"
              onError={handleImageError}
              loading="lazy"
            />
            <div className="blog-content-alt">
              <div className="blog-meta-alt">
                <span className="blog-date-alt">
                  📅 {formatDate(blog.createdAt)}
                </span>
                {blog.author && (
                  <span className="blog-author-alt">
                    👤 {blog.author.name || blog.author.email}
                  </span>
                )}
              </div>
              
              <h3 
                id={`blog-title-${blog._id}`}
                className="blog-title-alt"
              >
                {blog.title || 'Untitled Blog'}
              </h3>
              
              {blog.subTitle && (
                <p className="blog-subtitle-alt">
                  {truncateText(blog.subTitle, 120)}
                </p>
              )}
              
              {blog.category && (
                <div className="blog-category-badge">
                  🏷️ {blog.category}
                </div>
              )}
              
              {blog.tags && blog.tags.length > 0 && (
                <div className="blog-tags-alt">
                  {blog.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="blog-tag-alt">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              
              <br />
              
              <Link 
                to={`/blogdetails/${blog.slug || blog._id}`}
                className="btn-learn-more"
                aria-label={`Read more about ${blog.title || 'this blog'}`}
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blogs
