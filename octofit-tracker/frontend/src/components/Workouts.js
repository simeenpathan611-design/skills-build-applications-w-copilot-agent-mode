import React, { useState, useEffect } from 'react';

export default function Workouts() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
    console.log('Workouts endpoint:', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log('Workouts fetched raw:', data);
        const list = Array.isArray(data) ? data : data.results || data;
        console.log('Workouts list:', list);
        setItems(list || []);
      })
      .catch((err) => console.error('Workouts fetch error:', err));
  }, []);

  return (
    <div>
      <h2>Workouts</h2>
      <pre>{JSON.stringify(items, null, 2)}</pre>
    </div>
  );
}
