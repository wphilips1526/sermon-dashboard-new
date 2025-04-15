import React, { useState } from 'react';
import axios from 'axios';

const PrayerRequestForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [request, setRequest] = useState('');
    const [toast, setToast] = useState('');

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(''), 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !request) {
            showToast('Please fill in all fields!');
            return;
        }

        try {
            await axios.post('${process.env.REACT_APP_API_URL}/prayer-requests', { name, request, timestamp: Date.now(), status: 'pending' });
            showToast('Prayer request submitted!');
            setName('');
            setRequest('');
            if (onSubmit) onSubmit();
        } catch (error) {
            showToast(`Error submitting prayer request: ${error.message}`);
        }
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Submit Prayer Request</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 dark:text-gray-200">Name</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md text-gray-700 dark:text-gray-200 dark:bg-gray-700"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name..."
                    />
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-200">Prayer Request</label>
                    <textarea
                        className="w-full p-2 border rounded-md text-gray-700 dark:text-gray-200 dark:bg-gray-700"
                        rows="3"
                        value={request}
                        onChange={(e) => setRequest(e.target.value)}
                        placeholder="Your prayer request..."
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                    Submit Prayer Request
                </button>
            </form>
            {toast && (
                <div className="bg-gold-400 text-blue-900 px-4 py-2 rounded-md shadow-lg">
                    {toast}
                </div>
            )}
        </div>
    );
};

export default PrayerRequestForm;