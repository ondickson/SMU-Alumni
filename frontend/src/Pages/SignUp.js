import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
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

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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

  return (
    <div className="signup-container">
      <div className="signup-box">
      <img src="/smulogo.png" alt="SMU Logo" className="form-logo" />
        <h1 className="signup-title"> Alumni Directory</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-field">
              <label>Email <span className="required">*</span></label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter email"
                required
              />
            </div>
            
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
              <label>Suffix <span className="required">*</span></label>
              <input
                type="text"
                name="suffix"
                value={formData.suffix}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter suffix (if applicable)"
                required
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
          
          <button type="submit" className="signup-button">
            Submit
          </button>
          
          <p className="signup-text">
            Already have an account? <Link to="/login" className="link">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;