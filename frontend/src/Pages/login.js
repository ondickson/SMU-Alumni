import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const navigate = useNavigate();

  // Sample carousel content - replace with your actual images and content
  const carouselSlides = [
    {
      image:
        'https://smu.edu.ph/wp-content/uploads/2023/09/366365685_3612711768995875_4613685649229899442_n.jpg',
      title: 'Campus Life',
      description: 'Experience the vibrant SMU community',
    },
    {
      image:
        'https://smu.edu.ph/wp-content/uploads/2023/09/382548523_217296047805896_1706455415830682916_n.jpg',
      title: 'Alumni Connections',
      description: 'Building networks that last a lifetime',
    },
    {
      image: 'https://smu.edu.ph/wp-content/uploads/2024/08/medtech.png',
      title: 'Medical Technology',
      description: 'Advancing healthcare through innovative education',
    },
  ];

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === carouselSlides.length - 1 ? 0 : prev + 1,
      );
    }, 5001);
    return () => clearInterval(interval);
  }, [carouselSlides.length]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailTouched(true);
    setPasswordTouched(true);

    if (!email || !password) {
      return;
    }

    try {
      const res = await axios.post('http://localhost:5001/api/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);

      // Store the user data (alumni or admin) in localStorage
      const userData = res.data.user; // Extract user data from the response
      localStorage.setItem('user', JSON.stringify(userData));
      const user = JSON.parse(localStorage.getItem('user'));
      console.log(user.firstName, user.lastName, user.email); // should print the user's name now

      localStorage.setItem(
        'alumni',
        JSON.stringify({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          idNo: user.idNo,
        }),
      );

      if (res.data.role === 'admin') {
        navigate('/AdminDashboard');
      } else {
        navigate('/AlumniDashboard');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error); // Show backend error message
      } else {
        alert('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="header">
        <img src="/smulogo.png" alt="SMU Logo" className="header-logo" />
        <h1 className="header-title">Alumni Management System</h1>
      </div>

      <div className="login-container">
        {/* Carousel Section */}
        <div className="carousel-container">
          {carouselSlides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-slide ${
                index === currentSlide ? 'active' : ''
              }`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="carousel-content">
                <h2>{slide.title}</h2>
                <p>{slide.description}</p>
              </div>
            </div>
          ))}
          <div className="carousel-indicators">
            {carouselSlides.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${
                  index === currentSlide ? 'active' : ''
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* Login Form Section */}
        <div className="login-form-container">
          <div className="logo-section">
            <img src="/smulogo.png" alt="SMU Logo" className="form-logo" />
            <h1 className="form-title">Alumni Management System</h1>
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setEmailTouched(true)}
                required
              />
              {emailTouched && !email && (
                <div className="field-required">Field is required.</div>
              )}
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-field">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setPasswordTouched(true)}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  )}
                </button>
              </div>
              {passwordTouched && !password && (
                <div className="field-required">Field is required.</div>
              )}
            </div>

            <button type="submit" className="login-button">
              LOGIN
            </button>

            <p className="signup-text">
              Don't have an account? <a href="/SignUp">Sign Up</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
