import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MdEmail,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
  MdArrowBack,
  MdCheckCircle,
  MdErrorOutline,
  MdPersonAdd,
} from 'react-icons/md';
import { FaGoogle, FaFacebook, FaSpinner } from 'react-icons/fa';
import styles from './login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // ── Get registered users from localStorage ──
  const getRegisteredUsers = () => {
    const users = localStorage.getItem('registeredUsers');
    return users ? JSON.parse(users) : [];
  };

  // ── Check if user exists ──
  const userExists = (email) => {
    const users = getRegisteredUsers();
    return users.some(user => user.email.toLowerCase() === email.toLowerCase());
  };

  // Real-time validation
  useEffect(() => {
    validateField('email', formData.email);
    validateField('password', formData.password);
  }, [formData.email, formData.password]);

  const validateField = (fieldName, value) => {
    let error = '';
    
    if (fieldName === 'email') {
      if (!value) {
        error = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = 'Please enter a valid email address';
      }
    }
    
    if (fieldName === 'password') {
      if (!value) {
        error = 'Password is required';
      } else if (value.length < 6) {
        error = 'Password must be at least 6 characters';
      }
    }
    
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
  };

  // ── Validate remember me checkbox ──
  const validateRememberMe = () => {
    if (!formData.rememberMe) {
      setApiError('Please check the "Remember me" box to continue');
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData({
      ...formData,
      [name]: newValue
    });
    
    if (apiError) setApiError('');
    if (successMessage) setSuccessMessage('');
    
    if (name === 'email' || name === 'password') {
      validateField(name, newValue);
    }
    
    // Clear remember me error when checkbox is checked
    if (name === 'rememberMe' && checked) {
      setApiError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    validateField('email', formData.email);
    validateField('password', formData.password);
    
    // ── Check if remember me is checked ──
    if (!validateRememberMe()) {
      return;
    }
    
    if (errors.email || errors.password || !formData.email || !formData.password) {
      setApiError('Please fix all errors before submitting');
      return;
    }
    
    // ── Check if user exists before login ──
    if (!userExists(formData.email)) {
      setApiError(
        <span>
          No account found with this email. Please{' '}
          <Link to="/signup" className={styles.errorLink}>
            sign up
          </Link>{' '}
          first to create an account.
        </span>
      );
      return;
    }
    
    setLoading(true);
    setApiError('');
    setSuccessMessage('');
    
    try {
      const response = await mockLoginAPI(formData);
      
      if (response.success) {
        const userData = {
          ...response.user,
          loginTime: new Date().toISOString()
        };
        
        // Since rememberMe is required, we always store in localStorage
        // This ensures the user stays logged in even after browser close
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', response.token);
        localStorage.setItem('isLoggedIn', 'true');
        
        setSuccessMessage('Login successful! Redirecting to dashboard...');
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        setApiError(response.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setApiError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const mockLoginAPI = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if user exists and password matches
        const users = getRegisteredUsers();
        const foundUser = users.find(
          user => user.email.toLowerCase() === data.email.toLowerCase() && 
                  user.password === data.password
        );

        if (foundUser) {
          resolve({
            success: true,
            user: {
              id: foundUser.id || Date.now(),
              name: foundUser.name || data.email.split('@')[0],
              email: data.email,
              role: foundUser.role || 'user',
              avatar: '👤',
              joinedDate: foundUser.joinedDate || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
            },
            token: 'mock-jwt-token-' + Date.now()
          });
        } else {
          // Check if user exists but password is wrong
          const userExists = users.some(
            user => user.email.toLowerCase() === data.email.toLowerCase()
          );
          
          if (userExists) {
            resolve({
              success: false,
              message: 'Incorrect password. Please try again.'
            });
          } else {
            resolve({
              success: false,
              message: 'Please sign up first to create an account.'
            });
          }
        }
      }, 1500);
    });
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') || sessionStorage.getItem('isLoggedIn');
    const user = localStorage.getItem('user') || sessionStorage.getItem('user');
    
    if (isLoggedIn && user) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        {/* Back to Home Button */}
        <Link to="/" className={styles.backHomeBtn}>
          <MdArrowBack size={18} /> Back to Home
        </Link>

        <div className={styles.loginHeader}>
          <h2 className={styles.loginTitle}>Welcome Back</h2>
          <p className={styles.loginSubtitle}>Log in to your Nexcent account</p>
        </div>

        {successMessage && (
          <div className={styles.successMessage}>
            <MdCheckCircle className={styles.successIcon} />
            {successMessage}
          </div>
        )}

        {apiError && (
          <div className={styles.apiError}>
            <MdErrorOutline className={styles.errorIcon} />
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.loginForm} noValidate>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email Address
              <span className={styles.required}>*</span>
            </label>
            <div className={styles.inputWrapper}>
              <MdEmail className={styles.inputIcon} />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                disabled={loading}
              />
            </div>
            {errors.email && (
              <span className={styles.errorMessage}>{errors.email}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
              <span className={styles.required}>*</span>
            </label>
            <div className={styles.inputWrapper}>
              <MdLock className={styles.inputIcon} />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                disabled={loading}
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
              </button>
            </div>
            {errors.password && (
              <span className={styles.errorMessage}>{errors.password}</span>
            )}
          </div>

          <div className={styles.formOptions}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className={`${styles.checkbox} ${!formData.rememberMe && apiError?.includes('Remember me') ? styles.checkboxError : ''}`}
                disabled={loading}
              />
              <span className={styles.checkboxText}>Remember me</span>
            </label>
            <Link to="/forgot-password" className={styles.forgotPassword}>
              Forgot Password?
            </Link>
          </div>

          <button 
            type="submit" 
            className={styles.loginBtn}
            disabled={loading}
          >
            {loading ? (
              <span className={styles.loadingSpinner}>
                <FaSpinner className={styles.spinner} />
                Logging in...
              </span>
            ) : (
              'Log In'
            )}
          </button>
        </form>

        <div className={styles.divider}>
          <span className={styles.dividerLine}></span>
          <span className={styles.dividerText}>or continue with</span>
          <span className={styles.dividerLine}></span>
        </div>

        <div className={styles.socialLogin}>
          <button className={styles.socialBtn} disabled={loading}>
            <FaGoogle className={styles.socialIcon} />
            Google
          </button>
          <button className={styles.socialBtn} disabled={loading}>
            <FaFacebook className={styles.socialIcon} />
            Facebook
          </button>
        </div>

        <div className={styles.loginFooter}>
          <p>
            Don't have an account?{' '}
            <Link to="/signup" className={styles.signupLink}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;