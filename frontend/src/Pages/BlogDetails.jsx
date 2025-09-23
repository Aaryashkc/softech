import React, { useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useBlogStore } from '../store/useBlogStore'
import blogpic from '../assets/bd.png'
function BlogDetails() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { blog, loading, error, fetchBlogById, blogs, fetchBlogs } = useBlogStore()

  useEffect(() => {
    if (slug) {
      fetchBlogById(slug)
    }
  }, [slug, fetchBlogById])

  useEffect(() => {
    if (blogs.length === 0) {
      fetchBlogs()
    }
  }, [fetchBlogs, blogs.length])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  // Get related blogs (exclude current blog)
  const relatedBlogs = blogs.filter(b => b._id !== blog?._id).slice(0, 3)

  if (loading) {
    return (
      <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '400px' }}>
        <div className='text-center'>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className='mt-3'>Loading blog...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '400px' }}>
        <div className='text-center'>
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Error!</h4>
            <p>{error}</p>
            <button 
              className="btn btn-primary me-2" 
              onClick={() => fetchBlogById(slug)}
            >
              Try Again
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => navigate('/blogs')}
            >
              Back to Blogs
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '400px' }}>
        <div className='text-center'>
          <h3>Blog not found</h3>
          <p>The blog you're looking for doesn't exist.</p>
          <button 
            className="btn btn-primary" 
            onClick={() => navigate('/blogs')}
          >
            Back to Blogs
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="blog-details-page">
      {/* Hero Section */}
      <div className='blog-details-hero'>
        <div className='blog-details-hero-content'>
          <h1 className="blog-details-title">{blog.title}</h1>
          {blog.subTitle && <p className="blog-details-subtitle">{blog.subTitle}</p>}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="blog-details-container">
        <article className="blog-details-content">
          <img 
            className='blog-details-image' 
            src={blog.titleImage || blogpic} 
            alt={blog.title}
          />
          
          <div className="blog-details-meta">
            <div className="blog-details-meta-content">
              <div className="blog-details-meta-item">
                <i className="bi bi-calendar-week"></i>
                <span>{formatDate(blog.createdAt)}</span>
              </div>
              {blog.author && (
                <div className="blog-details-meta-item">
                  <i className="bi bi-person"></i>
                  <span>{blog.author.name || blog.author.email}</span>
                </div>
              )}
              <div className="blog-details-meta-item">
                <i className="bi bi-eye"></i>
                <span>{blog.views} views</span>
              </div>
            </div>
          </div>
          
          <div className="blog-details-text">
            {blog.content.split('\n').map((paragraph, index) => (
              <p key={index}>
                {paragraph}
              </p>
            ))}
          </div>

          {blog.tags && blog.tags.length > 0 && (
            <div className="blog-details-tags">
              <h5>Tags</h5>
              <div className="blog-details-tags-list">
                {blog.tags.map((tag, index) => (
                  <span key={index} className="blog-details-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        {blog.secondImage && (
          <img 
            className='blog-details-second-image' 
            src={blog.secondImage} 
            alt="Blog content" 
          />
        )}
        
        {relatedBlogs.length > 0 && (
          <div className="blog-details-related">
            <h3>Related Articles</h3>
            <div className='blog-details-related-grid'>
              {relatedBlogs.map((relatedBlog) => (
                <Link 
                  key={relatedBlog._id} 
                  className='blog-details-related-card' 
                  to={`/blogdetails/${relatedBlog.slug || relatedBlog._id}`}
                >
                  <img 
                    className='blog-details-related-image' 
                    src={relatedBlog.titleImage || "https://s39613.pcdn.co/wp-content/uploads/2018/04/student-led-study-group-library-id842920176.jpg"} 
                    alt={relatedBlog.title}
                  />
                  <div className="blog-details-related-content">
                    <div className="blog-details-related-meta">
                      <i className="bi bi-calendar-week"></i>
                      <span>{formatDate(relatedBlog.createdAt)}</span>
                    </div>
                    <h6 className="blog-details-related-title">
                      {truncateText(relatedBlog.title, 60)}
                    </h6>
                    <div className="blog-details-related-link">
                      Read More <i className="bi bi-arrow-right"></i>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* CTA Section */}
      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content text-center">
            <h3 className="cta-title">
              Ready to Transform Your Learning Experience?
            </h3>
            <div className="cta-divider"></div>
            <p className="cta-description">
              Join thousands of students who are already achieving their career goals 
              with Softech Foundation. Start your journey today!
            </p>
            <Link to="/inquiryform" className="btn btn-light btn-lg">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BlogDetails
