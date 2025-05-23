import React, { useState, useContext } from 'react';
import axios from 'axios';
import '../cssfiles/detectorcont.css';
import { UserContext } from '../hooks/UserContext';
import { FaCheckCircle, FaHistory } from 'react-icons/fa';

function Detectorcont() {
  const { user } = useContext(UserContext);
  const [showHistory, setShowHistory] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [query, setQuery] = useState('');
  const [verdict, setVerdict] = useState('');
  const [trust, setTrust] = useState(null);
  const [articles, setArticles] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const suspiciousWords = [ 'fake', 'hoax', 'clickbait', 'unconfirmed', 'rumor', 'shocking', 'secret', 'conspiracy', 'exposed', 'viral', 'scam', 'false', 'lies', 'fraud', 'misleading','breaking' ];

  const isFakeNews = (text) => suspiciousWords.some(word => text.toLowerCase().includes(word));

  const extractKeywords = (text) => {
    const stopwords = ['the', 'is', 'in', 'on', 'at', 'with', 'a', 'an', 'of', 'to', 'has', 'have', 'this', 'that'];
    return text.toLowerCase().split(/\W+/).filter(word => word && !stopwords.includes(word)).slice(0, 6).join(' ');
  };

  const handleVerify = async () => {
    if (!query.trim()) return alert('Please enter or paste the news content.');
    setSubmitted(true);

    const fake = isFakeNews(query);
    const keywords = extractKeywords(query);
    const thisVerdict = fake ? '⚠️ Suspicious Content Detected – Possibly Fake' : '✅ No Suspicious Signs Detected – Possibly Real';
    const thisTrust = fake ? 30 : 80;

    setVerdict(thisVerdict);
    setTrust(thisTrust);

    
    if (user) {
      try {
        await axios.post('http://localhost/factlens-backend/save_history.php', {
  query,
  verdict: thisVerdict
}, { withCredentials: true });

      } catch (error) {
        console.error('Error saving history:', error);
      }
    }

    try {
      const today = new Date().toISOString().split('T')[0];
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const res = await axios.get(`https://newsapi.org/v2/everything?q=${encodeURIComponent(keywords)}&from=${weekAgo}&to=${today}&sortBy=popularity&language=en&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`);

      setArticles(res.data.articles || []);
    } catch (err) {
      console.error('Error fetching news:', err);
      setArticles([]);
    }
  };

  const handleHistory = async () => {
  if (!user) return alert('Please log in to view history.');

  try {
    const res = await axios.get('http://localhost/factlens-backend/get_history.php', {
      withCredentials: true
    });

    const history = res.data?.history || [];
    if (history.length === 0) return alert('No history found.');

    setHistoryData(history);
    setShowHistory(true); 
  } catch (err) {
    console.error('Error fetching history:', err);
    alert('Failed to load history.');
  }
};



  const isReal = verdict.includes('Possibly Real');
  const isFake = verdict.includes('Possibly Fake');
  const background = isReal
  ? 'linear-gradient(135deg, #a8e063, #56ab2f)'
  : isFake
  ? 'linear-gradient(135deg, #ff4e50, #f9d423)' // Nice red-yellow gradient
  : 'white';
  const textColor = isReal || isFake ? 'white' : 'black';

  return (
    <div className='mydetect'>
      <div className='detect1'>
          <textarea
            placeholder='Please Enter or Paste the Suspicious content to verify'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />    
        <div className='buttonss'>
          <button onClick={handleVerify} id='btnn1'>
            <FaCheckCircle style={{ marginRight: '8px' }} />
            Verify News
          </button>
          <button onClick={handleHistory} id='btnn2'>
            <FaHistory style={{ marginRight: '8px' }} />
            View History
          </button>
        </div>
      </div>

      <div className='detect2' style={{ background, color: textColor, border: '1px solid', borderColor: isReal ? 'green' : isFake ? '#721c24' : '#cccccc' }}>
        {!submitted ? (
          <div className="placeholder-message">📰 Here you'll get the verdict of the entered news</div>
        ) : (
          <div className="verdict-content">
            <h2>{verdict}</h2>
            <h3>Trust Percentage: {trust !== null ? `${trust}%` : '---'}</h3>
            <h4>Related News</h4>
            {articles.length > 0 ? (
              <ul>
                {articles.slice(0, 5).map((article, index) => (
                  <li key={index}>
                    <a href={article.url} target="_blank" rel="noreferrer" style={{ color: textColor, textDecoration: 'underline' }}>
                      {article.title}
                    </a>{' '}– <em>{article.source.name}</em>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No related news found.</p>
            )}
          </div>
        )}
      </div>

      {showHistory && (
  <div className="history-modal">
    <div className="history-box">
      <button className="close-btn" onClick={() => setShowHistory(false)}>✖</button>
      <h2>🕓 History</h2>
      <ul>
        {historyData.map((item, idx) => (
          <li key={idx} style={{ marginBottom: '12px' }}>
            <strong>{idx + 1}. {item.query}</strong><br />
            <span>🧾 Verdict: {item.verdict}</span><br />
            <span>📅 Date: {item.date}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
)}

    </div>

  );
}

export default Detectorcont;
