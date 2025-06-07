import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadResume } from '../services/api';
import '../styles/fileUpload.css';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a resume file');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('resume_file', file);
      
      if (jobDescription) {
        formData.append('job_description', jobDescription);
      }
      
      const result = await uploadResume(formData);
      
      if (result && result.analysis_id) {
        navigate(`/analysis/${result.analysis_id}`);
      } else {
        setError('Failed to start analysis. Please try again.');
      }
    } catch (err) {
      setError('Failed to analyze resume. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>Resume Analysis</h2>
      <p className="subtitle">Upload your resume to get personalized feedback and improvement suggestions</p>
      
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="file-input-container">
          <label htmlFor="resume-upload" className="file-label">
            {file ? file.name : 'Choose Resume File'}
            <span className="file-icon">📄</span>
          </label>
          <input
            id="resume-upload"
            type="file"
            accept=".pdf,.docx,.doc"
            onChange={handleFileChange}
            className="file-input"
          />
          <p className="file-type-info">Supported formats: PDF, DOCX, DOC</p>
        </div>
        
        <div className="job-description-container">
          <label htmlFor="job-description">Job Description (optional):</label>
          <textarea
            id="job-description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here for more tailored feedback..."
            rows={5}
            className="job-description-input"
          />
        </div>
        
        {error && <p className="error-message">{error}</p>}
        
        <button 
          type="submit" 
          className="analyze-button"
          disabled={isLoading || !file}
        >
          {isLoading ? 'Analyzing...' : 'Analyze Resume'}
        </button>
      </form>
    </div>
  );
};

export default FileUpload;