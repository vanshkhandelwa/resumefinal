import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">📄</span>
          <span className="logo-text">Resume Analyzer</span>
        </Link>
        
        <nav className="main-nav">
          <Link to="/" className="nav-link">Home</Link>
          <a href="#how-it-works" className="nav-link">How It Works</a>
          <a href="https://github.com/vanshkhandelwal/resume-analyzer" 
             target="_blank" 
             rel="noopener noreferrer" 
             className="nav-link">
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;