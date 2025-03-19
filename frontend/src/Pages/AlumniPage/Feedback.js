import React, { useState } from 'react';
import { Button, TextField, Checkbox, FormControlLabel, FormGroup, Typography, Card, CardContent } from '@mui/material';
import './Feedback.css';
import Sidebar from "../Sidebar";

const Feedback = () => {
  const [feedback, setFeedback] = useState({
    academic: [],
    administrative: [],
    finance: [],
    importantThings: '',
    suggestions: '',
    alumniList: '',
    name: '',
    employmentAddress: '',
  });

  const handleCheckboxChange = (category, value) => {
    setFeedback((prev) => {
      const updatedCategory = prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value];
      return { ...prev, [category]: updatedCategory };
    });
  };

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', feedback);
    alert('Feedback submitted successfully!');
  };

  return (
    <div className="feedback-content">
         <Sidebar />
      <Card className="feedback-card">
        <CardContent>
          <Typography variant="h5" className="feedback-title">
            Alumni Feedback Form
          </Typography>

          <form onSubmit={handleSubmit} className="feedback-form">
            {/* Question 1 */}
            <Typography variant="h6" className="feedback-section-title">
              1. As a graduate (an alumnus/alumna), in what area and in what ways would you like yourself to be
              involved in the affairs of your Alma Mater? (Please put a check mark)
            </Typography>

            {/* Academic Section */}
            <Typography variant="h6" className="feedback-section-subtitle">
              ❖ Academic
            </Typography>
            <FormGroup>
              {[
                'Voluntary Consultancy Service',
                'As a member of the pool of Resource Speaker in and out of the university',
                'Curriculum Development/enrichment',
                'Volunteer Researcher of the University',
                'Volunteer Guest Lecture in the University',
              ].map((item) => (
                <FormControlLabel
                  key={item}
                  control={
                    <Checkbox
                      checked={feedback.academic.includes(item)}
                      onChange={() => handleCheckboxChange('academic', item)}
                    />
                  }
                  label={item}
                />
              ))}
            </FormGroup>

            {/* Administrative Section */}
            <Typography variant="h6" className="feedback-section-subtitle">
              ❖ Administrative
            </Typography>
            <FormGroup>
              {[
                'Assist in the formation of plans, programs, projects of the alumni',
                'Assist in appraising institutional objectives in relation to community services',
              ].map((item) => (
                <FormControlLabel
                  key={item}
                  control={
                    <Checkbox
                      checked={feedback.administrative.includes(item)}
                      onChange={() => handleCheckboxChange('administrative', item)}
                    />
                  }
                  label={item}
                />
              ))}
            </FormGroup>

            {/* Finance/Development Section */}
            <Typography variant="h6" className="feedback-section-subtitle">
              ❖ Finance/Development
            </Typography>
            <FormGroup>
              {[
                'Assist in the fund raising activities in the university',
                'Assist in generating resources for the realization of the objectives of the alumni affairs',
                'Assist in the development programs of the university',
                'Outreach Program',
                'Environmental Concerns',
              ].map((item) => (
                <FormControlLabel
                  key={item}
                  control={
                    <Checkbox
                      checked={feedback.finance.includes(item)}
                      onChange={() => handleCheckboxChange('finance', item)}
                    />
                  }
                  label={item}
                />
              ))}
            </FormGroup>

            {/* Question 2 */}
            <Typography variant="h6" className="feedback-section-title">
              2. What important things have you learned at SMU that helped you improve yourself in your field and
              in the community you work with?
            </Typography>
            <TextField
              name="importantThings"
              label="Write your response here"
              multiline
              rows={4}
              fullWidth
              value={feedback.importantThings}
              onChange={handleChange}
              className="feedback-input"
            />

            {/* Question 3 */}
            <Typography variant="h6" className="feedback-section-title">
              3. What comments/suggestions can you give to improve the university’s system in terms of:
            </Typography>
            <TextField
              name="suggestions"
              label="Curricular Programs, Services, Outreach Programs, etc."
              multiline
              rows={4}
              fullWidth
              value={feedback.suggestions}
              onChange={handleChange}
              className="feedback-input"
            />

            {/* Alumni List */}
            <Typography variant="h6" className="feedback-section-title">
              List down names and addresses of alumni you know
            </Typography>
            <TextField
              name="alumniList"
              label="Alumni Names and Addresses"
              multiline
              rows={3}
              fullWidth
              value={feedback.alumniList}
              onChange={handleChange}
              className="feedback-input"
            />

            <TextField
              name="employmentAddress"
              label="Employment Address"
              fullWidth
              value={feedback.employmentAddress}
              onChange={handleChange}
              className="feedback-input"
            />

            {/* Submit Button */}
            <Button variant="contained" color="primary" type="submit" className="feedback-submit-btn">
              Submit Feedback
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Feedback;
