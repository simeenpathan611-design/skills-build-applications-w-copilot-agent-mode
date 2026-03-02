import React, { useState, useEffect } from 'react';

export default function Teams() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
    console.log('Teams endpoint:', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log('Teams fetched raw:', data);
        const list = Array.isArray(data) ? data : data.results || data;
        console.log('Teams list:', list);
        setItems(list || []);
      })
      .catch((err) => console.error('Teams fetch error:', err));
  }, []);

  return (
    <div>
      <h2>Teams</h2>
      <pre>{JSON.stringify(items, null, 2)}</pre>
    </div>
  );
}
