import React, { useState } from 'react';
import axios from 'axios';

function UploadFile({ onUploadSuccess, customThemes }) {
    const [file, setFile] = useState(null);
    const [theme, setTheme] = useState('Uncategorized');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('theme', theme);
        try {
            const response = await axios.post('http://l${process.env.REACT_APP_API_URL}ocalhost:5000/upload', formData);
            onUploadSuccess(response.data.jobName);
        } catch (error) {
            console.error('Upload error:', error);
        }
    };

    const themeDescriptions = {
        Joy: 'Messages of happiness and celebration in Christ.',
        Faith: 'Sermons to strengthen your trust in God.',
        Victory: 'Proclaiming triumph through Jesus.',
        Grace: 'God’s unmerited favor and love.',
        Suffering: 'Finding hope in trials.',
        Uncategorized: 'General sermons awaiting a theme.'
    };

    return (
        <div className="space-y-4">
            <input
                type="file"
                accept="audio/*,video/*"
                onChange={handleFileChange}
                className="block w-full text-gray-700 dark:text-gray-200 dark:bg-gray-700"
            />
            <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="p-2 border rounded-md w-full text-gray-700 dark:text-gray-200 dark:bg-gray-700"
            >
                {['Joy', 'Faith', 'Victory', 'Grace', 'Suffering', 'Uncategorized', ...customThemes].map(t => (
                    <option key={t} value={t} className="relative group">
                        {t}
                        <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 -mt-10">
                            {themeDescriptions[t] || 'Custom theme - no description available.'}
                        </span>
                    </option>
                ))}
            </select>
            <button
                onClick={handleUpload}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
                Upload
            </button>
        </div>
    );
}

export default UploadFile;