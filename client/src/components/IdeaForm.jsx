import { useState } from 'react';
import axios from 'axios';
import IdeaCard from './IdeaCard';

const IdeaForm = () => {
  const [topic, setTopic] = useState('');
  const [niche, setNiche] = useState('');
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setIdea('');

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/ideas/generate`, {
        topic,
        niche,
      });
      setIdea(res.data.idea);
    } catch (err) {
      setError('Failed to generate idea. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Get Instagram Content Idea 🎯</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a topic..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        />
        <select value={niche} onChange={(e) => setNiche(e.target.value)} required>
          <option value="">Select Niche</option>
          <option value="fitness">Fitness</option>
          <option value="fashion">Fashion</option>
          <option value="finance">Finance</option>
          <option value="travel">Travel</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}
      {idea && <IdeaCard content={idea} />}
    </div>
  );
};

export default IdeaForm;
