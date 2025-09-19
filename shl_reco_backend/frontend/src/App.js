import React, { useState } from 'react';

function App() {
  const [jobQuery, setJobQuery] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  const fetchRecommendations = async () => {
    //const url =`https://shl-assessment-recommendation-backend.onrender.com/recommend/?job_query=${jobQuery}&top_k=3`;
    //const url =`http://127.0.0.1:8000/recommend/?job_query=${jobQuery}&top_k=3`;
    const url =`http://127.0.0.1:8000/recommend/?job_query=${jobQuery}&top_k=3`;
    const response = await fetch(url);
    const data = await response.json();
    setRecommendations(data.recommendations);
  };

  return (
    <div
      style={{
        fontFamily: "'Poppins', 'Segoe UI', sans-serif",
        backgroundColor: '#f4f9fc',
        minHeight: '100vh',
        color: '#1a3d7c',
      }}
    >

      <nav
        style={{
          backgroundColor: '#1a3d7c',
          padding: '1rem 2rem',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
        }}
      >
        <img
          src="https://towergroup.com.au/wp-content/uploads/2018/05/SHL-logo.png"
          alt="SHL Logo"
          style={{ height: '40px' }}
        />
      </nav>


      <div style={{ padding: '2rem' }}>
        <h1
          style={{
            textAlign: 'center',
            color: '#1652f0',
            marginBottom: '2rem',
          }}
        >
          SHL Assessment Recommender
        </h1>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '2rem',
          }}
        >
          <input
            type="text"
            value={jobQuery}
            onChange={(e) => setJobQuery(e.target.value)}
            placeholder="Enter job description..."
            style={{
              width: '60%',
              minWidth: '250px',
              padding: '0.7rem',
              fontSize: '1rem',
              borderRadius: '8px',
              border: '1px solid #ccc',
              backgroundColor: '#e7f0ff',
              color: '#0d3dc7',
            }}
          />
          <button
            onClick={fetchRecommendations}
            style={{
              padding: '0.7rem 1.2rem',
              fontSize: '1rem',
              backgroundColor: '#1652f0',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#0d3dc7')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#1652f0')}
          >
            Get Recommendations
          </button>
        </div>

        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            maxWidth: '600px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {recommendations.map((rec, index) => (
            <li
              key={index}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #d0e2ff',
                borderRadius: '10px',
                padding: '1rem',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
              }}
            >
              <strong style={{ fontSize: '1.1rem', color: '#1652f0' }}>
                {rec.name}
              </strong>
              <br />
              <span style={{ color: '#333' }}>
                Score: <strong>{rec.similarity_score}</strong>
              </span>
              <br />
              <a
                href={rec.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: '#0d3dc7',
                  textDecoration: 'none',
                  fontWeight: '500',
                }}
              >
                View Assessment
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
