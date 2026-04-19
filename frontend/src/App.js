import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    rating: 5,
    comments: ''
  });

  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const API_BASE_URL = 'http://localhost:5001/api/feedback';

  // Fetch all feedback on component mount
  useEffect(() => {
    fetchFeedback();
  }, []);

  // Fetch feedback from backend
  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/all`);
      if (!response.ok) throw new Error('Failed to fetch feedback');
      const data = await response.json();
      setFeedbackList(data);
      setError('');
    } catch (err) {
      setError('Error fetching feedback: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.subject || !formData.comments) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to submit feedback');
      
      const data = await response.json();
      setMessage('Feedback submitted successfully!');
      setError('');
      
      // Reset form
      setFormData({
        name: '',
        subject: '',
        rating: 5,
        comments: ''
      });

      // Refresh feedback list
      fetchFeedback();

      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError('Error submitting feedback: ' + err.message);
      setMessage('');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete feedback
  const deleteFeedback = async (id) => {
    if (!window.confirm('Are you sure you want to delete this feedback?')) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete feedback');
      
      setMessage('Feedback deleted successfully!');
      fetchFeedback();
      
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError('Error deleting feedback: ' + err.message);
      console.error(err);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Feedback Form</h1>

        {/* Messages */}
        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}

        {/* Form Section */}
        <div className="form-section">
          <h2>Submit Your Feedback</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject:</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter feedback subject"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="rating">Rating (1-10):</label>
              <select
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="comments">Comments:</label>
              <textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                placeholder="Enter your comments"
                rows="5"
                required
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </form>
        </div>

        {/* Feedback List Section */}
        <div className="feedback-section">
          <h2>All Feedback</h2>
          {loading && <p>Loading...</p>}
          {feedbackList.length === 0 && !loading ? (
            <p>No feedback yet</p>
          ) : (
            <div className="feedback-list">
              {feedbackList.map(feedback => (
                <div key={feedback._id} className="feedback-card">
                  <h3>{feedback.subject}</h3>
                  <p><strong>Name:</strong> {feedback.name}</p>
                  <p><strong>Rating:</strong> {feedback.rating}/10</p>
                  <p><strong>Comments:</strong> {feedback.comments}</p>
                  <button 
                    className="delete-btn"
                    onClick={() => deleteFeedback(feedback._id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
