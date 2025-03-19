import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    middleName: '',
    familyName: '',
    suffix: '',
    idNumber: '',
    schoolLevel: '',
    courseProgram: '',
    isGraduateWithinFiveYears: '',
    gradeSchoolInSMU: '',
    juniorHighInSMU: '',
    seniorHighInSMU: '',
    tertiaryInSMU: '',
    studiedButNotGraduated: '',
    employmentStatus: '',
    currentWork: '',
    companyAddress: '',
    address: '',
    facebookAccount: '',
    contactNumber: '',
    photo: null
  });
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Clear related errors when typing
    if (errors[name]) {
      setErrors({...errors, [name]: ''});
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (step === 1 && !validateStep1()) {
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', formData);
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      alert('Error registering');
    }
  };

  // Render the first step with credentials
  const renderStep1 = () => {
    return (
      <>
        <h2 className="step-title">Step 1: Account Information</h2>
        <div className="form-field">
          <label>Email <span className="required">*</span></label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`input-field ${errors.email ? 'input-error' : ''}`}
            placeholder="Enter email"
            required
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        
        <div className="form-field">
          <label>Password <span className="required">*</span></label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`input-field ${errors.password ? 'input-error' : ''}`}
            placeholder="At least 8 characters"
            required
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        
        <div className="form-field">
          <label>Confirm Password <span className="required">*</span></label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`input-field ${errors.confirmPassword ? 'input-error' : ''}`}
            placeholder="Confirm password"
            required
          />
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
        </div>
        
        <div className="buttons-container">
          <button type="button" className="next-button" onClick={nextStep}>
            Next
          </button>
        </div>
      </>
    );
  };

  // Render the second step with personal information
  const renderStep2 = () => {
    return (
      <>
        <h2 className="step-title">Step 2: Personal Information</h2>
        <div className="form-grid">
          <div className="form-field">
            <label>First Name <span className="required">*</span></label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter first name"
              required
            />
          </div>
          
          <div className="form-field">
            <label>Middle Name <span className="required">*</span></label>
            <input
              type="text"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter middle name"
              required
            />
          </div>
          
          <div className="form-field">
            <label>Family Name <span className="required">*</span></label>
            <input
              type="text"
              name="familyName"
              value={formData.familyName}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter family name"
              required
            />
          </div>
          
          <div className="form-field">
            <label>Suffix </label>
            <input
              type="text"
              name="suffix"
              value={formData.suffix}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter suffix (if applicable)"
            
            />
          </div>
          
          <div className="form-field">
            <label>ID Number <span className="required">*</span></label>
            <input
              type="text"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter ID number"
              required
            />
          </div>
        </div>
        
        <div className="buttons-container">
          <button type="button" className="prev-button" onClick={prevStep}>
            Previous
          </button>
          <button type="button" className="next-button" onClick={nextStep}>
            Next
          </button>
        </div>
      </>
    );
  };

  // Render the third step with education information
  const renderStep3 = () => {
    return (
      <>
        <h2 className="step-title">Step 3: Education Information</h2>
        <div className="form-grid">
          <div className="form-field">
            <label>School/Level <span className="required">*</span></label>
            <input
              type="text"
              name="schoolLevel"
              value={formData.schoolLevel}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter school/level"
              required
            />
          </div>
          
          <div className="form-field">
            <label>Course/Program <span className="required">*</span></label>
            <input
              type="text"
              name="courseProgram"
              value={formData.courseProgram}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter course/program"
              required
            />
          </div>
          
          <div className="form-field">
            <label>Are you a graduate for the past five years? <span className="required">*</span></label>
            <select
              name="isGraduateWithinFiveYears"
              value={formData.isGraduateWithinFiveYears}
              onChange={handleChange}
              className="select-field"
              required
            >
              <option value="">Select an option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          
          <div className="form-field">
            <label>Did you take your Grade School/Elementary in SMU? <span className="required">*</span></label>
            <input
              type="text"
              name="gradeSchoolInSMU"
              value={formData.gradeSchoolInSMU}
              onChange={handleChange}
              className="input-field"
              placeholder="If yes, indicate graduation year otherwise write NO"
              required
            />
          </div>
          
          <div className="form-field">
            <label>Did you take your Junior High School in SMU? <span className="required">*</span></label>
            <input
              type="text"
              name="juniorHighInSMU"
              value={formData.juniorHighInSMU}
              onChange={handleChange}
              className="input-field"
              placeholder="If yes, indicate graduation year otherwise write NO"
              required
            />
          </div>
          
          <div className="form-field">
            <label>Did you take your Senior High School in SMU? <span className="required">*</span></label>
            <input
              type="text"
              name="seniorHighInSMU"
              value={formData.seniorHighInSMU}
              onChange={handleChange}
              className="input-field"
              placeholder="If yes, indicate graduation year and STRAND otherwise write NO"
              required
            />
          </div>
          
          <div className="form-field">
            <label>Did you take your tertiary education in SMU? <span className="required">*</span></label>
            <input
              type="text"
              name="tertiaryInSMU"
              value={formData.tertiaryInSMU}
              onChange={handleChange}
              className="input-field"
              placeholder="If yes, indicate graduation year otherwise write NO"
              required
            />
          </div>
          
          <div className="form-field full-width">
            <label>
              Did you study at SMU at any level but did not graduate/have a graduation ceremony? <span className="required">*</span>
            </label>
            <input
              type="text"
              name="studiedButNotGraduated"
              value={formData.studiedButNotGraduated}
              onChange={handleChange}
              className="input-field"
              placeholder="If yes, indicate year and educational level otherwise write N/A"
              required
            />
          </div>
        </div>
        
        <div className="buttons-container">
          <button type="button" className="prev-button" onClick={prevStep}>
            Previous
          </button>
          <button type="button" className="next-button" onClick={nextStep}>
            Next
          </button>
        </div>
      </>
    );
  };

  // Render the fourth step with employment and contact information
  const renderStep4 = () => {
    return (
      <>
        <h2 className="step-title">Step 4: Employment & Contact Information</h2>
        <div className="form-grid">
          <div className="form-field">
            <label>Employment status <span className="required">*</span></label>
            <select
              name="employmentStatus"
              value={formData.employmentStatus}
              onChange={handleChange}
              className="select-field"
              required
            >
              <option value="">Select status</option>
              <option value="Government Employee">Government Employee</option>
              <option value="Private Employee">Private Employee</option>
              <option value="Self-Employed">Self-Employed</option>
              <option value="N/A">N/A</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="form-field">
            <label>Currently work <span className="required">*</span></label>
            <input
              type="text"
              name="currentWork"
              value={formData.currentWork}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter current work"
              required
            />
          </div>
          
          <div className="form-field">
            <label>Company address <span className="required">*</span></label>
            <input
              type="text"
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter company address"
              required
            />
          </div>
          
          <div className="form-field">
            <label>Address <span className="required">*</span></label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter address"
              required
            />
          </div>
          
          <div className="form-field">
            <label>Facebook account <span className="required">*</span></label>
            <input
              type="text"
              name="facebookAccount"
              value={formData.facebookAccount}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter Facebook account"
              required
            />
          </div>
          
          <div className="form-field">
            <label>Contact number <span className="required">*</span></label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter contact number"
              required
            />
          </div>
          
          <div className="form-field">
            <label>Photo <span className="required">*</span></label>
            <div className="file-upload">
              <p>Drop your files here to upload</p>
              <input
                type="file"
                name="photo"
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        
        <div className="buttons-container">
          <button type="button" className="prev-button" onClick={prevStep}>
            Previous
          </button>
          <button type="submit" className="signup-button">
            Submit
          </button>
        </div>
      </>
    );
  };

  // Render steps indicator
  const renderStepIndicator = () => {
    return (
      <div className="steps-indicator">
        <div className={`step-circle ${step >= 1 ? 'active' : ''}`}></div>
        <div className="step-line"></div>
        <div className={`step-circle ${step >= 2 ? 'active' : ''}`}></div>
        <div className="step-line"></div>
        <div className={`step-circle ${step >= 3 ? 'active' : ''}`}></div>
        <div className="step-line"></div>
        <div className={`step-circle ${step >= 4 ? 'active' : ''}`}></div>
      </div>
    );
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <img src="/smulogo.png" alt="SMU Logo" className="form-logo" />
        <h1 className="signup-title">Alumni Directory</h1>
        
        {renderStepIndicator()}
        
        <form onSubmit={handleSubmit}>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
          
          <p className="signup-text">
            Already have an account? <Link to="/login" className="link">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;