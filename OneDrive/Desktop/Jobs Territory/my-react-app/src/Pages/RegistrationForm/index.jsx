import React, { useState } from 'react';
import './style.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resume: null,
    timeSlots: []
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resumePreview, setResumePreview] = useState(null);

  const timeSlotOptions = [
    'Monday 9-11 AM',
    'Monday 2-4 PM',
    'Tuesday 9-11 AM',
    'Tuesday 2-4 PM',
    'Wednesday 9-11 AM',
    'Wednesday 2-4 PM',
    'Thursday 9-11 AM',
    'Thursday 2-4 PM',
    'Friday 9-11 AM',
    'Friday 2-4 PM'
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.resume) {
      newErrors.resume = 'Resume is required';
    }
    
    if (formData.timeSlots.length === 0) {
      newErrors.timeSlots = 'Please select at least one time slot';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        resume: file
      }));
      
      // Create preview for PDF files
      if (file.type === 'application/pdf') {
        const fileUrl = URL.createObjectURL(file);
        setResumePreview(fileUrl);
      } else {
        setResumePreview(null);
      }
      
      // Clear error
      if (errors.resume) {
        setErrors(prev => ({
          ...prev,
          resume: ''
        }));
      }
    }
  };

  const handleTimeSlotChange = (slot) => {
    setFormData(prev => ({
      ...prev,
      timeSlots: prev.timeSlots.includes(slot)
        ? prev.timeSlots.filter(s => s !== slot)
        : [...prev.timeSlots, slot]
    }));
    
    // Clear error
    if (errors.timeSlots) {
      setErrors(prev => ({
        ...prev,
        timeSlots: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="container">
        <div className="thank-you-card">
          <div className="success-icon">✓</div>
          <h1>Thank You!</h1>
          <p>Your registration has been submitted successfully.</p>
          <p>We'll get back to you soon regarding your selected time slots.</p>
          <button 
            className="btn-secondary"
            onClick={() => {
              setIsSubmitted(false);
              setFormData({ name: '', email: '', resume: null, timeSlots: [] });
              setResumePreview(null);
            }}
          >
            Submit Another Registration
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="form-card">
        <div className="form-header">
          <h1>Registration Form</h1>
          <p>Please fill out all fields to complete your registration</p>
        </div>
        
        <div className="registration-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? 'error' : ''}
              placeholder="Enter your full name"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email address"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="resume">Resume Upload</label>
            <div className="file-upload-container">
              <input
                type="file"
                id="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="file-input"
              />
              <label htmlFor="resume" className={`file-upload-label ${errors.resume ? 'error' : ''}`}>
                <span className="upload-icon">📄</span>
                <span className="upload-text">
                  {formData.resume ? formData.resume.name : 'Choose file or drag here'}
                </span>
              </label>
            </div>
            {errors.resume && <span className="error-message">{errors.resume}</span>}
            
            {resumePreview && (
              <div className="resume-preview">
                <h4>Resume Preview:</h4>
                <iframe
                  src={resumePreview}
                  width="100%"
                  height="400"
                  title="Resume Preview"
                ></iframe>
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Available Time Slots</label>
            <div className="time-slots-grid">
              {timeSlotOptions.map((slot, index) => (
                <div
                  key={slot}
                  className={`time-slot ${formData.timeSlots.includes(slot) ? 'selected' : ''}`}
                  onClick={() => handleTimeSlotChange(slot)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <input
                    type="checkbox"
                    id={slot}
                    checked={formData.timeSlots.includes(slot)}
                    onChange={() => handleTimeSlotChange(slot)}
                  />
                  <label htmlFor={slot}>{slot}</label>
                </div>
              ))}
            </div>
            {errors.timeSlots && <span className="error-message">{errors.timeSlots}</span>}
          </div>

          <button
            type="submit"
            className={`btn-primary ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Submitting...
              </>
            ) : (
              'Submit Registration'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;