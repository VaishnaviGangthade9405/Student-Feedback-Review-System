const express = require('express');
const Feedback = require('../models/Feedback');
const router = express.Router();

// Add feedback
router.post('/add', async (req, res) => {
    try {
        const { name, subject, rating, comments } = req.body;
        
        // Validation
        if (!name || !subject || !rating || !comments) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        const feedback = new Feedback({
            name,
            subject,
            rating,
            comments
        });
        
        await feedback.save();
        res.status(201).json({ message: 'Feedback submitted successfully', feedback });
    } catch (error) {
        res.status(500).json({ error: 'Failed to submit feedback', details: error.message });
    }
});

// Get all feedback
router.get('/all', async (req, res) => {
    try {
        const data = await Feedback.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch feedback', details: error.message });
    }
});

// Get feedback by ID
router.get('/:id', async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);
        if (!feedback) {
            return res.status(404).json({ error: 'Feedback not found' });
        }
        res.json(feedback);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch feedback', details: error.message });
    }
});

// Delete feedback
router.delete('/:id', async (req, res) => {
    try {
        const feedback = await Feedback.findByIdAndDelete(req.params.id);
        if (!feedback) {
            return res.status(404).json({ error: 'Feedback not found' });
        }
        res.json({ message: 'Feedback deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete feedback', details: error.message });
    }
});

module.exports = router;