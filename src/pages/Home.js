import React from 'react';
import FileUpload from '../components/FileUpload';
import '../styles/home.css';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Elevate Your Resume</h1>
          <p className="hero-subtitle">
            Get detailed professional feedback on your resume instantly using AI-powered analysis
          </p>
          <FileUpload />
        </div>
      </section>
      
      <section id="how-it-works" className="how-it-works">
        <h2>How It Works</h2>
        
        <div className="steps-container">
          <div className="step">
            <div className="step-icon">📄</div>
            <h3>Upload Your Resume</h3>
            <p>Upload your resume in PDF, DOCX, or DOC format. Add an optional job description for more targeted feedback.</p>
          </div>
          
          <div className="step">
            <div className="step-icon">🔍</div>
            <h3>Smart Analysis</h3>
            <p>Our system parses your resume and analyzes each section using advanced AI techniques.</p>
          </div>
          
          <div className="step">
            <div className="step-icon">📊</div>
            <h3>Detailed Insights</h3>
            <p>Get section-by-section analysis, scores, strengths, weaknesses, and specific improvement suggestions.</p>
          </div>
          
          <div className="step">
            <div className="step-icon">🚀</div>
            <h3>Improve & Stand Out</h3>
            <p>Implement our tailored recommendations to create a resume that stands out to recruiters and ATS systems.</p>
          </div>
        </div>
      </section>
      
      <section className="features-section">
        <h2>Why Choose Our Resume Analyzer</h2>
        
        <div className="features-container">
          <div className="feature">
            <h3>AI-Powered Analysis</h3>
            <p>Leveraging Google's advanced Gemini LLM to provide human-like insights</p>
          </div>
          
          <div className="feature">
            <h3>Section-by-Section Feedback</h3>
            <p>Detailed analysis of every part of your resume with actionable suggestions</p>
          </div>
          
          <div className="feature">
            <h3>ATS Optimization Tips</h3>
            <p>Recommendations to make your resume friendly to Applicant Tracking Systems</p>
          </div>
          
          <div className="feature">
            <h3>Job-Specific Analysis</h3>
            <p>Optional job description matching to tailor your resume for specific roles</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;