const express = require('express');
const router = express.Router();
const Prompt = require('../models/Prompt');

// GET all prompts
router.get('/', async (req, res) => {
  try {
    const prompts = await Prompt.find().sort({ createdAt: -1 });
    res.json(prompts);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET single prompt and increment views
router.get('/:id', async (req, res) => {
  try {
    const prompt = await Prompt.findById(req.params.id);
    if (!prompt) return res.status(404).json({ error: 'Prompt not found' });
    
    prompt.views += 1;
    await prompt.save();
    
    res.json({
        id: prompt._id,
        title: prompt.title,
        content: prompt.content,
        complexity: prompt.complexity,
        created_at: prompt.createdAt,
        view_count: prompt.views
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST new prompt
router.post('/', async (req, res) => {
  try {
    const { title, content, complexity } = req.body;
    let errors = {};
    if (!title || title.length < 3) errors.title = "Title must be at least 3 characters.";
    if (!content || content.length < 20) errors.content = "Content must be at least 20 characters.";
    if (!complexity || complexity < 1 || complexity > 10) errors.complexity = "Complexity must be between 1 and 10.";
    
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    const newPrompt = new Prompt({ title, content, complexity });
    await newPrompt.save();
    res.status(201).json({
        id: newPrompt._id,
        title: newPrompt.title,
        content: newPrompt.content,
        complexity: newPrompt.complexity,
        created_at: newPrompt.createdAt
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
