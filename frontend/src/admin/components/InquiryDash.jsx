import React, { useEffect } from 'react';
import { useInquiryStore } from '../../store/useInquiryStore';

const InquiryDash = () => {
  const { inquiries, loading, error, getInquiries } = useInquiryStore();

  useEffect(() => {
    getInquiries();
  }, [getInquiries]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="inquiry-loading-container">
        <div className="container-fluid">
          <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
            <div className="spinner-border text-secondary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="inquiry-error-container">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="alert alert-danger" role="alert">
                <strong>Error Loading Inquiries:</strong> {error}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="inquiry-dashboard">
      <div className="container-fluid p-4">
        {/* Header */}
        <div className="inquiry-header mb-4">
          <h1 className="inquiry-main-title h2 mb-2">Inquiry Dashboard</h1>
          <p className="inquiry-subtitle text-muted">View and manage inquiry submissions</p>
        </div>

        {/* Stats */}
        <div className="inquiry-stats-section mb-4">
          <div className="row">
            <div className="col-md-3">
              <div className="inquiry-stats-card card border">
                <div className="card-body text-center">
                  <h3 className="inquiry-stats-number">{inquiries.length}</h3>
                  <p className="inquiry-stats-label text-muted mb-0">Total Inquiries</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inquiries Table */}
        <div className="inquiry-table-section">
          <div className="inquiry-table-card card border">
            <div className="inquiry-table-header card-header bg-light">
              <h5 className="mb-0">Inquiry Submissions</h5>
            </div>
            <div className="card-body p-0">
              {inquiries.length === 0 ? (
                <div className="inquiry-empty-state text-center p-5">
                  <h5 className="text-muted">No inquiries yet</h5>
                  <p className="text-muted">Inquiry submissions will appear here.</p>
                </div>
              ) : (
                <div className="inquiry-table-wrapper table-responsive">
                  <table className="inquiry-table table table-striped mb-0">
                    <thead>
                      <tr>
                        <th className="inquiry-th-name">Name</th>
                        <th className="inquiry-th-email">Email</th>
                        <th className="inquiry-th-phone">Phone</th>
                        <th className="inquiry-th-subject">Subject</th>
                        <th className="inquiry-th-message">Message</th>
                        <th className="inquiry-th-date">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inquiries.map((inquiry) => (
                        <tr key={inquiry._id} className="inquiry-table-row">
                          <td className="inquiry-td-name">
                            <strong>{inquiry.name}</strong>
                          </td>
                          <td className="inquiry-td-email">
                            {inquiry.email}
                          </td>
                          <td className="inquiry-td-phone">
                            {inquiry.phone || 'N/A'}
                          </td>
                          <td className="inquiry-td-subject">
                            {inquiry.subject ? (
                              <span className="badge bg-secondary">{inquiry.subject}</span>
                            ) : (
                              <span className="text-muted">No subject</span>
                            )}
                          </td>
                          <td className="inquiry-td-message">
                            <div className="inquiry-message-text" title={inquiry.message}>
                              {inquiry.message}
                            </div>
                          </td>
                          <td className="inquiry-td-date">
                            <small className="text-muted">
                              {inquiry.createdAt ? formatDate(inquiry.createdAt) : 'N/A'}
                            </small>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .inquiry-dashboard {
          background-color: #f8f9fa;
          min-height: 100vh;
        }

        .inquiry-main-title {
          color: #333;
          font-weight: 600;
        }

        .inquiry-subtitle {
          font-size: 1rem;
        }

        .inquiry-stats-card {
          border-radius: 8px;
        }

        .inquiry-stats-number {
          font-size: 2rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .inquiry-stats-label {
          font-size: 0.9rem;
          font-weight: 500;
        }

        .inquiry-table-card {
          border-radius: 8px;
        }

        .inquiry-table-header {
          border-bottom: 1px solid #dee2e6;
        }

        .inquiry-table th {
          font-weight: 600;
          color: #495057;
          border-bottom: 2px solid #dee2e6;
          padding: 1rem;
        }

        .inquiry-table td {
          padding: 1rem;
          vertical-align: middle;
        }

        .inquiry-table-row:hover {
          background-color: #f8f9fa;
        }

        .inquiry-message-text {
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .inquiry-empty-state {
          color: #6c757d;
        }

        .badge {
          font-size: 0.8rem;
          padding: 0.4rem 0.8rem;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .inquiry-main-title {
            font-size: 1.5rem;
          }

          .inquiry-table {
            font-size: 0.9rem;
          }

          .inquiry-message-text {
            max-width: 150px;
          }
        }
      `}</style>
    </div>
  );
};

export default InquiryDash;