import { useEffect, useState } from 'react';

export default function Teams() {
  // API endpoint: https://<codespace>-8000.app.github.dev/api/teams/
  // 1) REACT_APP_API_BASE (explicit full base, e.g., https://<codespace>-8000.app.github.dev/api/teams/)
  // 2) REACT_APP_CODESPACE_NAME -> https://<name>-8000.app.github.dev/api/teams/
  // 3) fallback -> http://localhost:8000/api/teams/
  const API_BASE =
    (process.env.REACT_APP_API_BASE && process.env.REACT_APP_API_BASE.replace(/\/$/, '')) ||
    (process.env.REACT_APP_CODESPACE_NAME
      ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams`
      : 'http://localhost:8000/api/teams');

  const endpoint = API_BASE;

  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('[Teams] REST API endpoint:', endpoint);

    (async () => {
      try {
        const res = await fetch(endpoint, { credentials: 'include' });
        if (!res.ok) {
          throw new Error(`HTTP ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        console.log('[Teams] fetched data:', data);

        // Support both paginated (DRF: { results: [...] }) and plain arrays
        const list = Array.isArray(data) ? data : (data && data.results) || [];
        setItems(list);
        setStatus('ready');
      } catch (err) {
        console.error('[Teams] fetch error:', err);
        setError(err.message || 'Failed to load teams');
        setStatus('error');
      }
    })();
  }, [endpoint]);

  if (status === 'loading') return <p>Loading teams…</p>;
  if (status === 'error') return <p className="text-danger">Error: {error}</p>;

  return (
    <div className="container py-4">
      <h2 className="mb-3">Teams</h2>

      {items.length === 0 ? (
        <p className="text-muted">No teams found.</p>
      ) : (
        <ul className="list-group">
          {items.map((team, idx) => (
            <li key={team.id ?? idx} className="list-group-item">
              {/* Render raw JSON for now; replace with real fields when your API schema is finalized */}
              <pre className="mb-0">{JSON.stringify(team, null, 2)}</pre>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}