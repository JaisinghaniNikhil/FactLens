import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../cssfiles/topnews.css'

function TopNews() {
  const[news,setNews] = useState([]);
  const[loading,setLoading] = useState(true);
  const[error,setError] = useState();

  useEffect(()=>{
    axios.get('https://newsapi.org/v2/everything',{
      params:{
        q:'India',
        sortBy:'publishedAt',
        language:'en',
        pageSize:8,
        apiKey:'6ed4441433554069b3cf606c1e65112a'
      }
    })
    .then((response)=>{
      setNews(response.data.articles);
      setLoading(false);
    })
    .catch((error)=>{
      setError('Failed to Fetch News');
      setLoading(false);
    });
  },[]);
  if(loading) return <div>Loading...</div>;
  if(error) return <div>{error}</div>;


  return (
    <div className='topnews' id='headlines'>
      <h2>Headlines Today</h2>
      <div className='news'>
        {news.map((article, index) => (
          <div key={index} className='news-card'>
            <img
              src={article.urlToImage || 'https://via.placeholder.com/300x150'}
              alt='news'
            />
            <div className='news-content'>
              <div className='news-title'>{article.title}</div>
              <div className='news-description'>{article.description?.slice(0, 100)}...</div>
              <a
                className='news-link'
                href={article.url}
                target='_blank'
                rel='noopener noreferrer'
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopNews;
