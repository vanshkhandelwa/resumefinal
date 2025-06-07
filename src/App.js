import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Fix the import paths
import Home from './pages/Home';
import Analysis from './pages/Analysis';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analysis/:analysisId?" element={<Analysis />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;