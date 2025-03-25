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
    topAchievements: ['', '', '', '', ''],

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
          setPhotoPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }

      // Create preview for signature
      if (file && name === 'signature') {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSignaturePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }

      // Store CV filename
      if (file && name === 'curriculumVitae') {
        setCvFileName(file.name);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Clear related errors when typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // Handle checkbox changes for employment status
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

    if (!formData.topAchievements.trim()) {
      errors.topAchievements = 'Please list your top 5 achievements.';
    } else if (formData.topAchievements.split('\n').length < 5) {
      errors.topAchievements =
        'You must list at least 5 achievements (one per line).';
    }

    return errors;
  };

  const validateStep4 = (data) => {
    const errors = {};

    if (data.employmentStatus.length === 0) {
      errors.employmentStatus = 'Please select at least one employment status';
    }

    if (
      data.employmentStatus.includes('Other') &&
      !data.otherEmploymentStatus
    ) {
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
  
    const formDataToSend = {
      // Step 1: Account Information
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      
      // Step 2: Personal Information
      idNo: formData.idNo,
      firstName: formData.firstName,
      middleName: formData.middleName,
      lastName: formData.lastName,
      suffix: formData.suffix,
      birthday: formData.birthday,
  
      // Father's Information
      fatherFirstName: formData.fatherFirstName,
      fatherMiddleName: formData.fatherMiddleName,
      fatherLastName: formData.fatherLastName,
      fatherSuffix: formData.fatherSuffix,
  
      // Mother's Information
      motherFirstName: formData.motherFirstName,
      motherMiddleName: formData.motherMiddleName,
      motherLastName: formData.motherLastName,
      motherSuffix: formData.motherSuffix,
  
      // Step 3: Educational Information
      school: formData.school,
      program: formData.program,
      recentGraduate: formData.recentGraduate,
      elementarySMU: formData.elementarySMU,
      juniorHighSMU: formData.juniorHighSMU,
      seniorHighSMU: formData.seniorHighSMU,
      strandInSMU: formData.strandInSMU,
      tertiarySMU: formData.tertiarySMU,
      nonGraduateSMU: formData.nonGraduateSMU,
      topAchievements: formData.topAchievements,
  
      // Step 4: Employment and Contact Information
      employmentStatus: formData.employmentStatus,
      EmploymentStatus: formData.EmploymentStatus, // Note: This key is duplicated, check if it's intentional.
      currentWork: formData.currentWork,
      companyAddress: formData.companyAddress,
      address: formData.address,
      facebookAccount: formData.facebookAccount,
      contactNumber: formData.contactNumber,
      curriculumVitae: formData.curriculumVitae,
      photo: formData.photo
    };
  
    // **Debugging Console Logs**
    // console.log("Form Data before submission:", formData);
    // console.log("Formatted Data to be Sent:", formDataToSend);
  
    try {
      const response = await fetch("http://localhost:5001/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataToSend),
      });
  
      const data = await response.json();
      if (!response.ok) {
        console.error("Server Error Response:", data);
        setErrors({ general: data.message });
        return;
      }
  
      console.log("Server Response:", data);
      alert("Registration successful. Awaiting admin approval.");
    } catch (error) {
      console.error("Error registering:", error);
      setErrors({ general: "Something went wrong. Please try again." });
    }
  };
  
  

  // Render the first step with credentials
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
              First Name <span className="required">*</span>
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
              Last Name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter Last name"
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
            <label>
              Birthday <span className="required">*</span>
            </label>
            <input
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              className="input-field"
              required
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
              First Name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="fatherFirstName"
              value={formData.fatherFirstName}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter father's first name"
              required
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
              Last Name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="fatherLastName"
              value={formData.fatherLastName}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter father's last name"
              required
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
              First Name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="motherFirstName"
              value={formData.motherFirstName}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter mother's first name"
              required
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
              Last Name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="motherLastName"
              value={formData.motherLastName}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter mother's last name"
              required
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
              School/Level <span className="required">*</span>
            </label>
            <select
              name="school"
              value={formData.school}
              onChange={handleChange}
              className="input-field"
              required
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
              Course/Program <span className="required">*</span>
            </label>
            <input
              type="text"
              name="program"
              value={formData.program}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter course/program"
              required
            />
          </div>

          <div className="form-field">
            <label>
              Are you a graduate for the past five years?{' '}
              <span className="required">*</span>
            </label>
            <select
              name="recentGraduate"
              value={formData.recentGraduate}
              onChange={handleChange}
              className="select-field"
              required
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
              <span className="required">*</span>
            </label>
            <input
              type="text"
              name="elementarySMU"
              value={formData.elementarySMU}
              onChange={handleChange}
              className="input-field"
              placeholder="If YES, indicate graduation year otherwise write NO"
              required
            />
          </div>

          <div className="form-field full-width">
            <label>
              Did you take your Junior High School in SMU?{' '}
              <span className="required">*</span>
            </label>
            <input
              type="text"
              name="juniorHighSMU"
              value={formData.juniorHighSMU}
              onChange={handleChange}
              className="input-field"
              placeholder="If YES, indicate graduation year otherwise write NO"
              required
            />
          </div>

          <div className="form-field full-width">
            <label>
              Did you take your Senior High School in SMU?{' '}
              <span className="required">*</span>
            </label>
            <input
              type="text"
              name="seniorHighSMU"
              value={formData.seniorHighSMU}
              onChange={handleChange}
              className="input-field"
              //  placeholder="If YES, indicate graduation year and STRAND otherwise write NO"
              placeholder="If YES, indicate graduation year otherwise write NO"
              required
            />
            <input
              type="text"
              name="strandInSMU"
              value={formData.strandInSMU}
              onChange={handleChange}
              className="input-field"
              placeholder="If YES, indicate graduation STRAND otherwise write N/A"
              required
            />
          </div>

          <div className="form-field full-width">
            <label>
              Did you take your tertiary education in SMU?{' '}
              <span className="required">*</span>
            </label>
            <input
              type="text"
              name="tertiarySMU"
              value={formData.tertiarySMU}
              onChange={handleChange}
              className="input-field"
              placeholder="If YES, indicate graduation year otherwise write NO"
              required
            />
          </div>

          <div className="form-field full-width">
            <label>
              Did you study at SMU at any level but did not graduate/have a
              graduation ceremony? <span className="required">*</span>
            </label>
            <input
              type="text"
              name="nonGraduateSMU"
              value={formData.nonGraduateSMU}
              onChange={handleChange}
              className="input-field"
              placeholder="If YES, indicate year and educational level otherwise write N/A"
              required
            />
          </div>

          <div className="form-field full-width">
            <label>
              Top 5 Achievements <span className="required">*</span>
            </label>
            <textarea
              name="topAchievements"
              value={formData.topAchievements}
              onChange={handleChange}
              className="input-field textarea"
              placeholder="List your top 5 achievements (one per line)"
              rows="5"
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
          <div className="form-field full-width">
            <label>
              Employment status <span className="required">*</span> (Select all
              that apply)
            </label>
            <div className="checkbox-group">
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="government"
                  value="Government Employee"
                  checked={formData.employmentStatus.includes(
                    'Government Employee',
                  )}
                  onChange={handleEmploymentStatusChange}
                />
                <label htmlFor="government">Government Employee</label>
              </div>

              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="private"
                  value="Private Employee"
                  checked={formData.employmentStatus.includes(
                    'Private Employee',
                  )}
                  onChange={handleEmploymentStatusChange}
                />
                <label htmlFor="private">Private Employee</label>
              </div>

              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="self-employed"
                  value="Self-Employed"
                  checked={formData.employmentStatus.includes('Self-Employed')}
                  onChange={handleEmploymentStatusChange}
                />
                <label htmlFor="self-employed">Self-Employed</label>
              </div>

              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="na"
                  value="N/A"
                  checked={formData.employmentStatus.includes('N/A')}
                  onChange={handleEmploymentStatusChange}
                />
                <label htmlFor="na">N/A</label>
              </div>

              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="other"
                  value="Other"
                  checked={formData.employmentStatus.includes('Other')}
                  onChange={handleEmploymentStatusChange}
                />
                <label htmlFor="other">Other</label>
              </div>
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
              required
            />
          </div>

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
              required
            />
          </div>

          <div className="form-field">
            <label>
              Address <span className="required">*</span>
            </label>
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
            <label>
              Facebook account <span className="required">*</span>
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

          <div className="form-field">
            <label>
              Contact number <span className="required">*</span>
            </label>
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

          <div className="form-field"></div>

          <div className="form-field">
            <label>
              Curriculum Vitae <span className="required">*</span>
            </label>
            <div className="file-upload">
              <p>Drop your CV file here to upload</p>
              <input
                type="file"
                name="curriculumVitae"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                required
              />
              {cvFileName && (
                <div className="file-name">
                  <p>Selected file: {cvFileName}</p>
                </div>
              )}
            </div>
            <label>
              Photo <span className="required">*</span>
            </label>
            <div className="file-upload">
              <p>Drop your files here to upload</p>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleChange}
                required
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
