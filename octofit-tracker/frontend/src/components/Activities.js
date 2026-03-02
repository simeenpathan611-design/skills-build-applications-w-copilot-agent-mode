import { useEffect, useState } from 'react';

export default function Activities() {
  // API endpoint: https://<codespace>-8000.app.github.dev/api/activities/
  const API_BASE =
    (process.env.REACT_APP_API_BASE && process.env.REACT_APP_API_BASE.replace(/\/$/, '')) ||
    (process.env.REACT_APP_CODESPACE_NAME
      ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities`
      : 'http://localhost:8000/api/activities');

  const endpoint = API_BASE;

  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('[Activities] REST API endpoint:', endpoint);
    (async () => {
      try {
        const res = await fetch(endpoint, { credentials: 'include' });
        const data = await res.json();
        console.log('[Activities] fetched data:', data);
        const list = Array.isArray(data) ? data : (data && data.results) || [];
        setItems(list);
        setStatus('ready');
      } catch (err) {
        console.error('[Activities] fetch error:', err);
        setError(err.message || 'Failed to load');
        setStatus('error');
      }
    })();
  }, [endpoint]);

  if (status === 'loading') return <p>Loading activities…</p>;
  if (status === 'error') return <p className="text-danger">Error: {error}</p>;

  return (
    <div>
      <h2 className="mb-3">Activities</h2>
      {items.length === 0 ? (
        <p className="text-muted">No activities found.</p>
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