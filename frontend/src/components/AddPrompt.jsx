import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createPrompt } from '../services/api';

const AddPrompt = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '', complexity: 5 });
  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (form.title.length < 3) newErrors.title = "Title must be at least 3 characters.";
    if (form.content.length < 20) newErrors.content = "Content must be at least 20 characters.";
    if (form.complexity < 1 || form.complexity > 10) newErrors.complexity = "Complexity must be between 1 and 10.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setServerErrors(null);

    try {
      const res = await createPrompt(form);
      navigate(`/prompts/${res.id || res._id}`);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setServerErrors(err.response.data.errors);
      } else {
        setServerErrors({ general: 'An unexpected error occurred.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Prompt</h2>
      
      {serverErrors && (
        <div className="alert alert-danger">
          {Object.values(serverErrors).map((msg, idx) => <div key={idx}>{msg}</div>)}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input 
            type="text" 
            value={form.title} 
            onChange={(e) => setForm({...form, title: e.target.value})}
            placeholder="Enter prompt title..." 
          />
          {errors.title && <div className="error">{errors.title}</div>}
        </div>

        <div className="form-group">
          <label>Content</label>
          <textarea 
            rows="6" 
            value={form.content} 
            onChange={(e) => setForm({...form, content: e.target.value})}
            placeholder="Enter prompt content..." 
          />
          {errors.content && <div className="error">{errors.content}</div>}
        </div>

        <div className="form-group">
          <label>Complexity (1-10)</label>
          <input 
            type="number" 
            min="1" max="10" 
            value={form.complexity} 
            onChange={(e) => setForm({...form, complexity: parseInt(e.target.value)})}
          />
          {errors.complexity && <div className="error">{errors.complexity}</div>}
        </div>

        <div className="form-actions">
          <Link to="/" className="btn-secondary">Cancel</Link>
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Add Prompt'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPrompt;
