import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Loader2 } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email: formData.email, password: formData.password });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      {/* Bootstrap CSS */}
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap.min.css" 
        rel="stylesheet" 
      />
      
      {/* Custom Styles */}
      <style>{`
        body {
          background-color: #0f172a !important;
        }
        
        .login-container {
          min-height: 100vh;
          background-color: #0f172a;
        }
        
        .login-card {
          background-color: #1e293b;
          border: 1px solid #374151;
          border-radius: 1.5rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        
        .form-label {
          color: #cbd5e1;
          font-weight: 500;
          font-size: 0.875rem;
        }
        
        .form-control-custom {
          background-color: #374151;
          border: 1px solid #4b5563;
          border-radius: 0.75rem;
          color: white;
          padding-left: 2.5rem;
          padding-right: 1rem;
          padding-top: 0.75rem;
          padding-bottom: 0.75rem;
          position: relative;
        }
        
        .form-control-custom:focus {
          background-color: #374151;
          border-color: #3b82f6;
          box-shadow: 0 0 0 0.125rem rgba(59, 130, 246, 0.25);
          color: white;
        }
        
        .form-control-custom::placeholder {
          color: #9ca3af;
        }
        
        .form-control-password {
          padding-right: 3rem;
        }
        
        .input-icon {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          z-index: 3;
          pointer-events: none;
        }
        
        .password-toggle {
          position: absolute;
          right: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #9ca3af;
          cursor: pointer;
          z-index: 3;
          transition: color 0.2s;
          padding: 0;
        }
        
        .password-toggle:hover {
          color: #cbd5e1;
        }
        
        .btn-primary-custom {
          background-color: #1d4ed8;
          border-color: #1d4ed8;
          border-radius: 0.75rem;
          font-weight: 500;
          padding: 0.75rem 1rem;
          transition: all 0.2s;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .btn-primary-custom:hover {
          background-color: #2563eb;
          border-color: #2563eb;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        
        .btn-primary-custom:focus {
          background-color: #1d4ed8;
          border-color: #1d4ed8;
          box-shadow: 0 0 0 0.125rem rgba(59, 130, 246, 0.25), 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .btn-primary-custom:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .forgot-password {
          color: #60a5fa;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.875rem;
          transition: color 0.2s;
        }
        
        .forgot-password:hover {
          color: #93c5fd;
        }
        
        .footer-text {
          color: #6b7280;
          font-size: 0.875rem;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .spinner {
          animation: spin 1s linear infinite;
        }
      `}</style>

      <div className="login-container d-flex align-items-center justify-content-center p-4">
        <div className="w-100" style={{ maxWidth: '28rem' }}>
          
          {/* Form Card */}
          <div className="login-card p-4 p-md-5">
            
              {/* Email */}
              <div className="mb-4">
                <label className="form-label">Email Address</label>
                <div className="position-relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                    className="form-control form-control-custom"
                    placeholder="Enter your email"
                  />
                  <Mail className="input-icon" size={20} />
                </div>
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="form-label">Password</label>
                <div className="position-relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                    className="form-control form-control-custom form-control-password"
                    placeholder="Enter your password"
                  />
                  <Lock className="input-icon" size={20} />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="d-flex justify-content-end mb-4">
                <button
                  type="button"
                  className="btn btn-link p-0 forgot-password"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoggingIn}
                className="btn btn-primary-custom w-100"
              >
                {isLoggingIn ? (
                  <div className="d-flex align-items-center justify-content-center">
                    <Loader2 className="spinner me-2" size={20} />
                    Signing In...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
              
          </div>

          {/* Footer */}
          <div className="text-center mt-4">
            <p className="footer-text mb-0">Protected by enterprise-grade security</p>
          </div>
        </div>
      </div>
      
      {/* Bootstrap JS (optional, only if you need Bootstrap's JavaScript features) */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/js/bootstrap.bundle.min.js"></script>
    </>
  );
}