import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MdPerson,
  MdEmail,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
  MdArrowBack,
  MdCheckCircle,
  MdErrorOutline,
  MdCheck,
  MdClose,
} from 'react-icons/md';
import { FaGoogle, FaFacebook, FaSpinner } from 'react-icons/fa';
import styles from './signup.module.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');

  // Password strength checker
  useEffect(() => {
    const checkPasswordStrength = (password) => {
      if (!password) {
        setPasswordStrength('');
        return;
      }

      let strength = 0;
      if (password.length >= 8) strength++;
      if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
      if (password.match(/[0-9]/)) strength++;
      if (password.match(/[^a-zA-Z0-9]/)) strength++;

      const strengthMap = ['', 'Weak', 'Medium', 'Strong', 'Very Strong'];
      setPasswordStrength(strengthMap[strength] || '');
    };

    checkPasswordStrength(formData.password);
  }, [formData.password]);

  // Real-time validation
  useEffect(() => {
    validateField('fullName', formData.fullName);
    validateField('email', formData.email);
    validateField('password', formData.password);
    if (formData.confirmPassword) {
      validateField('confirmPassword', formData.confirmPassword);
    }
  }, [formData.fullName, formData.email, formData.password, formData.confirmPassword]);

  const validateField = (fieldName, value) => {
    let error = '';

    if (fieldName === 'fullName') {
      if (!value) {
        error = 'Full name is required';
      } else if (value.length < 2) {
        error = 'Name must be at least 2 characters';
      }
    }

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

    if (fieldName === 'confirmPassword') {
      if (!value) {
        error = 'Please confirm your password';
      } else if (value !== formData.password) {
        error = 'Passwords do not match';
      }
    }

    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
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

    if (['fullName', 'email', 'password', 'confirmPassword'].includes(name)) {
      validateField(name, newValue);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    validateField('fullName', formData.fullName);
    validateField('email', formData.email);
    validateField('password', formData.password);
    validateField('confirmPassword', formData.confirmPassword);

    if (!formData.agreeTerms) {
      setApiError('Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    if (errors.fullName || errors.email || errors.password || errors.confirmPassword) {
      setApiError('Please fix all errors before submitting');
      return;
    }

    setLoading(true);
    setApiError('');
    setSuccessMessage('');

    try {
      const response = await mockSignupAPI(formData);

      if (response.success) {
        setSuccessMessage('Account created successfully! Redirecting to login...');

        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        setApiError(response.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      setApiError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  // ── Updated mockSignupAPI to store users in localStorage ──
  const mockSignupAPI = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Get existing users from localStorage
        const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        
        // Check if email already exists
        const userExists = existingUsers.some(user => user.email.toLowerCase() === data.email.toLowerCase());
        
        if (userExists) {
          resolve({
            success: false,
            message: 'This email is already registered. Please use a different email or login.'
          });
        } else {
          // Create new user
          const newUser = {
            id: Date.now(),
            name: data.fullName,
            email: data.email,
            password: data.password,
            role: 'user',
            joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
          };
          
          // Add user to registered users
          existingUsers.push(newUser);
          localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
          
          resolve({
            success: true,
            user: {
              id: newUser.id,
              name: newUser.name,
              email: newUser.email,
              role: newUser.role,
              joinedDate: newUser.joinedDate
            }
          });
        }
      }, 1500);
    });
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') || sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupCard}>
        <Link to="/" className={styles.backHomeBtn}>
          <MdArrowBack size={18} /> Back to Home
        </Link>

        <div className={styles.signupHeader}>
          <h2 className={styles.signupTitle}>Create Account</h2>
          <p className={styles.signupSubtitle}>Join Nexcent today</p>
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

        <form onSubmit={handleSubmit} className={styles.signupForm} noValidate>
          <div className={styles.formGroup}>
            <label htmlFor="fullName" className={styles.label}>
              Full Name
              <span className={styles.required}>*</span>
            </label>
            <div className={styles.inputWrapper}>
              <MdPerson className={styles.inputIcon} />
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`${styles.input} ${errors.fullName ? styles.inputError : ''}`}
                disabled={loading}
              />
            </div>
            {errors.fullName && (
              <span className={styles.errorMessage}>{errors.fullName}</span>
            )}
          </div>

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
                placeholder="Create a password"
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

            {/* Password Strength */}
            {formData.password && (
              <div className={styles.passwordStrength}>
                <div className={styles.strengthBar}>
                  <div className={`${styles.strengthSegment} ${passwordStrength === 'Weak' ? styles.weak : ''}`}></div>
                  <div className={`${styles.strengthSegment} ${passwordStrength === 'Medium' || passwordStrength === 'Strong' || passwordStrength === 'Very Strong' ? styles.medium : ''}`}></div>
                  <div className={`${styles.strengthSegment} ${passwordStrength === 'Strong' || passwordStrength === 'Very Strong' ? styles.strong : ''}`}></div>
                  <div className={`${styles.strengthSegment} ${passwordStrength === 'Very Strong' ? styles.veryStrong : ''}`}></div>
                </div>
                {passwordStrength && (
                  <span className={`${styles.strengthText} ${styles[passwordStrength.toLowerCase().replace(' ', '')]}`}>
                    {passwordStrength}
                  </span>
                )}
              </div>
            )}

            {/* Password Requirements */}
            <div className={styles.passwordRequirements}>
              <span className={`${styles.passwordRequirement} ${formData.password.length >= 8 ? styles.met : ''}`}>
                {formData.password.length >= 8 ? <MdCheck className={styles.check} /> : <MdClose className={styles.cross} />}
                At least 8 characters
              </span>
              <span className={`${styles.passwordRequirement} ${/[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password) ? styles.met : ''}`}>
                {/[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password) ? <MdCheck className={styles.check} /> : <MdClose className={styles.cross} />}
                Contains uppercase & lowercase
              </span>
              <span className={`${styles.passwordRequirement} ${/[0-9]/.test(formData.password) ? styles.met : ''}`}>
                {/[0-9]/.test(formData.password) ? <MdCheck className={styles.check} /> : <MdClose className={styles.cross} />}
                Contains a number
              </span>
              <span className={`${styles.passwordRequirement} ${/[^a-zA-Z0-9]/.test(formData.password) ? styles.met : ''}`}>
                {/[^a-zA-Z0-9]/.test(formData.password) ? <MdCheck className={styles.check} /> : <MdClose className={styles.cross} />}
                Contains a special character
              </span>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm Password
              <span className={styles.required}>*</span>
            </label>
            <div className={styles.inputWrapper}>
              <MdLock className={styles.inputIcon} />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
                disabled={loading}
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={loading}
              >
                {showConfirmPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className={styles.errorMessage}>{errors.confirmPassword}</span>
            )}
          </div>

          <div className={styles.formOptions}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className={styles.checkbox}
                disabled={loading}
              />
              <span className={styles.checkboxText}>
                I agree to the{' '}
                <Link to="/terms" className={styles.termsLink}>
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className={styles.termsLink}>
                  Privacy Policy
                </Link>
              </span>
            </label>
          </div>

          <button
            type="submit"
            className={styles.signupBtn}
            disabled={loading}
          >
            {loading ? (
              <span className={styles.loadingSpinner}>
                <FaSpinner className={styles.spinner} />
                Creating Account...
              </span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className={styles.divider}>
          <span className={styles.dividerLine}></span>
          <span className={styles.dividerText}>or continue with</span>
          <span className={styles.dividerLine}></span>
        </div>

        <div className={styles.socialSignup}>
          <button className={styles.socialBtn} disabled={loading}>
            <FaGoogle className={styles.socialIcon} />
            Google
          </button>
          <button className={styles.socialBtn} disabled={loading}>
            <FaFacebook className={styles.socialIcon} />
            Facebook
          </button>
        </div>

        <div className={styles.signupFooter}>
          <p>
            Already have an account?{' '}
            <Link to="/login" className={styles.loginLink}>
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;