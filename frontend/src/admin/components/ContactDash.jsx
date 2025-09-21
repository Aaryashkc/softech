import React, { useEffect } from 'react';
import { useContactStore } from '../../store/useContactStore';


const ContactDash = () => {
  const { contacts, loading, error, getContacts } = useContactStore();

  useEffect(() => {
    getContacts();
  }, [getContacts]);

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
      <div className="contact-loading-container">
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
      <div className="contact-error-container">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="alert alert-danger" role="alert">
                <strong>Error Loading Contacts:</strong> {error}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-dashboard">
      <div className="container-fluid p-4">
        {/* Header */}
        <div className="contact-header mb-4">
          <h1 className="contact-main-title h2 mb-2">Contact Dashboard</h1>
          <p className="contact-subtitle text-muted">View and manage contact submissions</p>
        </div>

        {/* Stats */}
        <div className="contact-stats-section mb-4">
          <div className="row">
            <div className="col-md-3">
              <div className="contact-stats-card card border">
                <div className="card-body text-center">
                  <h3 className="contact-stats-number">{contacts.length}</h3>
                  <p className="contact-stats-label text-muted mb-0">Total Contacts</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contacts Table */}
        <div className="contact-table-section">
          <div className="contact-table-card card border">
            <div className="contact-table-header card-header bg-light">
              <h5 className="mb-0">Contact Submissions</h5>
            </div>
            <div className="card-body p-0">
              {contacts.length === 0 ? (
                <div className="contact-empty-state text-center p-5">
                  <h5 className="text-muted">No contacts yet</h5>
                  <p className="text-muted">Contact submissions will appear here.</p>
                </div>
              ) : (
                <div className="contact-table-wrapper table-responsive">
                  <table className="contact-table table table-striped mb-0">
                    <thead>
                      <tr>
                        <th className="contact-th-name">Name</th>
                        <th className="contact-th-email">Email</th>
                        <th className="contact-th-phone">Phone</th>
                        <th className="contact-th-course">Course</th>
                        <th className="contact-th-message">Message</th>
                        <th className="contact-th-date">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.map((contact) => (
                        <tr key={contact._id} className="contact-table-row">
                          <td className="contact-td-name">
                            <strong>{contact.name}</strong>
                          </td>
                          <td className="contact-td-email">
                            {contact.email}
                          </td>
                          <td className="contact-td-phone">
                            {contact.phone}
                          </td>
                          <td className="contact-td-course">
                            <span className="badge bg-secondary">{contact.course}</span>
                          </td>
                          <td className="contact-td-message">
                            <div className="contact-message-text" title={contact.message}>
                              {contact.message}
                            </div>
                          </td>
                          <td className="contact-td-date">
                            <small className="text-muted">
                              {contact.createdAt ? formatDate(contact.createdAt) : 'N/A'}
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
        .contact-dashboard {
          background-color: #f8f9fa;
          min-height: 100vh;
        }

        .contact-main-title {
          color: #333;
          font-weight: 600;
        }

        .contact-subtitle {
          font-size: 1rem;
        }

        .contact-stats-card {
          border-radius: 8px;
        }

        .contact-stats-number {
          font-size: 2rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .contact-stats-label {
          font-size: 0.9rem;
          font-weight: 500;
        }

        .contact-table-card {
          border-radius: 8px;
        }

        .contact-table-header {
          border-bottom: 1px solid #dee2e6;
        }

        .contact-table th {
          font-weight: 600;
          color: #495057;
          border-bottom: 2px solid #dee2e6;
          padding: 1rem;
        }

        .contact-table td {
          padding: 1rem;
          vertical-align: middle;
        }

        .contact-table-row:hover {
          background-color: #f8f9fa;
        }

        .contact-message-text {
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .contact-empty-state {
          color: #6c757d;
        }

        .badge {
          font-size: 0.8rem;
          padding: 0.4rem 0.8rem;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .contact-main-title {
            font-size: 1.5rem;
          }

          .contact-table {
            font-size: 0.9rem;
          }

          .contact-message-text {
            max-width: 150px;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactDash;