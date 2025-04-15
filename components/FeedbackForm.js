import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = ({ onSubmit }) => {
    const [sermonKey, setSermonKey] = useState('');
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [toast, setToast] = useState('');

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(''), 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!sermonKey || !rating || !comment) {
            showToast('Please fill in all fields!');
            return;
        }

        try {
            await axios.post('${process.env.REACT_APP_API_URL}/feedback', { sermonKey, rating, comment });
            showToast('Feedback submitted!');
            setSermonKey('');
            setRating(0);
            setComment('');
            if (onSubmit) onSubmit();
        } catch (error) {
            showToast(`Error submitting feedback: ${error.message}`);
        }
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Submit Feedback</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 dark:text-gray-200">Sermon</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md text-gray-700 dark:text-gray-200 dark:bg-gray-700"
                        value={sermonKey}
                        onChange={(e) => setSermonKey(e.target.value)}
                        placeholder="Enter sermon key (e.g., sermon-2023-10-01)"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-200">Rating (1-5)</label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        className="w-full p-2 border rounded-md text-gray-700 dark:text-gray-200 dark:bg-gray-700"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-200">Comment</label>
                    <textarea
                        className="w-full p-2 border rounded-md text-gray-700 dark:text-gray-200 dark:bg-gray-700"
                        rows="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Your feedback..."
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                    Submit Feedback
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

export default FeedbackForm;