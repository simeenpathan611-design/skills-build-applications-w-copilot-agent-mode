import React, { useState, useEffect } from 'react';

export default function Activities() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
    console.log('Activities endpoint:', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log('Activities fetched raw:', data);
        const list = Array.isArray(data) ? data : data.results || data;
        console.log('Activities list:', list);
        setItems(list || []);
      })
      .catch((err) => console.error('Activities fetch error:', err));
  }, []);

  return (
    <div>
      <h2>Activities</h2>
      <pre>{JSON.stringify(items, null, 2)}</pre>
    </div>
  );
}
import React, { useEffect, useState } from 'react';

function Activities() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
    console.log('Fetching Activities from', url);

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log('Activities fetch result', json);
        const payload = json && json.results ? json.results : json;
        setData(payload);
      })
      .catch((err) => console.error('Activities fetch error', err));
  }, []);

  return (
    <div className="container mt-3">
      <h2>Activities</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default Activities;
