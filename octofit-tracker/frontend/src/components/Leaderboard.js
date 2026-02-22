import React, { useEffect, useState } from 'react';

export default function Leaderboard() {
  const API_BASE =
    (process.env.REACT_APP_API_BASE && process.env.REACT_APP_API_BASE.replace(/\/$/, '')) ||
    (process.env.REACT_APP_CODESPACE_NAME
      ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`
      : 'http://localhost:8000/api');

  const endpoint = `${API_BASE}/leaderboard/`;

  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('[Leaderboard] REST API endpoint:', endpoint);
    (async () => {
      try {
        const res = await fetch(endpoint, { credentials: 'include' });
        const data = await res.json();
        console.log('[Leaderboard] fetched data:', data);
        const list = Array.isArray(data) ? data : (data && data.results) || [];
        setItems(list);
        setStatus('ready');
      } catch (err) {
        console.error('[Leaderboard] fetch error:', err);
        setError(err.message || 'Failed to load');
        setStatus('error');
      }
    })();
  }, [endpoint]);

  if (status === 'loading') return <p>Loading leaderboard…</p>;
  if (status === 'error') return <p className="text-danger">Error: {error}</p>;

  return (
    <div>
      <h2 className="mb-3">Leaderboard</h2>
      {items.length === 0 ? (
        <p className="text-muted">No leaderboard data.</p>
      ) : (
        <ul className="list-group">
          {items.map((item, idx) => (
            <li key={item.id ?? idx} className="list-group-item">
              <pre className="mb-0">{JSON.stringify(item, null, 2)}</pre>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}