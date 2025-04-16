import React, { useEffect, useState } from 'react';

function App() {
  const [sermons, setSermons] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/convert-sermon`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sermonText: 'Sample sermon', styleName: 'Style1' }),
    })
      .then((res) => res.json())
      .then((data) => setSermons([data]))
      .catch((error) => console.error('Error fetching sermons:', error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 text-center">
        <h1 className="text-3xl">Welcome to Sermon Dashboard</h1>
      </header>
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold">Sermon List</h2>
            <ul>
              {sermons.map((sermon, index) => (
                <li key={index}>{sermon.convertedText || 'No data'}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold">Stats</h2>
            <p>Sermons loaded: {sermons.length}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;