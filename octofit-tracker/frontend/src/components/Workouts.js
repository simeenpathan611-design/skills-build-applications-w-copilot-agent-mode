import React, { useState, useEffect } from 'react';

export default function Workouts() {
  const [items, setItems] = useState([]);

  const fetchData = () => {
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
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderTable = () => {
    if (!items || items.length === 0) return <p>No data available</p>;
    const keys = Object.keys(items[0]);
    return (
      <table className="table table-striped">
        <thead>
          <tr>{keys.map((k) => <th key={k}>{k}</th>)}</tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx}>
              {keys.map((k) => <td key={k}>{String(item[k])}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="container mt-3">
      <h2 className="h4 mb-3">Workouts</h2>
      <button className="btn btn-sm btn-primary mb-2" onClick={fetchData}>Refresh</button>
      <div className="card">
        <div className="card-body">
          {renderTable()}
        </div>
      </div>
    </div>
  );
}
