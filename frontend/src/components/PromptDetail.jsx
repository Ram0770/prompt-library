import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPrompt } from '../services/api';

const PromptDetail = () => {
  const { id } = useParams();
  const [prompt, setPrompt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPrompt(id)
      .then(data => {
        setPrompt(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading">Loading prompt details...</div>;
  if (!prompt) return <div className="error-state">Prompt not found.</div>;

  return (
    <div className="detail-container">
      <div className="header-section">
        <h1>{prompt.title}</h1>
        <Link to="/" className="btn-secondary">Back to List</Link>
      </div>
      
      <div className="metadata-bar">
        <span className="badge">Complexity: {prompt.complexity}/10</span>
        <span className="view-count">👁️ {prompt.view_count} views</span>
        <span className="date">{new Date(prompt.created_at || prompt.createdAt).toLocaleString()}</span>
      </div>

      <div className="content-box">
        {prompt.content}
      </div>
    </div>
  );
};

export default PromptDetail;
