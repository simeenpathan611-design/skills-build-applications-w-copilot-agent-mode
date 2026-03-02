import React, { useState, useEffect } from 'react';

export default function Leaderboard() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
    console.log('Leaderboard endpoint:', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log('Leaderboard fetched raw:', data);
        const list = Array.isArray(data) ? data : data.results || data;
        console.log('Leaderboard list:', list);
        setItems(list || []);
      })
      .catch((err) => console.error('Leaderboard fetch error:', err));
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <pre>{JSON.stringify(items, null, 2)}</pre>
    </div>
  );
}
