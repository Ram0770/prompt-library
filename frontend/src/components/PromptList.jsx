import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPrompts } from '../services/api';

const PromptList = () => {
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    getPrompts().then(setPrompts).catch(console.error);
  }, []);

  return (
    <div>
      <div className="header-section">
        <h1>All Prompts</h1>
        <Link to="/add-prompt" className="btn-primary">Add New Prompt</Link>
      </div>

      <div className="prompt-grid">
        {prompts.map(prompt => (
          <Link to={`/prompts/${prompt._id || prompt.id}`} className="prompt-card" key={prompt._id || prompt.id}>
            <h3>{prompt.title}</h3>
            <div className="badge">Complexity: {prompt.complexity}/10</div>
          </Link>
        ))}
        {prompts.length === 0 && (
          <div className="empty-state">No prompts available. Be the first to add one!</div>
        )}
      </div>
    </div>
  );
};

export default PromptList;
