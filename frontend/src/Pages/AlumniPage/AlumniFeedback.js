import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AlumniFeedback.css';
import Sidebar from '../Sidebar';

const AlumniFeedback = () => {
  const [formData, setFormData] = useState({
    // Academic involvement
    academic: [],
    otherAcademic: '',

    // Administrative involvement
    administrative: [],
    otherAdministrative: '',

    // Finance/Development involvement
    finance: [],
    otherFinance: '',

    // Other feedback
    importantThings: '',
    suggestions: '',
    alumniList: '',
  });

  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState(''); // 'success' | 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle checkbox changes
  const handleCheckboxChange = (category, value) => {
    setFormData((prev) => {
      const updatedCategory = prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value];
      return { ...prev, [category]: updatedCategory };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        'http://localhost:5001/api/feedback/submit',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        },
      );

      const result = await response.json();

      if (response.ok) {
        setStatusMessage(result.message || 'Feedback submitted successfully!');
        setStatusType('success');

        // ✅ Reset form fields
      setFormData({
        academic: [],
        otherAcademic: '',
        administrative: [],
        otherAdministrative: '',
        finance: [],
        otherFinance: '',
        importantThings: '',
        suggestions: '',
        alumniList: '',
      });
      } else {
        setStatusMessage(
          result.message || 'Submission failed. Please try again.',
        );
        setStatusType('error');
      }
    } catch (error) {
      setStatusMessage('An error occurred. Please try again.');
      setStatusType('error');
    }

    // Auto-clear message after 5 seconds
    setTimeout(() => {
      setStatusMessage('');
      setStatusType('');
    }, 5000);
  };

  return (
    <div className="feedbck">
      <Sidebar />
      <div className="feedback-content">
        <div className="feedback-card">
          <div className="card-header">
            <img src="/smulogo.png" alt="SMU Logo" className="form-logo" />
            <h1 className="feedback-title">Alumni Feedback Form</h1>
          </div>

          <form onSubmit={handleSubmit} className="feedback-form">
            <h2 className="section-title">Areas of Involvement</h2>
            <p className="section-description">
              As a graduate (an alumnus/alumna), in what area and in what ways
              would you like yourself to be involved in the affairs of your Alma
              Mater?
            </p>

            {/* Academic Section */}
            <div className="section">
              <h3 className="subsection-title">❖ Academic</h3>
              <div className="checkbox-group">
                {[
                  'Voluntary Consultancy Service',
                  'As a member of the pool of Resource Speaker in and out of the university',
                  'Curriculum Development/enrichment',
                  'Volunteer Researcher of the University',
                  'Volunteer Guest Lecture in the University',
                ].map((item) => (
                  <div key={item} className="checkbox-item">
                    <input
                      type="checkbox"
                      id={item.replace(/\s+/g, '-').toLowerCase()}
                      checked={formData.academic.includes(item)}
                      onChange={() => handleCheckboxChange('academic', item)}
                    />
                    <label htmlFor={item.replace(/\s+/g, '-').toLowerCase()}>
                      {item}
                    </label>
                  </div>
                ))}
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="other-academic"
                    checked={formData.academic.includes('Other')}
                    onChange={() => handleCheckboxChange('academic', 'Other')}
                  />
                  <label htmlFor="other-academic">Other</label>
                </div>

                {formData.academic.includes('Other') && (
                  <div className="form-field">
                    <input
                      type="text"
                      name="otherAcademic"
                      value={formData.otherAcademic}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Please specify other academic involvement"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Administrative Section */}
            <div className="section">
              <h3 className="subsection-title">❖ Administrative</h3>
              <div className="checkbox-group">
                {[
                  'Assist in the formation of plans, programs, projects of the alumni',
                  'Assist in appraising institutional objectives in relation to community services',
                ].map((item) => (
                  <div key={item} className="checkbox-item">
                    <input
                      type="checkbox"
                      id={item.replace(/\s+/g, '-').toLowerCase()}
                      checked={formData.administrative.includes(item)}
                      onChange={() =>
                        handleCheckboxChange('administrative', item)
                      }
                    />
                    <label htmlFor={item.replace(/\s+/g, '-').toLowerCase()}>
                      {item}
                    </label>
                  </div>
                ))}
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="other-administrative"
                    checked={formData.administrative.includes('Other')}
                    onChange={() =>
                      handleCheckboxChange('administrative', 'Other')
                    }
                  />
                  <label htmlFor="other-administrative">Other</label>
                </div>

                {formData.administrative.includes('Other') && (
                  <div className="form-field">
                    <input
                      type="text"
                      name="otherAdministrative"
                      value={formData.otherAdministrative}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Please specify other administrative involvement"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Finance/Development Section */}
            <div className="section">
              <h3 className="subsection-title">❖ Finance/Development</h3>
              <div className="checkbox-group">
                {[
                  'Assist in the fund raising activities in the university',
                  'Assist in generating resources for the realization of the objectives of the alumni affairs',
                  'Assist in the development programs of the university',
                  'Outreach Program',
                  'Environmental Concerns',
                ].map((item) => (
                  <div key={item} className="checkbox-item">
                    <input
                      type="checkbox"
                      id={item.replace(/\s+/g, '-').toLowerCase()}
                      checked={formData.finance.includes(item)}
                      onChange={() => handleCheckboxChange('finance', item)}
                    />
                    <label htmlFor={item.replace(/\s+/g, '-').toLowerCase()}>
                      {item}
                    </label>
                  </div>
                ))}
                <div className="checkbox-item">
                  <input
                    type="checkbox"
                    id="other-finance"
                    checked={formData.finance.includes('Other')}
                    onChange={() => handleCheckboxChange('finance', 'Other')}
                  />
                  <label htmlFor="other-finance">Other</label>
                </div>

                {formData.finance.includes('Other') && (
                  <div className="form-field">
                    <input
                      type="text"
                      name="otherFinance"
                      value={formData.otherFinance}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Please specify other finance/development involvement"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Important Things Learned */}
            <div className="section">
              <h3 className="section-title">
                What important things have you learned at SMU that helped you
                improve yourself in your field and in the community you work
                with? <span className="required">*</span>
              </h3>
              <div className="form-field full-width">
                <textarea
                  name="importantThings"
                  value={formData.importantThings}
                  onChange={handleChange}
                  className="input-field textarea"
                  placeholder="Write your response here"
                  rows="4"
                  required
                />
              </div>
            </div>

            {/* Suggestions */}
            <div className="section">
              <h3 className="section-title">
                What comments/suggestions can you give to improve the
                university's system? <span className="required">*</span>
              </h3>
              <div className="form-field full-width">
                <textarea
                  name="suggestions"
                  value={formData.suggestions}
                  onChange={handleChange}
                  className="input-field textarea"
                  placeholder="Curricular Programs, Services, Outreach Programs, etc."
                  rows="4"
                  required
                />
              </div>
            </div>

            {/* Alumni List */}
            <div className="section">
              <h3 className="section-title">
                List down names and addresses of alumni you know{' '}
                <span className="required">*</span>
              </h3>
              <div className="form-field full-width">
                <textarea
                  name="alumniList"
                  value={formData.alumniList}
                  onChange={handleChange}
                  className="input-field textarea"
                  placeholder="Alumni Names and Addresses"
                  rows="3"
                  required
                />
              </div>
            </div>

            {/* Status Message */}
            {statusMessage && (
              <div className={`status-message ${statusType}`}>
                {statusType === 'success' ? '✅' : '❌'} {statusMessage}
              </div>
            )}

            {/* Submit Button */}
            <div className="buttons-container">
              <button type="submit" className="submit-button">
                Submit Feedback
              </button>
            </div>
            

            <p className="form-footer">
              Return to dashboard?{' '}
              <Link to="/dashboard" className="link">
                Dashboard
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AlumniFeedback;