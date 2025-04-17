import React, { useState } from 'react';

function App() {
  const [sermonText, setSermonText] = useState('');
  const [styleName, setStyleName] = useState('Style1');
  const [convertedSermon, setConvertedSermon] = useState('');
  const [message, setMessage] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleConvert = async () => {
    try {
      const response = await fetch(`${apiUrl}/convert-sermon`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sermonText, styleName }),
      });
      const data = await response.json();
      setConvertedSermon(data.converted);
      setMessage('Sermon converted successfully!');
    } catch (error) {
      setMessage('Error converting sermon: ' + error.message);
    }
  };

  const handleSaveStyle = async () => {
    try {
      const response = await fetch(`${apiUrl}/save-style`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sermonText, converted: convertedSermon, styleName }),
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Error saving style: ' + error.message);
    }
  };

  const handleClearStyle = async () => {
    try {
      const response = await fetch(`${apiUrl}/clear-style`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ styleName }),
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Error clearing style: ' + error.message);
    }
  };

  const handleBackup = async () => {
    try {
      const response = await fetch(`${apiUrl}/backup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Error creating backup: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 text-center">
        <h1 className="text-3xl">Sermon Dashboard</h1>
      </header>
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Input Section */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Create Sermon</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Sermon Text</label>
              <textarea
                className="w-full p-2 border rounded"
                rows="4"
                value={sermonText}
                onChange={(e) => setSermonText(e.target.value)}
                placeholder="Enter your sermon text here..."
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Style</label>
              <select
                className="w-full p-2 border rounded"
                value={styleName}
                onChange={(e) => setStyleName(e.target.value)}
              >
                <option value="Style1">Style1</option>
                <option value="Style2">Style2</option>
                <option value="Style3">Style3</option>
              </select>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleConvert}
              >
                Convert Sermon
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={handleSaveStyle}
              >
                Save Style
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={handleClearStyle}
              >
                Clear Style
              </button>
              <button
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                onClick={handleBackup}
              >
                Create Backup
              </button>
            </div>
          </div>
          {/* Output Section */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Results</h2>
            <div className="mb-4">
              <p className="text-gray-700">Converted Sermon:</p>
              <p className="p-2 bg-gray-100 rounded">{convertedSermon || 'No sermon converted yet'}</p>
            </div>
            <div>
              <p className="text-gray-700">Status:</p>
              <p className="p-2 bg-gray-100 rounded">{message || 'No actions taken yet'}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;