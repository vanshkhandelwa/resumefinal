import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAnalysisResult } from '../services/api';
import ResumeDisplay from '../components/ResumeDisplay';
import SectionAnalysis from '../components/SectionAnalysis';
import OverallAnalysis from '../components/OverallAnalysis';
import NavigationMenu from '../components/NavigationMenu';
import LoadingSpinner from '../components/LoadingSpinner';
import FileUpload from '../components/FileUpload';
import '../styles/analysis.css';

const Analysis = () => {
  const { analysisId } = useParams();
  const navigate = useNavigate();
  
  const [analysisResult, setAnalysisResult] = useState(null);
  const [activeSection, setActiveSection] = useState('overall');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sections, setSections] = useState([]);
  const [pollingId, setPollingId] = useState(null);

  useEffect(() => {
    // If no analysisId is provided, show the upload screen
    if (!analysisId) {
      return;
    }
    
    const fetchAnalysis = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await getAnalysisResult(analysisId);
        
        setAnalysisResult(result);
        
        // If analysis is still processing, poll for updates
        if (result.status === 'processing') {
          return true; // Continue polling
        } else {
          // Analysis is complete or failed, stop polling
          if (result.status === 'completed' && result.parsed_resume && result.parsed_resume.sections) {
            // Create sections array for navigation
            const sectionsList = Object.keys(result.parsed_resume.sections)
              .filter(name => result.parsed_resume.sections[name]) // Only include non-empty sections
              .map(name => ({
                name,
                displayName: name.replace(/_/g, ' ')
                  .split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')
              }));
            
            setSections(sectionsList);
            setActiveSection('overall');
          }
          return false; // Stop polling
        }
      } catch (err) {
        setError('Failed to load analysis results. Please try again.');
        console.error('Error fetching analysis:', err);
        return false; // Stop polling
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchAnalysis();
    
    // Setup polling if needed
    if (!pollingId) {
      const intervalId = setInterval(async () => {
        const shouldContinue = await fetchAnalysis();
        if (!shouldContinue) {
          clearInterval(intervalId);
          setPollingId(null);
        }
      }, 3000); // Poll every 3 seconds
      
      setPollingId(intervalId);
    }
    
    // Cleanup
    return () => {
      if (pollingId) {
        clearInterval(pollingId);
      }
    };
  }, [analysisId]);

  const handleSectionChange = (sectionName) => {
    setActiveSection(sectionName);
  };

  const handleNewAnalysis = () => {
    navigate('/');
  };

  // If no analysisId, show upload component
  if (!analysisId) {
    return <FileUpload />;
  }

  // Show loading spinner while fetching initial results
  if (loading && !analysisResult) {
    return <LoadingSpinner message="Fetching analysis results..." />;
  }

  // Show error message if fetch failed
  if (error && !analysisResult) {
    return (
      <div className="error-container">
        <h3>Error</h3>
        <p>{error}</p>
        <button onClick={handleNewAnalysis} className="new-analysis-btn">
          Start New Analysis
        </button>
      </div>
    );
  }

  // Analysis is processing
  if (analysisResult && analysisResult.status === 'processing') {
    return <LoadingSpinner message="Analyzing your resume... This may take a minute..." />;
  }

  // Analysis failed
  if (analysisResult && analysisResult.status === 'error') {
    return (
      <div className="error-container">
        <h3>Analysis Failed</h3>
        <p>{analysisResult.error || 'An unexpected error occurred during analysis.'}</p>
        <button onClick={handleNewAnalysis} className="new-analysis-btn">
          Try Again
        </button>
      </div>
    );
  }

  // Analysis is complete
  if (analysisResult && analysisResult.status === 'completed') {
    const { parsed_resume, analysis } = analysisResult;
    
    return (
      <div className="analysis-container">
        <div className="sidebar">
          <NavigationMenu 
            sections={sections}
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
          />
          <button className="new-analysis-btn" onClick={handleNewAnalysis}>
            New Analysis
          </button>
        </div>
        
        <div className="content-area">
          {activeSection === 'overall' && (
            <OverallAnalysis analysis={analysis.overall_analysis} />
          )}
          {activeSection === 'view-resume' && (
            <ResumeDisplay resumeContent={parsed_resume.raw_content} />
          )}
          {activeSection !== 'overall' && activeSection !== 'view-resume' && (
            <SectionAnalysis 
              sectionName={sections.find(s => s.name === activeSection)?.displayName || activeSection} 
              analysis={analysis.sections[activeSection]}
            />
          )}
        </div>
      </div>
    );
  }

  // Fallback
  return <LoadingSpinner message="Preparing analysis..." />;
};

export default Analysis;