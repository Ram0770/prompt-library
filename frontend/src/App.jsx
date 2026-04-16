import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PromptList from './components/PromptList';
import PromptDetail from './components/PromptDetail';
import AddPrompt from './components/AddPrompt';
import './App.css';

function App() {
  return (
    <Router>
      <nav className="navbar">
        <div className="logo">AI Prompt Library</div>
        <div className="nav-links">
          <Link to="/">All Prompts</Link>
          <Link to="/add-prompt" className="btn-primary">Add Prompt</Link>
        </div>
      </nav>
      <main className="container">
        <Routes>
          <Route path="/" element={<PromptList />} />
          <Route path="/prompts/:id" element={<PromptDetail />} />
          <Route path="/add-prompt" element={<AddPrompt />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
