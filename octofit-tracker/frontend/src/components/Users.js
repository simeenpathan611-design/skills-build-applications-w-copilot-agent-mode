import React, { useState, useEffect } from 'react';

export default function Users() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
    console.log('Users endpoint:', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log('Users fetched raw:', data);
        const list = Array.isArray(data) ? data : data.results || data;
        console.log('Users list:', list);
        setItems(list || []);
      })
      .catch((err) => console.error('Users fetch error:', err));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <pre>{JSON.stringify(items, null, 2)}</pre>
    </div>
  );
}
