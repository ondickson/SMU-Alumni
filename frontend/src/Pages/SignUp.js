import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    // Account Information
    email: '',
    password: '',
    confirmPassword: '',

    // step 2
    // Personal Information
    firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    birthday: '',
    idNo: '',

    // Father's Information
    fatherFirstName: '',
    fatherMiddleName: '',
    fatherLastName: '',
    fatherSuffix: '',

    // Mother's Information
    motherFirstName: '',
    motherMiddleName: '',
    motherLastName: '',
    motherSuffix: '',

    // step 3
    // Educational Information
    school: '',
    program: '',
    recentGraduate: '',
    elementarySMU: '',
    juniorHighSMU: '',
    seniorHighSMU: '',
    strandInSMU: '',
    tertiarySMU: '',
    nonGraduateSMU: '',
    achievements: ['', '', '', '', ''],

    // step 4
    // Employment and Contact Information
    employmentStatus: [],
    EmploymentStatus: '',
    currentWork: '',
    companyAddress: '',
    address: '',
    facebookAccount: '',
    contactNumber: '',

    // Files and Photos
    photo: null,
    curriculumVitae: null,
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState(null);
  const [cvFileName, setCvFileName] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
  
    if (type === 'file') {
      const file = files[0];
      setFormData({ ...formData, [name]: file });
  
      // Create preview for photo
      if (file && name === 'photo') {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPhotoPreview(reader.result); // Set the preview for photo
        };
        reader.readAsDataURL(file);
      }
  
      // Create preview for signature
      if (file && name === 'signature') {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSignaturePreview(reader.result); // Set the preview for signature
        };
        reader.readAsDataURL(file);
      }
  
      // Store CV filename for display
      if (file && name === 'curriculumVitae') {
        setCvFileName(file.name); // Store CV filename
      }
    } else {
      setFormData({ ...formData, [name]: value }); // Handle regular input changes
    }
  
    // Clear related errors when typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };
  

  const handleEmploymentStatusChange = (e) => {
  const { value, checked } = e.target;

  setFormData((prevData) => {
    const updatedEmploymentStatus = checked
      ? [...prevData.employmentStatus, value]
      : prevData.employmentStatus.filter((status) => status !== value);

    return {
      ...prevData,
      employmentStatus: updatedEmploymentStatus,
      otherEmploymentStatus: value === 'Other' && !checked ? '' : prevData.otherEmploymentStatus,
    };
  });
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
  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.birthday) newErrors.birthday = 'Birthday is required';
    if (!formData.idNo) newErrors.idNo = 'ID Number is required';

    if (!formData.fatherFirstName)
      newErrors.fatherFirstName = 'Father’s first name is required';
    if (!formData.fatherLastName)
      newErrors.fatherLastName = 'Father’s last name is required';

    if (!formData.motherFirstName)
      newErrors.motherFirstName = 'Mother’s first name is required';
    if (!formData.motherLastName)
      newErrors.motherLastName = 'Mother’s last name is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const errors = {};

    if (!formData.school) {
      errors.school = 'School/Level is required.';
    }

    if (!formData.program.trim()) {
      errors.program = 'Course/Program is required.';
    }

    if (!formData.recentGraduate) {
      errors.recentGraduate =
        'Please select if you graduated within the past five years.';
    }

    if (!formData.elementarySMU.trim()) {
      errors.elementarySMU =
        'Please indicate if you attended Grade School at SMU.';
    }

    if (!formData.juniorHighSMU.trim()) {
      errors.juniorHighSMU =
        'Please indicate if you attended Junior High at SMU.';
    }

    if (!formData.seniorHighSMU.trim()) {
      errors.seniorHighSMU =
        'Please indicate if you attended Senior High at SMU.';
    }

    if (!formData.strandInSMU.trim()) {
      errors.strandInSMU =
        'Please indicate your graduation strand or write N/A.';
    }

    if (!formData.tertiarySMU.trim()) {
      errors.tertiarySMU = 'Please indicate if you attended Tertiary at SMU.';
    }

    if (!formData.nonGraduateSMU.trim()) {
      errors.nonGraduateSMU =
        'Please indicate if you studied at SMU but did not graduate.';
    }

    if (formData.achievements.trim() && formData.achievements.split('\n').length < 5) {
      errors.achievements = 'You can list up to 5 achievements, but fewer is allowed.';
    }
    
    return errors;
  };

  const validateStep4 = (data) => {
    const errors = {};
  
    if (data.employmentStatus.length === 0) {
      errors.employmentStatus = 'Please select at least one employment status';
    }
  
    if (data.employmentStatus.includes('Other') && !data.otherEmploymentStatus) {
      errors.otherEmploymentStatus = 'Please specify your employment status';
    }
  
    if (!data.currentWork) {
      errors.currentWork = 'Current work is required';
    }
  
    if (!data.companyAddress) {
      errors.companyAddress = 'Company address is required';
    }
  
    if (!data.address) {
      errors.address = 'Address is required';
    }
  
    if (!data.facebookAccount) {
      errors.facebookAccount = 'Facebook account is required';
    }
  
    if (!data.contactNumber || !/^\d{10}$/.test(data.contactNumber)) {
      errors.contactNumber = 'Enter a valid 10-digit contact number';
    }
  
    if (!data.curriculumVitae) {
      errors.curriculumVitae = 'Curriculum Vitae is required';
    }
  
    if (!data.photo) {
      errors.photo = 'Profile photo is required';
    }
  
    return errors;
  };

  const nextStep = () => {
    let isValid = false;

    if (step === 1) isValid = validateStep1();
    else if (step === 2) isValid = validateStep2();
    else if (step === 3) isValid = validateStep3();
    else isValid = validateStep4(); // Ensure last step is validated before submitting

    if (!isValid) return;

    console.log('Before update:', step);
    setStep(step + 1);
    console.log('After update:', step);

    if (step < 4) {
      setStep(step + 1);
    } else {
      handleSubmit(); // Submit only at final step
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors
  
    if (!validateStep1() || !validateStep3() || !validateStep4(formData)) return;
  
    // Create a new FormData object to handle both text and files
    const formDataToSend = new FormData();
  
    // Step 1: Account Information
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('confirmPassword', formData.confirmPassword);
    
    // Step 2: Personal Information
    formDataToSend.append('idNo', formData.idNo);
    formDataToSend.append('firstName', formData.firstName);
    formDataToSend.append('middleName', formData.middleName);
    formDataToSend.append('lastName', formData.lastName);
    formDataToSend.append('suffix', formData.suffix);
    formDataToSend.append('birthday', formData.birthday);
  
    // Father's Information
    formDataToSend.append('fatherFirstName', formData.fatherFirstName);
    formDataToSend.append('fatherMiddleName', formData.fatherMiddleName);
    formDataToSend.append('fatherLastName', formData.fatherLastName);
    formDataToSend.append('fatherSuffix', formData.fatherSuffix);
  
    // Mother's Information
    formDataToSend.append('motherFirstName', formData.motherFirstName);
    formDataToSend.append('motherMiddleName', formData.motherMiddleName);
    formDataToSend.append('motherLastName', formData.motherLastName);
    formDataToSend.append('motherSuffix', formData.motherSuffix);
  
    // Step 3: Educational Information
    formDataToSend.append('school', formData.school);
    formDataToSend.append('program', formData.program);
    formDataToSend.append('recentGraduate', formData.recentGraduate);
    formDataToSend.append('elementarySMU', formData.elementarySMU);
    formDataToSend.append('juniorHighSMU', formData.juniorHighSMU);
    formDataToSend.append('seniorHighSMU', formData.seniorHighSMU);
    formDataToSend.append('strandInSMU', formData.strandInSMU);
    formDataToSend.append('tertiarySMU', formData.tertiarySMU);
    formDataToSend.append('nonGraduateSMU', formData.nonGraduateSMU);
    formDataToSend.append('achievements', JSON.stringify(formData.achievements));
  
    // Step 4: Employment and Contact Information
    formDataToSend.append('employmentStatus', JSON.stringify(formData.employmentStatus));
    formDataToSend.append('EmploymentStatus', formData.EmploymentStatus); // This seems like a duplicate
    formDataToSend.append('currentWork', formData.currentWork);
    formDataToSend.append('companyAddress', formData.companyAddress);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('facebookAccount', formData.facebookAccount);
    formDataToSend.append('contactNumber', formData.contactNumber);
  
    // Files
    if (formData.curriculumVitae) {
      formDataToSend.append('curriculumVitae', formData.curriculumVitae);
    }
  
    if (formData.photo) {
      formDataToSend.append('photo', formData.photo);
    }
  
    // **Debugging Console Logs**
    console.log("Form Data before submission:", formData);
    console.log("Formatted Data to be Sent:", formDataToSend);
  
    try {
      const response = await fetch("http://localhost:5001/api/auth/signup", {
        method: "POST",
        body: formDataToSend, // Notice that we no longer need headers for JSON
      });
  
      const data = await response.json();
      if (!response.ok) {
        console.error("Server Error Response:", data);
        setErrors({ general: data.message });
        return;
      }
  
      console.log("Server Response:", data);
      alert("Registration successful. Awaiting admin approval.");
      navigate("/login");
    } catch (error) {
      console.error("Error registering:", error);
      setErrors({ general: "Something went wrong. Please try again." });
    }
  };

  
  const renderStep1 = () => {
    return (
      <>
        <h2 className="step-title">Step 1: Account Information</h2>
        <div className="form-field">
          <label>
            Email <span className="required">*</span>
          </label>
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
          <label>
            Password <span className="required">*</span>
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`input-field ${errors.password ? 'input-error' : ''}`}
            placeholder="At least 8 characters"
            required
          />
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
        </div>

        <div className="form-field">
          <label>
            Confirm Password <span className="required">*</span>
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`input-field ${
              errors.confirmPassword ? 'input-error' : ''
            }`}
            placeholder="Confirm password"
            required
          />
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword}</p>
          )}
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
            <label>
              First Name 
            </label>
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
            <label>Middle Name</label>
            <input
              type="text"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter middle name"
            />
          </div>

          <div className="form-field">
            <label>
              Last Name 
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter Last name"
              // required
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
            <label>
              Birthday 
            </label>
            <input
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              className="input-field"
              // required
            />
          </div>

          <div className="form-field">
            <label>
              ID Number <span className="required">*</span>
            </label>
            <input
              type="text"
              name="idNo"
              value={formData.idNo}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter ID number"
              required
            />
          </div>
        </div>

        <div className="left-aligned">
          <h4 className="subsection-title">Father's Information</h4>
        </div>
        <div className="form-grid">
          <div className="form-field">
            <label>
              First Name 
            </label>
            <input
              type="text"
              name="fatherFirstName"
              value={formData.fatherFirstName}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter father's first name"
              // required
            />
          </div>

          <div className="form-field">
            <label>Middle Name</label>
            <input
              type="text"
              name="fatherMiddleName"
              value={formData.fatherMiddleName}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter father's middle name"
            />
          </div>

          <div className="form-field">
            <label>
              Last Name
            </label>
            <input
              type="text"
              name="fatherLastName"
              value={formData.fatherLastName}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter father's last name"
              // required
            />
          </div>

          <div className="form-field">
            <label>Suffix</label>
            <input
              type="text"
              name="fatherSuffix"
              value={formData.fatherSuffix}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter father's suffix (if applicable)"
            />
          </div>
        </div>

        <div className="left-aligned">
          <h4 className="subsection-title">Mother's Information</h4>
        </div>
        <div className="form-grid">
          <div className="form-field">
            <label>
              First Name 
            </label>
            <input
              type="text"
              name="motherFirstName"
              value={formData.motherFirstName}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter mother's first name"
              // required
            />
          </div>

          <div className="form-field">
            <label>Middle Name</label>
            <input
              type="text"
              name="motherMiddleName"
              value={formData.motherMiddleName}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter mother's middle name"
            />
          </div>

          <div className="form-field">
            <label>
              Last Name 
            </label>
            <input
              type="text"
              name="motherLastName"
              value={formData.motherLastName}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter mother's last name"
              // required
            />
          </div>

          <div className="form-field">
            <label>Suffix</label>
            <input
              type="text"
              name="motherSuffix"
              value={formData.motherSuffix}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter mother's suffix (if applicable)"
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
            <label>
              School/Level 
            </label>
            <select
              name="school"
              value={formData.school}
              onChange={handleChange}
              className="input-field"
              // required
            >
              <option value="" disabled>
                Select school/level
              </option>
              <option value="School of Accountancy and Business">
                School of Accountancy and Business
              </option>
              <option value="School of Engineering, Architecture, and Information Technology">
                School of Engineering, Architecture, and Information Technology
              </option>
              <option value="School of Health and Natural Sciences">
                School of Health and Natural Sciences
              </option>
              <option value="School of Teacher Education and Humanities">
                School of Teacher Education and Humanities
              </option>
              <option value="School of Graduate Studies">
                School of Graduate Studies
              </option>
              <option value="College of Law">College of Law</option>
              <option value="Grade School">Grade School</option>
              <option value="Junior High School">Junior High School</option>
              <option value="Senior High School">Senior High School</option>
            </select>
          </div>

          <div className="form-field">
            <label>
              Course/Program 
            </label>
            <input
              type="text"
              name="program"
              value={formData.program}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter course/program"
              // required
            />
          </div>

          <div className="form-field">
            <label>
              Are you a graduate for the past five years?{' '}
              
            </label>
            <select
              name="recentGraduate"
              value={formData.recentGraduate}
              onChange={handleChange}
              className="select-field"
              // required
            >
              <option value="">Select an option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div></div>
          <div className="form-field full-width">
            <label>
              Did you take your Grade School/Elementary in SMU?{' '}
              {/* <span className="required">*</span> */}
            </label>
            <input
              type="text"
              name="elementarySMU"
              value={formData.elementarySMU}
              onChange={handleChange}
              className="input-field"
              placeholder="If YES, indicate graduation year otherwise write NO"
              // required
            />
          </div>

          <div className="form-field full-width">
            <label>
              Did you take your Junior High School in SMU?{' '}
              
            </label>
            <input
              type="text"
              name="juniorHighSMU"
              value={formData.juniorHighSMU}
              onChange={handleChange}
              className="input-field"
              placeholder="If YES, indicate graduation year otherwise write NO"
              // required
            />
          </div>

          <div className="form-field full-width">
            <label>
              Did you take your Senior High School in SMU?{' '}
              
            </label>
            <input
              type="text"
              name="seniorHighSMU"
              value={formData.seniorHighSMU}
              onChange={handleChange}
              className="input-field"
              //  placeholder="If YES, indicate graduation year and STRAND otherwise write NO"
              placeholder="If YES, indicate graduation year otherwise write NO"
              // required
            />
            <input
              type="text"
              name="strandInSMU"
              value={formData.strandInSMU}
              onChange={handleChange}
              className="input-field"
              placeholder="If YES, indicate graduation STRAND otherwise write N/A"
              // required
            />
          </div>

          <div className="form-field full-width">
            <label>
              Did you take your tertiary education in SMU?{' '}
              
            </label>
            <input
              type="text"
              name="tertiarySMU"
              value={formData.tertiarySMU}
              onChange={handleChange}
              className="input-field"
              placeholder="If YES, indicate graduation year otherwise write NO"
              // required
            />
          </div>

          <div className="form-field full-width">
            <label>
              Did you study at SMU at any level but did not graduate/have a
              graduation ceremony? 
            </label>
            <input
              type="text"
              name="nonGraduateSMU"
              value={formData.nonGraduateSMU}
              onChange={handleChange}
              className="input-field"
              placeholder="If YES, indicate year and educational level otherwise write N/A"
              // required
            />
          </div>

          <div className="form-field full-width">
            <label>
              Top 5 Achievements 
            </label>
            <textarea
              name="achievements"
              value={formData.achievements}
              onChange={handleChange}
              className="input-field textarea"
              placeholder="List your top 5 achievements (one per line)"
              rows="5"
              // required
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

  const renderStep4 = () => {
    return (
      <>
        <h2 className="step-title">Step 4: Employment & Contact Information</h2>
        <div className="form-grid">
          {/* Employment Status Section */}
          <div className="form-field full-width">
            <label>
              Employment status (Select all that apply)
            </label>
            <div className="checkbox-group">
              {['Government Employee', 'Private Employee', 'Self-Employed', 'N/A', 'Other'].map((status) => (
                <div key={status} className="checkbox-item">
                  <input
                    type="checkbox"
                    id={status}
                    value={status}
                    checked={formData.employmentStatus.includes(status)}
                    onChange={handleEmploymentStatusChange}
                  />
                  <label htmlFor={status}>{status}</label>
                </div>
              ))}
            </div>
  
            {formData.employmentStatus.includes('Other') && (
              <div className="form-field">
                <input
                  type="text"
                  name="otherEmploymentStatus"
                  value={formData.otherEmploymentStatus}
                  onChange={handleChange}
                  className="input-field mt-2"
                  placeholder="Please specify other employment status"
                  required
                />
              </div>
            )}
          </div>
  
          {/* Current Work */}
          <div className="form-field">
            <label>
              Currently work <span className="required">*</span>
            </label>
            <input
              type="text"
              name="currentWork"
              value={formData.currentWork}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter current work"
              // required
            />
          </div>
  
          {/* Company Address */}
          <div className="form-field">
            <label>
              Company address <span className="required">*</span>
            </label>
            <input
              type="text"
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter company address"
              // required
            />
          </div>
  
          {/* Address */}
          <div className="form-field">
            <label>
              Address 
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter address"
              // required
            />
          </div>
  
          {/* Facebook Account */}
          <div className="form-field">
            <label>
              Facebook account 
            </label>
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
  
          {/* Contact Number */}
          <div className="form-field">
            <label>
              Contact number 
            </label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter contact number"
              // required
            />
          </div>
  
          {/* File Upload for Curriculum Vitae */}
          <div className="form-field">
            <label>
              Curriculum Vitae 
            </label>
            <div className="file-upload">
              <p>Drop your CV file here to upload</p>
              <input
                type="file"
                name="curriculumVitae"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                // required
              />
              {cvFileName && (
                <div className="file-name">
                  <p>Selected file: {cvFileName}</p>
                </div>
              )}
            </div>
          </div>
  
          {/* File Upload for Photo */}
          <div className="form-field">
            <label>
              Photo 
            </label>
            <div className="file-upload">
              <p>Drop your photo here to upload</p>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleChange}
                // required
              />
              {photoPreview && (
                <div className="photo-preview">
                  <img src={photoPreview} alt="Profile preview" />
                </div>
              )}
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
            Already have an account?{' '}
            <Link to="/login" className="link">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
